const bracelet = document.getElementById('bracelet');
const totalPriceDisplay = document.getElementById('total-price');
const goldOption = document.getElementById('gold-option');

const MAX_BASE_CHARMS = 18;
const BASE_SILVER_COST = 8;
const BASE_GOLD_COST = 9;

// Clear bracelet and refill base charms
function initializeBracelet() {
  bracelet.innerHTML = '';
  const isGold = goldOption.checked;
  const basePrice = isGold ? BASE_GOLD_COST : BASE_SILVER_COST;

  for (let i = 0; i < MAX_BASE_CHARMS; i++) {
    const charm = document.createElement('div');
    charm.classList.add('bracelet-slot');

    const img = document.createElement('img');
    img.src = isGold ? 'charms/gold-base.webp' : 'charms/silver-base.webp';
    img.alt = isGold ? 'Gold Base Charm' : 'Silver Base Charm';
    img.title = img.alt;
    img.dataset.name = img.alt;
    img.dataset.price = "0";
    img.dataset.type = "base";

    charm.appendChild(img);
    bracelet.appendChild(charm);
  }

  updateTotal();
}

function updateTotal() {
  const charms = bracelet.querySelectorAll('img');
  let total = goldOption.checked ? BASE_GOLD_COST : BASE_SILVER_COST;

  charms.forEach(img => {
    const price = parseFloat(img.dataset.price || '0');
    total += price;
  });

  totalPriceDisplay.textContent = total.toFixed(2) + ' JDs';
}

function addCharmToBracelet(imgElement) {
  const emptySlot = bracelet.querySelector('.bracelet-slot:has(img[src*="base"])');
  if (!emptySlot) {
    alert('No empty slots left!');
    return;
  }

  const newImg = document.createElement('img');
  newImg.src = imgElement.src;
  newImg.alt = imgElement.alt;
  newImg.title = imgElement.title;
  newImg.dataset.name = imgElement.dataset.name;
  newImg.dataset.price = imgElement.dataset.price;
  newImg.dataset.type = imgElement.dataset.type;

  emptySlot.innerHTML = ''; // Clear base charm
  emptySlot.appendChild(newImg);
  updateTotal();
}

// Enable charm clicking
document.querySelectorAll('.normal-charms img, .rare-charms img').forEach(img => {
  img.addEventListener('click', () => addCharmToBracelet(img));
});

// React to gold option toggle
goldOption.addEventListener('change', () => initializeBracelet());

// Init on page load
initializeBracelet();
