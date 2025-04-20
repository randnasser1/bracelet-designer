let bracelet = document.getElementById('bracelet');
let goldToggle = document.getElementById('goldToggle');
let priceDisplay = document.getElementById('priceDisplay');
let countDisplay = document.getElementById('countDisplay');
let addSlotBtn = document.getElementById('addSlotBtn');
let removeSlotBtn = document.getElementById('removeSlotBtn');

const BASE_PLAIN = 15;
const BASE_SPECIAL = 3;
let slots = [];
let maxBaseSlots = 18;

function createSlot() {
  const slot = document.createElement('div');
  slot.classList.add('slot');
  slot.dataset.id = '';
  slot.dataset.type = '';
  slot.addEventListener('dragover', (e) => {
    e.preventDefault();
    slot.classList.add('dragover');
  });
  slot.addEventListener('dragleave', () => {
    slot.classList.remove('dragover');
  });
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const type = e.dataTransfer.getData('type');
    slot.innerHTML = `<img src="charms/${id}.webp" class="charm" draggable="false">`;
    slot.dataset.id = id;
    slot.dataset.type = type;
    slot.classList.remove('dragover');
    updatePrice();
  });
  return slot;
}

function initBracelet() {
  bracelet.innerHTML = '';
  slots = [];
  for (let i = 0; i < maxBaseSlots; i++) {
    let slot = createSlot();
    bracelet.appendChild(slot);
    slots.push(slot);
  }
  updatePrice();
}

function updatePrice() {
  let total = goldToggle.checked ? 9 : 8;
  let plain = 0, special = 0, rare = 0;

  slots.forEach((slot) => {
    if (slot.dataset.type === 'plain') plain++;
    else if (slot.dataset.type === 'special') special++;
    else if (slot.dataset.type === 'rare') rare++;
  });

  const extraPlain = Math.max(0, plain - BASE_PLAIN);
  const extraSpecial = Math.max(0, special - BASE_SPECIAL);
  total += extraPlain * 0.4 + extraSpecial * 1.5 + rare * 2;

  priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
  countDisplay.textContent = `${slots.filter(s => s.dataset.id).length} / ${slots.length} charms`;
}

document.querySelectorAll('.charm').forEach(charm => {
  charm.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('id', charm.dataset.id);
    e.dataTransfer.setData('type', charm.dataset.type);
  });
});

goldToggle.addEventListener('change', updatePrice);

addSlotBtn.addEventListener('click', () => {
  const newSlot = createSlot();
  bracelet.appendChild(newSlot);
  slots.push(newSlot);
  updatePrice();
});

removeSlotBtn.addEventListener('click', () => {
  if (slots.length > 1) {
    const slot = slots.pop();
    bracelet.removeChild(slot);
    updatePrice();
  }
});

initBracelet();
