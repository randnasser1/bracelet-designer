<script>
  const bracelet = document.getElementById("bracelet");
  const priceDisplay = document.getElementById("priceDisplay");
  const countDisplay = document.getElementById("countDisplay");
  const goldToggle = document.getElementById("goldToggle");

  const BASE_SILVER = { src: "basecharms/silver.png", name: "silver", price: 0, type: "base" };
  const BASE_GOLD = { src: "basecharms/gold.png", name: "gold", price: 1, type: "base" };
  const BRACELET_BASE_PRICE = { silver: 8.0, gold: 9.0 };
  const MAX_SLOTS = 18;

  function getCharmData(img) {
    return {
      src: img.src,
      name: img.dataset.name,
      price: parseFloat(img.dataset.price),
      type: img.dataset.type,
    };
  }

  function updatePriceAndCount() {
    let total = goldToggle.checked ? BRACELET_BASE_PRICE.gold : BRACELET_BASE_PRICE.silver;
    let count = 0;

    document.querySelectorAll("#bracelet .slot img").forEach((img) => {
      const type = img.dataset.type;
      if (type === "plain" || type === "special" || type === "rare") {
        total += parseFloat(img.dataset.price);
        count++;
      }
    });

    priceDisplay.textContent = `Total: ${total.toFixed(2)} JDs`;
    countDisplay.textContent = `${count} / ${MAX_SLOTS} charms`;
  }

  function addSlot() {
    const currentSlots = bracelet.querySelectorAll(".slot").length;
    if (currentSlots < MAX_SLOTS) {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.base = "true";
      const base = goldToggle.checked ? BASE_GOLD : BASE_SILVER;
      slot.innerHTML = `<img src="${base.src}" alt="${base.name}" data-name="${base.name}" data-price="${base.price}" data-type="base">`;
      bracelet.appendChild(slot);
      updatePriceAndCount();
    }
  }

  function removeSlot() {
    const slots = bracelet.querySelectorAll(".slot");
    if (slots.length > 0) {
      slots[slots.length - 1].remove();
      updatePriceAndCount();
    }
  }

  function applyGoldToggle() {
    const base = goldToggle.checked ? BASE_GOLD : BASE_SILVER;
    bracelet.querySelectorAll(".slot").forEach((slot) => {
      const img = slot.querySelector("img");
      if (img.dataset.type === "base") {
        img.src = base.src;
        img.alt = base.name;
        img.dataset.name = base.name;
        img.dataset.price = base.price;
        img.dataset.type = "base";
      }
    });
    updatePriceAndCount();
  }

  function saveBracelet() {
    const data = Array.from(bracelet.querySelectorAll(".slot img")).map((img) => ({
      name: img.dataset.name,
      price: img.dataset.price,
      type: img.dataset.type,
    }));
    localStorage.setItem("savedBracelet", JSON.stringify(data));
    alert("Bracelet saved!");
  }

  document.getElementById("addSlotBtn").addEventListener("click", addSlot);
  document.getElementById("removeSlotBtn").addEventListener("click", removeSlot);
  document.getElementById("saveBtn").addEventListener("click", saveBracelet);
  goldToggle.addEventListener("change", applyGoldToggle);

  updatePriceAndCount();
</script>
