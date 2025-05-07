document.addEventListener('DOMContentLoaded', () => {
  const priceDisplay = document.getElementById('priceDisplay');
  const countDisplay = document.getElementById('countDisplay');
  const braceletSlots = document.querySelectorAll('.slot');
  const charmPool = document.getElementById('charm-pool');
  const rareCharmPool = document.getElementById('rare-charm-pool');
  const goldToggle = document.getElementById('gold-toggle');
  const addSlotBtn = document.getElementById('add-slot-btn');
  const removeSlotBtn = document.getElementById('remove-slot-btn');
  const saveBtn = document.getElementById('save-btn');

  let basePrice = 8.00; // Silver bracelet base
  let charmCount = 0;
  let totalPrice = basePrice;

  // Initialize with filled slots from HTML
  braceletSlots.forEach(slot => {
    const charm = slot.querySelector('img');
    if (charm) {
      charmCount += 1;
      const price = parseFloat(charm.getAttribute('data-price')) || 0;
      totalPrice += price;
    }
  });

  const updatePrice = () => {
    priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
    countDisplay.textContent = `${charmCount} / 18 charms`;
  };

  const updateBracelet = (charm, targetSlot) => {
    if (!targetSlot.innerHTML && charmCount < 18) {
      const img = charm.cloneNode();
      targetSlot.appendChild(img);
      charmCount += 1;
      totalPrice += parseFloat(img.getAttribute('data-price')) || 0;
      updatePrice();
    }
  };

  goldToggle.addEventListener('change', (e) => {
    const isGold = e.target.checked;
    basePrice = isGold ? 9.00 : 8.00;
    recalculateTotal();
  });

  const recalculateTotal = () => {
    totalPrice = basePrice;
    charmCount = 0;

    braceletSlots.forEach(slot => {
      const charm = slot.querySelector('img');
      if (charm) {
        charmCount += 1;
        totalPrice += parseFloat(charm.getAttribute('data-price')) || 0;
      }
    });

    updatePrice();
  };

  charmPool.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const slot = Array.from(braceletSlots).find(s => !s.innerHTML);
      if (slot) updateBracelet(e.target, slot);
    }
  });

  rareCharmPool.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const slot = Array.from(braceletSlots).find(s => !s.innerHTML);
      if (slot) updateBracelet(e.target, slot);
    }
  });

  addSlotBtn.addEventListener('click', () => {
    if (charmCount < 18) {
      const emptySlot = Array.from(braceletSlots).find(slot => !slot.innerHTML);
      if (emptySlot) {
        const silverCharm = document.createElement('img');
        silverCharm.src = 'basecharms/silver.png';
        silverCharm.alt = 'Silver Charm';
        silverCharm.setAttribute('data-name', 'silver');
        silverCharm.setAttribute('data-price', '0');
        silverCharm.setAttribute('data-type', 'base');
        silverCharm.draggable = false;
        emptySlot.appendChild(silverCharm);
        charmCount += 1;
        updatePrice();
      }
    }
  });

  removeSlotBtn.addEventListener('click', () => {
    const filledSlot = Array.from(braceletSlots).reverse().find(slot => slot.innerHTML);
    if (filledSlot) {
      const price = parseFloat(filledSlot.firstChild?.getAttribute('data-price')) || 0;
      filledSlot.innerHTML = '';
      charmCount -= 1;
      totalPrice -= price;
      updatePrice();
    }
  });

  saveBtn.addEventListener('click', () => {
    alert(`Your bracelet has been saved! Total price: ${totalPrice.toFixed(2)} JDs`);
  });

  // Drag and Drop
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
      slot.classList.remove('dragover');
      const charmHTML = e.dataTransfer.getData('text/html');
      if (!slot.innerHTML && charmHTML) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = charmHTML;
        const charm = tempDiv.firstChild;
        updateBracelet(charm, slot);
      }
    });
  });

  document.querySelectorAll('#charm-pool img, #rare-charm-pool img').forEach((charm) => {
    charm.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/html', charm.outerHTML);
    });
  });

  updatePrice();
});
