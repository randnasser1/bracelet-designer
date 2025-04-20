const charms = document.querySelectorAll('.charm');
const bracelet = document.getElementById('bracelet');

// Price and count display elements
const priceDisplay = document.getElementById('priceDisplay');
const countDisplay = document.getElementById('countDisplay');

// Default prices
const braceletBasePrice = 8;
const goldPrice = 1;
const charmPrices = {
  plain: 0.4,
  special: 1.5,
  rare: 2
};

let totalPrice = braceletBasePrice;
let totalCharms = 0;
let isGold = false;

// Initialize with 18 slots
const initialSlots = 18;
for (let i = 0; i < initialSlots; i++) {
  const slot = document.createElement('div');
  slot.classList.add('slot');
  bracelet.appendChild(slot);
  totalCharms++;
}

updatePrice();

// Update price display
function updatePrice() {
  priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
  countDisplay.textContent = `${totalCharms} / 18 charms`;
}

// Toggle gold bracelet
document.getElementById('goldToggle').addEventListener('change', (e) => {
  isGold = e.target.checked;
  totalPrice = braceletBasePrice + (isGold ? goldPrice : 0);
  updatePrice();
});

// Add and remove charm slots
document.getElementById('addSlotBtn').addEventListener('click', () => {
  if (totalCharms < 20) { // Allow adding up to 20 charms (or more if you adjust this limit)
    const slot = document.createElement('div');
    slot.classList.add('slot');
    bracelet.appendChild(slot);
    totalCharms++;
    updatePrice();
  }
});

document.getElementById('removeSlotBtn').addEventListener('click', () => {
  if (totalCharms > initialSlots) {
    bracelet.removeChild(bracelet.lastChild);
    totalCharms--;
    updatePrice();
  }
});

// Handle drag events for charms
charms.forEach(charm => {
  charm.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.dataset.id);
    e.target.classList.add('dragging');
  });

  charm.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });
});

// Handle drop events in bracelet slots
bracelet.addEventListener('dragover', (e) => {
  e.preventDefault();
  const draggingCharm = document.querySelector('.charm.dragging');
  if (draggingCharm) {
    e.target.classList.add('dragover');
  }
});

bracelet.addEventListener('dragleave', () => {
  bracelet.classList.remove('dragover');
});

bracelet.addEventListener('drop', (e) => {
  const charmId = e.dataTransfer.getData('text');
  const charm = document.querySelector(`.charm[data-id="${charmId}"]`);
  const slot = e.target;
  if (charm && slot.classList.contains('slot')) {
    const newImg = document.createElement('img');
    newImg.src = charm.src;
    newImg.alt = charm.alt;
    newImg.classList.add('charm-image');
    slot.innerHTML = '';
    slot.appendChild(newImg);
  }
  bracelet.classList.remove('dragover');
});
