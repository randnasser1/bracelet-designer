// === app.js ===
const bracelet       = document.getElementById('bracelet');
const priceDisplay   = document.getElementById('priceDisplay');
const countDisplay   = document.getElementById('countDisplay');
const goldToggle     = document.getElementById('goldToggle');
const charmPool      = document.getElementById('charmPool');
const rareCharmPool  = document.getElementById('rareCharmPool');

const MAX_SLOTS = 18;
const BASE_SILVER = { src: 'basecharms/silver.png', name: 'Silver Base', price: 0 };
const BASE_GOLD   = { src: 'basecharms/gold.png',   name: 'Gold Base',   price: 0 };

// build slots with class "slot"
function initializeBracelet() {
  bracelet.innerHTML = '';
  const base = goldToggle.checked ? BASE_GOLD : BASE_SILVER;

  for (let i = 0; i < MAX_SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot empty';

    const img = document.createElement('img');
    img.src        = base.src;
    img.alt        = base.name;
    img.dataset.name  = base.name;
    img.dataset.price = '0';
    img.dataset.type  = 'base';

    slot.appendChild(img);
    bracelet.appendChild(slot);
  }

  updatePrice();
}

// add charm on click
function addCharmToBracelet(charmImg) {
  const slots = bracelet.querySelectorAll('.slot');
  for (const slot of slots) {
    const img = slot.querySelector('img');
    if (img.dataset.type === 'base') {
      const newImg = charmImg.cloneNode();
      newImg.dataset.type = charmImg.dataset.type;
      slot.innerHTML = '';
      slot.appendChild(newImg);
      slot.classList.remove('empty');
      updatePrice();
      return;
    }
  }
  alert('All slots are filled!');
}

// price & count
function updatePrice() {
  let total = goldToggle.checked ? 9 : 8;
  let count = 0;
  bracelet.querySelectorAll('.slot img').forEach(img => {
    if (img.dataset.type !== 'base') {
      total += parseFloat(img.dataset.price);
      count++;
    }
  });
  priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
  countDisplay.textContent = `${count} / ${MAX_SLOTS} charms`;
}

// bind clicks
function bindCharmClicks() {
  [...charmPool.children, ...rareCharmPool.children].forEach(img => {
    img.addEventListener('click', () => addCharmToBracelet(img));
    img.draggable = true;
  });
}

// drag/drop
function setupDragDrop() {
  bracelet.addEventListener('dragover', e => {
    if (e.target.classList.contains('slot')) {
      e.preventDefault();
      e.target.classList.add('dragover');
    }
  });
  bracelet.addEventListener('dragleave', e => {
    if (e.target.classList.contains('slot')) {
      e.target.classList.remove('dragover');
    }
  });
  bracelet.addEventListener('drop', e => {
    if (e.target.classList.contains('slot')) {
      e.preventDefault();
      const dragImg = document.querySelector('img.dragging');
      if (dragImg && e.target.classList.contains('empty')) {
        e.target.classList.remove('empty', 'dragover');
        e.target.innerHTML = '';
        e.target.appendChild(dragImg);
        dragImg.classList.remove('dragging');
        updatePrice();
      }
    }
  });
  document.querySelectorAll('.charm-pool img').forEach(img => {
    img.addEventListener('dragstart', () => img.classList.add('dragging'));
    img.addEventListener('dragend',   () => img.classList.remove('dragging'));
  });
}

// events
goldToggle.addEventListener('change', initializeBracelet);
document.addEventListener('DOMContentLoaded', () => {
  initializeBracelet();
  bindCharmClicks();
  setupDragDrop();
});
