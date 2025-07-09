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
let individualSlotCount = 1;
const maxIndividualSlots = 10;
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
    },
    individual: { // Add this if you want individual charms to have sizes
        'default': { charms: 1, price: 0, display: 'Individual Charm' }
    }
};

const PRODUCTS = {
    bracelet: { basePrice: 10, baseSlots: 18, includedSpecial: 1, fullGlam: 29 },
    anklet: { basePrice: 15, baseSlots: 23, includedSpecial: 1, fullGlam: 42 },
    necklace: { basePrice: 22, baseSlots: 34, includedSpecial: 1, fullGlam: 64 },
    ring: { basePrice: 7.5, baseSlots: 7, includedSpecial: 1, fullGlam: 15 },
    individual: { basePrice: 3, baseSlots: 1, includedSpecial: 0, fullGlam: 0 }

};
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
  },
  dophinset: {
    charms: ['rares/love/c218.png', 'rares/love/c219.png'],
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
function createBaseSlot() {
    const slot = document.createElement('div');
    slot.className = 'slot';
    // ... rest of slot creation
    
    // Add animation class
    slot.classList.add('adding');
    setTimeout(() => slot.classList.remove('adding'), 500);
    
    return slot;
}
// Modify your captureBraceletDesign function to use this:
async function captureBraceletDesign() {
    const jewelryPiece = document.getElementById('jewelry-piece');
    if (!jewelryPiece) {
        throw new Error('Jewelry piece container not found');
    }

    // Store original styles
    const originalStyles = {
        overflow: jewelryPiece.style.overflow,
        flexWrap: jewelryPiece.style.flexWrap,
        padding: jewelryPiece.style.padding
    };

    try {
        // Apply temporary styles for capture
        jewelryPiece.style.overflow = 'visible';
        jewelryPiece.style.flexWrap = 'nowrap';
        jewelryPiece.style.padding = '5px';

        // Calculate required width
        const slots = jewelryPiece.querySelectorAll('.slot');
        let totalWidth = Array.from(slots).reduce((sum, slot) => {
            return sum + slot.offsetWidth + 4; // 4px for gap
        }, 0);

        // Set minimum width
        totalWidth = Math.max(totalWidth, jewelryPiece.offsetWidth);

        const options = {
            useCORS: true,
            allowTaint: false,
            scale: 2,
            logging: true,
            backgroundColor: null,
            width: totalWidth,
            height: jewelryPiece.offsetHeight,
            scrollX: 0,
            scrollY: 0,
            windowWidth: totalWidth,
            windowHeight: jewelryPiece.offsetHeight,
            onclone: (clonedDoc) => {
                // Ensure cloned elements have same visibility
                const clonedElement = clonedDoc.getElementById('jewelry-piece');
                if (clonedElement) {
                    clonedElement.style.overflow = 'visible';
                    clonedElement.style.flexWrap = 'nowrap';
                }
            }
        };

        const canvas = await html2canvas(jewelryPiece, options);
        return canvas.toDataURL('image/png', 1.0);

    } catch (error) {
        console.error('Capture failed:', error);
        throw new Error('Could not generate design image. Please try again.');
    } finally {
        // Restore original styles
        jewelryPiece.style.overflow = originalStyles.overflow;
        jewelryPiece.style.flexWrap = originalStyles.flexWrap;
        jewelryPiece.style.padding = originalStyles.padding;
    }
}
function calculatePrice(includeDelivery = false) {
    // Handle individual charms separately
    if (currentProduct === 'individual') {
        const basePrice = 3; // Fixed base price for individual charms
        let charmCost = 0;
        
        const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));
        placedCharms.forEach(charm => {
            if (charm.classList.contains('long-charm')) {
                charmCost += 6; // Long charm price
            } else if (charm.dataset.type === 'special') {
                charmCost += 2;
            } else if (charm.dataset.type === 'rare') {
                charmCost += 3;
            } else if (charm.dataset.type === 'custom') {
                charmCost += 3.5;
            }
        });
        
        const subtotal = basePrice + charmCost;
        const total = includeDelivery ? subtotal + 2.5 : subtotal;
        
        return {
            subtotal: subtotal,
            discount: 0,
            total: total,
            delivery: includeDelivery ? 2.5 : 0
        };
    }

    const product = PRODUCTS[currentProduct];
    const sizeData = SIZE_CHARTS[currentProduct][currentSize];
    
    // Calculate base price
    let originalPrice = isFullGlam ? product.fullGlam : (product.basePrice + sizeData.price);
    let totalPrice = originalPrice;

    // Apply material upgrades
    if (materialType === 'gold') {
        totalPrice += 1;
        originalPrice += 1;
    } else if (materialType === 'mix') {
        totalPrice += 2.5;
        originalPrice += 2.5;
    }
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));

    // Count all placed charms
    let specialCount = 0;
    let rareCount = 0;
    let customCount = 0;
    let longCount = 0;

    placedCharms.forEach(charm => {
        if (charm.classList.contains('long-charm')) {
            longCount++;
        } else {
            const type = charm.dataset.type;
            if (type === 'special') specialCount++;
            else if (type === 'rare') rareCount++;
            else if (type === 'custom') customCount++;
        }
    });

    // Apply charm costs to both prices
    if (!isFullGlam) {
        const includedSpecials = product.includedSpecial;
        const paidSpecials = Math.max(0, specialCount - includedSpecials);
        totalPrice += paidSpecials * 2;
        originalPrice += paidSpecials * 2;
    }

    totalPrice += rareCount * 3;
    originalPrice += rareCount * 3;
    
    totalPrice += customCount * 3.5;
    originalPrice += customCount * 3.5;
    
    // Add long charm pricing
    totalPrice += longCount * 6;
    originalPrice += longCount * 6;

    // Check for discount eligibility
    const currentDate = new Date();
    const discountEndDate = new Date('2025-07-25');
    let discountApplied = 0;
    
    if (currentDate <= discountEndDate && originalPrice >= 15) {
        discountApplied = Math.min(originalPrice * 0.1, 5);
        totalPrice = originalPrice - discountApplied;
    }

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
    
    // Extract charm name from src
    const charmSrc = charmElement.src;
    let charmName = 'Custom Charm';
    
    if (charmSrc.includes('special/')) {
        charmName = charmSrc.split('special/')[1].split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
    } else if (charmSrc.includes('rare/')) {
        charmName = charmSrc.split('rare/')[1].split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
    }
    
    previewName.textContent = charmName.charAt(0).toUpperCase() + charmName.slice(1);
    
    if (charmElement.classList.contains('long-charm')) {
        previewType.textContent = 'Long Charm (+6 JDs)';
    } else if (charmElement.dataset.type === 'special') {
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
      const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    const discountedSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 2.5;
    
    // Calculate additional cart-level discount if applicable
    const currentDate = new Date();
    const discountEndDate = new Date('2024-07-25');
    let additionalDiscount = 0;
    
    if (currentDate <= discountEndDate && subtotal >= 15) {
        const potentialDiscount = subtotal * 0.1;
        const alreadyDiscounted = subtotal - discountedSubtotal;
        additionalDiscount = Math.min(potentialDiscount - alreadyDiscounted, 5 - alreadyDiscounted);
    }
    
    const total = discountedSubtotal - additionalDiscount + deliveryFee;

    // Display items with their discounted prices
    cart.forEach((item, index) => {
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
    cartSubtotal.textContent = `Subtotal: ${discountedSubtotal.toFixed(2)} JDs`;
    document.getElementById('cart-delivery').textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
    
    if (additionalDiscount > 0) {
        cartDiscountInfo.style.display = 'block';
        cartDiscountAmount.textContent = `Additional Discount: -${additionalDiscount.toFixed(2)} JDs`;
        
        cartTotal.innerHTML = `
            <div>
                <span style="text-decoration: line-through; color: #999; margin-right: 8px;">
                    ${(discountedSubtotal + deliveryFee).toFixed(2)} JDs
                </span>
                <span style="font-weight: bold; color: #d6336c;">
                    ${total.toFixed(2)} JDs
                </span>
            </div>
            <div style="color: #4CAF50; font-size: 0.9rem; margin-top: 4px;">
                You saved ${(subtotal - discountedSubtotal + additionalDiscount).toFixed(2)} JDs!
            </div>
        `;
    } else {
        cartDiscountInfo.style.display = 'none';
        cartTotal.textContent = `Total: ${(discountedSubtotal + deliveryFee).toFixed(2)} JDs`;
    }

    // Reattach event listeners
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeFromCart(index);
        });
    });
}
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartDisplay();
        // Optional: Show a confirmation message
        showToast('Item removed from cart');
    }
}
function updatePrice() {
    const priceData = calculatePrice(false);
    const basePriceElement = document.getElementById('base-price');
    const charmPriceElement = document.getElementById('charm-price');
    const totalPriceElement = document.getElementById('total-price');
    const discountMessageElement = document.getElementById('discount-message');
    const product = PRODUCTS[currentProduct];
    const subtotal = priceData.subtotal;
    const needsForDiscount = Math.max(0, 15 - subtotal).toFixed(2);

    if (currentProduct === 'individual') {
        // For individual mode, show simple breakdown
        basePriceElement.innerHTML = `
            <span>Base Price:</span>
            <span>3.00 JDs</span>
        `;
        
        const charmCost = priceData.total - 3;
        charmPriceElement.innerHTML = `
            <span>Charms:</span>
            <span>${charmCost.toFixed(2)} JDs</span>
        `;
        
        totalPriceElement.textContent = `Total: ${priceData.total.toFixed(2)} JDs`;
        discountMessageElement.innerHTML = '';
    } else {
        // Update base price display
        if (isFullGlam) {
            basePriceElement.innerHTML = `Full Glam Base: ${product.fullGlam.toFixed(2)} JDs`;
        } else {
            const basePrice = product.basePrice + SIZE_CHARTS[currentProduct][currentSize].price;
            basePriceElement.innerHTML = `Base Price: ${basePrice.toFixed(2)} JDs`;
        }

        // Update charm breakdown
        const charmText = getCharmBreakdownText();
        charmPriceElement.textContent = charmText;

        // Always show discount if applicable
        if (priceData.discount > 0) {
            totalPriceElement.innerHTML = `
                <div class="price-comparison">
                    <span class="original-price">${subtotal.toFixed(2)} JDs</span>
                    <span>→</span>
                    <span class="discounted-price">${priceData.total.toFixed(2)} JDs</span>
                </div>
                <div class="savings-notice">You saved ${priceData.discount.toFixed(2)} JDs!</div>
            `;
            discountMessageElement.innerHTML = '<div class="discount-badge">10% OFF</div>';
        } else {
            totalPriceElement.innerHTML = `Total: ${priceData.total.toFixed(2)} JDs`;
            if (subtotal < 15) {
                discountMessageElement.innerHTML = `
                    <div class="discount-promo">
                        <i class="fas fa-tag"></i> Add ${needsForDiscount} JD more to get 10% OFF!
                    </div>
                `;
            } else {
                discountMessageElement.innerHTML = '';
            }
        }
    }
}

function getCharmBreakdownText() {
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));
    let specialCount = 0, rareCount = 0, customCount = 0, longCount = 0;

    placedCharms.forEach(charm => {
        if (charm.classList.contains('long-charm')) {
            longCount++;
        } else {
            const type = charm.dataset.type;
            if (type === 'special') specialCount++;
            else if (type === 'rare') rareCount++;
            else if (type === 'custom') customCount++;
        }
    });

    const product = PRODUCTS[currentProduct];
    const freeSpecials = isFullGlam ? product.baseSlots : product.includedSpecial;
    const paidSpecials = Math.max(0, specialCount - freeSpecials);

    let text = `Charms: ${Math.min(specialCount, freeSpecials)}/${freeSpecials} free specials`;
    if (paidSpecials > 0) text += `, ${paidSpecials} paid (+${(paidSpecials * 2).toFixed(2)} JD)`;
    if (rareCount > 0) text += `, ${rareCount} rare (+${(rareCount * 3).toFixed(2)} JD)`;
    if (customCount > 0) text += `, ${customCount} custom (+${(customCount * 3.5).toFixed(2)} JD)`;
    if (longCount > 0) text += `, ${longCount} long (+${(longCount * 6).toFixed(2)} JD)`;

    return text;
}

function initProduct(product) {
    // Validate the product type
    const validProducts = ['bracelet', 'anklet', 'necklace', 'ring', 'individual'];
    if (!validProducts.includes(product)) {
        console.error(`Invalid product type: ${product}`);
        return;
    }

    currentProduct = product;
    
    // Reset to default size for the product (except individual)
    if (product !== 'individual') {
        // Safely get the first available size
        const productSizes = SIZE_CHARTS[product];
        if (productSizes && Object.keys(productSizes).length > 0) {
            currentSize = Object.keys(productSizes)[0];
        } else {
            console.error(`No sizes defined for product: ${product}`);
            currentSize = 'default';
        }
    }

    // Get UI elements
    const individualControls = document.getElementById('individual-controls');
    const sizeSelect = document.getElementById('size');
    const materialSelector = document.querySelector('.material-selector');
    const fullGlamBtn = document.getElementById('full-glam-btn');
    const addCharmsLabel = document.querySelector('.add-charms-label');

    // Handle individual charms mode
    if (product === 'individual') {
        // Show individual controls
        if (individualControls) individualControls.style.display = 'flex';
        
        // Hide irrelevant elements
        if (sizeSelect) sizeSelect.style.display = 'none';
        if (materialSelector) materialSelector.style.display = 'none';
        if (fullGlamBtn) fullGlamBtn.style.display = 'none';
        if (addCharmsLabel) addCharmsLabel.style.display = 'none';
        
        // Reset and update
        individualSlotCount = 1;
        updateIndividualSlots();
    } 
    // Handle jewelry products (bracelet, anklet, necklace, ring)
    else {
        // Hide individual controls
        if (individualControls) individualControls.style.display = 'none';
        
        // Show relevant elements
        if (sizeSelect) {
            sizeSelect.style.display = '';
            updateSizeOptions(product);
            sizeSelect.value = currentSize;
        }
        if (materialSelector) materialSelector.style.display = '';
        if (fullGlamBtn) fullGlamBtn.style.display = '';
        if (addCharmsLabel) addCharmsLabel.style.display = '';
        
        // Initialize jewelry piece with correct slots
        initJewelryPiece();
        
        // Reset full glam mode when switching products
        isFullGlam = false;
        if (fullGlamBtn) fullGlamBtn.classList.remove('active');
    }
    
    // Update material display
    updateBaseCharms();
    
    // Always update the price display
    updatePrice();
}
function updateSizeOptions(product) {
    const sizeSelect = document.getElementById('size');
    if (!sizeSelect) return;
    
    sizeSelect.innerHTML = '';
    
    const sizes = SIZE_CHARTS[product];
    if (!sizes) return;
    
    Object.entries(sizes).forEach(([size, data]) => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = data.display;
        sizeSelect.appendChild(option);
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

function createSlotWithControls(index, isLast = false) {
    const container = document.createElement('div');
    container.className = 'slot-container';
    
    // Create the slot
    const slot = document.createElement('div');
    slot.className = 'slot individual-slot';
    slot.dataset.index = index;
    
    // Add base charm
    const img = document.createElement('img');
    img.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
    img.dataset.type = 'base';
    slot.appendChild(img);
    
    // Add click handler
    slot.addEventListener('click', function() {
        handleSlotClick(this);
    });
    
    // Create the add button (only for last slot)
    if (isLast) {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-slot-btn';
        addBtn.innerHTML = '+';
        addBtn.title = 'Add another charm';
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (individualSlotCount < maxIndividualSlots) {
                individualSlotCount++;
                updateIndividualSlots();
                updatePrice();
            }
        });
        
        container.appendChild(slot);
        container.appendChild(addBtn);
    } else {
        container.appendChild(slot);
    }
    
    return container;
}
function setupEventListeners() {
    try {
        // Product selection buttons
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const product = this.dataset.type;
                document.querySelectorAll('.product-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                initProduct(product);
            });
        });

        // Material selection
        document.querySelectorAll('.material-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.material-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                materialType = option.dataset.material;
                updateBaseCharms();
                updatePrice();
            });
        });

        // Size selector
        const sizeSelect = document.getElementById('size');
        if (sizeSelect) {
            sizeSelect.addEventListener('change', () => {
                updateJewelrySize(sizeSelect.value);
                updatePrice();
            });
        }

        // Full glam toggle
        const fullGlamBtn = document.getElementById('full-glam-btn');
        if (fullGlamBtn) {
            fullGlamBtn.addEventListener('click', () => {
                isFullGlam = !isFullGlam;
                fullGlamBtn.classList.toggle('active');
                updatePrice();
            });
        }

        // Download design button
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', async () => {
                try {
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

        // Individual charm slot controls
        const decreaseSlotsBtn = document.getElementById('decrease-slots');
        const increaseSlotsBtn = document.getElementById('increase-slots');
        const slotCountDisplay = document.getElementById('slot-count');

        if (decreaseSlotsBtn && increaseSlotsBtn && slotCountDisplay) {
            decreaseSlotsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (individualSlotCount > 1) {
                    individualSlotCount--;
                    updateIndividualSlots();
                    updatePrice();
                    slotCountDisplay.textContent = individualSlotCount;
                }
            });

            increaseSlotsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (individualSlotCount < maxIndividualSlots) {
                    individualSlotCount++;
                    updateIndividualSlots();
                    updatePrice();
                    slotCountDisplay.textContent = individualSlotCount;
                }
            });
        }

        // Pricing toggle
        const pricingToggle = document.getElementById('pricing-toggle');
        if (pricingToggle) {
            pricingToggle.addEventListener('click', () => {
                const pricingInfo = document.querySelector('.pricing-info');
                if (pricingInfo) {
                    pricingInfo.classList.toggle('visible');
                    const btnText = pricingToggle.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = pricingInfo.classList.contains('visible') 
                            ? 'Hide Pricing' 
                            : 'Pricing';
                    }
                }
            });
        }

        // Translation button
        document.getElementById('translate-btn')?.addEventListener('click', function() {
            const googleDropdown = document.querySelector('.goog-te-menu-value');
            if (googleDropdown) {
                googleDropdown.click();
            } else {
                alert('Translation is loading... Please try again in a moment.');
            }
        });

        // Setup other functionality
        setupCategoryTabs();
        setupCartFunctionality();
        setupCustomCharmHandlers();

    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}
// Update the updateIndividualSlots function:
function updateIndividualSlots() {
    // Store existing charms before clearing
    const existingCharms = [];
    const slots = jewelryPiece.querySelectorAll('.slot');
    
    slots.forEach(slot => {
        const charm = slot.querySelector('img:not([data-type="base"])');
        if (charm) {
            existingCharms.push({
                src: charm.src,
                type: charm.dataset.type,
                isLong: slot.classList.contains('long-slot'),
                isDangly: slot.classList.contains('has-dangly')
            });
        }
    });

    // Clear and rebuild with correct number of slots
    jewelryPiece.innerHTML = '';
    
    for (let i = 0; i < individualSlotCount; i++) {
        const slotContainer = document.createElement('div');
        slotContainer.className = 'slot-container';
        
        const slot = createBaseSlot();
        slotContainer.appendChild(slot);
        
        // Reapply existing charm if we have one for this position
        if (i < existingCharms.length) {
            const charmData = existingCharms[i];
            
            if (charmData.isLong) {
                // Handle long charm placement
                if (i + 1 < individualSlotCount) {
                    const longContainer = document.createElement('div');
                    longContainer.className = 'slot long-slot';
                    longContainer.style.width = '180px';
                    longContainer.style.height = '100px';
                    
                    const longCharm = document.createElement('img');
                    longCharm.src = charmData.src;
                    longCharm.className = 'long-charm';
                    longCharm.dataset.type = charmData.type;
                    longCharm.style.width = '180px';
                    longCharm.style.height = '100px';
                    longContainer.appendChild(longCharm);
                    
                    slot.replaceWith(longContainer);
                    jewelryPiece.children[i].remove(); // Remove the next slot
                    
                    longContainer.addEventListener('click', () => handleSlotClick(longContainer));
                    i++; // Skip next slot since long charm takes 2 slots
                }
            } 
            else if (charmData.isDangly) {
                // Handle dangly charm
                slot.classList.add('has-dangly');
                slot.style.height = '192px';
                
                const danglyImg = document.createElement('img');
                danglyImg.src = charmData.src;
                danglyImg.className = 'dangly-charm';
                danglyImg.dataset.type = charmData.type;
                danglyImg.style.width = '88px';
                danglyImg.style.height = '192px';
                
                slot.innerHTML = '';
                slot.appendChild(danglyImg);
            } 
            else {
                // Regular charm
                const charmImg = document.createElement('img');
                charmImg.src = charmData.src;
                charmImg.dataset.type = charmData.type;
                charmImg.style.width = '88px';
                charmImg.style.height = '88px';
                
                slot.innerHTML = '';
                slot.appendChild(charmImg);
            }
        }
        
        // Add controls to last slot only
        if (i === individualSlotCount - 1) {
            const controls = document.createElement('div');
            controls.className = 'slot-controls';
            
            const minusBtn = document.createElement('button');
            minusBtn.className = 'control-btn minus-btn';
            minusBtn.textContent = '-';
            minusBtn.disabled = individualSlotCount <= 1;
            minusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                individualSlotCount--;
                updateIndividualSlots();
                updatePrice();
            });
            
            const plusBtn = document.createElement('button');
            plusBtn.className = 'control-btn plus-btn';
            plusBtn.textContent = '+';
            plusBtn.disabled = individualSlotCount >= maxIndividualSlots;
            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                individualSlotCount++;
                updateIndividualSlots();
                updatePrice();
            });
            
            controls.appendChild(minusBtn);
            controls.appendChild(plusBtn);
            slotContainer.appendChild(controls);
        }
        
        jewelryPiece.appendChild(slotContainer);
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
      const priceData = calculatePrice(false); // Get discounted price
const cartItem = {
    id: Date.now().toString(),
    product: currentProduct,
    symbol: '🍓',
    size: currentSize,
    isFullGlam: isFullGlam,
    materialType: materialType,
    price: priceData.total, // Store the discounted price
    originalPrice: priceData.subtotal, // Store original for cart calculations
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
// Add these functions BEFORE setupOrderFunctionality()

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
    const missingElements = [];
    if (!orderModal) missingElements.push('order-modal');
    if (!orderForm) missingElements.push('order-form');
    if (!orderIdSpan) missingElements.push('order-id');
    if (!cancelOrderBtn) missingElements.push('cancel-order-btn');
    if (!placeOrderBtn) missingElements.push('place-order-btn');
    
    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements.join(', '));
        alert('Some order components failed to load. Please refresh the page.');
        return;
    }

    // Remove any existing event listeners to prevent duplicates
    if (orderForm) orderForm.removeEventListener('submit', handleFormSubmit);
    if (placeOrderBtn) placeOrderBtn.removeEventListener('click', handlePlaceOrderClick);
    if (cancelOrderBtn) cancelOrderBtn.removeEventListener('click', handleCancelOrder);
    if (closeConfirmation) closeConfirmation.removeEventListener('click', handleCloseConfirmation);
    if (payCliqRadio) payCliqRadio.removeEventListener('change', handlePaymentChange);

    // Add event listeners only if elements exist
    if (orderForm) orderForm.addEventListener('submit', handleFormSubmit);
    if (placeOrderBtn) placeOrderBtn.addEventListener('click', handlePlaceOrderClick);
    if (cancelOrderBtn) cancelOrderBtn.addEventListener('click', handleCancelOrder);
    if (closeConfirmation) closeConfirmation.addEventListener('click', handleCloseConfirmation);
    if (payCliqRadio) payCliqRadio.addEventListener('change', handlePaymentChange);

    // Initialize payment proof container state
    if (paymentProofContainer) {
        paymentProofContainer.style.display = 'none';
    }

    console.log('Order functionality initialized successfully');
    window.orderFunctionalityInitialized = true;
}
function initJewelryPiece() {
    const jewelryPiece = document.getElementById('jewelry-piece');
    if (!jewelryPiece) {
        console.error("Jewelry piece container not found!");
        return;
    }

    // Clear existing slots
    jewelryPiece.innerHTML = '';

    // For individual charms, use the individualSlotCount
    if (currentProduct === 'individual') {
        updateIndividualSlots();
        return;
    }

    // For other products, get number of slots from SIZE_CHARTS
    const slotCount = SIZE_CHARTS[currentProduct][currentSize].charms;

    // Create slots
    for (let i = 0; i < slotCount; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        
        // Create base charm image
        const img = document.createElement('img');
        img.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
        img.alt = 'Base charm';
        img.dataset.type = 'base';
        
        // Add image to slot
        slot.appendChild(img);
        
        // Add click handler
        slot.addEventListener('click', function() {
            handleSlotClick(this);
        });
        
        // Add slot to jewelry piece
        jewelryPiece.appendChild(slot);
    }
    
    console.log(`Created ${slotCount} slots for ${currentProduct} size ${currentSize}`);
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
    
     if (selectedCharm) {
        const quantity = parseInt(selectedCharm.dataset.quantity) || 1;
        if (quantity <= 0) {
            alert('This charm is out of stock!');
            selectedCharm.classList.remove('selected');
            selectedCharm = null;
            return;
        }
        
        // Rest of your existing code...
        placeSelectedCharm(slot);
    } else if (slot.querySelector('img:not([data-type="base"])')) {
        removeCharmFromSlot(slot);
    }
      
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
    const quantity = parseInt(selectedCharm.dataset.quantity) || 1;
if (quantity <= 0) {
    alert('This charm is out of stock!');
    selectedCharm.classList.remove('selected');
    selectedCharm = null;
    return;
}
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
        longContainer.style.width = '180px';
        longContainer.style.height = '100px';
        longContainer.style.gridColumn = 'span 2';
        
        // Create the long charm image
        const longCharm = document.createElement('img');
        longCharm.src = selectedCharm.src.startsWith('data:') 
            ? selectedCharm.src 
            : selectedCharm.dataset.charm;
        longCharm.className = 'long-charm';
        longCharm.style.width = '180px';
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
        danglyImg.style.width = '88px';
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
        charmImg.style.width = '88px';
        charmImg.style.height = '88px';
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
            charmElement.style.width = '72px';
            charmElement.style.height = '132px';
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
        img.style.width = '72px';  // Consistent pool size
        img.style.height = '132px'; // Consistent pool size
    } else if (src.includes('long')) {
        img.classList.add('long-charm');
        img.style.width = '150px';  // Consistent pool size
        img.style.height = '75px';  // Consistent pool size
    } else {
        img.style.width = '75px';
        img.style.height = '75px';
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
            setupOrderFunctionality();
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

document.addEventListener('DOMContentLoaded', function() {
    const braceletContainer = document.querySelector('.bracelet-container');
    const jewelryPiece = document.getElementById('jewelry-piece');
    
    function updateStickyHeader() {
    const braceletContainer = document.querySelector('.bracelet-container');
    if (!braceletContainer) return;
    
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        braceletContainer.classList.add('sticky-active');
        braceletContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        braceletContainer.classList.remove('sticky-active');
        braceletContainer.style.boxShadow = 'none';
    }
}

// Run on scroll and resize
window.addEventListener('scroll', updateStickyHeader);
window.addEventListener('resize', updateStickyHeader);

// Initial check
updateStickyHeader();
});
document.addEventListener('DOMContentLoaded', function() {
    const jewelryPiece = document.getElementById('jewelry-piece');
    
    function adjustJewelryWidth() {
        const viewportWidth = window.innerWidth;
        jewelryPiece.style.maxWidth = Math.min(viewportWidth - 40, 800) + 'px';
    }
    
    // Initialize and set up resize listener
    adjustJewelryWidth();
    window.addEventListener('resize', adjustJewelryWidth);
});
function handleMobileViewport() {
    const isMobile = window.innerWidth <= 480;
    const jewelryPiece = document.getElementById('jewelry-piece');
    
    if (isMobile) {
        // Enable horizontal scrolling on mobile
        jewelryPiece.style.overflowX = 'auto';
        jewelryPiece.style.flexWrap = 'nowrap';
        jewelryPiece.style.padding = '5px';
    } else {
        // Reset to desktop styles
        jewelryPiece.style.overflowX = '';
        jewelryPiece.style.flexWrap = '';
        jewelryPiece.style.padding = '';
    }
}

// Run on load and resize
window.addEventListener('load', handleMobileViewport);
window.addEventListener('resize', handleMobileViewport);

// Add this to your existing JavaScript
function updateCartButtonPosition() {
    const cartButton = document.getElementById('cart-button');
    const scrollY = window.scrollY;
    
    // Keep button visible but not overlapping with header
    if (scrollY > 100) {
        cartButton.style.top = '20px';
    } else {
        // When scrolled to top, position below promotion banner
        cartButton.style.top = '90px';
    }
}

window.addEventListener('scroll', updateCartButtonPosition);
window.addEventListener('load', updateCartButtonPosition);
