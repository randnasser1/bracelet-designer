const charms = document.querySelectorAll('.charm');
const slots = document.querySelectorAll('.slot');

const BASE_PRICE = 8; // or 9 for gold
const CHARM_LIMIT = 18;
const PRICES = {
  plain: 0.4,
  special: 1.5,
  rare: 2
};

charms.forEach(charm => {
  charm.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', charm.dataset.id);
    e.dataTransfer.setDragImage(charm, 25, 25);
  });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', e => e.preventDefault());

  slot.addEventListener('drop', e => {
    e.preventDefault();
    const charmId = e.dataTransfer.getData('text/plain');

    // Detect type from ID (e.g., "plain-heart", "special-cat")
    const charmType = getCharmType(charmId);

    const charmImg = document.createElement('img');
    charmImg.src = `charms/${charmId}.png`;
    charmImg.classList.add('charm');
    charmImg.dataset.id = charmId;
    charmImg.dataset.type = charmType;

    slot.innerHTML = '';
    slot.appendChild(charmImg);

    updatePrice();
  });
});

function getCharmType(id) {
  if (id.startsWith('rare-')) return 'rare';
  if (id.startsWith('special-')) return 'special';
  return 'plain';
}

function isGold() {
  return document.getElementById('goldToggle').checked;
}

function updatePrice() {
  const allCharms = Array.from(document.querySelectorAll('#bracelet .slot img'));
  const typeCounts = { plain: 0, special: 0, rare: 0 };

  allCharms.forEach(img => {
    const type = img.dataset.type;
    if (typeCounts[type] !== undefined) {
      typeCounts[type]++;
    }
  });

  const totalCharms = typeCounts.plain + typeCounts.special + typeCounts.rare;

  let basePrice = isGold() ? 9 : 8;
  let total = basePrice;

  // Full glam discount: 18+ special charms, no rares
  if (typeCounts.special >= 18 && typeCounts.rare === 0) {
    total = 20;
  } else {
    // Charge only for extra charms beyond 18
    const extras = totalCharms - 18;
    if (extras > 0) {
      const extraPlain = Math.max(typeCounts.plain - 15, 0);
      const extraSpecial = Math.max(typeCounts.special - 3, 0);
      const extraRare = typeCounts.rare;

      total += extraPlain * PRICES.plain;
      total += extraSpecial * PRICES.special;
      total += extraRare * PRICES.rare;
    }
  }

  document.getElementById('priceDisplay').textContent = `Total: ${total.toFixed(2)} JDs`;
}

document.getElementById('saveBtn').addEventListener('click', async () => {
  const layout = Array.from(slots).map(slot => {
    const img = slot.querySelector('img');
    return img ? img.dataset.id : null;
  });

  console.log('Bracelet Layout:', layout);

  // Save to Firebase
  await saveBracelet(layout);
});
