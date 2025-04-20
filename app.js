document.addEventListener("DOMContentLoaded", () => {
  const braceletEl    = document.getElementById("bracelet");
  const priceDisplay  = document.getElementById("priceDisplay");
  const countDisplay  = document.getElementById("countDisplay");
  const goldToggle    = document.getElementById("goldToggle");
  const addSlotBtn    = document.getElementById("addSlotBtn");
  const removeSlotBtn = document.getElementById("removeSlotBtn");
  const charmPool     = document.querySelectorAll(".charm-pool .charm");

  const BASE_PRICE   = 8;
  const GOLD_EXTRA   = 1;
  const CHARM_PRICE  = { plain: 0.4, special: 1.5, rare: 2 };
  let slots = [];  // each slot: { id: string, charm: { id, type } | null }

  // Create a new slot object
  function newSlot(id) {
    return { id, charm: null };
  }

  // Render all slots in the DOM
  function renderSlots() {
    braceletEl.innerHTML = "";
    slots.forEach(slot => {
      const slotEl = document.createElement("div");
      slotEl.className = "slot";
      slotEl.dataset.slotId = slot.id;

      // Drag & drop events
      slotEl.addEventListener("dragover", e => {
        e.preventDefault();
        slotEl.classList.add("dragover");
      });
      slotEl.addEventListener("dragleave", () => {
        slotEl.classList.remove("dragover");
      });
      slotEl.addEventListener("drop", e => {
        e.preventDefault();
        slotEl.classList.remove("dragover");
        const charmId   = e.dataTransfer.getData("charm-id");
        const charmType = e.dataTransfer.getData("charm-type");
        slot.charm = { id: charmId, type: charmType };

        // show the dropped charm
        slotEl.innerHTML = `<img src="charms/${charmId}.webp" class="charm" draggable="false">`;
        updatePrice();
      });

      // if slot already has a charm (on re-render), show it
      if (slot.charm) {
        slotEl.innerHTML = `<img src="charms/${slot.charm.id}.webp" class="charm" draggable="false">`;
      }

      braceletEl.appendChild(slotEl);
    });
    updatePrice();
  }

  // Calculate and update price & count
  function updatePrice() {
    let total = BASE_PRICE + (goldToggle.checked ? GOLD_EXTRA : 0);
    let placed = 0;

    slots.forEach(slot => {
      if (slot.charm) {
        placed++;
        total += CHARM_PRICE[slot.charm.type] || 0;
      }
    });

    priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
    countDisplay.textContent = `${placed} / ${slots.length} charms`;
  }

  // Initialize dragging from charm pool
  charmPool.forEach(img => {
    img.addEventListener("dragstart", e => {
      e.dataTransfer.setData("charm-id",   img.dataset.id);
      e.dataTransfer.setData("charm-type", img.dataset.type);
    });
  });

  // Gold toggle updates immediately
  goldToggle.addEventListener("change", updatePrice);

  // Add a slot
  addSlotBtn.addEventListener("click", () => {
    slots.push(newSlot(`slot${slots.length + 1}`));
    renderSlots();
  });

  // Remove last slot (and its charm)
  removeSlotBtn.addEventListener("click", () => {
    if (slots.length > 1) {
      slots.pop();
      renderSlots();
    }
  });

  // Start with 18 slots
  for (let i = 1; i <= 18; i++) {
    slots.push(newSlot(`slot${i}`));
  }
  renderSlots();
});
