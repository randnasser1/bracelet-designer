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
  const baseCharm = goldToggle.checked ? BASE_GOLD : BASE_SILVER;

  for (let i = 0; i < MAX_SLOTS; i++) {
    const slot = document.createElement('div');
-   slot.className = 'slot empty';
+   slot.className = 'slot empty';

    const img = document.createElement('img');
    img.src = baseCharm.src;
    img.alt = baseCharm.name;
    img.dataset.type = 'base';
    slot.appendChild(img);
    bracelet.appendChild(slot);
  }

  updatePrice();
}


// Add clicked charm to first non-base slot
function addCharmToBracelet(charmImg) {
  const slots = bracelet.querySelectorAll('.slot');

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
      slot.classList.remove('empty'); // Mark slot as filled
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

  bracelet.querySelectorAll('.slot img').forEach(img => {
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

// Handle drag-and-drop functionality for charms
const charmImages = document.querySelectorAll('.charm-pool img');

charmImages.forEach(img => {
  img.addEventListener('dragstart', () => {
    img.classList.add('dragging');
  });

  img.addEventListener('dragend', () => {
    img.classList.remove('dragging');
  });
});

// Handling dragover for slots
const slots = document.querySelectorAll('.slot');

slots.forEach(slot => {
  slot.addEventListener('dragover', (e) => {
    e.preventDefault();
    slot.classList.add('dragover');
  });

  slot.addEventListener('dragleave', () => {
    slot.classList.remove('dragover');
  });

  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedImg = document.querySelector('.dragging');
    if (draggedImg && slot.classList.contains('empty')) {
      slot.innerHTML = '';
      slot.appendChild(draggedImg);
      draggedImg.classList.remove('dragging');
      slot.classList.remove('dragover');
      slot.classList.remove('empty'); // Mark slot as filled
      updatePrice();
    }
  });
});

// Optional button for adding charms
addEventListener('DOMContentLoaded', () => {
  const addCharmButton = document.getElementById('addCharmButton');
  addCharmButton.addEventListener('click', function () {
    const firstCharm = document.querySelector('.normal-charms img'); 
    for (let i = 0; i < bracelet.querySelectorAll('.slot').length; i++) {
      const slot = bracelet.querySelectorAll('.slot')[i];
      if (!slot.querySelector('img')) {
        const charmClone = firstCharm.cloneNode(true);
        slot.appendChild(charmClone);
        updatePrice();
        break;
      }
    }
  });
});
