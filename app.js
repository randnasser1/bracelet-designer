const baseCharmFolder = 'basecharms/';
const normalCharmFolder = 'normalcharms/';
const rareCharmFolder = 'rares/';
let goldBracelet = false;
let totalPrice = 8.00; // Starting price with a basic bracelet

// Base Charms: Silver and Gold (Free)
const baseCharms = [
  { name: 'Silver Base Charm', file: 'silver.png', price: 0 },
  { name: 'Gold Base Charm', file: 'gold.png', price: 0 },
];

// Normal Charms (+1.5 JDs)
const normalCharms = [
  { name: 'Normal Charm 1', file: 'IMG_5957.png', price: 1.5 },
  { name: 'Normal Charm 2', file: 'IMG_5958.png', price: 1.5 },
  { name: 'Normal Charm 3', file: 'IMG_5959.png', price: 1.5 },
  { name: 'Normal Charm 4', file: 'IMG_5960.png', price: 1.5 },
  { name: 'Normal Charm 5', file: 'IMG_5961.png', price: 1.5 },
  { name: 'Normal Charm 6', file: 'IMG_5962.png', price: 1.5 },
  { name: 'Normal Charm 7', file: 'IMG_5963.png', price: 1.5 },
  { name: 'Normal Charm 8', file: 'IMG_5964.png', price: 1.5 },
  { name: 'Normal Charm 9', file: 'IMG_5965.png', price: 1.5 },
  { name: 'Normal Charm 10', file: 'IMG_5968.png', price: 1.5 },
  { name: 'Normal Charm 11', file: 'IMG_5969.png', price: 1.5 },
  { name: 'Normal Charm 12', file: 'IMG_5970.png', price: 1.5 },
  { name: 'Normal Charm 13', file: 'IMG_5971.png', price: 1.5 },
  { name: 'Normal Charm 14', file: 'IMG_5983.png', price: 1.5 },
  { name: 'Normal Charm 15', file: 'IMG_5992.png', price: 1.5 },
  { name: 'Normal Charm 16', file: 'IMG_5999.png', price: 1.5 },
  { name: 'Normal Charm 17', file: 'IMG_6001.png', price: 1.5 },
  { name: 'Normal Charm 18', file: 'IMG_6005.png', price: 1.5 },
  { name: 'Normal Charm 19', file: 'IMG_6009.png', price: 1.5 },
  { name: 'Normal Charm 20', file: 'IMG_6010.png', price: 1.5 },
  { name: 'Normal Charm 21', file: 'IMG_6011.png', price: 1.5 },
  { name: 'Normal Charm 22', file: 'IMG_6012.png', price: 1.5 },
  { name: 'Normal Charm 23', file: 'IMG_6013.png', price: 1.5 },
  { name: 'Normal Charm 24', file: 'IMG_6014.png', price: 1.5 },
  { name: 'Normal Charm 25', file: 'IMG_6016.png', price: 1.5 },
  { name: 'Normal Charm 26', file: 'IMG_6018.png', price: 1.5 },
  { name: 'Normal Charm 27', file: 'IMG_6019.png', price: 1.5 },
  { name: 'Normal Charm 28', file: 'IMG_6020.png', price: 1.5 },
  { name: 'Normal Charm 29', file: 'IMG_6021.png', price: 1.5 },
  { name: 'Normal Charm 30', file: 'IMG_6023.png', price: 1.5 },
  { name: 'Normal Charm 31', file: 'IMG_6024.png', price: 1.5 },
  { name: 'Normal Charm 32', file: 'IMG_6025.png', price: 1.5 },
  { name: 'Normal Charm 33', file: 'IMG_6028.png', price: 1.5 },
  { name: 'Normal Charm 34', file: 'IMG_6030.png', price: 1.5 },
  { name: 'Normal Charm 35', file: 'IMG_6031.png', price: 1.5 },
  { name: 'Normal Charm 36', file: 'IMG_6032.png', price: 1.5 },
];

// Rare Charms (+2 JDs)
const rareCharms = [
  { name: 'Rare Charm 1', file: 'IMG_6035.png', price: 2.00 },
  { name: 'Rare Charm 2', file: 'IMG_6036.png', price: 2.00 },
  { name: 'Rare Charm 3', file: 'IMG_6038.png', price: 2.00 },
  { name: 'Rare Charm 4', file: 'IMG_6040.png', price: 2.00 },
  { name: 'Rare Charm 5', file: 'IMG_6041.png', price: 2.00 },
  { name: 'Rare Charm 6', file: 'IMG_6045.png', price: 2.00 },
  { name: 'Rare Charm 7', file: 'IMG_6049.png', price: 2.00 },
  { name: 'Rare Charm 8', file: 'IMG_6050.png', price: 2.00 },
  { name: 'Rare Charm 9', file: 'IMG_6052.png', price: 2.00 },
  { name: 'Rare Charm 10', file: 'IMG_6057.png', price: 2.00 },
  { name: 'Rare Charm 11', file: 'IMG_6060.png', price: 2.00 },
  { name: 'Rare Charm 12', file: 'IMG_6061.png', price: 2.00 },
];

// Initialize the bracelet with base charms (silver unless gold is checked)
function initBracelet() {
  const braceletContainer = document.getElementById('bracelet');
  // Initially add 2 base charms (Silver and Gold)
  baseCharms.forEach(charm => {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    const baseCharm = document.createElement('img');
    baseCharm.src = `${baseCharmFolder}${charm.file}`;
    baseCharm.alt = charm.name;
    baseCharm.setAttribute('data-type', 'base');
    baseCharm.setAttribute('data-name', charm.name);
    slot.appendChild(baseCharm);
    braceletContainer.appendChild(slot);
  });
}

// Update the price based on selected charms
function updatePrice() {
  const priceDisplay = document.getElementById('priceDisplay');
  priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
}

// Update the charm galleries
function updateCharmGallery() {
  const charmPool = document.getElementById('charmPool');
  charmPool.innerHTML = ''; // Clear current gallery
  
  // Adding normal charms (+1.5 JDs)
  normalCharms.forEach((charm) => {
    const charmImg = document.createElement('img');
    charmImg.src = `${normalCharmFolder}${charm.file}`;
    charmImg.alt = charm.name;
    charmImg.title = charm.name;
    charmImg.setAttribute('data-name', charm.name);
    charmImg.setAttribute('data-price', charm.price);
    charmImg.classList.add('charm');
    charmImg.addEventListener('click', () => addCharmToBracelet(charm));
    charmPool.appendChild(charmImg);
  });

  const rareCharmPool = document.getElementById('rareCharmPool');
  rareCharmPool.innerHTML = ''; // Clear current rare gallery

  // Adding rare charms (+2 JDs)
  rareCharms.forEach((charm) => {
    const charmImg = document.createElement('img');
    charmImg.src = `${rareCharmFolder}${charm.file}`;
    charmImg.alt = charm.name;
    charmImg.title = charm.name;
    charmImg.setAttribute('data-name', charm.name);
    charmImg.setAttribute('data-price', charm.price);
    charmImg.classList.add('charm');
    charmImg.addEventListener('click', () => addCharmToBracelet(charm, true));
    rareCharmPool.appendChild(charmImg);
  });
}

// Add charm to the bracelet
function addCharmToBracelet(charm, isRare = false) {
  const braceletContainer = document.getElementById('bracelet');
  const slots = braceletContainer.getElementsByClassName('slot');
  const emptySlot = Array.from(slots).find(slot => !slot.hasChildNodes());

  if (emptySlot) {
    const charmImg = document.createElement('img');
    charmImg.src = `${isRare ? rareCharmFolder : normalCharmFolder}${charm.file}`;
    charmImg.alt = charm.name;
    charmImg.title = charm.name;
    charmImg.setAttribute('data-name', charm.name);
    totalPrice += charm.price; // Add the price of the selected charm
    updatePrice();
    emptySlot.appendChild(charmImg);
  }
}

// Initial call to set up everything
initBracelet();
updateCharmGallery();
