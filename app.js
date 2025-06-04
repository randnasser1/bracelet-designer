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

    // Gold variant button
    goldVariantBtn.addEventListener('click', () => {
      showGoldVariants = !showGoldVariants;
      goldVariantBtn.textContent = showGoldVariants ? 'Show Normal Charms' : 'Show Gold Variants';
      goldVariantBtn.classList.toggle('active');
      updateSpecialCharmsDisplay();
      updateRareCharmsDisplay();
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
    if (selectedCharm) {
      addCharmToSlot(slot);
      return;
    }

    const clickedCharm = slot.querySelector('img[data-type="special"], img[data-type="rare"], img[data-type="custom"]');
    if (clickedCharm) {
      slotToRemove = slot;
      removeCharmModal.style.display = 'flex';
    }
  }

  function addCharmToSlot(slot) {
    if (!selectedCharm) return;
    
    if (selectedCharm.classList.contains('sold-out')) {
      alert('This charm is sold out!');
      return;
    }

    const charmSrc = selectedCharm.src.split('/').pop();
    if (usedCharms.has(charmSrc) && selectedCharm.dataset.type !== 'custom') {
      alert('This charm is already used on the bracelet!');
      return;
    }

    // Remove any existing charm first
    const existingCharm = slot.querySelector('img[data-type="special"], img[data-type="rare"], img[data-type="custom"]');
    if (existingCharm) {
      removeCharmFromSlot(slot);
    }

    // Clear the slot
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

    // Clear the slot
    slot.innerHTML = '';

    // Add base charm back
    const baseImg = document.createElement('img');
    if (materialType === 'silver') {
      baseImg.src = 'basecharms/silver.png';
    } else if (materialType === 'gold') {
      baseImg.src = 'basecharms/gold.png';
    } else {
      const isGold = parseInt(slot.dataset.index) % 2 === 0;
      baseImg.src = isGold ? 'basecharms/gold.png' : 'basecharms/silver.png';
    }
    baseImg.dataset.type = 'base';
    slot.appendChild(baseImg);

    // Update counts
    if (charmType === 'special') {
      if (isFullGlam) {
        fullGlamSpecialCount--;
      } else if (includedSpecialUsed > 0) {
        includedSpecialUsed--;
      } else {
        specialCount--;
      }
    } else if (charmType === 'rare') {
      rareCount--;
    } else if (charmType === 'custom') {
      customCount--;
    }

    // Remove from used charms
    usedCharms.delete(charmSrc);

    updateCharmUsage();
    calculatePrice();
  }

  function initCharms() {
    updateSpecialCharmsDisplay();
    updateRareCharmsDisplay();
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
    let price = 0;
    let charmCost = 0;
    
    if (isFullGlam) {
      price = products[currentProduct].fullGlam;
      // Only count rare and custom charms beyond the included 18 specials
      charmCost = (rareCount * 3) + (customCount * 3.5);
    } else {
      price = products[currentProduct].basePrice;
      if (materialType === 'gold') price += 1;
      if (materialType === 'mix') price += 2.5;
      
      // Calculate charm costs
      const specialCharged = Math.max(0, specialCount - products[currentProduct].includedSpecial);
      charmCost = (specialCharged * 2) + (rareCount * 3) + (customCount * 3.5);
    }
    
    price += sizePriceAdjustment;
    const total = price + charmCost;
    
    // Update displays
    basePriceDisplay.textContent = `Base Price: ${price} JDs`;
    charmPriceDisplay.textContent = `Charms: ${charmCost} JDs`;
    
    if (isFullGlam) {
      charmPriceDisplay.textContent += ` (${fullGlamSpecialCount}/18 free specials used)`;
    } else {
      charmPriceDisplay.textContent += ` (${includedSpecialUsed}/${products[currentProduct].includedSpecial} free specials used)`;
    }
    
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
