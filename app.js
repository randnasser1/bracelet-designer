// Setup the bracelet with 18 slots initially
const bracelet = document.getElementById('bracelet');
for (let i = 0; i < 18; i++) {
  const slot = document.createElement('div');
  slot.className = 'slot';
  bracelet.appendChild(slot);
}

// Handle clicking on charms
const charms = document.querySelectorAll('.charm');
charms.forEach(charm => {
  charm.addEventListener('click', () => {
    const slots = document.querySelectorAll('.slot');
    for (const slot of slots) {
      if (!slot.querySelector('img')) {
        const img = document.createElement('img');
        img.src = charm.src;
        img.alt = charm.title;
        slot.appendChild(img);
        updatePrice();
        updateCount();
        break;
      }
    }
  });
});

// Handle clicking on a slot with a charm to remove it
bracelet.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG' && e.target.parentElement.classList.contains('slot')) {
    e.target.remove();
    updatePrice();
    updateCount();
  }
});

// Update price
function updatePrice() {
  const filledSlots = document.querySelectorAll('.slot img').length;
  const goldSelected = document.getElementById('goldToggle').checked;
  const basePrice = goldSelected ? 9 : 8;
  const extraCharms = Math.max(0, filledSlots - 18);
  const extraPrice = extraCharms * 0.4;
  const total = basePrice + extraPrice;
  document.getElementById('priceDisplay').textContent = `Total: ${total.toFixed(2)} JDs`;
}

// Update charm count
function updateCount() {
  const filledSlots = document.querySelectorAll('.slot img').length;
  document.getElementById('countDisplay').textContent = `${filledSlots} / 18 charms`;
}

// Add a new slot
document.getElementById('addSlotBtn').addEventListener('click', () => {
  const slot = document.createElement('div');
  slot.className = 'slot';
  bracelet.appendChild(slot);
});

// Remove the last slot
document.getElementById('removeSlotBtn').addEventListener('click', () => {
  const slots = bracelet.querySelectorAll('.slot');
  if (slots.length > 0) {
    const lastSlot = slots[slots.length - 1];
    lastSlot.remove();
    updatePrice();
    updateCount();
  }
});

// Update price when gold toggle changes
document.getElementById('goldToggle').addEventListener('change', () => {
  updatePrice();
});

// Save bracelet layout (optional)
document.getElementById('saveBtn').addEventListener('click', () => {
  const layout = [];
  document.querySelectorAll('.slot').forEach(slot => {
    const img = slot.querySelector('img');
    if (img) {
      layout.push(img.getAttribute('data-id') || img.alt || '');
    } else {
      layout.push('');
    }
  });
  console.log('Saved bracelet:', layout);
  alert('Bracelet saved! (Check console for layout)');
});
