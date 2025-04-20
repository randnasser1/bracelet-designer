const bracelet = document.getElementById('bracelet');
const goldToggle = document.getElementById('goldToggle');
const priceDisplay = document.getElementById('priceDisplay');
const countDisplay = document.getElementById('countDisplay');
const addSlotBtn = document.getElementById('addSlotBtn');
const removeSlotBtn = document.getElementById('removeSlotBtn');

let charmLimit = 18;

// Initial bracelet slots
function createSlot() {
  const slot = document.createElement('div');
  slot.classList.add('slot');
  return slot;
}

function populateInitialSlots() {
  bracelet.innerHTML = '';
  for (let i = 0; i < charmLimit; i++) {
    bracelet.appendChild(createSlot());
  }
}

populateInitialSlots();

// Price Calculation
function updatePriceAndCount() {
  let count = 0;
  let special = 0;
  let rare = 0;

  document.querySelectorAll('#bracelet .slot img').forEach(img => {
    count++;
    const type = img.dataset.type;
    if (type === 'special') special++;
    else if (type === 'rare') rare++;
  });

  let base = goldToggle.checked ? 9 : 8;
  let extraPlain = Math.max(0, count - 18 + (special + rare));
  let total = base + (special * 1.5) + (rare * 2) + (extraPlain * 0.4);

  priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
  countDisplay.textContent = `${count} / ${charmLimit} charms`;
}

goldToggle.addEventListener('change', updatePriceAndCount);

// Add/Remove Slots
addSlotBtn.addEventListener('click', () => {
  bracelet.appendChild(createSlot());
  charmLimit++;
  updatePriceAndCount();
});

removeSlotBtn.addEventListener('click', () => {
  const slots = bracelet.querySelectorAll('.slot');
  if (slots.length > 0) {
    const last = slots[slots.length - 1];
    if (!last.querySelector('img')) {
      last.remove();
      charmLimit--;
      updatePriceAndCount();
    }
  }
});

// SortableJS for bracelet
new Sortable(bracelet, {
  group: {
    name: 'charms',
    pull: true,
    put: true
  },
  animation: 150,
  ghostClass: 'drag-ghost',
  onAdd: updatePriceAndCount,
  onRemove: updatePriceAndCount,
  onSort: updatePriceAndCount,
  draggable: '.slot'
});

// SortableJS for charm gallery (clone only)
new Sortable(document.querySelector('.charm-pool'), {
  group: {
    name: 'charms',
    pull: 'clone',
    put: false
  },
  sort: false,
  animation: 150,
  draggable: '.charm'
});
