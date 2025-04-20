document.addEventListener("DOMContentLoaded", function () {
  const bracelet = document.getElementById("bracelet");
  const charmPool = document.querySelector(".charm-pool");
  const priceDisplay = document.getElementById("priceDisplay");
  const countDisplay = document.getElementById("countDisplay");
  const goldToggle = document.getElementById("goldToggle");

  const charmPrices = {
    plain: 0.4,
    special: 1.5,
    rare: 2
  };

  let charmCount = 0;
  let totalPrice = 8;

  // Set initial bracelet slots
  function createBraceletSlots() {
    for (let i = 0; i < 18; i++) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      bracelet.appendChild(slot);
    }
  }

  // Update the price display
  function updatePrice() {
    priceDisplay.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
    countDisplay.textContent = `${charmCount} / 18 charms`;
  }

  // Add charm to the bracelet
  function addCharmToBracelet(charmElement) {
    const charmId = charmElement.dataset.id;
    const charmType = charmElement.dataset.type;

    if (charmCount < 18) {
      const slot = bracelet.children[charmCount];
      const charmImage = document.createElement("img");
      charmImage.src = charmElement.src;
      charmImage.alt = charmId;
      charmImage.title = charmId;
      charmImage.classList.add("charm");
      slot.appendChild(charmImage);

      charmCount++;
      totalPrice += charmPrices[charmType];
      updatePrice();
    }
  }

  // Handle charm click
  charmPool.addEventListener("click", function (event) {
    if (event.target.classList.contains("charm")) {
      addCharmToBracelet(event.target);
    }
  });

  // Handle add/remove slot buttons
  document.getElementById("addSlotBtn").addEventListener("click", function () {
    if (charmCount < 18) {
      const slot = document.createElement("div");
      slot.classList.add("slot");
      bracelet.appendChild(slot);
      charmCount++;
    }
  });

  document.getElementById("removeSlotBtn").addEventListener("click", function () {
    if (charmCount > 0) {
      const lastSlot = bracelet.children[charmCount - 1];
      lastSlot.innerHTML = '';
      charmCount--;
    }
  });

  // Gold toggle
  goldToggle.addEventListener("change", function () {
    totalPrice = goldToggle.checked ? 9 : 8;
    updatePrice();
  });

  // Initialize
  createBraceletSlots();
  updatePrice();
});
