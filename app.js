const bracelet = document.getElementById("bracelet");
const goldToggle = document.getElementById("goldToggle");
const priceDisplay = document.getElementById("priceDisplay");
const countDisplay = document.getElementById("countDisplay");
const addSlotBtn = document.getElementById("addSlotBtn");
const removeSlotBtn = document.getElementById("removeSlotBtn");
const saveBtn = document.getElementById("saveBtn");

const MAX_INITIAL_SLOTS = 18;
let basePrice = 8.0;

function createSlot() {
  const slot = document.createElement("div");
  slot.className = "slot";
  return slot;
}

// Create initial 18 slots
for (let i = 0; i < MAX_INITIAL_SLOTS; i++) {
  bracelet.appendChild(createSlot());
}

// Enable Sortable
Sortable.create(bracelet, {
  animation: 150,
  group: {
    name: 'shared',
    pull: true,
    put: true
  },
  onAdd: updatePrice,
  onRemove: updatePrice,
  onUpdate: updatePrice
});

Sortable.create(document.querySelector(".charm-pool"), {
  group: {
    name: 'shared',
    pull: 'clone',
    put: false
  },
  sort: false
});

function updatePrice() {
  const charms = bracelet.querySelectorAll("img");
  let plain = 0, special = 0, rare = 0;

  charms.forEach(img => {
    const type = img.dataset.type;
    if (type === "plain") plain++;
    else if (type === "special") special++;
    else if (type === "rare") rare++;
  });

  const extraPlain = Math.max(plain - 15, 0);
  const extraSpecial = Math.max(special - 3, 0);

  let total = goldToggle.checked ? 9 : basePrice;
  total += extraPlain * 0.4 + extraSpecial * 1.5 + rare * 2;

  priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
  countDisplay.textContent = `${charms.length} / ${MAX_INITIAL_SLOTS} charms`;
}

goldToggle.addEventListener("change", updatePrice);

addSlotBtn.addEventListener("click", () => {
  bracelet.appendChild(createSlot());
});

removeSlotBtn.addEventListener("click", () => {
  const lastSlot = bracelet.lastElementChild;
  if (lastSlot && lastSlot.classList.contains("slot")) {
    bracelet.removeChild(lastSlot);
    updatePrice();
  }
});

saveBtn.addEventListener("click", () => {
  const charms = bracelet.querySelectorAll("img");
  const layout = Array.from(charms).map(img => img.dataset.id);
  alert("Saved layout:\n" + layout.join(", "));
});

updatePrice();
