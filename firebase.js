document.addEventListener('DOMContentLoaded', () => {
  const priceDisplay = document.getElementById('priceDisplay');
  const countDisplay = document.getElementById('countDisplay');
  const bracelet = document.getElementById('bracelet');
  const charmPool = document.getElementById('charmPool');
  const rareCharmPool = document.getElementById('rareCharmPool');
  const goldToggle = document.getElementById('gold-toggle');
  const addSlotBtn = document.getElementById('add-slot-btn');
  const removeSlotBtn = document.getElementById('remove-slot-btn');
  const saveBtn = document.getElementById('save-btn');

  let basePrice = 8.00;
  let charmCount = 0;
  let totalPrice = basePrice;
  let lastClickedCharm = null;

  // Initialize the bracelet with empty slots
  function initializeBracelet() {
    bracelet.innerHTML = ''; // Clear any existing slots
    
    for (let i = 0; i < 18; i++) {
      const slot = document.createElement('div');
      slot.classList.add('slot');
      slot.dataset.index = i;
      
      // Make slots clickable to add charms
      slot.addEventListener('click', () => {
        if (lastClickedCharm) {
          addCharmToSlot(lastClickedCharm, slot);
        }
      });
      
      bracelet.appendChild(slot);
    }
  }

  // Add a charm to a specific slot
  function addCharmToSlot(charm, slot) {
    // Remove existing charm if any
    if (slot.firstChild) {
      totalPrice -= parseFloat(slot.firstChild.getAttribute('data-price')) || 0;
      charmCount--;
    }
    
    // Add new charm
    const img = charm.cloneNode();
    img.draggable = false;
    slot.innerHTML = '';
    slot.appendChild(img);
    
    charmCount++;
    totalPrice += parseFloat(img.getAttribute('data-price')) || 0;
    updatePrice();
  }

  // Update the price display
  const updatePrice = () => {
    priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
    countDisplay.textContent = `${charmCount} / 18 charms`;
  };

  // Toggle gold charms
  const toggleGold = (isGold) => {
    basePrice = isGold ? 9.00 : 8.00;
    recalculateTotal();
  };

  // Recalculate the total price
  const recalculateTotal = () => {
    totalPrice = basePrice;
    charmCount = 0;

    document.querySelectorAll('#bracelet .slot img').forEach(img => {
      charmCount += 1;
      totalPrice += parseFloat(img.getAttribute('data-price')) || 0;
    });

    updatePrice();
  };

  // Set last clicked charm when clicking in either pool
  charmPool.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      lastClickedCharm = e.target;
    }
  });

  rareCharmPool.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      lastClickedCharm = e.target;
    }
  });

  // Add base charm to first empty slot
  addSlotBtn.addEventListener('click', () => {
    const emptySlot = Array.from(document.querySelectorAll('.slot')).find(slot => !slot.firstChild);
    if (emptySlot) {
      const isGold = goldToggle.checked;
      const baseCharm = document.createElement('img');
      baseCharm.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
      baseCharm.setAttribute('data-price', '0');
      baseCharm.setAttribute('data-type', 'base');
      baseCharm.setAttribute('data-name', isGold ? 'gold' : 'silver');
      addCharmToSlot(baseCharm, emptySlot);
    }
  });

  // Remove last charm
  removeSlotBtn.addEventListener('click', () => {
    const filledSlots = Array.from(document.querySelectorAll('.slot')).filter(slot => slot.firstChild);
    if (filledSlots.length > 0) {
      const lastFilledSlot = filledSlots[filledSlots.length - 1];
      const removedCharm = lastFilledSlot.querySelector('img');
      totalPrice -= parseFloat(removedCharm.getAttribute('data-price')) || 0;
      charmCount--; 
      lastFilledSlot.innerHTML = '';
      updatePrice();
    }
  });

  // Gold toggle event
  goldToggle.addEventListener('change', (e) => {
    toggleGold(e.target.checked);
  });

  // Save bracelet
  saveBtn.addEventListener('click', () => {
    alert('Bracelet saved!');
    // Here you could add code to save the current design
  });

  // Initialize the bracelet
  initializeBracelet();
  updatePrice();
});
