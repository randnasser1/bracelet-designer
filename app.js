const charms = document.querySelectorAll('.charm');
const slotsContainer = document.getElementById('bracelet');
const BASE_PRICE = 8;
const PRICES = { plain: 0.4, special: 1.5, rare: 2 };
const CHARM_LIMIT = 18;

// 1) Dynamically create 18 empty slots
for (let i = 0; i < CHARM_LIMIT; i++) {
  const slot = document.createElement('div');
  slot.classList.add('slot');
  slot.dataset.index = i;
  slotsContainer.appendChild(slot);
}

// Re-query slots now that they exist
const slots = document.querySelectorAll('.slot');

// 2) Drag & drop for charms
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
    const charmType = getCharmType(charmId);

    const img = document.createElement('img');
    img.src = `charms/${charmId}.webp`;   // make sure your IDs match your filenames
    img.classList.add('charm');
    img.dataset.id = charmId;
    img.dataset.type = charmType;

    slot.innerHTML = '';
    slot.appendChild(img);
    updatePrice();
  });
});

function getCharmType(id) {
  if (id.startsWith('rare-'))    return 'rare';
  if (id.startsWith('special-')) return 'special';
  return 'plain';
}

function isGold() {
  return document.getElementById('goldToggle').checked;
}

function updatePrice() {
  const imgs = document.querySelectorAll('#bracelet .slot img');
  const counts = { plain: 0, special: 0, rare: 0 };
  imgs.forEach(i => counts[i.dataset.type]++);

  const totalCharms = counts.plain + counts.special + counts.rare;
  let total = isGold() ? 9 : BASE_PRICE;

  // full-glam discount
  if (counts.special >= CHARM_LIMIT && counts.rare === 0) {
    total = 20;
  } else if (totalCharms > CHARM_LIMIT) {
    // charge extras
    const extraPlain   = Math.max(counts.plain   - 15, 0);
    const extraSpecial = Math.max(counts.special - 3,  0);
    const extraRare    = counts.rare;
    total += extraPlain * PRICES.plain
          + extraSpecial * PRICES.special
          + extraRare * PRICES.rare;
  }

  document.getElementById('priceDisplay').textContent =
    `Total: ${total.toFixed(2)} JDs`;
}

document.getElementById('saveBtn').addEventListener('click', async () => {
  const layout = Array.from(slots).map(s => {
    const img = s.querySelector('img');
    return img ? img.dataset.id : null;
  });
  await saveBracelet(layout);
});
