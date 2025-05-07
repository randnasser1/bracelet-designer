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

  let basePrice = 8.00;
  let charmCount = 0;
  let totalPrice = basePrice;
  let lastClickedCharm = null;

  // Initialize from existing charms
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
      img.draggable = false;
      targetSlot.appendChild(img);
      charmCount += 1;
      totalPrice += parseFloat(img.getAttribute('data-price')) || 0;
      updatePrice();
    }
  };

  const toggleGold = (isGold) => {
    document.querySelectorAll('.slot img').forEach(img => {
      if (img.getAttribute('data-name') === 'silver') {
        img.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
      }
    });
  };

  goldToggle.addEventListener('change', (e) => {
    const isGold = e.target.checked;
    basePrice = isGold ? 9.00 : 8.00;
    toggleGold(isGold);
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
      lastClickedCharm = e.target;
    }
  });

  rareCharmPool.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      lastClickedCharm = e.target;
    }
  });

  braceletSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      if (!slot.innerHTML && lastClickedCharm) {
        updateBracelet(lastClickedCharm, slot);
      }
    });

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

  document.querySelectorAll('#charm-pool img, #rare-charm-pool img').forEach(charm => {
    charm.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/html', charm.outerHTML);
    });
  });

  addSlotBtn.addEventListener('click', () => {
    const emptySlot = Array.from(braceletSlots).find(slot => !slot.innerHTML);
    if (emptySlot && charmCount < 18) {
      const isGold = goldToggle.checked;
      const baseCharm = document.createElement('img');
      baseCharm.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
      baseCharm.alt = isGold ? 'Gold Charm' : 'Silver Charm';
      baseCharm.setAttribute('data-name', 'silver');
      baseCharm.setAttribute('data-price', '0');
      baseCharm.setAttribute('data-type', 'base');
      baseCharm.draggable = false;
      emptySlot.appendChild(baseCharm);
      charmCount += 1;
      updatePrice();
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

  updatePrice();
});
