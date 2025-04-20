document.addEventListener('DOMContentLoaded', () => {
  const bracelet = document.getElementById('bracelet');
  const charmPool = document.querySelector('.charm-pool');
  const priceDisplay = document.getElementById('priceDisplay');
  const countDisplay = document.getElementById('countDisplay');
  const addSlotBtn = document.getElementById('addSlotBtn');
  const removeSlotBtn = document.getElementById('removeSlotBtn');
  
  let totalPrice = 8.00; // Starting price for the bracelet (base price)
  let charmCount = 0;
  const maxCharms = 18;
  
  // Initialize slots with empty spaces (18 slots)
  for (let i = 0; i < maxCharms; i++) {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    slot.addEventListener('click', () => removeCharm(slot));
    bracelet.appendChild(slot);
  }

  // Function to update the price and charm count display
  function updateDisplay() {
    priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
    countDisplay.textContent = `${charmCount} / 18 charms`;
  }

  // Add charm to slot
  function addCharmToSlot(charm) {
    const emptySlot = [...bracelet.children].find(slot => !slot.contains(charm));
    if (emptySlot && charmCount < maxCharms) {
      const imgClone = charm.cloneNode();
      emptySlot.appendChild(imgClone);
      charmCount++;
      totalPrice += 1.5; // Example price increment for each charm added
      updateDisplay();
    }
  }

  // Remove charm from slot
  function removeCharm(slot) {
    const charmInSlot = slot.querySelector('img');
    if (charmInSlot) {
      slot.removeChild(charmInSlot);
      charmCount--;
      totalPrice -= 1.5; // Example price decrement for each charm removed
      updateDisplay();
    }
  }

  // Add event listener for charm images
  charmPool.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('charm')) {
      addCharmToSlot(e.target);
    }
  });

  // Add charm slot
  addSlotBtn.addEventListener('click', () => {
    if (charmCount < maxCharms) {
      addCharmToSlot(charmPool.querySelector('.charm')); // Adds first charm as example
    }
  });

  // Remove charm slot
  removeSlotBtn.addEventListener('click', () => {
    const lastSlot = bracelet.querySelector('.slot:last-child');
    if (lastSlot && lastSlot.querySelector('img')) {
      removeCharm(lastSlot);
    }
  });

  updateDisplay();
});
