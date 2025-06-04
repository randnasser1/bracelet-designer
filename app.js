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

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const jewelryPiece = document.getElementById('jewelry-piece');
  const fullGlamBtn = document.getElementById('full-glam-btn');
  const goldVariantBtn = document.getElementById('gold-variant-btn');
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
// Add this at the end of your DOMContentLoaded event listener
// Initialize pricing info as hidden
pricingInfo.classList.remove('visible');
pricingToggle.textContent = 'Show Pricing Info';
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
    // Update the size selection event handler
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

    // Add gold variant button listener
    goldVariantBtn.addEventListener('click', () => {
      showGoldVariants = !showGoldVariants;
      goldVariantBtn.textContent = showGoldVariants ? 'Show Normal Charms' : 'Show Gold Variants';
      goldVariantBtn.classList.toggle('active');
      updateSpecialCharmsDisplay();
      updateRareCharmsDisplay();
    });

    // ... (rest of your existing event listeners)
  }

  function addExtraSlots(extraCount) {
    for (let i = 0; i < extraCount; i++) {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.index = jewelryPiece.children.length;
      
      const img = document.createElement('img');
      if (materialType === 'silver') {
        img.src = 'basecharms/silver.png';
      } else if (materialType === 'gold') {
        img.src = 'basecharms/gold.png';
      } else if (materialType === 'mix') {
        const isGold = jewelryPiece.children.length % 2 === 0;
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

  function initProduct(product) {
    jewelryPiece.innerHTML = '';
    usedCharms = new Set();
    specialCount = 0;
    rareCount = 0;
    customCount = 0;
    includedSpecialUsed = 0;
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
        img.alt = 'Silver Base';
      } else if (materialType === 'gold') {
        img.src = 'basecharms/gold.png';
        img.alt = 'Gold Base';
      } else if (materialType === 'mix') {
        const isGold = i % 2 === 0;
        img.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
        img.alt = isGold ? 'Gold Base' : 'Silver Base';
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
    const currentCharm = slot.querySelector('img[data-type="special"], img[data-type="rare"], img[data-type="custom"]');
    
    if (currentCharm && !selectedCharm) {
      slotToRemove = slot;
      removeCharmModal.style.display = 'flex';
      return;
    }
    
    if (selectedCharm) {
      addCharmToSlot(slot);
    }
  }

 // Update addCharmToSlot to handle full glam
function addCharmToSlot(slot) {
  if (isFullGlam) {
    alert('For Full Glam look, all charms must be special. Please remove Full Glam option first if you want to customize.');
    return;
  }
  
  // Rest of your existing addCharmToSlot code...
}

    const charmSrc = selectedCharm.src.split('/').pop();
    if (usedCharms.has(charmSrc) && selectedCharm.dataset.type !== 'custom') {
      alert('This charm is already used on the bracelet!');
      return;
    }

    // Remove any existing decorative charm first
    const existingCharm = slot.querySelector('img[data-type="special"], img[data-type="rare"], img[data-type="custom"]');
    if (existingCharm) {
      usedCharms.delete(existingCharm.dataset.charm);
      
      // Update counts for previous charm
      if (existingCharm.dataset.type === 'special') {
        specialCount--;
        if (includedSpecialUsed > 0) includedSpecialUsed--;
      } else if (existingCharm.dataset.type === 'rare') {
        rareCount--;
      } else if (existingCharm.dataset.type === 'custom') {
        customCount--;
      }
    }

    // Clear the slot completely
    slot.innerHTML = '';

    // Add the new decorative charm
    const newImg = selectedCharm.cloneNode();
    newImg.classList.remove('selected');
    newImg.dataset.charm = charmSrc;
    if (selectedCharm.classList.contains('sold-out')) {
      newImg.classList.add('sold-out');
    }
    slot.appendChild(newImg);
    usedCharms.add(charmSrc);

    // Update counts for new charm
    const newType = selectedCharm.dataset.type;
    if (newType === 'special') {
      if (includedSpecialUsed < products[currentProduct].includedSpecial) {
        includedSpecialUsed++;
      } else {
        specialCount++;
      }
    } else if (newType === 'rare') {
      rareCount++;
    } else if (newType === 'custom') {
      customCount++;
    }

    updateCharmUsage();
    calculatePrice();
    selectedCharm = null;
    document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
  }

  function removeCharmFromSlot(slot) {
    const charmImg = slot.querySelector('img[data-type="special"], img[data-type="rare"], img[data-type="custom"]');
    if (!charmImg) return;

    const charmType = charmImg.dataset.type;
    const charmSrc = charmImg.dataset.charm;

    // Remove the decorative charm
    slot.removeChild(charmImg);
    usedCharms.delete(charmSrc);

    // Add back the base charm
    const baseImg = document.createElement('img');
    if (materialType === 'silver') {
      baseImg.src = 'basecharms/silver.png';
      baseImg.alt = 'Silver Base';
    } else if (materialType === 'gold') {
      baseImg.src = 'basecharms/gold.png';
      baseImg.alt = 'Gold Base';
    } else if (materialType === 'mix') {
      const isGold = parseInt(slot.dataset.index) % 2 === 0;
      baseImg.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
      baseImg.alt = isGold ? 'Gold Base' : 'Silver Base';
    }
    baseImg.dataset.type = 'base';
    slot.appendChild(baseImg);

    // Update counts
    if (charmType === 'special') {
      specialCount--;
      if (includedSpecialUsed > 0) includedSpecialUsed--;
    } else if (charmType === 'rare') {
      rareCount--;
    } else if (charmType === 'custom') {
      customCount--;
    }

    updateCharmUsage();
    calculatePrice();
  }

  function initCharms() {
    updateSpecialCharmsDisplay();
    updateRareCharmsDisplay();
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

  function updateSpecialCharmsDisplay() {
    specialCharmsGrid.innerHTML = '';
    
    const filteredCharms = currentSpecialCategory === 'all' 
      ? specialCharms 
      : specialCharms.filter(charm => charm.category === currentSpecialCategory);
    
    filteredCharms.forEach((charm, index) => {
      // Check if there's a gold variant available
      const charmName = charm.src.split('/').pop();
      const baseCharmName = charmName.replace('-gold.png', '.png');
      
      // If showing gold variants and this is not a gold variant but has one, skip it
      if (showGoldVariants && !charmName.includes('-gold.png') && 
          specialCharms.some(c => c.src.includes(baseCharmName.replace('.png', '-gold.png')))) {
        return;
      }
      
      // If not showing gold variants and this is a gold variant, skip it
      if (!showGoldVariants && charmName.includes('-gold.png')) {
        return;
      }

      const charmEl = createCharm(charm.src, `Special Charm ${index+1}`, 'special');
      charmEl.classList.add('special');
      charmEl.dataset.charm = charmName;
      charmEl.dataset.category = charm.category;
      
      if (charm.soldOut) {
        charmEl.classList.add('sold-out');
        const soldOutLabel = document.createElement('div');
        soldOutLabel.className = 'sold-out-label';
        soldOutLabel.textContent = 'Sold Out';
        charmEl.appendChild(soldOutLabel);
      }
      
      specialCharmsGrid.appendChild(charmEl);
    });
  }

  function updateRareCharmsDisplay() {
    rareCharmsGrid.innerHTML = '';
    
    const filteredCharms = currentRareCategory === 'all' 
      ? rareCharms 
      : rareCharms.filter(charm => charm.category === currentRareCategory);
    
    filteredCharms.forEach((charm, index) => {
      // Check if there's a gold variant available
      const charmName = charm.src.split('/').pop();
      const baseCharmName = charmName.replace('-gold.png', '.png');
      
      // If showing gold variants and this is not a gold variant but has one, skip it
      if (showGoldVariants && !charmName.includes('-gold.png') && 
          rareCharms.some(c => c.src.includes(baseCharmName.replace('.png', '-gold.png')))) {
        return;
      }
      
      // If not showing gold variants and this is a gold variant, skip it
      if (!showGoldVariants && charmName.includes('-gold.png')) {
        return;
      }

      const charmEl = createCharm(charm.src, `Rare Charm ${index+1}`, 'rare');
      charmEl.classList.add('rare');
      charmEl.dataset.charm = charmName;
      charmEl.dataset.category = charm.category;
      
      if (charm.soldOut) {
        charmEl.classList.add('sold-out');
        const soldOutLabel = document.createElement('div');
        soldOutLabel.className = 'sold-out-label';
        soldOutLabel.textContent = 'Sold Out';
        charmEl.appendChild(soldOutLabel);
      }
      
      rareCharmsGrid.appendChild(charmEl);
    });
  }

  function createCharm(src, alt, type) {
    const charm = document.createElement('img');
    charm.className = 'charm';
    charm.src = src;
    charm.alt = alt;
    charm.dataset.type = type;
    
    charm.addEventListener('click', function() {
      if (this.classList.contains('sold-out')) {
        alert('This charm is sold out!');
        return;
      }
      
      document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      selectedCharm = this;
    });
    
    return charm;
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
    // For full glam, we don't calculate - it's a fixed price
    return;
  }
  
  const config = products[currentProduct];
  let basePrice = config.basePrice;
  
  if (materialType === 'gold') basePrice += 1;
  if (materialType === 'mix') basePrice += 2.5;
  
  const specialCost = Math.max(0, specialCount) * 2;
  const rareCost = rareCount * 3;
  const customCost = customCount * 3.5;
  
  const totalCharmCost = specialCost + rareCost + customCost;
  const total = basePrice + totalCharmCost + sizePriceAdjustment;
  
  basePriceDisplay.textContent = `Base Price: ${basePrice} JDs`;
  charmPriceDisplay.textContent = `Charms: ${totalCharmCost} JDs (${includedSpecialUsed}/${products[currentProduct].includedSpecial} free specials used)`;
  totalPriceDisplay.textContent = `Total: ${total} JDs`;
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
