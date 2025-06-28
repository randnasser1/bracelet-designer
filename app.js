// Initialize Firebase
let jewelryPiece;
let specialCharmsGrid;
let rareCharmsGrid;
let customCharmUpload;
let customCharmPreview;
let addCustomCharmBtn;
let specialCategoryTabs;
let rareCategoryTabs;
let customCharmImage = null;
let cartButton;
let cartPreview;
let cartCloseBtn;
let addToCartBtn;
let cartItems;
let placeOrderBtn;
let orderModal;
let orderForm;
let orderIdSpan;
let payCliqOption;
let paymentProofContainer;
let orderConfirmation;
let closeConfirmation;
let selectedCharmPreview = null;

// Constants
const MAX_SLOT_SPACES = 16;
const SIZE_CHARTS = {
    bracelet: {
        '15.2-16.2': { charms: 18, price: 0, display: '15.2cm - 16.2cm (18 charms)' },
        '16.2-17.1': { charms: 19, price: 0.5, display: '16.2cm - 17.1cm (+0.5 JDs, 19 charms)' },
        '17.1-18.1': { charms: 20, price: 1, display: '17.1cm - 18.1cm (+1 JD, 20 charms)' },
        '18.1-19.2': { charms: 21, price: 1.5, display: '18.1cm - 19.2cm (+1.5 JDs, 21 charms)' },
        '19.2-20': { charms: 22, price: 2, display: '19.2cm - 20cm (+2 JDs, 22 charms)' },
        '20-21': { charms: 23, price: 2.5, display: '20cm - 21cm (+2.5 JDs, 23 charms)' },
        '21-22': { charms: 24, price: 3, display: '21cm - 22cm (+3 JDs, 24 charms)' }
    },
    anklet: {
        '21-22': { charms: 23, price: 0, display: '21cm - 22cm (23 charms)' },
        '22-23': { charms: 24, price: 0.5, display: '22cm - 23cm (+0.5 JDs, 24 charms)' },
        '23-24': { charms: 25, price: 1, display: '23cm - 24cm (+1 JD, 25 charms)' },
        '24-25': { charms: 26, price: 1.5, display: '24cm - 25cm (+1.5 JDs, 26 charms)' }
    },
    necklace: {
        '32-33': { charms: 34, price: 0, display: '32cm - 33cm (34 charms)' },
        '33-34': { charms: 35, price: 0.5, display: '33cm - 34cm (+0.5 JDs, 35 charms)' },
        '34-35': { charms: 36, price: 1, display: '34cm - 35cm (+1 JD, 36 charms)' },
        '35-36': { charms: 37, price: 1.5, display: '35cm - 36cm (+1.5 JDs, 37 charms)' }
    },
    ring: {
        '7': { charms: 7, price: 0, display: '~7.0cm (7 charms)' },
        '8': { charms: 8, price: 0.5, display: '~8.0cm (+0.5 JDs, 8 charms)' },
        '9': { charms: 9, price: 1, display: '~9.0cm (+1 JD, 9 charms)' },
        '10': { charms: 10, price: 1.5, display: '~10.0cm (+1.5 JDs, 10 charms)' },
        '11': { charms: 11, price: 2, display: '~11.0cm (+2 JDs, 11 charms)' }
    }
};
const PRODUCTS = {
    bracelet: { basePrice: 10, baseSlots: 18, includedSpecial: 1, fullGlam: 29 },
    anklet: { basePrice: 15, baseSlots: 23, includedSpecial: 1, fullGlam: 42 },
    necklace: { basePrice: 22, baseSlots: 34, includedSpecial: 1, fullGlam: 64 },
    ring: { basePrice: 7.5, baseSlots: 7, includedSpecial: 1, fullGlam: 15 }
};
// Add this to your CHARM_SETS configuration
const CHARM_SETS = {
  bestFriends: {
    charms: ['best.png', 'ends.png', 'fri.png'],
    message: 'Best Friends charms must be in 3 different items',
    requiredCount: 3
  },
  mrAndMrs: {
    charms: ['mrmrs1.png', 'mrmrs2.png'],
    message: 'Mr and Mrs charms must be in 2 different items',
    requiredCount: 2
  },
  soulmates: {
    charms: ['love.png', 'love2.png'],
    message: 'Soulmates charms must be in 2 different items',
    requiredCount: 2
  },
  loveSet: {
    charms: ['rares/love/6.png', 'rares/love/7.png'],
    message: 'Love charms must be in 2 different items',
    requiredCount: 2,
      isDangly: true
  }
};

function getCharmSet(charmSrc) {
    return Object.values(CHARM_SETS).find(set => 
        set.charms.some(charm => charmSrc.includes(charm))
    );
}

// Global state
let isOrderProcessing = false;
const cart = [];
window.orderSubmissionInProgress = false;
window.firebaseInitialized = false;
window.orderFormInitialized = false;
let currentProduct = 'bracelet';
let currentSize = '15.2-16.2';
let isFullGlam = false;
let maxSlots = SIZE_CHARTS[currentProduct][currentSize].charms;
let materialType = 'silver';
let specialCount = 0;
let rareCount = 0;
let customCount = 0;
let includedSpecialUsed = 0;
let usedCharms = new Set();
let showGoldVariants = false;
let currentSpecialCategory = 'all';
let currentRareCategory = 'all';
let selectedCharm = null;
let currentDesign = {
    productType: 'bracelet',
    materialType: 'silver',
    size: '15.2-16.2',
    isFullGlam: false,
    charms: [],
    imageData: null
};
window.orderFunctionalityInitialized = false;

// Modify your captureBraceletDesign function to use this:
async function captureBraceletDesign() {
    const jewelryPiece = document.getElementById('jewelry-piece');
    const options = {
        useCORS: true,
        allowTaint: true,
        scale: 1, // Reduce from 2 to 1 for smaller image
        logging: false,
        backgroundColor: null,
        removeContainer: true // Clean up temporary elements
    };

    try {
        const canvas = await html2canvas(jewelryPiece, options);
        return canvas.toDataURL('image/png'); // Use data URL instead of blob
    } catch (error) {
        console.error('Capture error:', error);
        throw error;
    }
}
function calculatePrice(includeDelivery = false) {
    const product = PRODUCTS[currentProduct];
    const sizeData = SIZE_CHARTS[currentProduct][currentSize];
    
    // Base price includes product base + size upgrade
    let basePrice = product.basePrice + sizeData.price;
    let totalPrice = basePrice;
    
    // Material upgrades
    if (materialType === 'gold') {
        totalPrice += 1;
    } else if (materialType === 'mix') {
        totalPrice += 2.5;
    }

    // Count all placed charms
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));
    let specialCount = 0;
    let rareCount = 0;
    let customCount = 0;

    placedCharms.forEach(charm => {
        const type = charm.dataset.type;
        if (type === 'special') specialCount++;
        else if (type === 'rare') rareCount++;
        else if (type === 'custom') customCount++;
    });

    // Full Glam pricing
    if (isFullGlam) {
        totalPrice = product.fullGlam;
        // Full Glam includes baseSlots worth of free special charms
        const paidSpecials = Math.max(0, specialCount - product.baseSlots);
        totalPrice += paidSpecials * 2; // Extra special charms beyond free limit
    } else {
        // Regular pricing
        const includedSpecials = product.includedSpecial;
        const paidSpecials = Math.max(0, specialCount - includedSpecials);
        totalPrice += paidSpecials * 2; // Additional special charms
    }

    // Add rare and custom charm costs
    totalPrice += rareCount * 3;   // Rare charms cost 3 JDs each
    totalPrice += customCount * 3.5; // Custom charms cost 3.5 JDs each

    // Check for discount eligibility
    const currentDate = new Date();
    const discountEndDate = new Date('2024-07-25');
    let discountApplied = 0;
    let originalPrice = totalPrice;
    
    if (currentDate <= discountEndDate && originalPrice > 15) {
        discountApplied = originalPrice * 0.1;
        totalPrice = originalPrice - discountApplied;
        
        // Show discount in UI
        const discountInfo = document.getElementById('discount-info');
        const discountAmount = document.getElementById('discount-amount');
        if (discountInfo && discountAmount) {
            discountInfo.style.display = 'block';
            discountAmount.textContent = `10% Discount: -${discountApplied.toFixed(2)} JDs`;
        }
    } else {
        // Hide discount info if not applicable
        const discountInfo = document.getElementById('discount-info');
        if (discountInfo) discountInfo.style.display = 'none';
    }

    // Add delivery fee if requested
    if (includeDelivery) {
        const deliveryFee = 2.5;
        return {
            subtotal: originalPrice,
            discount: discountApplied,
            total: totalPrice + deliveryFee,
            delivery: deliveryFee
        };
    }
    
    return {
        subtotal: originalPrice,
        discount: discountApplied,
        total: totalPrice,
        delivery: 0
    };
}

async function uploadBraceletImage(imageFile) {
  try {
    // 1. Create storage reference
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`designs/${Date.now()}_${imageFile.name}`);
    
    // 2. Upload with metadata
    const uploadTask = fileRef.put(imageFile, {
      contentType: imageFile.type,
      customMetadata: {
        uploadedBy: "user123",
      }
    });

    // 3. Track progress
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress:', progress);
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        // 4. Get download URL after upload
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log('File available at:', downloadURL);
        return downloadURL;
      }
    );
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
// Helper function to upload images to Firebase Storage
async function uploadImageToFirebase(imageFile, folder = 'designs/') {
  try {
    // 1. Create a unique filename
    const timestamp = Date.now();
    const fileName = `${folder}${timestamp}_${imageFile.name}`;
    
    // 2. Create storage reference
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(fileName);
    
    // 3. Start upload
    const uploadTask = fileRef.put(imageFile);
    
    // 4. Return a promise that resolves with download URL
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        null, // Progress handler (optional)
        (error) => reject(error),
        async () => {
          try {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
function updateJewelryPiece() {
    const jewelryPiece = document.getElementById('jewelry-piece');
    jewelryPiece.innerHTML = '';
    
    const slots = SIZE_CHARTS[currentProduct][currentSize].charms;
    for (let i = 0; i < slots; i++) {
        const slot = createBaseSlot();
        jewelryPiece.appendChild(slot);
    }
}

function getCharmSet(charmSrc) {
  return Object.values(CHARM_SETS).find(set => 
    set.charms.some(charm => charmSrc.includes(charm))
  );
}
 function updateSelectedCharmPreview(charmElement) {
      if (!charmElement) return;
      
      const preview = document.getElementById('selected-charm-preview');
      const previewImage = document.getElementById('preview-charm-image');
      const previewName = document.getElementById('preview-charm-name');
      const previewType = document.getElementById('preview-charm-type');
      
      previewImage.src = charmElement.src;
      
      // Extract charm name from src (you can customize this)
      const charmSrc = charmElement.src;
      let charmName = 'Custom Charm';
      
      if (charmSrc.includes('special/')) {
        charmName = charmSrc.split('special/')[1].split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
      } else if (charmSrc.includes('rare/')) {
        charmName = charmSrc.split('rare/')[1].split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
      }
      
      previewName.textContent = charmName.charAt(0).toUpperCase() + charmName.slice(1);
      
      if (charmElement.dataset.type === 'special') {
        previewType.textContent = 'Special Charm (+2 JDs)';
      } else if (charmElement.dataset.type === 'rare') {
        previewType.textContent = 'Rare Charm (+3 JDs)';
      } else {
        previewType.textContent = 'Custom Charm (+3.5 JDs)';
      }
      
      preview.classList.add('active');
      selectedCharmPreview = charmElement;
    }
    
    // Function to hide the charm preview
    function hideSelectedCharmPreview() {
      const preview = document.getElementById('selected-charm-preview');
      preview.classList.remove('active');
      selectedCharmPreview = null;
    }
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDiscountInfo = document.getElementById('cart-discount-info');
    const cartDiscountAmount = document.getElementById('cart-discount-amount');
    const cartTotal = document.querySelector('.cart-total');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartSubtotal.textContent = 'Subtotal: 0.00 JDs';
        cartTotal.textContent = 'Total: 0.00 JDs';
        cartDiscountInfo.style.display = 'none';
        return;
    }
    
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        subtotal += item.price;
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-symbol">${item.symbol}</div>
                    <div class="cart-item-details">
                        <div>${item.product} (${item.size})</div>
                        <div>${item.materialType}</div>
                        <div>${item.price.toFixed(2)} JDs</div>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Calculate discount
    const currentDate = new Date();
    const discountEndDate = new Date('2024-07-25');
    let discountApplied = 0;
    let total = subtotal;
    
    if (currentDate <= discountEndDate && subtotal > 15) {
        discountApplied = subtotal * 0.1;
        total = subtotal - discountApplied;
        
        // Show discount in UI
        cartDiscountInfo.style.display = 'block';
        cartDiscountAmount.textContent = `10% Discount: -${discountApplied.toFixed(2)} JDs`;
    } else {
        cartDiscountInfo.style.display = 'none';
    }
    
    const deliveryFee = 2.5;
    total += deliveryFee;
    
    cartSubtotal.textContent = `Subtotal: ${subtotal.toFixed(2)} JDs`;
    document.getElementById('cart-delivery').textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
    
    if (discountApplied > 0) {
        cartTotal.innerHTML = `
            <div>
                <span style="text-decoration: line-through; color: #999; margin-right: 8px;">
                    ${(subtotal + deliveryFee).toFixed(2)} JDs
                </span>
                <span style="font-weight: bold; color: #d6336c;">
                    ${total.toFixed(2)} JDs
                </span>
            </div>
            <div style="color: #4CAF50; font-size: 0.9rem; margin-top: 4px;">
                You saved ${discountApplied.toFixed(2)} JDs!
            </div>
        `;
    } else {
        cartTotal.textContent = `Total: ${total.toFixed(2)} JDs`;
    }
}
function updatePrice() {
    const priceData = calculatePrice(false);
    const basePriceElement = document.getElementById('base-price');
    const charmPriceElement = document.getElementById('charm-price');
    const totalPriceElement = document.getElementById('total-price');

    const product = PRODUCTS[currentProduct];
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));
    
    let specialCount = 0;
    let rareCount = 0;
    let customCount = 0;

    placedCharms.forEach(charm => {
        const type = charm.dataset.type;
        if (type === 'special') specialCount++;
        else if (type === 'rare') rareCount++;
        else if (type === 'custom') customCount++;
    });

    if (isFullGlam) {
        const freeSpecials = product.baseSlots;
        const paidSpecials = Math.max(0, specialCount - freeSpecials);
        
        basePriceElement.textContent = `Full Glam Base: ${product.fullGlam} JDs`;
        let charmText = `Charms: ${Math.min(specialCount, freeSpecials)}/${freeSpecials} free specials`;
        
        if (paidSpecials > 0) {
            charmText += `, ${paidSpecials} extra specials (+${(paidSpecials * 2).toFixed(2)} JDs)`;
        }
        if (rareCount > 0) {
            charmText += `, ${rareCount} rare (+${(rareCount * 3).toFixed(2)} JDs)`;
        }
        if (customCount > 0) {
            charmText += `, ${customCount} custom (+${(customCount * 3.5).toFixed(2)} JDs)`;
        }
        
        charmPriceElement.textContent = charmText;
    } else {
        const freeSpecials = product.includedSpecial;
        const paidSpecials = Math.max(0, specialCount - freeSpecials);
        
        basePriceElement.textContent = `Base Price: ${(product.basePrice + SIZE_CHARTS[currentProduct][currentSize].price).toFixed(2)} JDs`;
        let charmText = `Charms: ${Math.min(specialCount, freeSpecials)}/${freeSpecials} free specials`;
        
        if (paidSpecials > 0) {
            charmText += `, ${paidSpecials} paid specials (+${(paidSpecials * 2).toFixed(2)} JDs)`;
        }
        if (rareCount > 0) {
            charmText += `, ${rareCount} rare (+${(rareCount * 3).toFixed(2)} JDs)`;
        }
        if (customCount > 0) {
            charmText += `, ${customCount} custom (+${(customCount * 3.5).toFixed(2)} JDs)`;
        }
        
        charmPriceElement.textContent = charmText;
    }

    // Update total price display
    if (priceData.discount > 0) {
        totalPriceElement.innerHTML = `
            <div>
                <span style="text-decoration: line-through; color: #999; margin-right: 8px;">
                    ${priceData.subtotal.toFixed(2)} JDs
                </span>
                <span style="font-weight: bold; color: #d6336c;">
                    ${priceData.total.toFixed(2)} JDs
                </span>
            </div>
            <div style="color: #4CAF50; font-size: 0.9rem; margin-top: 4px;">
                You saved ${priceData.discount.toFixed(2)} JDs! (10% discount)
            </div>
        `;
    } else {
        totalPriceElement.innerHTML = `
            <span style="font-weight: bold; color: #d6336c;">
                ${priceData.total.toFixed(2)} JDs
            </span>
        `;
    }
    
    return priceData.total;
}

function initProduct(product) {
    if (!PRODUCTS[product]) return;

    currentProduct = product;
    
    // Update size options based on product type
    const sizeSelect = document.getElementById('size');
    if (sizeSelect) {
        // Clear existing options
        sizeSelect.innerHTML = '';
        
        // Get the size chart for current product
        const sizeChart = SIZE_CHARTS[product];
        
        // Add new options
        Object.entries(sizeChart).forEach(([size, data]) => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = data.display;
            sizeSelect.appendChild(option);
        });

        // Reset to first size
        currentSize = Object.keys(sizeChart)[0];
        sizeSelect.value = currentSize;
    }

    // Reset material to silver
    materialType = 'silver';
    document.querySelectorAll('.material-option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.material === 'silver') {
            opt.classList.add('selected');
        }
    });

    // Reset full glam
    isFullGlam = false;
    const fullGlamBtn = document.getElementById('full-glam-btn');
    if (fullGlamBtn) {
        fullGlamBtn.classList.remove('active');
    }

    // Clear all slots and create new ones based on selected size
    jewelryPiece.innerHTML = '';
    maxSlots = SIZE_CHARTS[product][currentSize].charms;

    for (let i = 0; i < maxSlots; i++) {
        const slot = createBaseSlot();
        jewelryPiece.appendChild(slot);
    }

    // Reset charm counts
    specialCount = 0;
    rareCount = 0;
    customCount = 0;
    includedSpecialUsed = 0;
    usedCharms.clear();

    // Update displays
    updateBaseCharms();
    updateCharmUsage();
    updatePrice();

    // Add product-specific class to body for CSS targeting
    document.body.classList.remove('product-bracelet', 'product-anklet', 'product-necklace', 'product-ring');
    document.body.classList.add(`product-${product}`);
}

function setupEventListeners() {
     try {
        const productBtns = document.querySelectorAll('.product-btn');
        const materialOptions = document.querySelectorAll('.material-option');
        const sizeSelect = document.getElementById('size');
        const fullGlamBtn = document.getElementById('full-glam-btn');
        const downloadBtn = document.getElementById('download-btn');
        const pricingToggle = document.getElementById('pricing-toggle');
        
        // Move the pricing toggle listener outside the if block
        if (pricingToggle) {
            pricingToggle.addEventListener('click', () => {
                const pricingInfo = document.querySelector('.pricing-info');
                if (pricingInfo) {
                    pricingInfo.classList.toggle('visible');
                    
                    // Update button text based on state
                    const btnText = pricingToggle.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = pricingInfo.classList.contains('visible') 
                            ? 'Hide Pricing' 
                            : 'Pricing';
                    }
                }
            });
        }

        // The rest of your event listeners...
        productBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const product = btn.dataset.type;
                productBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                initProduct(product);
            });
        });
        

       document.getElementById('translate-btn').addEventListener('click', function() {
  // Find the Google Translate dropdown and click it
  const googleDropdown = document.querySelector('.goog-te-menu-value');
  if (googleDropdown) {
    googleDropdown.click();
  } else {
    // Fallback in case Google Translate hasn't fully loaded
    alert('Translation is loading... Please try again in a moment.');
  }
});
        materialOptions.forEach(option => {
            option.addEventListener('click', () => {
                materialOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                materialType = option.dataset.material;
                updateBaseCharms();
                updatePrice();
            });
        });

        sizeSelect.addEventListener('change', () => {
            updateJewelrySize(sizeSelect.value);
            updatePrice();
        });

        if (fullGlamBtn) {
            fullGlamBtn.addEventListener('click', () => {
                isFullGlam = !isFullGlam;
                fullGlamBtn.classList.toggle('active');
                updatePrice();
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', async () => {
                try {
                    const jewelryPiece = document.getElementById('jewelry-piece');
                    if (!jewelryPiece) {
                        throw new Error('Jewelry piece container not found');
                    }

                    downloadBtn.disabled = true;
                    downloadBtn.textContent = 'Generating...';

                    const canvas = await html2canvas(jewelryPiece, {
                        useCORS: true,
                        allowTaint: true,
                        logging: true,
                        scale: 2
                    });
                    
                    const link = document.createElement('a');
                    link.download = 'bracelet-design.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                } catch (error) {
                    console.error('Download failed:', error);
                    alert('Could not generate image. Please try again.');
                } finally {
                    if (downloadBtn) {
                        downloadBtn.disabled = false;
                        downloadBtn.textContent = 'Download Design';
                    }
                }
            });
        }

        setupCategoryTabs();
        setupCartFunctionality();

    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

function setupCartFunctionality() {
    const cartElements = {
        cartButton: document.getElementById('cart-button'),
        cartPreview: document.getElementById('cart-preview'),
        cartCloseBtn: document.querySelector('.cart-close-btn'),
        addToCartBtn: document.getElementById('add-to-cart-bottom'),
        placeOrderBtn: document.getElementById('order-btn'),
        jewelryPiece: document.getElementById('jewelry-piece')
    };

    Object.entries(cartElements).forEach(([name, element]) => {
        console.log(`${name}: ${element ? 'Found' : 'Not found'}`);
    });

    const missingElements = Object.entries(cartElements)
        .filter(([_, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length > 0) {
        console.error('Missing cart elements:', missingElements);
        return;
    }

    cartElements.cartButton.addEventListener('click', () => {
        cartElements.cartPreview.classList.toggle('active');
        updateCartDisplay();
    });

    cartElements.cartCloseBtn.addEventListener('click', () => {
        cartElements.cartPreview.classList.remove('active');
    });

    document.getElementById('order-btn').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        document.getElementById('order-modal').classList.add('active');
        document.body.classList.add('modal-open');
        
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const deliveryFee = 2.5;
        const total = subtotal + deliveryFee;
        
        document.getElementById('order-subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)} JDs`;
        document.getElementById('order-delivery').textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
        document.getElementById('order-total-price').textContent = `Total: ${total.toFixed(2)} JDs`;
    });

  document.getElementById('add-to-cart-bottom').addEventListener('click', async () => {
    const addToCartBtn = document.getElementById('add-to-cart-bottom');
    
    try {
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';

        // Capture the design image
        const designImage = await captureBraceletDesign();

        // Get the price data - make sure this includes discount calculation
        const priceData = calculatePrice(false);
        
        // Create cart item with the discounted price
        const cartItem = {
            id: Date.now().toString(),
            product: currentProduct,
            symbol: '🍓',
            size: currentSize,
            isFullGlam: isFullGlam,
            materialType: materialType,
            price: priceData.total, // This should be the discounted price
            designImage: designImage,
            charms: Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])')).map(img => ({
                src: img.src,
                type: img.dataset.type
            })),
            timestamp: new Date().toISOString()
        };
            
        cart.push(cartItem);
        updateCartDisplay();
        
        alert('Design added to cart!');
        cartPreview.classList.add('active');
        
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Could not add design to cart. Please try again.');
    } finally {
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
    }
});
}
function validateCharmSets() {
    const invalidSets = [];
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])')).map(img => img.src);
    
    // Check each charm set requirement
    Object.values(CHARM_SETS).forEach(set => {
        const foundCharms = set.charms.filter(charm => 
            placedCharms.some(placed => placed.includes(charm))
        );
        
        // If some but not all charms from set are present
        if (foundCharms.length > 0 && foundCharms.length < set.requiredCount) {
            invalidSets.push(set);
        }
    });
    
    return invalidSets;
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function setupOrderFunctionality() {
    // First get ALL required elements
    orderModal = document.getElementById('order-modal');
    orderForm = document.getElementById('order-form');
    orderIdSpan = document.getElementById('order-id');
    payCliqOption = document.getElementById('pay-cliq');
    paymentProofContainer = document.getElementById('payment-proof-container');
    orderConfirmation = document.getElementById('order-confirmation');
    closeConfirmation = document.getElementById('close-confirmation');
    cancelOrderBtn = document.getElementById('cancel-order');
    payCliqRadio = document.getElementById('pay-cliq');
    placeOrderBtn = document.getElementById('order-btn');
    
    // Check for missing critical elements
    const requiredElements = [
        orderModal, orderForm, orderIdSpan, 
        document.getElementById('order-subtotal'),
        document.getElementById('order-delivery'),
        document.getElementById('order-total-price'),
        cancelOrderBtn,
        placeOrderBtn
    ];
    
    const missingElements = requiredElements
        .map((el, i) => !el ? ['order-modal','order-form','order-id',
                              'order-subtotal','order-delivery',
                              'order-total-price','cancel-order-btn',
                              'place-order-btn'][i] : null)
        .filter(Boolean);
    
    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements.join(', '));
        alert('Some order components failed to load. Please refresh the page.');
        return;
    }

    // Remove any existing event listeners to prevent duplicates
    orderForm.removeEventListener('submit', handleFormSubmit);
    placeOrderBtn.removeEventListener('click', handlePlaceOrderClick);
    cancelOrderBtn.removeEventListener('click', handleCancelOrder);
    if (closeConfirmation) closeConfirmation.removeEventListener('click', handleCloseConfirmation);
    if (payCliqRadio) payCliqRadio.removeEventListener('change', handlePaymentChange);

    function handlePaymentChange(e) {
        if (paymentProofContainer) {
            paymentProofContainer.style.display = e.target.checked ? 'block' : 'none';
            if (e.target.checked) {
                document.getElementById('payment-proof').required = true;
            } else {
                document.getElementById('payment-proof').required = false;
            }
        }
    }

    function handlePlaceOrderClick() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Calculate and display order summary
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const deliveryFee = 2.5;
        const total = subtotal + deliveryFee;
        
        document.getElementById('order-subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)} JDs`;
        document.getElementById('order-delivery').textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
        document.getElementById('order-total-price').textContent = `Total: ${total.toFixed(2)} JDs`;

        document.body.classList.add('modal-open');
        orderModal.classList.add('active');
    }
    
    function handleCancelOrder() {
        orderModal.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (orderForm) orderForm.reset();
        if (paymentProofContainer) paymentProofContainer.style.display = 'none';
    }

    function handleCloseConfirmation() {
        orderConfirmation.classList.remove('active');
        document.body.classList.remove('modal-open');
        // Reset the designer after successful order
        initProduct('bracelet');
    }

    async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submission started');

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');

    // Prevent multiple submissions
    if (window.orderSubmissionInProgress) return;
    window.orderSubmissionInProgress = true;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        // 1. Validate form fields
        const formData = new FormData(form);
        const requiredFields = ['full-name', 'phone', 'governorate', 'address', 'payment'];
        const missingFields = requiredFields.filter(field => !formData.get(field));
        
        if (missingFields.length > 0) {
            throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        }
        
        if (formData.get('payment') === 'Cliq' && !document.getElementById('payment-proof').files[0]) {
            throw new Error('Payment proof is required for Cliq payments');
        }
        
        // 2. Validate charm sets across all cart items
        const allCharms = cart.flatMap(item => item.charms.map(charm => charm.src));
        const invalidSets = [];
        
        Object.values(CHARM_SETS).forEach(set => {
            const foundCharms = set.charms.filter(charm => 
                allCharms.some(placed => placed.includes(charm))
            ).length;
            
            if (foundCharms > 0 && foundCharms < set.requiredCount) {
                invalidSets.push({
                    ...set,
                    currentCount: foundCharms
                });
            }
        });
        
        if (invalidSets.length > 0) {
            const errorMessages = invalidSets.map(set => 
                `${set.message}\n\nYou have: ${set.currentCount}/${set.requiredCount}`
            ).join('\n\n');
            throw new Error(`Please complete these charm sets:\n\n${errorMessages}`);
        }
        
        // 3. Upload design images for each item
        const cartWithImages = await Promise.all(cart.map(async (item) => {
            if (item.designImage) {
                try {
                    // Convert data URL to blob
                    const blob = await (await fetch(item.designImage)).blob();
                    // Upload to Firebase Storage
                    const downloadURL = await uploadImageToFirebase(blob, 'designs/');
                    return {
                        ...item,
                        imageUrl: downloadURL
                    };
                } catch (error) {
                    console.error('Error uploading design image:', error);
                    return item; // Return item without image if upload fails
                }
            }
            return item;
        }));

        // 4. Calculate order totals
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const deliveryFee = 2.5;
        const total = subtotal + deliveryFee;
        
        // 5. Create order data
        const orderData = {
            clientOrderId: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
            customer: {
                name: formData.get('full-name'),
                phone: formData.get('phone'),
                phone2: formData.get('phone2') || null,
                governorate: formData.get('governorate'),
                address: formData.get('address'),
                notes: formData.get('notes') || null
            },
            paymentMethod: formData.get('payment'),
            items: cartWithImages.map(item => ({
                product: item.product,
                size: item.size,
                price: item.price,
                imageUrl: item.imageUrl || null, // Use the uploaded URL
                isFullGlam: item.isFullGlam,
                materialType: item.materialType,
                charms: item.charms,
                timestamp: new Date().toISOString()
            })),
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            total: total,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'pending'
        };

        // 6. Upload payment proof if Cliq payment
        if (formData.get('payment') === 'Cliq') {
            const paymentProofFile = document.getElementById('payment-proof').files[0];
            if (!paymentProofFile) {
                throw new Error('Please upload payment proof for Cliq payment');
            }

            // Simple client-side validation
            if (paymentProofFile.size > 5 * 1024 * 1024) { // 5MB max
                throw new Error('Payment proof must be smaller than 5MB');
            }

            const fileExt = paymentProofFile.name.split('.').pop().toLowerCase();
            if (!['png', 'jpg', 'jpeg', 'pdf'].includes(fileExt)) {
                throw new Error('Only PNG, JPG, or PDF files allowed');
            }

            // Upload with order reference
            const fileName = `payment-proofs/${orderData.clientOrderId}_${Date.now()}.${fileExt}`;
            const storageRef = storage.ref(fileName);
            
            await storageRef.put(paymentProofFile, {
                contentType: paymentProofFile.type,
                customMetadata: {
                    orderId: orderData.clientOrderId,
                    phone: formData.get('phone') || 'none'
                }
            });
            
            orderData.paymentProofUrl = await storageRef.getDownloadURL();
        }
        
        // 7. Submit to Firestore
        const orderRef = await db.collection('orders').add(orderData);
        console.log('Order submitted with ID:', orderRef.id);

        // 8. Clear cart and reset form
        cart.length = 0;
        updateCartDisplay();
        form.reset();
        paymentProofContainer.style.display = 'none';

        // 9. Show confirmation
        orderIdSpan.textContent = orderRef.id;
        orderModal.classList.remove('active');
        orderConfirmation.classList.add('active');
        
    } catch (error) {
        console.error('Order submission failed:', error);
        alert(error.message || 'Order submission failed. Please check your connection and try again.');
    } finally {
        window.orderSubmissionInProgress = false;
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-check-circle"></i> Confirm Order';
    }
}
    // Add event listeners
    orderForm.addEventListener('submit', handleFormSubmit);
    placeOrderBtn.addEventListener('click', handlePlaceOrderClick);
    cancelOrderBtn.addEventListener('click', handleCancelOrder);
    closeConfirmation.addEventListener('click', handleCloseConfirmation);
    payCliqRadio.addEventListener('change', handlePaymentChange);

    // Initialize payment proof container state
    paymentProofContainer.style.display = 'none';

    console.log('Order functionality initialized successfully');
    window.orderFunctionalityInitialized = true;
}

function initJewelryPiece() {
    const jewelryPiece = document.getElementById('jewelry-piece');
    if (!jewelryPiece) {
        console.error('Jewelry piece container not found');
        return;
    }
    
    jewelryPiece.innerHTML = '';
    
    // Create slots based on initial size
    const initialSlots = SIZE_CHARTS[currentProduct][currentSize].charms;
    for (let i = 0; i < initialSlots; i++) {
        const slot = createBaseSlot();
        jewelryPiece.appendChild(slot);
    }
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
    const charmSrc = selectedCharm.dataset.charm;
    const charmSet = getCharmSet(charmSrc);
    
    if (charmSet) {
      // Check if we're adding the first charm of a set
      const placedCharms = Array.from(document.querySelectorAll('.slot img:not([data-type="base"])'))
        .map(img => img.dataset.charm);
      
      const hasOtherSetCharms = placedCharms.some(src => 
        charmSet.charms.some(charm => src.includes(charm))
      );
      
      // If this is the first charm of a set, just warn but allow adding
      if (!hasOtherSetCharms) {
        if (!confirm(`${charmSet.message}\n\nDo you want to add this charm anyway?`)) {
          return;
        }
      }
    }
    
    placeSelectedCharm(slot);
  } else if (slot.querySelector('img:not([data-type="base"])')) {
    removeCharmFromSlot(slot);
  }
}

function addCharmToSlot(slot, src, type, isSoldOut) {
  const charmSet = getCharmSet(src);
  
  if (charmSet) {
    const placedCharms = Array.from(document.querySelectorAll('.slot img:not([data-type="base"])'))
      .map(img => img.dataset.charm);
    
    const setCharmsPlaced = placedCharms
      .filter(placedSrc => charmSet.charms.some(charm => placedSrc.includes(charm)))
      .length;
    
    // Check if adding this charm would complete the set
    if (setCharmsPlaced + 1 === charmSet.requiredCount) {
      if (!confirm(`You're adding ${charmSet.requiredCount} ${charmSet.message.split(' ')[0]} charms. Continue?`)) {
        return false;
      }
    }
  }
  
  // Original charm placement logic
  const charm = document.createElement('img');
  charm.src = src.startsWith('data:') ? src : src.replace('bracelet-designer-main/', '');
  charm.dataset.type = type;
  charm.dataset.charm = src;
  
  if (isSoldOut) {
    charm.classList.add('sold-out');
  }
  
  slot.innerHTML = '';
  slot.appendChild(charm);
  
  if (!src) {
    usedCharms.add(charm.dataset.charm);
    if (charm.dataset.type === 'special') specialCount++;
    if (charm.dataset.type === 'rare') rareCount++;
  }
  
  return true;
}

function placeSelectedCharm(slot) {
    const charmSrc = selectedCharm.dataset.charm;
    const charmType = selectedCharm.dataset.type;
    let quantity = parseInt(selectedCharm.dataset.quantity) || 1;
    
    // First check if charm is out of stock
    if (selectedCharm.classList.contains('out-of-stock') || 
        selectedCharm.classList.contains('sold-out')) {
        alert('This charm is out of stock!');
        selectedCharm.classList.remove('selected');
        selectedCharm = null;
        return;
    }

    // For non-custom charms, check availability
    if (charmType !== 'custom') {
        if (quantity <= 0) {
            alert('This charm is out of stock!');
            selectedCharm.classList.remove('selected');
            selectedCharm = null;
            return;
        }
        
        // Check if this charm is already used (unless quantity > 1)
        if (usedCharms.has(charmSrc) && quantity <= 1) {
            alert('You can only add this charm once!');
            selectedCharm.classList.remove('selected');
            selectedCharm = null;
            return;
        }
    }

    // Handle long and dangly charm placement
    const isLongCharm = selectedCharm.classList.contains('long-charm');
    const isDanglyCharm = selectedCharm.classList.contains('dangly-charm');

    if (isLongCharm) {
        // Get the current slot index
        const slotIndex = Array.from(jewelryPiece.children).indexOf(slot);
        
        // Check if we have space for a long charm
        if (slotIndex + 1 >= jewelryPiece.children.length) {
            alert("Not enough space for a long charm at this position!");
            return;
        }
        
        // Create container for long charm
        const longContainer = document.createElement('div');
        longContainer.className = 'slot long-slot';
        longContainer.style.width = '200px';
        longContainer.style.height = '100px';
        longContainer.style.gridColumn = 'span 2';
        
        // Create the long charm image
        const longCharm = document.createElement('img');
        longCharm.src = selectedCharm.src.startsWith('data:') 
            ? selectedCharm.src 
            : selectedCharm.dataset.charm;
        longCharm.className = 'long-charm';
        longCharm.style.width = '200px';
        longCharm.style.height = '100px';
        longCharm.dataset.type = charmType;
        longCharm.dataset.charm = charmSrc;
        
        if (selectedCharm.classList.contains('sold-out')) {
            longCharm.classList.add('sold-out');
        }
        
        longContainer.appendChild(longCharm);
        
        // Replace the current slot and remove the next one
        const nextSlot = jewelryPiece.children[slotIndex + 1];
        slot.replaceWith(longContainer);
        nextSlot.remove();
        
        longContainer.addEventListener('click', function() {
            handleSlotClick(this);
        });
    } 
    else if (isDanglyCharm) {
        // For dangly charm, make the slot taller
        slot.classList.add('has-dangly');
        slot.style.height = '192px';
        
        const danglyImg = document.createElement('img');
        danglyImg.src = selectedCharm.src.startsWith('data:') 
            ? selectedCharm.src 
            : selectedCharm.dataset.charm;
        danglyImg.className = 'dangly-charm';
        danglyImg.style.width = '96px';
        danglyImg.style.height = '192px';
        danglyImg.dataset.type = charmType;
        danglyImg.dataset.charm = charmSrc;
        
        if (selectedCharm.classList.contains('sold-out')) {
            danglyImg.classList.add('sold-out');
        }
        
        // Clear slot and add dangly charm
        slot.innerHTML = '';
        slot.appendChild(danglyImg);
    }
    else {
        // Regular charm placement
        const src = selectedCharm.src.startsWith('data:') 
            ? selectedCharm.src 
            : selectedCharm.dataset.charm;
        
        const charmImg = document.createElement('img');
        charmImg.src = src;
        charmImg.style.width = '96px';
        charmImg.style.height = '96px';
        charmImg.dataset.type = charmType;
        charmImg.dataset.charm = src;
        
        if (selectedCharm.classList.contains('sold-out')) {
            charmImg.classList.add('sold-out');
        }
        
        slot.innerHTML = '';
        slot.appendChild(charmImg);
        
        // Update quantity only after successful placement
        if (charmType !== 'custom') {
            quantity--;
            selectedCharm.dataset.quantity = quantity;
            
            document.querySelectorAll(`.charm[data-charm="${charmSrc}"]`).forEach(charmEl => {
                charmEl.dataset.quantity = quantity;
                if (quantity <= 0) {
                    charmEl.classList.add('out-of-stock');
                    charmEl.style.opacity = '0.5';
                    charmEl.style.cursor = 'not-allowed';
                    usedCharms.add(charmSrc);
                }
            });
        } else {
            usedCharms.add(charmSrc);
        }
    }

    // Clear selection after placement
    selectedCharm.classList.remove('selected');
    selectedCharm = null;
    hideSelectedCharmPreview();
    updatePrice();
}
function removeCharmFromSlot(slot) {
    const charm = slot.querySelector('img:not([data-type="base"])');
    if (!charm) return;
    
    const isDangly = charm.classList.contains('dangly-charm') || 
                    (getCharmSet(charm.dataset.charm)?.isDangly);
    
    const charmSrc = charm.dataset.charm;
    const charmType = charm.dataset.type;
    const isLong = slot.classList.contains('long-slot');
    
    // Get the slot index before removal
    const slotIndex = Array.from(jewelryPiece.children).indexOf(slot);
    
    // Remove the slot completely
    slot.remove();
    
    if (isLong) {
        // For long charms, we need to add back two regular slots
        const newSlot1 = createBaseSlot();
        const newSlot2 = createBaseSlot();
        
        // Insert them at the correct position
        if (slotIndex >= 0) {
            jewelryPiece.insertBefore(newSlot1, jewelryPiece.children[slotIndex]);
            jewelryPiece.insertBefore(newSlot2, jewelryPiece.children[slotIndex + 1]);
        } else {
            // If for some reason we couldn't get the index, append to end
            jewelryPiece.appendChild(newSlot1);
            jewelryPiece.appendChild(newSlot2);
        }
    } else {
        // For regular charms, just add one slot back
        const newSlot = createBaseSlot();
        
        if (slotIndex >= 0) {
            jewelryPiece.insertBefore(newSlot, jewelryPiece.children[slotIndex]);
        } else {
            jewelryPiece.appendChild(newSlot);
        }
        
        // Remove dangly class if present
        if (isDangly) {
            newSlot.classList.remove('has-dangly');
        }
    }
    
    // For non-custom charms, restore quantity
    if (charmType !== 'custom') {
        // Find the charm in our data
        let charmData;
        if (charmType === 'special') {
            charmData = specialCharms.find(c => c.src === charmSrc);
        } else if (charmType === 'rare') {
            charmData = rareCharms.find(c => c.src === charmSrc);
        }
        
        if (charmData) {
            // Increment quantity
            charmData.quantity = (charmData.quantity || 0) + 1;
            
            // Update all instances of this charm in the UI
            document.querySelectorAll(`.charm[data-charm="${charmSrc}"]`).forEach(charmEl => {
                charmEl.dataset.quantity = charmData.quantity;
                charmEl.classList.remove('out-of-stock');
                charmEl.style.opacity = '1';
                charmEl.style.cursor = 'pointer';
                
                // Remove from usedCharms if quantity is now > 0
                if (charmData.quantity > 0) {
                    usedCharms.delete(charmSrc);
                }
            });
        }
    } else {
        // For custom charms, just remove from used set
        usedCharms.delete(charmSrc);
    }
    
    updateCharmUsage();
    updatePrice();
}

function createBaseSlot() {
    const slot = document.createElement('div');
    slot.className = 'slot';
    const img = document.createElement('img');
    img.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
    img.dataset.type = 'base';
    slot.appendChild(img);
    slot.addEventListener('click', function() {
        handleSlotClick(this);
    });
    return slot;
}

function initCharms() {
    updateSpecialCharmsDisplay();
    updateRareCharmsDisplay();
    
    // Add click handlers for charms
document.querySelectorAll('.charm').forEach(charm => {
      charm.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (this.classList.contains('selected')) {
          this.classList.remove('selected');
          hideSelectedCharmPreview();
          selectedCharm = null;
          return;
        }
        
        document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedCharm = this;
        updateSelectedCharmPreview(this);
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

    // Separate charms into available and out-of-stock
    let availableCharms = [];
    let outOfStockCharms = [];

    specialCharms.forEach(charm => {
        // First filter by category
        if (currentSpecialCategory !== 'all' && charm.category !== currentSpecialCategory) {
            return;
        }

        const isGoldVariant = charm.src.includes('-gold.png');
        const isOutOfStock = charm.quantity <= 0;

        // Only apply gold/silver filtering if this category has gold variants
        if (hasGoldVariants) {
            if (showGoldVariants) {
                if (isGoldVariant) {
                    if (isOutOfStock) outOfStockCharms.push(charm);
                    else availableCharms.push(charm);
                }
            } else {
                if (!isGoldVariant) {
                    if (isOutOfStock) outOfStockCharms.push(charm);
                    else availableCharms.push(charm);
                }
            }
            return;
        }

        // If category has no gold variants, show all charms
        if (isOutOfStock) outOfStockCharms.push(charm);
        else availableCharms.push(charm);
    });

    // Display available charms first
    availableCharms.forEach(charm => {
        createAndAppendCharm(charm);
    });

    // Display out-of-stock charms at the end
    outOfStockCharms.forEach(charm => {
        createAndAppendCharm(charm, true);
    });

    // Add gold toggle button if needed
    if (hasGoldVariants) {
        const toggleContainer = document.createElement('div');
        toggleContainer.style.cssText = 'width:100%; display:flex; justify-content:center; margin:1rem 0; padding-top:1rem; border-top:1px dashed #f5a0c2;';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn';
        toggleBtn.textContent = showGoldVariants ? 'Show Silver' : 'Show Gold';
        toggleBtn.style.cssText = 'min-width:120px; background:' + (showGoldVariants ? '#d6336c' : '#fff') + 
                                 '; color:' + (showGoldVariants ? '#fff' : '#d6336c') + 
                                 '; border:2px solid #d6336c; border-radius:20px; padding:0.5rem 1.5rem; font-weight:bold;';

        toggleBtn.onclick = () => {
            showGoldVariants = !showGoldVariants;
            updateSpecialCharmsDisplay();
            updateRareCharmsDisplay();
        };

        toggleContainer.appendChild(toggleBtn);
        specialCharmsGrid.appendChild(toggleContainer);
    }

    function createAndAppendCharm(charm, isOutOfStock = false) {
        const charmElement = createCharm(charm.src, `Special Charm ${charm.src}`, 'special');
        charmElement.classList.add('special');
        charmElement.dataset.charm = charm.src;
        charmElement.dataset.category = charm.category;
        charmElement.dataset.quantity = charm.quantity || 1;
        
        // Check if it's a long charm
        const isLongCharm = charm.src.includes('long');
        if (isLongCharm) {
            charmElement.classList.add('long-charm');
        }
        
        // Moved the out-of-stock handling here where charmElement is defined
        if (isOutOfStock || charm.quantity <= 0) {
            charmElement.classList.add('out-of-stock');
            charmElement.classList.add('sold-out');
            charmElement.style.opacity = '0.5';
            charmElement.style.cursor = 'not-allowed';
        }

        if (usedCharms.has(charm.src)) {
            charmElement.classList.add('used');
        }

        charmElement.addEventListener('click', () => {
            const quantity = parseInt(charmElement.dataset.quantity) || 1;
            if (quantity <= 0) return;
            if (quantity === 1 && usedCharms.has(charm.src)) return;
            
            document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
            charmElement.classList.add('selected');
            selectedCharm = charmElement;
        });

        specialCharmsGrid.appendChild(charmElement);
    }
}
function updateRareCharmsDisplay() {
    rareCharmsGrid.innerHTML = '';
 
    // Check if the current category has any gold variants (excluding the 'gold' category)
    const hasGoldVariants = rareCharms.some(charm => {
        if (currentRareCategory === 'all') {
            return charm.src.includes('-gold.png') && charm.category !== 'gold';
        }
        return charm.src.includes('-gold.png') && 
               charm.category !== 'gold' && 
               charm.category === currentRareCategory;
    });

    // Separate charms into different groups
    let availableCharms = [];
    let outOfStockCharms = [];
    let danglyCharms = [];
    let goldDanglyCharms = [];

    rareCharms.forEach(charm => {
        // First filter by category
        if (currentRareCategory !== 'all' && charm.category !== currentRareCategory) {
            return;
        }

        const isGoldVariant = charm.src.includes('-gold.png') || charm.category === 'gold';
        const isDangly = charm.src.includes('dangly') || charm.category === 'dangly';
        const isOutOfStock = charm.quantity <= 0;

        // Special handling for gold category - always show regardless of toggle
        if (charm.category === 'gold') {
            if (isOutOfStock) {
                outOfStockCharms.push(charm);
            } else {
                availableCharms.push(charm);
            }
            return;
        }

        // Handle dangly charms separately
        if (isDangly) {
            if (isGoldVariant) {
                // Gold dangly charms
                if (isOutOfStock) {
                    outOfStockCharms.push({...charm, isGold: true});
                } else {
                    goldDanglyCharms.push({...charm, isGold: true});
                }
            } else {
                // Regular dangly charms
                if (isOutOfStock) {
                    outOfStockCharms.push(charm);
                } else {
                    danglyCharms.push(charm);
                }
            }
            return;
        }

        // For non-dangly charms, apply gold filtering if needed
        if (hasGoldVariants) {
            if (showGoldVariants) {
                if (isGoldVariant) {
                    if (isOutOfStock) outOfStockCharms.push(charm);
                    else availableCharms.push(charm);
                }
            } else {
                if (!isGoldVariant) {
                    if (isOutOfStock) outOfStockCharms.push(charm);
                    else availableCharms.push(charm);
                }
            }
            return;
        }

        // If no gold variants in this category, show all charms
        if (isOutOfStock) outOfStockCharms.push(charm);
        else availableCharms.push(charm);
    });

    // Display available charms first
    availableCharms.forEach(charm => {
        createAndAppendCharm(charm);
    });

    // Display dangly charms based on gold toggle
    if (showGoldVariants) {
        goldDanglyCharms.forEach(charm => {
            createAndAppendCharm(charm, false, true);
        });
    } else {
        danglyCharms.forEach(charm => {
            createAndAppendCharm(charm, false, true);
        });
    }

    // Display out-of-stock charms last
    outOfStockCharms.forEach(charm => {
        createAndAppendCharm(charm, true, charm.isGold);
    });

    // Only add gold toggle if there are gold variants (excluding the gold category)
    if (hasGoldVariants) {
        const toggleContainer = document.createElement('div');
        toggleContainer.style.cssText = 'width:100%; display:flex; justify-content:center; margin:1rem 0; padding-top:1rem; border-top:1px dashed #f5a0c2;';

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'btn';
        toggleBtn.textContent = showGoldVariants ? 'Show Silver' : 'Show Gold';
        toggleBtn.style.cssText = 'min-width:120px; background:' + (showGoldVariants ? '#d6336c' : '#fff') + 
                                 '; color:' + (showGoldVariants ? '#fff' : '#d6336c') + 
                                 '; border:2px solid #d6336c; border-radius:20px; padding:0.5rem 1.5rem; font-weight:bold;';

        toggleBtn.onclick = () => {
            showGoldVariants = !showGoldVariants;
            updateRareCharmsDisplay();
            updateSpecialCharmsDisplay();
        };

        toggleContainer.appendChild(toggleBtn);
        rareCharmsGrid.appendChild(toggleContainer);
    }

    function createAndAppendCharm(charm, isOutOfStock = false, isDangly = false) {
        const charmElement = createCharm(charm.src, `Rare Charm ${charm.name || charm.src}`, 'rare', isDangly);
        charmElement.classList.add('rare');
        charmElement.dataset.charm = charm.src;
        charmElement.dataset.category = charm.category;
        
        if (isDangly) {
            charmElement.classList.add('dangly-charm');
            charmElement.style.width = '48px';
            charmElement.style.height = '96px';
        }

        if (isOutOfStock || charm.quantity <= 0) {
            charmElement.classList.add('out-of-stock');
            charmElement.classList.add('sold-out');
            charmElement.style.opacity = '0.5';
            charmElement.style.cursor = 'not-allowed';
        }

        if (usedCharms.has(charm.src)) {
            charmElement.classList.add('used');
        }

        charmElement.addEventListener('click', () => {
            const quantity = charm.quantity || 1;
            if (quantity <= 0) return;
            if (quantity === 1 && usedCharms.has(charm.src)) return;
            
            document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
            charmElement.classList.add('selected');
            selectedCharm = charmElement;
        });

        rareCharmsGrid.appendChild(charmElement);
    }
}
async function saveDesignPermanently(blob) {
  try {
    const timestamp = Date.now();
    const filename = `designs/design-${timestamp}.png`;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(filename).put(blob, {
      contentType: 'image/png'
    });
    
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        null, // Progress handler (optional)
        (error) => {
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            resolve(downloadURL);
          } catch (error) {
            console.error('Error getting download URL:', error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error saving design:', error);
    throw error;
  }
}


function createCharm(src, alt, type, isDangly = false) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'charm';
    img.dataset.type = type;
    img.dataset.charm = src;
    
    const charmSet = getCharmSet(src);
    const shouldBeDangly = isDangly || (charmSet && charmSet.isDangly);
    
    if (shouldBeDangly || src.includes('dangly')) {
        img.classList.add('dangly-charm');
        img.style.width = '50px';  // Consistent pool size
        img.style.height = '100px'; // Consistent pool size
    } else if (src.includes('long')) {
        img.classList.add('long-charm');
        img.style.width = '100px';  // Consistent pool size
        img.style.height = '50px';  // Consistent pool size
    } else {
        img.style.width = '45px';
        img.style.height = '45px';
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
    // Special charms categories - select first category by default
    let firstSpecialCategory = null;
    specialCategoryTabs.forEach((tab, index) => {
        if (index === 0) {
            firstSpecialCategory = tab.dataset.category;
        }
        tab.addEventListener('click', () => {
            specialCategoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentSpecialCategory = tab.dataset.category;
            updateSpecialCharmsDisplay();
        });
    });

    // Set first category as default for special charms
    if (firstSpecialCategory) {
        currentSpecialCategory = firstSpecialCategory;
        specialCategoryTabs[0].classList.add('active');
        updateSpecialCharmsDisplay();
    }

    // Rare charms categories - select first category by default
    let firstRareCategory = null;
    rareCategoryTabs.forEach((tab, index) => {
        if (index === 0) {
            firstRareCategory = tab.dataset.category;
        }
        tab.addEventListener('click', () => {
            rareCategoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentRareCategory = tab.dataset.category;
            updateRareCharmsDisplay();
        });
    });

    // Set first category as default for rare charms
    if (firstRareCategory) {
        currentRareCategory = firstRareCategory;
        rareCategoryTabs[0].classList.add('active');
        updateRareCharmsDisplay();
    }
}

function setupCustomCharmHandlers() {
    // Get DOM elements
    const customCharmUpload = document.getElementById('custom-charm-upload');
    const customCharmPreview = document.getElementById('custom-charm-preview');
    const addCustomCharmBtn = document.getElementById('add-custom-charm');

    if (!customCharmUpload || !customCharmPreview || !addCustomCharmBtn) {
        console.error('Custom charm elements not found');
        return;
    }

    // Handle file selection
    customCharmUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            customCharmPreview.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            customCharmPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    // Handle add custom charm button
    addCustomCharmBtn.addEventListener('click', function() {
        const img = customCharmPreview.querySelector('img');
        if (!img) {
            alert('Please upload an image first');
            return;
        }

        // Create a custom charm object
        const customCharm = {
            src: img.src,
            type: 'custom',
            element: img.cloneNode(true)
        };

        // Set this as the selected charm
        selectedCharm = customCharm.element;
        selectedCharm.dataset.type = 'custom';
        selectedCharm.dataset.charm = img.src;
        selectedCharm.classList.add('custom-charm');

        // Clear the upload
        customCharmPreview.innerHTML = '<span>Preview</span>';
        customCharmUpload.value = '';

        // Highlight the charm as selected
        document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
        selectedCharm.classList.add('selected');
    });
}

function updateJewelrySize(size) {
    // Get the size chart for current product
    const sizeChart = SIZE_CHARTS[currentProduct];
    
    // Verify the size exists for current product
    if (!sizeChart || !sizeChart[size]) return;
    
    const oldSize = currentSize;
    currentSize = size;
    
    // Update max slots based on current product and size
    maxSlots = sizeChart[size].charms;
    
    // Get current charm configuration before changing size
    const currentConfig = [];
    const slots = Array.from(jewelryPiece.children);
    slots.forEach(slot => {
        const charm = slot.querySelector('img:not([data-type="base"])');
        if (charm) {
            currentConfig.push({
                isLong: slot.classList.contains('long-slot'),
                src: charm.dataset.charm,
                type: charm.dataset.type,
                isSoldOut: charm.classList.contains('sold-out')
            });
        } else {
            currentConfig.push(null);
        }
    });

    // Clear and rebuild with new size
    jewelryPiece.innerHTML = '';
    
    // Create new slots
    for (let i = 0; i < maxSlots; i++) {
        const slot = createBaseSlot();
        jewelryPiece.appendChild(slot);
    }

    // Reapply charms up to new size limit
    let slotIndex = 0;
    let charmsAdded = 0;
    
    currentConfig.forEach((config, i) => {
        if (charmsAdded >= maxSlots) return;
        
        if (config) {
            const currentSlot = jewelryPiece.children[slotIndex];
            if (!currentSlot) return;
            
            if (config.isLong && slotIndex < maxSlots - 1) {
                // Handle long charm placement
                const nextSlot = jewelryPiece.children[slotIndex + 1];
                if (nextSlot && charmsAdded < maxSlots - 1) {
                    const longContainer = document.createElement('div');
                    longContainer.className = 'slot long-slot';
                    
                    const longCharm = document.createElement('img');
                    longCharm.src = config.src;
                    longCharm.className = 'long-charm';
                    longCharm.dataset.type = config.type;
                    longCharm.dataset.charm = config.src;
                    
                    if (config.isSoldOut) {
                        longCharm.classList.add('sold-out');
                    }
                    
                    longContainer.appendChild(longCharm);
                    currentSlot.replaceWith(longContainer);
                    nextSlot.remove();
                    
                    longContainer.addEventListener('click', function() {
                        handleSlotClick(this);
                    });
                    
                    slotIndex += 2;
                    charmsAdded += 2;
                }
            } else if (!config.isLong) {
                // Regular charm placement
                addCharmToSlot(currentSlot, config.src, config.type, config.isSoldOut);
                slotIndex++;
                charmsAdded++;
            }
        } else {
            slotIndex++;
        }
    });

    // If increasing size, add empty slots if needed
    while (jewelryPiece.children.length < maxSlots) {
        const slot = createBaseSlot();
        jewelryPiece.appendChild(slot);
    }
    
    updateCharmUsage();
    updatePrice();
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize Firebase if not already initialized
        if (!window.firebaseInitialized) {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                console.log('Firebase initialized successfully');
            }
            db = firebase.firestore();
            storage = firebase.storage();
            window.firebaseInitialized = true;
        }

        // Get DOM elements
        jewelryPiece = document.getElementById('jewelry-piece');
        specialCharmsGrid = document.getElementById('special-charms');
        rareCharmsGrid = document.getElementById('rare-charms');
        customCharmUpload = document.getElementById('custom-charm-upload');
        customCharmPreview = document.getElementById('custom-charm-preview');
        addCustomCharmBtn = document.getElementById('add-custom-charm');
        specialCategoryTabs = document.querySelectorAll('#special-categories .category-tab');
        rareCategoryTabs = document.querySelectorAll('#rare-categories .category-tab');
        
        // Cart elements
        cartButton = document.getElementById('cart-button');
        cartPreview = document.getElementById('cart-preview');
        cartCloseBtn = document.querySelector('.cart-close-btn');
        addToCartBtn = document.getElementById('add-to-cart-bottom');
        cartItems = document.getElementById('cart-items');
        placeOrderBtn = document.getElementById('order-btn');
        // Order elements
        orderModal = document.getElementById('order-modal');
        orderForm = document.getElementById('order-form');
        payCliqOption = document.getElementById('pay-cliq');
        paymentProofContainer = document.getElementById('payment-proof-container');
        orderConfirmation = document.getElementById('order-confirmation');
        closeConfirmation = document.getElementById('close-confirmation');
        orderIdSpan = document.getElementById('order-id');

        // Set default product to bracelet
        currentProduct = 'bracelet';
        currentSize = '15.2-16.2';
        maxSlots = SIZE_CHARTS[currentProduct][currentSize].charms;
        
        // Initialize bracelet by default
        const braceletBtn = document.querySelector('.product-btn[data-type="bracelet"]');
        if (braceletBtn) {
            braceletBtn.classList.add('active');
        }
        
        // Initialize jewelry piece with bracelet
        initJewelryPiece();
        
        // Initialize size selector with bracelet sizes
        const sizeSelect = document.getElementById('size');
        if (sizeSelect) {
            sizeSelect.innerHTML = '';
            Object.entries(SIZE_CHARTS.bracelet).forEach(([size, data]) => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = data.display;
                sizeSelect.appendChild(option);
            });
            sizeSelect.value = currentSize;
        }
        
        // Initialize material selector
        const silverOption = document.querySelector('.material-option[data-material="silver"]');
        if (silverOption) {
            silverOption.classList.add('selected');
        }
        
        // Set up event listeners
        setupEventListeners();
        
        // Set up custom charm handlers
        if (customCharmUpload && customCharmPreview && addCustomCharmBtn) {
            setupCustomCharmHandlers();
        }

        // Initialize order functionality if not already done
        if (!window.orderFormInitialized) {
            setupOrderFunctionality();
            window.orderFormInitialized = true;
        }
        
        // Update price display
        updatePrice();
        
        // Initialize charm displays
        updateSpecialCharmsDisplay();
        updateRareCharmsDisplay();
        
    } catch (error) {
        console.error('Initialization error:', error);
        alert('Failed to initialize application. Please refresh the page.');
    }
});
