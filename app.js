document.addEventListener('DOMContentLoaded', () => {
  let totalPrice = 8.00; // Starting price with the silver bracelet base
  let charmCount = 0;

  const priceDisplay = document.getElementById('priceDisplay');
  const countDisplay = document.getElementById('countDisplay');
  const braceletSlots = document.querySelectorAll('.slot');
  const charmPool = document.getElementById('charmPool');
  const rareCharmPool = document.getElementById('rareCharmPool');
  const goldToggle = document.getElementById('goldToggle');
  const addSlotBtn = document.getElementById('addSlotBtn');
  const removeSlotBtn = document.getElementById('removeSlotBtn');
  const saveBtn = document.getElementById('saveBtn');

  // Helper function to update price display
  const updatePrice = () => {
    priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
    countDisplay.textContent = `${charmCount} / 18 charms`;
  };

  // Helper function to update the bracelet with a new charm
  const updateBracelet = (charm) => {
    const slot = document.querySelector('.slot.dragover');
    if (slot) {
      // Ensure slot is empty before adding a new charm
      if (!slot.innerHTML) {
        const img = charm.cloneNode();
        slot.innerHTML = '';
        slot.appendChild(img);
        charmCount += 1;
        totalPrice += parseFloat(charm.getAttribute('data-price'));
        updatePrice();
      }
    }
  };

  // Function to handle gold/silver toggle
  goldToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      totalPrice += 1; // Gold bracelet upgrade price
    } else {
      totalPrice -= 1; // Remove gold price if switching back to silver
    }
    updatePrice();
  });

  // Function to handle charm pool interaction
  charmPool.addEventListener('click', (e) => {
    const charm = e.target;
    if (charm.tagName === 'IMG') {
      updateBracelet(charm);
    }
  });

  // Function to handle rare charm pool interaction
  rareCharmPool.addEventListener('click', (e) => {
    const charm = e.target;
    if (charm.tagName === 'IMG') {
      updateBracelet(charm);
    }
  });

  // Add a slot button functionality (to dynamically add a charm slot)
  addSlotBtn.addEventListener('click', () => {
    if (charmCount < 18) {
      // Find an empty slot to add charm
      const emptySlot = Array.from(braceletSlots).find((slot) => !slot.innerHTML);
      if (emptySlot) {
        emptySlot.innerHTML = `<img src="basecharms/silver.png" alt="Silver Charm" data-name="silver" data-price="0" data-type="base" draggable="false">`;
        charmCount += 1;
        totalPrice += 0; // Adding silver base charm doesn't change price
        updatePrice();
      }
    }
  });

  // Remove a slot button functionality (to dynamically remove a charm slot)
  removeSlotBtn.addEventListener('click', () => {
    if (charmCount > 0) {
      // Find a non-empty slot to remove charm
      const filledSlot = Array.from(braceletSlots).find((slot) => slot.innerHTML);
      if (filledSlot) {
        filledSlot.innerHTML = ''; // Empty the slot
        charmCount -= 1;
        totalPrice -= parseFloat(filledSlot.firstChild.getAttribute('data-price')); // Subtract price of removed charm
        updatePrice();
      }
    }
  });

  // Save button functionality to show a simple alert with bracelet status
  saveBtn.addEventListener('click', () => {
    alert(`Your bracelet has been saved! Total price: ${totalPrice.toFixed(2)} JDs`);
  });

  // Drag and drop interaction for charm slots
  braceletSlots.forEach((slot) => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('dragover');
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('dragover');
    });

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      const charm = e.dataTransfer.getData('charm');
      const selectedCharm = document.querySelector(`[data-name="${charm}"]`);
      if (selectedCharm) {
        updateBracelet(selectedCharm);
        slot.classList.remove('dragover');
      }
    });
  });

  // Add event listeners for charm images to handle drag and drop
  const charmImages = document.querySelectorAll('.charm-pool img');
  charmImages.forEach((charm) => {
    charm.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('charm', charm.getAttribute('data-name'));
    });
  });

  // Initialize the price display
  updatePrice();
});
