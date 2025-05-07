
    document.addEventListener('DOMContentLoaded', () => {
      const priceDisplay = document.getElementById('priceDisplay');
      const countDisplay = document.getElementById('countDisplay');
      const bracelet = document.getElementById('bracelet');
      const charmPool = document.getElementById('charmPool');
      const goldToggle = document.getElementById('gold-toggle');
      const addSlotBtn = document.getElementById('add-slot-btn');
      const removeSlotBtn = document.getElementById('remove-slot-btn');
      const saveBtn = document.getElementById('save-btn');

      let basePrice = 8.00;
      let charmCount = 0;
      let totalPrice = basePrice;
      let lastClickedCharm = null;

      // Create the 18 base charms slots dynamically
      for (let i = 0; i < 18; i++) {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.dataset.base = 'true';
        const img = document.createElement('img');
        img.src = 'basecharms/silver.png';
        img.alt = 'Silver Charm';
        img.setAttribute('data-name', 'silver');
        img.setAttribute('data-price', '0');
        img.setAttribute('data-type', 'base');
        img.draggable = false;
        slot.appendChild(img);
        bracelet.appendChild(slot);
      }

      // Update the price display
      const updatePrice = () => {
        priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
        countDisplay.textContent = `${charmCount} / 18 charms`;
      };

      // Update the bracelet with a charm
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

      // Toggle gold charms
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

      charmPool.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
          lastClickedCharm = e.target;
        }
      });

      // Add charm slot
      addSlotBtn.addEventListener('click', () => {
        const emptySlot = Array.from(document.querySelectorAll('.slot')).find(slot => !slot.innerHTML);
        if (emptySlot && charmCount < 18) {
          const isGold = goldToggle.checked;
          const baseCharm = document.createElement('img');
          baseCharm.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
          baseCharm.setAttribute('data-price', basePrice);
          baseCharm.setAttribute('data-type', 'base');
          baseCharm.setAttribute('data-name', isGold ? 'gold' : 'silver');
          emptySlot.appendChild(baseCharm);
          charmCount++;
          totalPrice += basePrice;
          updatePrice();
        }
      });

      // Remove charm slot
      removeSlotBtn.addEventListener('click', () => {
        const filledSlot = Array.from(document.querySelectorAll('.slot')).find(slot => slot.innerHTML);
        if (filledSlot) {
          const removedCharm = filledSlot.querySelector('img');
          totalPrice -= parseFloat(removedCharm.getAttribute('data-price'));
          charmCount--;
          filledSlot.innerHTML = '';
          updatePrice();
        }
      });

      // Save bracelet (optional)
      saveBtn.addEventListener('click', () => {
        alert('Bracelet saved!');
      });
    });
