// Select the charm container, bracelet container, and checkbox for gold
const charmContainer = document.querySelector('.charm-pool');
const rareCharmContainer = document.querySelector('.rare-charm-pool');
const braceletContainer = document.getElementById('bracelet');
const goldToggle = document.getElementById('goldToggle');

// List of charm images (regular charms from your folder)
const charmImages = [
    'IMG_5957.png', 'IMG_5958.png', 'IMG_5959.png', 'IMG_5960.png',
    'IMG_5961.png', 'IMG_5962.png', 'IMG_5963.png', 'IMG_5964.png',
    'IMG_5965.png', 'IMG_5968.png', 'IMG_5969.png', 'IMG_5970.png',
    'IMG_5971.png', 'IMG_5983.png', 'IMG_5992.png', 'IMG_5999.png',
    'IMG_6001.png', 'IMG_6005.png', 'IMG_6009.png', 'IMG_6010.png',
    'IMG_6011.png', 'IMG_6012.png', 'IMG_6013.png', 'IMG_6014.png',
    'IMG_6016.png', 'IMG_6018.png', 'IMG_6019.png', 'IMG_6020.png',
    'IMG_6021.png', 'IMG_6023.png', 'IMG_6024.png', 'IMG_6025.png',
    'IMG_6028.png', 'IMG_6030.png', 'IMG_6031.png', 'IMG_6032.png'
];

// List of rare charms
const rareCharmImages = [
    'IMG_6035.png', 'IMG_6036.png', 'IMG_6038.png', 'IMG_6040.png',
    'IMG_6041.png', 'IMG_6045.png', 'IMG_6049.png', 'IMG_6050.png',
    'IMG_6052.png', 'IMG_6057.png', 'IMG_6060.png', 'IMG_6061.png'
];

// Set base charm based on the gold toggle
function getBaseCharm() {
    return goldToggle.checked ? 'gold.png' : 'silver.png';
}

// Function to create and append charms to the charm container
function loadCharms() {
    charmImages.forEach(image => {
        const charm = document.createElement('img');
        charm.src = `charms/${image}`;
        charm.alt = image.split('.')[0];
        charm.classList.add('charm');
        
        // Add click event to each charm to add it to the bracelet
        charm.addEventListener('click', function () {
            const braceletCharm = charm.cloneNode();
            braceletCharm.classList.add('bracelet-charm');
            braceletContainer.appendChild(braceletCharm);
            updatePricing();
        });

        charmContainer.appendChild(charm);
    });
}

// Function to create and append rare charms to the rare charm container
function loadRareCharms() {
    rareCharmImages.forEach(image => {
        const charm = document.createElement('img');
        charm.src = `rares/${image}`;
        charm.alt = image.split('.')[0];
        charm.classList.add('charm');
        
        // Add click event to each rare charm to add it to the bracelet
        charm.addEventListener('click', function () {
            const braceletCharm = charm.cloneNode();
            braceletCharm.classList.add('bracelet-charm');
            braceletCharm.dataset.rare = 'true'; // Mark this as a rare charm
            braceletContainer.appendChild(braceletCharm);
            updatePricing();
        });

        rareCharmContainer.appendChild(charm);
    });
}

// Function to add base charm slots to the bracelet
function addBaseCharmSlot() {
    const baseCharm = getBaseCharm();
    const slot = document.createElement('div');
    slot.classList.add('slot');
    const img = document.createElement('img');
    img.src = `basecharms/${baseCharm}`;
    slot.appendChild(img);
    braceletContainer.appendChild(slot);
    updatePricing();
}

// Add the initial base charms to the bracelet (18 slots)
function fillBraceletWithBaseCharms() {
    for (let i = 0; i < 18; i++) {
        addBaseCharmSlot();
    }
}

// Event listener for adding a new charm slot
document.getElementById('addSlotBtn').addEventListener('click', function () {
    addBaseCharmSlot();
});

// Event listener for removing a charm slot (if needed)
document.getElementById('removeSlotBtn').addEventListener('click', function () {
    if (braceletContainer.children.length > 0) {
        braceletContainer.removeChild(braceletContainer.lastElementChild);
    }
    updatePricing();
});

// Function to update pricing info based on the bracelet's contents
function updatePricing() {
    const charmCount = braceletContainer.children.length;
    let price = 8; // Start with the base price
    let rareCount = 0;

    // Calculate the price based on the charms and rare ones
    for (let slot of braceletContainer.children) {
        if (slot.classList.contains('bracelet-charm') && slot.dataset.rare === 'true') {
            rareCount++;
            price += 2; // +2 JDs for each rare charm
        }
    }

    price += (charmCount - 18) * 0.4; // 0.4 JDs for each additional charm
    document.getElementById('priceDisplay').innerText = `Total: ${price.toFixed(2)} JDs`;
    document.getElementById('countDisplay').innerText = `${charmCount} / 18 charms`;
}

// Initial load of charms and base charms
loadCharms();
loadRareCharms();
fillBraceletWithBaseCharms();
