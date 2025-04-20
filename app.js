// Variables for bracelet slots, charm pool, and pricing
const bracelet = document.getElementById('bracelet');
const charmPool = document.querySelector('.charm-pool');
const priceDisplay = document.getElementById('priceDisplay');
const countDisplay = document.getElementById('countDisplay');
const addSlotBtn = document.getElementById('addSlotBtn');
const removeSlotBtn = document.getElementById('removeSlotBtn');
const goldToggle = document.getElementById('goldToggle');

// Constants
const basePrice = 8.00;
const goldPrice = 1.00;
const charmPrices = {
  plain: 0.4,
  special: 1.5,
  rare: 2.0
};

// Initialize bracelet slots
let braceletSlots = Array(18).fill(null);

// Function to update the bracelet display
function updateBracelet() {
  bracelet.innerHTML = ''; // Clear bracelet container
  braceletSlots.forEach((charm, index) => {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    slot.setAttribute('data-index', index);

    if (charm) {
      const img = document.createElement('img');
      img.src = charm.src;
      img.alt = charm.title;
      slot.appendChild(img);
    }

    bracelet.appendChild(slot);
  });

  // Update count and price
  const charmCount = braceletSlots.filter(slot => slot !== null).length;
  const totalPrice = basePrice + (goldToggle.checked ? goldPrice : 0) + braceletSlots.reduce((total, charm) => {
    if (charm) {
      return total + charmPrices[charm.type];
    }
    return total;
  }, 0);

  countDisplay.textContent = `${charmCount} / 18 charms`;
  priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
}

// Function to handle charm drag and drop
charmPool.addEventListener('dragstart', (e) => {
  e.target.classList.add('dragging');
});

charmPool.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
});

bracelet.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggedItem = document.querySelector('.dragging');
  const targetSlot = e.target.closest('.slot');

  if (targetSlot && targetSlot !== draggedItem) {
    targetSlot.classList.add('dragover');
  }
});

bracelet.addEventListener('dragleave', (e) => {
  const targetSlot = e.target.closest('.slot');
  if (targetSlot) {
    targetSlot.classList.remove('dragover');
  }
});

bracelet.addEventListener('drop', (e) => {
  e.preventDefault();
  const draggedItem = document.querySelector('.dragging');
  const targetSlot = e.target.closest('.slot');

  if (targetSlot && targetSlot !== draggedItem) {
    const index = targetSlot.getAttribute('data-index');
    const charm = {
      src: draggedItem.src,
      title: draggedItem.title,
      type: draggedItem.getAttribute('data-type')
    };
    braceletSlots[index] = charm;
    updateBracelet();
  }

  // Remove dragover highlight
  if (targetSlot) {
    targetSlot.classList.remove('dragover');
  }
});

// Event listener to add a slot (when max charms allowed)
addSlotBtn.addEventListener('click', () => {
  const firstEmptySlotIndex = braceletSlots.indexOf(null);
  if (firstEmptySlotIndex !== -1) {
    braceletSlots[firstEmptySlotIndex] = null;
    updateBracelet();
  }
});

// Event listener to remove a charm (when there are charms in the bracelet)
removeSlotBtn.addEventListener('click', () => {
  const lastFilledSlotIndex = braceletSlots.lastIndexOf(null);
  if (lastFilledSlotIndex !== -1) {
    braceletSlots[lastFilledSlotIndex] = null;
    updateBracelet();
  }
});

// Event listener for gold toggle
goldToggle.addEventListener('change', () => {
  updateBracelet();
});

// Initial Bracelet update
updateBracelet();
