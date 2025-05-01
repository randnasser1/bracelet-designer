// Get references to HTML elements
const bracelet = document.getElementById('bracelet');
const priceDisplay = document.getElementById('priceDisplay');
const countDisplay = document.getElementById('countDisplay');
const goldToggle = document.getElementById('goldToggle');
const saveBtn = document.getElementById('saveBtn');
const addSlotBtn = document.getElementById('addSlotBtn');
const removeSlotBtn = document.getElementById('removeSlotBtn');
const charmPool = document.querySelector('.charm-pool');
const rareCharmPool = document.querySelector('.rare-charm-pool');

// Base prices
const basePrice = 8.00;  // Silver bracelet
const goldPrice = 9.00;  // Gold bracelet
const additionalPlainCharmPrice = 0.4;
const specialCharmPrice = 1.5;
const rareCharmPrice = 2.00; // Rare charm additional price

// Charm storage
let braceletSlots = [];
let currentPrice = basePrice;
let charmCount = 0;

// Define paths for charms
const baseCharmPath = goldToggle.checked ? 'basecharms/gold.png' : 'basecharms/silver.png'; // Update base path based on gold toggle
const rareCharmPath = 'rares/';  // Path to rare charms folder

// Function to update price and slot count
function updatePrice() {
  priceDisplay.textContent = `Total: ${currentPrice.toFixed(2)} JDs`;
  countDisplay.textContent = `${charmCount} / 18 charms`;
}

// Function to add a base charm to a slot
function addBaseCharmSlot() {
  const slot = document.createElement('div');
  slot.classList.add('slot');
  const img = document.createElement('img');
  img.src = baseCharmPath;  // Use the correct path here
  img.alt = "Base Charm";
  slot.appendChild(img);
  bracelet.appendChild(slot);
  braceletSlots.push('base');  // Mark slot as a base charm
  charmCount++;
  currentPrice += basePrice;
  updatePrice();
}

// Function to add a rare charm to a slot
function addRareCharmSlot(charmFile) {
  const slot = document.createElement('div');
  slot.classList.add('slot');
  const img = document.createElement('img');
  img.src = rareCharmPath + charmFile;  // Combine path and charm file
  img.alt = "Rare Charm";
  slot.appendChild(img);
  bracelet.appendChild(slot);
  braceletSlots.push('rare');  // Mark slot as a rare charm
  charmCount++;
  currentPrice += rareCharmPrice;
  updatePrice();
}

// Function to remove a slot (either base or rare)
function removeSlot() {
  if (braceletSlots.length > 0) {
    const lastSlot = braceletSlots.pop();
    const lastSlotElement = bracelet.lastElementChild;
    if (lastSlot === 'base') {
      currentPrice -= basePrice;
    } else if (lastSlot === 'rare') {
      currentPrice -= rareCharmPrice;
    }
    bracelet.removeChild(lastSlotElement);
    charmCount--;
    updatePrice();
  }
}

// Fill the bracelet with base charms (18 slots)
function fillBraceletWithBaseCharms() {
  for (let i = 0; i < 18; i++) {
    addBaseCharmSlot();
  }
}

// Handle gold toggle change
goldToggle.addEventListener('change', () => {
  const isGold = goldToggle.checked;
  const newBaseCharmPath = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
  const baseSlots = braceletSlots.filter(slot => slot === 'base');

  // Clear the bracelet and re-add base charms with updated price
  bracelet.innerHTML = '';
  braceletSlots = [];
  charmCount = 0;
  currentPrice = isGold ? goldPrice : basePrice;

  // Re-add base charms (with updated gold or silver base)
  for (let i = 0; i < baseSlots.length; i++) {
    addBaseCharmSlot();
  }

  updatePrice();
});

// Add event listener for the Add Slot button
addSlotBtn.addEventListener('click', () => {
  addBaseCharmSlot();  // Add a base charm when a new slot is added
});

// Add event listener for the Remove Slot button
removeSlotBtn.addEventListener('click', () => {
  removeSlot();  // Remove the last charm added
});

// Add event listener for saving the bracelet
saveBtn.addEventListener('click', () => {
  // Add saving functionality (like storing the design to local storage or backend)
  alert("Bracelet saved!");
});

// Add charms to the gallery (Base Charms and Rare Charms)
function addCharmToPool(charmFile, isRare = false) {
  const img = document.createElement('img');
  img.src = isRare ? rareCharmPath + charmFile : baseCharmPath;
  img.alt = isRare ? "Rare Charm" : "Base Charm";
  img.title = charmFile.split('.')[0];

  img.addEventListener('click', () => {
    if (isRare) {
      addRareCharmSlot(charmFile);
    } else {
      addBaseCharmSlot();
    }
  });

  return img;
}

// Add base and rare charms to the pool
const baseCharmFiles = [
  'ball.png', 'be-mine.png', 'heart.png', 'heart-eye.png', 'chess.png', 'daddys-girl.png', 'drama-queen.png', 
  'c.png', 'juice.png', 'n.png', 'rich-guys.png', 'sexy.png', 'shit-happens.png', 'sports.png', 'star-blue.png', 
  'star.png', 't.png', 'u.png'
];

const rareCharmFiles = [
  'IMG_6035.png', 'IMG_6036.png', 'IMG_6038.png', 'IMG_6040.png', 'IMG_6041.png', 'IMG_6045.png', 
  'IMG_6049.png', 'IMG_6050.png', 'IMG_6052.png', 'IMG_6057.png', 'IMG_6060.png', 'IMG_6061.png'
];

// Populate base charm pool
baseCharmFiles.forEach(charmFile => {
  const img = addCharmToPool(charmFile, false);
  charmPool.appendChild(img);
});

// Populate rare charm pool
rareCharmFiles.forEach(charmFile => {
  const img = addCharmToPool(charmFile, true);
  rareCharmPool.appendChild(img);
});

// Initially fill the bracelet with base charms
fillBraceletWithBaseCharms();
