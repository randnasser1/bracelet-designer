const bracelet      = document.getElementById('bracelet');
const goldToggle    = document.getElementById('goldToggle');
const priceDisplay  = document.getElementById('priceDisplay');
const countDisplay  = document.getElementById('countDisplay');
const charmPool     = document.getElementById('charmPool');
const rareCharmPool = document.getElementById('rareCharmPool');

const MAX_SLOTS   = 18;
const BASE_SILVER = { src: 'basecharms/silver.png', name: 'Silver Base', price: 0 };
const BASE_GOLD   = { src: 'basecharms/gold.png',   name: 'Gold Base',   price: 0 };

function initializeBracelet() {
  bracelet.innerHTML = '';
  const base = goldToggle.checked ? BASE_GOLD : BASE_SILVER;
  for (let i = 0; i < MAX_SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot empty';

    const img = document.createElement('img');
    img.src = base.src;
    img.alt = base.name;
    img.title = base.name;
    img.dataset.name = base.name;
    img.dataset.price = '0';
    img.dataset.type = 'base';

    slot.appendChild(img);
    bracelet.appendChild(slot);
  }
  updatePrice();
}

function addCharmToBracelet(charmImg) {
  const slots = bracelet.querySelectorAll('.slot');
  for (const slot of slots) {
    const img = slot.querySelector('img');
    if (img.dataset.type === 'base') {
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
  alert('All slots are filled!');
}

function setupGalleryClicks() {
  [charmPool, rareCharmPool].forEach(pool => {
    pool.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', () => addCharmToBracelet(img));
    });
  });
}

function updatePrice() {
  let total = goldToggle.checked ? 9 : 8;
  const placed = Array.from(bracelet.querySelectorAll('.slot img'));
  const normalImgs = placed.filter(img => img.dataset.type === 'normal');
  const rareImgs   = placed.filter(img => img.dataset.type === 'rare');

  const normalPrices = normalImgs.map(img => parseFloat(img.dataset.price));
  const chargeableNormals = normalPrices.slice(3);
  const normalTotal = chargeableNormals.reduce((sum, p) => sum + p, 0);
  const rareTotal = rareImgs.reduce((sum, img) => sum + parseFloat(img.dataset.price), 0);

  total += normalTotal + rareTotal;
  const count = normalImgs.length + rareImgs.length;
  priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
  countDisplay.textContent = `${count} / ${MAX_SLOTS} charms`;
}

function setupDragDrop() {
  [charmPool, rareCharmPool].forEach(pool => {
    pool.querySelectorAll('img').forEach(img => {
      img.draggable = true;
      img.addEventListener('dragstart', () => img.classList.add('dragging'));
      img.addEventListener('dragend', () => img.classList.remove('dragging'));
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
        const clone = dragImg.cloneNode();
        clone.classList.remove('dragging');
        e.target.innerHTML = '';
        e.target.appendChild(clone);
        e.target.classList.remove('empty', 'dragover');
        updatePrice();
      }
    }
  });
}

function setupGoldToggle() {
  goldToggle.addEventListener('change', () => {
    const base = goldToggle.checked ? BASE_GOLD : BASE_SILVER;
    bracelet.querySelectorAll('.slot img').forEach(img => {
      if (img.dataset.type === 'base') {
        img.src = base.src;
        img.alt = base.name;
        img.title = base.name;
        img.dataset.name = base.name;
      }
    });
    updatePrice();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeBracelet();
  setupGalleryClicks();
  setupDragDrop();
  setupGoldToggle();
});
