const bracelet = document.getElementById('bracelet');
const priceDisplay = document.getElementById('priceDisplay');
const countDisplay = document.getElementById('countDisplay');
const goldToggle = document.getElementById('goldToggle');
const charmPool = document.getElementById('charmPool');
const rareCharmPool = document.getElementById('rareCharmPool');

const MAX_SLOTS = 18;
const BASE_SILVER = { src: 'basecharms/silver.png', name: 'Silver Base', price: 0 };
const BASE_GOLD = { src: 'basecharms/gold.png', name: 'Gold Base', price: 0 };

// Initialize bracelet with 18 base charms
function initializeBracelet() {
  bracelet.innerHTML = '';
  const isGold = goldToggle.checked;
  const baseCharm = isGold ? BASE_GOLD : BASE_SILVER;

  for (let i = 0; i < MAX_SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'bracelet-slot';

    const img = document.createElement('img');
    img.src = baseCharm.src;
    img.alt = baseCharm.name;
    img.title = baseCharm.name;
    img.dataset.name = baseCharm.name;
    img.dataset.price = '0';
    img.dataset.type = 'base';

    slot.appendChild(img);
    bracelet.appendChild(slot);
  }

  updatePrice();
}

// Add clicked charm to first non-base slot
function addCharmToBracelet(charmImg) {
  const slots = bracelet.querySelectorAll('.bracelet-slot');

  for (const slot of slots) {
    const img = slot.querySelector('img');
    if (img && img.dataset.type === 'base') {
      const newImg = document.createElement('img');
      newImg.src = charmImg.src;
      newImg.alt = charmImg.alt;
      newImg.title = charmImg.title;
      newImg.dataset.name = charmImg.dataset.name;
      newImg.dataset.price = charmImg.dataset.price;
      newImg.dataset.type = charmImg.dataset.type;

      slot.innerHTML = '';
      slot.appendChild(newImg);
      updatePrice();
      return;
    }
  }

  alert('All slots are filled!');
}

// Calculate price and charm count
function updatePrice() {
  const isGold = goldToggle.checked;
  let total = isGold ? 9 : 8;
  let count = 0;

  bracelet.querySelectorAll('.bracelet-slot img').forEach(img => {
    const type = img.dataset.type;
    const price = parseFloat(img.dataset.price || '0');
    if (type !== 'base') {
      total += price;
      count += 1;
    }
  });

  priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
  countDisplay.textContent = `${count} / ${MAX_SLOTS} charms`;
}

// Bind click to charm pool images
function bindCharmClicks() {
  [...charmPool.querySelectorAll('img'), ...rareCharmPool.querySelectorAll('img')].forEach(img => {
    img.addEventListener('click', () => addCharmToBracelet(img));
  });
}

// On checkbox toggle, reset bracelet
goldToggle.addEventListener('change', initializeBracelet);

// Init
initializeBracelet();
bindCharmClicks();

addEventListener('DOMContentLoaded', () => {
  const addCharmButton = document.getElementById('addCharmButton');
  addCharmButton.addEventListener('click', function () {
    const firstCharm = document.querySelector('.normal-charms img'); 
    for (let i = 0; i < bracelet.querySelectorAll('.bracelet-slot').length; i++) {
      const slot = bracelet.querySelectorAll('.bracelet-slot')[i];
      if (!slot.querySelector('img')) {
        const charmClone = firstCharm.cloneNode(true);
        slot.appendChild(charmClone);
        updatePrice();
        break;
      }
    }
  });
});
