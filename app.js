// app.js

// — grab elements —
const bracelet       = document.getElementById('bracelet');
const goldToggle     = document.getElementById('goldToggle');
const priceDisplay   = document.getElementById('priceDisplay');
const countDisplay   = document.getElementById('countDisplay');
const charmPool      = document.getElementById('charmPool');
const rareCharmPool  = document.getElementById('rareCharmPool');

const MAX_SLOTS   = 18;
const BASE_SILVER = { src: 'basecharms/silver.png', name: 'Silver Base', price: 0 };
const BASE_GOLD   = { src: 'basecharms/gold.png',   name: 'Gold Base',   price: 0 };

// — build 18 base slots —
function initializeBracelet() {
  bracelet.innerHTML = '';
  const base = goldToggle.checked ? BASE_GOLD : BASE_SILVER;

  for (let i = 0; i < MAX_SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot empty';

    const img = document.createElement('img');
    img.src         = base.src;
    img.alt         = base.name;
    img.title       = base.name;
    img.dataset.name  = base.name;
    img.dataset.price = '0';
    img.dataset.type  = 'base';

    slot.appendChild(img);
    bracelet.appendChild(slot);
  }

  updatePrice();
}

// — place a charm into first base slot —
function addCharmToBracelet(charmImg) {
  const slots = bracelet.querySelectorAll('.slot');
  for (const slot of slots) {
    const img = slot.querySelector('img');
    if (img.dataset.type === 'base') {
      // clone the clicked charm
      const newImg = charmImg.cloneNode();
      newImg.dataset.type  = charmImg.dataset.type;
      newImg.dataset.price = charmImg.dataset.price;
      newImg.alt           = charmImg.alt;
      newImg.title         = charmImg.title;

      slot.innerHTML = '';
      slot.appendChild(newImg);
      slot.classList.remove('empty');
      updatePrice();
      return;
    }
  }
  // no empty base found
  alert('All slots are filled!');
}

// — recalc total & count —
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

// — gallery click delegation —
function setupGalleryClicks() {
  [charmPool, rareCharmPool].forEach(pool => {
    pool.addEventListener('click', e => {
      if (e.target.tagName === 'IMG') {
        addCharmToBracelet(e.target);
      }
    });
  });
}

// — drag/drop onto slots —
function setupDragDrop() {
  // dragging class
  [charmPool, rareCharmPool].forEach(pool => {
    pool.querySelectorAll('img').forEach(img => {
      img.draggable = true;
      img.addEventListener('dragstart', () => img.classList.add('dragging'));
      img.addEventListener('dragend',   () => img.classList.remove('dragging'));
    });
  });

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
        e.target.classList.remove('empty','dragover');
        e.target.innerHTML = '';
        e.target.appendChild(dragImg);
        dragImg.classList.remove('dragging');
        updatePrice();
      }
    }
  });
}

// — swap base images on toggle without clearing user charms —
function setupGoldToggle() {
  goldToggle.addEventListener('change', () => {
    const base = goldToggle.checked ? BASE_GOLD : BASE_SILVER;
    bracelet.querySelectorAll('.slot img').forEach(img => {
      if (img.dataset.type === 'base') {
        img.src         = base.src;
        img.alt         = base.name;
        img.title       = base.name;
        img.dataset.name  = base.name;
      }
    });
    updatePrice();
  });
}

// — wire it all up on page load —
document.addEventListener('DOMContentLoaded', () => {
  initializeBracelet();
  setupGalleryClicks();
  setupDragDrop();
  setupGoldToggle();
});
