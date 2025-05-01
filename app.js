// grab everything
const bracelet      = document.getElementById('bracelet');
const goldToggle    = document.getElementById('goldToggle');
const priceDisplay  = document.getElementById('priceDisplay');
const countDisplay  = document.getElementById('countDisplay');
const charmPool     = document.getElementById('charmPool');
const rareCharmPool = document.getElementById('rareCharmPool');

const MAX_SLOTS   = 18;
const BASE_SILVER = { src: 'basecharms/silver.png', name: 'Silver Base', price: 0 };
const BASE_GOLD   = { src: 'basecharms/gold.png',   name: 'Gold Base',   price: 0 };

// (Re)build the 18 slots
function initializeBracelet() {
  bracelet.innerHTML = '';
  const baseCharm = goldToggle.checked ? BASE_GOLD : BASE_SILVER;

  for (let i = 0; i < MAX_SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot empty';

    const img = document.createElement('img');
    img.src         = baseCharm.src;
    img.alt         = baseCharm.name;
    img.title       = baseCharm.name;
    img.dataset.name  = baseCharm.name;
    img.dataset.price = '0';
    img.dataset.type  = 'base';

    slot.appendChild(img);
    bracelet.appendChild(slot);
  }

  updatePrice();
}

// add a clicked or dragged charm into the first empty slot
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

// recalc total & count
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

// wire up clicks
function bindCharmClicks() {
  [...charmPool.children, ...rareCharmPool.children].forEach(img => {
    img.draggable = true;
    img.addEventListener('click', () => addCharmToBracelet(img));
    img.addEventListener('dragstart', () => img.classList.add('dragging'));
    img.addEventListener('dragend',   () => img.classList.remove('dragging'));
  });
}

// drag/drop onto slots
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
        e.target.classList.remove('empty','dragover');
        e.target.innerHTML = '';
        e.target.appendChild(dragImg);
        dragImg.classList.remove('dragging');
        updatePrice();
      }
    }
  });
}

// when the page loads…
document.addEventListener('DOMContentLoaded', () => {
  initializeBracelet();
  bindCharmClicks();
  setupDragDrop();
  goldToggle.addEventListener('change', initializeBracelet);
});
