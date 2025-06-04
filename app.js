const firebaseConfig = {
  apiKey: "AIzaSyD_iOEwu71dL4Lmfl7Km8lSlYFzSuubbzY",
  authDomain: "italian-charms.firebaseapp.com",
  projectId: "italian-charms",
  storageBucket: "italian-charms.appspot.com",
  messagingSenderId: "156559643870",
  appId: "1:156559643870:web:a14807a2a6d1761b71de4f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Current state
let cart = [];
let currentDesign = {
  productType: 'bracelet',
  materialType: 'silver',
  size: '15.2-16.2',
  isFullGlam: false,
  charms: [],
  imageData: null
};

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const jewelryPiece = document.getElementById('jewelry-piece');
  const fullGlamBtn = document.getElementById('full-glam-btn');
  const productBtns = document.querySelectorAll('.product-btn');
  const materialOptions = document.querySelectorAll('.material-option');
  const basePriceDisplay = document.getElementById('base-price');
  const charmPriceDisplay = document.getElementById('charm-price');
  const totalPriceDisplay = document.getElementById('total-price');
  const specialCharmsGrid = document.getElementById('special-charms');
  const rareCharmsGrid = document.getElementById('rare-charms');
  const removeCharmModal = document.getElementById('remove-charm-modal');
  const confirmRemoveBtn = document.getElementById('confirm-remove');
  const cancelRemoveBtn = document.getElementById('cancel-remove');
  const downloadBtn = document.getElementById('download-btn');
  const orderBtn = document.getElementById('order-btn');
  const orderModal = document.getElementById('order-modal');
  const orderForm = document.getElementById('order-form');
  const cancelOrderBtn = document.getElementById('cancel-order');
  const orderConfirmation = document.getElementById('order-confirmation');
  const closeConfirmation = document.getElementById('close-confirmation');
  const payCliqOption = document.getElementById('pay-cliq');
  const paymentProofContainer = document.getElementById('payment-proof-container');
  const customCharmUpload = document.getElementById('custom-charm-upload');
  const customCharmPreview = document.getElementById('custom-charm-preview');
  const addCustomCharmBtn = document.getElementById('add-custom-charm');
  const specialCategoryTabs = document.querySelectorAll('#special-categories .category-tab');
  const rareCategoryTabs = document.querySelectorAll('#rare-categories .category-tab');
  const pricingToggle = document.getElementById('pricing-toggle');
  const pricingInfo = document.querySelector('.pricing-info');
  const sizeSelect = document.getElementById('size');

  // Product configurations
  const products = {
    bracelet: { basePrice: 10, slots: 18, includedSpecial: 2, fullGlam: 29 },
    anklet: { basePrice: 15, slots: 23, includedSpecial: 2, fullGlam: 42 },
    necklace: { basePrice: 22, slots: 34, includedSpecial: 2, fullGlam: 64 }
  };

  // Current state
  let currentProduct = 'bracelet';
  let selectedCharm = null;
  let materialType = 'silver';
  let specialCount = 0;
  let rareCount = 0;
  let customCount = 0;
  let includedSpecialUsed = 0;
  let usedCharms = new Set();
  let slotToRemove = null;
  let currentSpecialCategory = 'all';
  let currentRareCategory = 'all';
  let customCharmImage = null;
  let sizePriceAdjustment = 0;
  let isFullGlam = false;
  let showGoldVariants = false;

  // Initialize
  initProduct(currentProduct);
  initCharms();
  setupCategoryTabs();
  setupEventListeners();

  function setupEventListeners() {
    // Product selection
    productBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        productBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentProduct = btn.dataset.type;
        initProduct(currentProduct);
        calculatePrice();
      });
    });

    // Material selection
    materialOptions.forEach(option => {
      option.addEventListener('click', () => {
        materialOptions.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        materialType = option.dataset.material;
        updateBaseCharms();
        calculatePrice();
      });
    });

    // Full glam button
    fullGlamBtn.addEventListener('click', () => {
      const price = products[currentProduct].fullGlam;
      if (confirm(`Full Glam Look includes 18 special charms for ${price} JDs. You'll get 18 special charms for free. Continue?`)) {
        isFullGlam = true;
        jewelryPiece.innerHTML = '';
        usedCharms = new Set();
        createSlots(products[currentProduct].slots);
        
        // Reset counts - full glam has fixed pricing
        specialCount = 0;
        includedSpecialUsed = products[currentProduct].slots; // All special charms are free
        rareCount = 0;
        customCount = 0;
        
        // Set full glam price
        totalPriceDisplay.textContent = `Total: ${price} JDs (Full Glam Special)`;
      }
    });

    // Size selection
    sizeSelect.addEventListener('change', function() {
      const sizeValue = this.value;
      const baseSlots = products[currentProduct].slots;
      
      // Reset to base slots first
      jewelryPiece.innerHTML = '';
      isFullGlam = false;
      createSlots(baseSlots);
      
      // Adjust slots and price based on size
      switch(sizeValue) {
        case '15.2-16.2':
          sizePriceAdjustment = 0;
          break;
        case '16.2-17.1':
          sizePriceAdjustment = 0.5;
          addExtraSlots(1); // 19 charms total
          break;
        case '17.1-18.1':
          sizePriceAdjustment = 1;
          addExtraSlots(2); // 20 charms total
          break;
        case '18.1-19.2':
          sizePriceAdjustment = 1.5;
          addExtraSlots(3); // 21 charms total
          break;
        case '19.2-20':
          sizePriceAdjustment = 2;
          addExtraSlots(4); // 22 charms total
          break;
        case '20-21':
          sizePriceAdjustment = 2.5;
          addExtraSlots(5); // 23 charms total
          break;
        case '21-22':
          sizePriceAdjustment = 3;
          addExtraSlots(6); // 24 charms total
          break;
      }
      
      calculatePrice();
    });

    // Pricing info toggle
    pricingToggle.addEventListener('click', () => {
      pricingInfo.classList.toggle('visible');
      pricingToggle.textContent = pricingInfo.classList.contains('visible') 
        ? 'Hide Pricing Info' 
        : 'Show Pricing Info';
    });
  }

  function initProduct(product) {
    jewelryPiece.innerHTML = '';
    usedCharms = new Set();
    specialCount = 0;
    rareCount = 0;
    customCount = 0;
    isFullGlam = false;
    sizePriceAdjustment = 0;
    sizeSelect.value = '15.2-16.2';
    
    createSlots(products[product].slots);
    updateCharmUsage();
    calculatePrice();
  }

  function createSlots(slotCount) {
    for (let i = 0; i < slotCount; i++) {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.index = i;
      
      const img = document.createElement('img');
      if (materialType === 'silver') {
        img.src = 'basecharms/silver.png';
      } else if (materialType === 'gold') {
        img.src = 'basecharms/gold.png';
      } else if (materialType === 'mix') {
        const isGold = i % 2 === 0;
        img.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
      }
      img.dataset.type = 'base';
      slot.appendChild(img);
      
      slot.addEventListener('click', function() {
        handleSlotClick(this);
      });
      
      jewelryPiece.appendChild(slot);
    }
  }

  function handleSlotClick(slot) {
    if (!selectedCharm) return;
  
    // Check if this slot is part of a long charm
    const longCharm = slot.querySelector('.long-charm');
    if (longCharm) {
        removeCharmFromSlot(slot);
        return;
    }
  
    // Check if trying to add a long charm
    const isLongCharm = selectedCharm.classList.contains('long-charm');
    
    if (isLongCharm) {
        const slots = Array.from(jewelryPiece.children);
        const currentIndex = slots.indexOf(slot);
        const nextSlot = slots[currentIndex + 1];
        
        // Check if next slot exists and is empty
        if (!nextSlot || nextSlot.querySelector('img:not([data-type="base"])')) {
            alert('Long charms need two adjacent empty slots!');
            return;
        }
  
        // Remove both base slots
        slot.innerHTML = '';
        nextSlot.remove(); // Remove the next slot entirely
        
        // Make current slot double width
        slot.classList.add('long-slot');
        
        // Add the long charm
        const charmSrc = selectedCharm.dataset.charm;
        const slotCharm = document.createElement('img');
        slotCharm.src = charmSrc;
        slotCharm.className = 'charm long-charm';
        slotCharm.dataset.type = 'special';
        slotCharm.dataset.charm = charmSrc;
  
        if (selectedCharm.classList.contains('sold-out')) {
            slotCharm.classList.add('sold-out');
        }
        
        slot.appendChild(slotCharm);
        usedCharms.add(charmSrc);
        specialCount++;
    } else {
        // Normal charm handling
        const baseCharm = slot.querySelector('img[data-type="base"]');
        const decorativeCharm = slot.querySelector('img:not([data-type="base"])');
  
        if (decorativeCharm) {
            removeCharmFromSlot(slot);
        } else if (baseCharm) {
            addCharmToSlot(slot);
        }
    }
    
    updateCharmUsage();
    calculatePrice();
  }
  

  function addCharmToSlot(slot) {
    if (!selectedCharm) return;

    const isLongCharm = selectedCharm.classList.contains('long-charm');
    const slots = Array.from(jewelryPiece.children);
    const currentIndex = slots.indexOf(slot);
    
    // For long charms, we need to handle two slots
    if (isLongCharm) {
      const nextSlot = slots[currentIndex + 1];
      if (!nextSlot) return;

      // Clear both slots
      slot.innerHTML = '';
      nextSlot.style.visibility = 'hidden';
      
      // Add the long charm to the first slot
      const charmSrc = selectedCharm.dataset.charm;
      const slotCharm = document.createElement('img');
      slotCharm.src = charmSrc;
      slotCharm.className = 'charm long-charm';
      slotCharm.dataset.type = 'special';
      slotCharm.dataset.charm = charmSrc;

      if (selectedCharm.classList.contains('sold-out')) {
        slotCharm.classList.add('sold-out');
      }
      
      // Make the slot span 2 columns and add the charm
      slot.classList.add('long-slot');
      slot.appendChild(slotCharm);
      usedCharms.add(charmSrc);
      
      specialCount++;
    } else {
      // Normal charm handling
      slot.innerHTML = '';
      
      const charmSrc = selectedCharm.dataset.charm;
      const charmType = selectedCharm.classList.contains('special') ? 'special' : 'rare';
      
      const slotCharm = document.createElement('img');
      slotCharm.src = charmSrc;
      slotCharm.className = 'charm';
      slotCharm.dataset.type = charmType;
      slotCharm.dataset.charm = charmSrc;
      
      if (selectedCharm.classList.contains('sold-out')) {
        slotCharm.classList.add('sold-out');
      }
      
      slot.appendChild(slotCharm);
      usedCharms.add(charmSrc);
      
      if (charmType === 'special') {
        specialCount++;
      } else if (charmType === 'rare') {
        rareCount++;
      }
    }
    
    updateCharmUsage();
    calculatePrice();
  }

  function removeCharmFromSlot(slot) {
    if (!slot) return;
    
    const charmImg = slot.querySelector('img:not([data-type="base"])');
    if (!charmImg) return;
  
    const isLongCharm = charmImg.classList.contains('long-charm');
    const charmType = charmImg.dataset.type;
    const charmSrc = charmImg.dataset.charm;
  
    if (isLongCharm) {
        // Create two new regular slots
        const newSlot1 = document.createElement('div');
        newSlot1.className = 'slot';
        const baseImg1 = document.createElement('img');
        baseImg1.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
        baseImg1.dataset.type = 'base';
        newSlot1.appendChild(baseImg1);
        
        const newSlot2 = document.createElement('div');
        newSlot2.className = 'slot';
        const baseImg2 = document.createElement('img');
        baseImg2.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
        baseImg2.dataset.type = 'base';
        newSlot2.appendChild(baseImg2);
  
        // Replace the long slot with two regular slots
        slot.parentNode.replaceChild(newSlot1, slot);
        newSlot1.after(newSlot2);
  
        // Add click handlers to new slots
        newSlot1.addEventListener('click', function() {
            handleSlotClick(this);
        });
        newSlot2.addEventListener('click', function() {
            handleSlotClick(this);
        });
        
        specialCount--;
    } else {
        // Normal charm removal
        slot.innerHTML = '';
        const baseImg = document.createElement('img');
        if (materialType === 'silver') {
            baseImg.src = 'basecharms/silver.png';
        } else if (materialType === 'gold') {
            baseImg.src = 'basecharms/gold.png';
        } else {
            const slots = Array.from(jewelryPiece.children);
            const isGold = slots.indexOf(slot) % 2 === 0;
            baseImg.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
        }
        baseImg.dataset.type = 'base';
        slot.appendChild(baseImg);
  
        if (charmType === 'special') {
            specialCount--;
        } else if (charmType === 'rare') {
            rareCount--;
        } else if (charmType === 'custom') {
            customCount--;
        }
    }
  
    usedCharms.delete(charmSrc);
    updateCharmUsage();
    calculatePrice();
  }

  function initCharms() {
    updateSpecialCharmsDisplay();
    updateRareCharmsDisplay();
    
    // Add click handlers for charms
    document.querySelectorAll('.charm').forEach(charm => {
      charm.addEventListener('click', () => {
        // Deselect all other charms
        document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
        // Select this charm
        charm.classList.add('selected');
        selectedCharm = charm;
      });
    });
  }

  function updateSpecialCharmsDisplay() {
    specialCharmsGrid.innerHTML = '';

    // Check if the current category has any gold variants
    const hasGoldVariants = specialCharms.some(charm => {
      if (currentSpecialCategory === 'all') {
        return charm.src.includes('-gold.png');
      }
      return charm.src.includes('-gold.png') && charm.category === currentSpecialCategory;
    });

    const filteredCharms = specialCharms.filter(charm => {
      // First filter by category
      if (currentSpecialCategory !== 'all' && charm.category !== currentSpecialCategory) {
        return false;
      }

      const isGoldVariant = charm.src.includes('-gold.png');

      // Only apply gold/silver filtering if this category has gold variants
      if (hasGoldVariants) {
        if (showGoldVariants) {
          return isGoldVariant;
        }
        return !isGoldVariant;
      }

      // If category has no gold variants, show all charms regardless of gold/silver state
      return true;
    });

    // Create and append charms
    filteredCharms.forEach(charm => {
      const charmElement = createCharm(charm.src, `Special Charm ${charm.src}`, 'special');
      charmElement.classList.add('special');
      charmElement.dataset.charm = charm.src;
      charmElement.dataset.category = charm.category;
      
      // Check if it's a long charm
      const isLongCharm = charm.src.includes('long');
      if (isLongCharm) {
        charmElement.classList.add('long-charm');
      }
      
      if (charm.soldOut) {
        charmElement.classList.add('sold-out');
      }
      if (usedCharms.has(charm.src)) {
        charmElement.classList.add('used');
      }

      charmElement.addEventListener('click', () => {
        document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
        charmElement.classList.add('selected');
        selectedCharm = charmElement;
      });

      specialCharmsGrid.appendChild(charmElement);
    });

    // Add gold toggle button if category has gold variants
    if (hasGoldVariants) {
      const toggleContainer = document.createElement('div');
      toggleContainer.className = 'gold-toggle-container';
      toggleContainer.style.width = '100%';
      toggleContainer.style.display = 'flex';
      toggleContainer.style.justifyContent = 'center';
      toggleContainer.style.marginTop = '1rem';
      toggleContainer.style.paddingTop = '1rem';
      toggleContainer.style.borderTop = '1px solid #f5a0c2';

      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'btn' + (showGoldVariants ? ' active' : '');
      toggleBtn.style.minWidth = '100px';
      toggleBtn.style.background = showGoldVariants ? '#d6336c' : '#fff';
      toggleBtn.style.color = showGoldVariants ? '#fff' : '#d6336c';
      toggleBtn.style.border = '2px solid #d6336c';
      toggleBtn.style.borderRadius = '20px';
      toggleBtn.style.padding = '0.5rem 1.5rem';
      toggleBtn.textContent = showGoldVariants ? 'Silver' : 'Gold';
      
      toggleBtn.onclick = () => {
        showGoldVariants = !showGoldVariants;
        toggleBtn.textContent = showGoldVariants ? 'Silver' : 'Gold';
        toggleBtn.style.background = showGoldVariants ? '#d6336c' : '#fff';
        toggleBtn.style.color = showGoldVariants ? '#fff' : '#d6336c';
        toggleBtn.classList.toggle('active');
        selectedCharm = null; // Clear selection when toggling
        updateSpecialCharmsDisplay();
        updateRareCharmsDisplay(); // Update both displays when toggling
      };
      toggleContainer.appendChild(toggleBtn);
      specialCharmsGrid.appendChild(toggleContainer);
    }
  }

  function updateRareCharmsDisplay() {
    rareCharmsGrid.innerHTML = '';

    // Check if the current category has any gold variants
    const hasGoldVariants = rareCharms.some(charm => {
      if (currentRareCategory === 'all') {
        return charm.src.includes('-gold.png');
      }
      return charm.src.includes('-gold.png') && charm.category === currentRareCategory;
    });

    const filteredCharms = rareCharms.filter(charm => {
      // First filter by category
      if (currentRareCategory !== 'all' && charm.category !== currentRareCategory) {
        return false;
      }

      const isGoldVariant = charm.src.includes('-gold.png');

      // Only apply gold/silver filtering if this category has gold variants
      if (hasGoldVariants) {
        if (showGoldVariants) {
          return isGoldVariant;
        }
        return !isGoldVariant;
      }

      // If category has no gold variants, show all charms regardless of gold/silver state
      return true;
    });

    // Create and append charms
    filteredCharms.forEach(charm => {
      const charmElement = createCharm(charm.src, `Rare Charm ${charm.src}`, 'rare');
      charmElement.classList.add('rare');
      charmElement.dataset.charm = charm.src;
      charmElement.dataset.category = charm.category;
      
      if (charm.soldOut) {
        charmElement.classList.add('sold-out');
      }
      if (usedCharms.has(charm.src)) {
        charmElement.classList.add('used');
      }

      charmElement.addEventListener('click', () => {
        document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
        charmElement.classList.add('selected');
        selectedCharm = charmElement;
      });

      rareCharmsGrid.appendChild(charmElement);
    });

    // Add gold toggle button if category has gold variants
    if (hasGoldVariants) {
      const toggleContainer = document.createElement('div');
      toggleContainer.className = 'gold-toggle-container';
      toggleContainer.style.width = '100%';
      toggleContainer.style.display = 'flex';
      toggleContainer.style.justifyContent = 'center';
      toggleContainer.style.marginTop = '1rem';
      toggleContainer.style.paddingTop = '1rem';
      toggleContainer.style.borderTop = '1px solid #f5a0c2';

      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'btn' + (showGoldVariants ? ' active' : '');
      toggleBtn.style.minWidth = '100px';
      toggleBtn.style.background = showGoldVariants ? '#d6336c' : '#fff';
      toggleBtn.style.color = showGoldVariants ? '#fff' : '#d6336c';
      toggleBtn.style.border = '2px solid #d6336c';
      toggleBtn.style.borderRadius = '20px';
      toggleBtn.style.padding = '0.5rem 1.5rem';
      toggleBtn.textContent = showGoldVariants ? 'Silver' : 'Gold';
      
      toggleBtn.onclick = () => {
        showGoldVariants = !showGoldVariants;
        toggleBtn.textContent = showGoldVariants ? 'Silver' : 'Gold';
        toggleBtn.style.background = showGoldVariants ? '#d6336c' : '#fff';
        toggleBtn.style.color = showGoldVariants ? '#fff' : '#d6336c';
        toggleBtn.classList.toggle('active');
        selectedCharm = null; // Clear selection when toggling
        updateSpecialCharmsDisplay(); // Update both displays when toggling
        updateRareCharmsDisplay();
      };
      toggleContainer.appendChild(toggleBtn);
      rareCharmsGrid.appendChild(toggleContainer);
    }
  }
function createCharm(src, alt, type) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.className = 'charm';
  img.dataset.type = type;
  
  // Check if it's a long charm
  if (src.includes('long')) {
    img.classList.add('long-charm');
    img.style.width = '96px';  // Double width
    img.style.height = '48px'; // Same height
  }
  
  return img;
}

  function updateCharmUsage() {
    document.querySelectorAll('.charms-grid .charm').forEach(charm => {
      charm.classList.remove('used');
    });

    usedCharms.forEach(charmSrc => {
      const charmEl = document.querySelector(`.charms-grid .charm[src$="${charmSrc}"]`);
      if (charmEl) {
        charmEl.classList.add('used');
      }
    });
  }

  function calculatePrice() {
    if (isFullGlam) {
      const glamPrice = products[currentProduct].fullGlam;
      totalPriceDisplay.textContent = `Total: ${glamPrice} JDs (Full Glam Special - 18 free special charms)`;
      return;
    }

    const basePrice = products[currentProduct].basePrice + sizePriceAdjustment;
    basePriceDisplay.textContent = `Base Price: ${basePrice} JDs`;

    // Calculate charm price
    let charmPrice = 0;
    
    // Count long charms (they cost 6 JD each)
    const longCharms = Array.from(document.querySelectorAll('.slot .long-charm')).length;
    charmPrice += longCharms * 6;
    
    // Special charms (excluding long charms): first 2 are free, rest are 2 JD each
    const regularSpecialCharms = specialCount - longCharms;
    const freeSpecialCharms = Math.min(regularSpecialCharms, products[currentProduct].includedSpecial);
    const paidSpecialCharms = Math.max(0, regularSpecialCharms - products[currentProduct].includedSpecial);
    if (paidSpecialCharms > 0) {
      charmPrice += paidSpecialCharms * 2;
    }
    
    // Rare charms: 3 JD each (never free)
    charmPrice += rareCount * 3;
    
    // Custom charms: 3.5 JD each
    charmPrice += customCount * 3.5;
    
    let charmText = `Charm Price: ${charmPrice} JDs`;
    if (!isFullGlam) {
      charmText += ` (${freeSpecialCharms}/${products[currentProduct].includedSpecial} free special charms used)`;
    }
    charmPriceDisplay.textContent = charmText;
    
    const total = basePrice + charmPrice;
    totalPriceDisplay.textContent = `Total: ${total} JDs`;
  }

  function updateBaseCharms() {
    const slots = document.querySelectorAll('.slot');
    slots.forEach((slot, index) => {
      const baseImg = slot.querySelector('img[data-type="base"]');
      if (baseImg) {
        if (materialType === 'silver') {
          baseImg.src = 'basecharms/silver.png';
        } else if (materialType === 'gold') {
          baseImg.src = 'basecharms/gold.png';
        } else if (materialType === 'mix') {
          const isGold = index % 2 === 0;
          baseImg.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
        }
      }
    });
  }

  function setupCategoryTabs() {
    specialCategoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        specialCategoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentSpecialCategory = tab.dataset.category;
        updateSpecialCharmsDisplay();
      });
    });

    rareCategoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        rareCategoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentRareCategory = tab.dataset.category;
        updateRareCharmsDisplay();
      });
    });
  }

  // Download Bracelet as Image
  downloadBtn.addEventListener('click', function() {
    html2canvas(document.getElementById('jewelry-piece')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'my-bracelet-design.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  });

  // Custom charm upload handling
  customCharmUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        customCharmPreview.innerHTML = '';
        const img = document.createElement('img');
        img.src = event.target.result;
        customCharmPreview.appendChild(img);
        customCharmImage = img;
      };
      reader.readAsDataURL(file);
    }
  });

  // Add custom charm button
  addCustomCharmBtn.addEventListener('click', function() {
    if (!customCharmImage) {
      alert('Please upload an image first');
      return;
    }

    // Create a temporary custom charm element
    const tempCharm = document.createElement('img');
    tempCharm.src = customCharmImage.src;
    tempCharm.alt = 'Custom Charm';
    tempCharm.dataset.type = 'custom';
    tempCharm.dataset.charm = 'custom-' + Date.now();
    tempCharm.classList.add('charm');
    
    // Set as selected charm
    document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
    tempCharm.classList.add('selected');
    selectedCharm = tempCharm;
    
    // Reset upload
    customCharmUpload.value = '';
    customCharmPreview.innerHTML = '<span>Preview</span>';
    customCharmImage = null;
  });

  // Show payment proof upload when Cliq is selected
  payCliqOption.addEventListener('change', function() {
    paymentProofContainer.style.display = this.checked ? 'block' : 'none';
  });

  // Open order modal
  orderBtn.addEventListener('click', function() {
    document.getElementById('order-total-price').textContent = 
      document.getElementById('total-price').textContent;
    orderModal.style.display = 'flex';
  });

  // Close order modal
  cancelOrderBtn.addEventListener('click', function() {
    orderModal.style.display = 'none';
  });

  // Close confirmation modal
  closeConfirmation.addEventListener('click', function() {
    orderConfirmation.style.display = 'none';
  });

  // Handle form submission
  orderForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    try {
      // Get form values
      const orderData = {
        name: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        phone2: document.getElementById('phone2').value || '',
        governorate: document.getElementById('governorate').value,
        address: document.getElementById('address').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        totalPrice: document.getElementById('total-price').textContent.replace('Total: ', ''),
        productType: currentProduct,
        materialType: materialType,
        size: sizeSelect.value,
        isFullGlam: isFullGlam,
        design: [],
        status: 'pending',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      // Get all charms in bracelet
      const slots = document.querySelectorAll('.slot img[data-type="special"], .slot img[data-type="rare"], .slot img[data-type="custom"]');
      orderData.design = Array.from(slots).map(slot => ({
        type: slot.dataset.type,
        src: slot.src.split('/').pop(),
        charmName: slot.dataset.charm || 'custom'
      }));

      // If paying with Cliq, handle the payment proof
      if (orderData.paymentMethod === 'Cliq') {
        const file = document.getElementById('payment-proof').files[0];
        if (file) {
          try {
            const storageRef = storage.ref('payment-proofs/' + Date.now() + '-' + file.name);
            await storageRef.put(file);
            orderData.paymentProofUrl = await storageRef.getDownloadURL();
          } catch (error) {
            console.error('Error uploading payment proof:', error);
            alert('Error uploading payment proof. Please try again.');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            return;
          }
        } else {
          alert('Please upload proof of payment for Cliq payment');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          return;
        }
      }

      // Save order to Firestore
      const docRef = await db.collection('orders').add(orderData);
      
      // Show confirmation
      document.getElementById('order-id').textContent = docRef.id;
      orderModal.style.display = 'none';
      orderConfirmation.style.display = 'flex';
      
      // Reset form
      orderForm.reset();
      paymentProofContainer.style.display = 'none';
    } catch (error) {
      console.error('Error saving order: ', error);
      alert('Error saving order: ' + error.message);
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });

  // Modal event handlers
  confirmRemoveBtn.addEventListener('click', () => {
    if (slotToRemove) {
      removeCharmFromSlot(slotToRemove);
      slotToRemove = null;
    }
    removeCharmModal.style.display = 'none';
  });

  cancelRemoveBtn.addEventListener('click', () => {
    slotToRemove = null;
    removeCharmModal.style.display = 'none';
  });

  // Window click handlers for modals
  window.addEventListener('click', (event) => {
    if (event.target === removeCharmModal) {
      slotToRemove = null;
      removeCharmModal.style.display = 'none';
    }
    if (event.target === orderModal) {
      orderModal.style.display = 'none';
    }
    if (event.target === orderConfirmation) {
      orderConfirmation.style.display = 'none';
    }
  });
});
