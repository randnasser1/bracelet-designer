document.addEventListener("DOMContentLoaded", function () {
  const bracelet = document.getElementById("bracelet");
  const charmPool = document.querySelector(".charm-pool");
  const priceDisplay = document.getElementById("priceDisplay");
  const countDisplay = document.getElementById("countDisplay");
  const goldToggle = document.getElementById("goldToggle");

  const basePrice = 8; // base price of bracelet
  const goldPrice = 1; // additional price for gold
  const charmPrices = {
    plain: 0.4,
    special: 1.5,
    rare: 2
  };

  let slots = Array.from({ length: 18 }, (_, index) => ({ id: `slot${index + 1}`, charm: null }));

  function updatePrice() {
    let totalPrice = basePrice + (goldToggle.checked ? goldPrice : 0);
    let charmCount = 0;
    slots.forEach(slot => {
      if (slot.charm) {
        charmCount++;
        totalPrice += charmPrices[slot.charm.type];
      }
    });
    priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
    countDisplay.textContent = `${charmCount} / 18 charms`;
  }

  // Set up the bracelet slots
  function setUpSlots() {
    bracelet.innerHTML = '';
    slots.forEach((slot, index) => {
      const slotElement = document.createElement("div");
      slotElement.classList.add("slot");
      slotElement.setAttribute("data-id", slot.id);
      slotElement.addEventListener("dragover", (e) => e.preventDefault());
      slotElement.addEventListener("drop", handleDrop);
      bracelet.appendChild(slotElement);
    });
  }

  // Handle charm drop into a slot
  function handleDrop(e) {
    const slotId = e.target.getAttribute("data-id");
    const slot = slots.find(s => s.id === slotId);
    const charmId = e.dataTransfer.getData("text/plain");
    const charm = document.querySelector(`[data-id='${charmId}']`);

    if (slot && charm) {
      const charmType = charm.dataset.type;
      slot.charm = { id: charmId, type: charmType };

      e.target.style.backgroundImage = `url(${charm.src})`;
      e.target.style.backgroundSize = "cover";
      e.target.style.backgroundPosition = "center";
      updatePrice();
    }
  }

  // Handle dragging
  charmPool.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text/plain", e.target.getAttribute("data-id"));
  });

  // Handle gold toggle
  goldToggle.addEventListener("change", updatePrice);

  // Initialize
  setUpSlots();
});
