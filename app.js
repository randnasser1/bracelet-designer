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
    bracelet: { basePrice: 10, baseSlots: 18, includedSpecial: 2, fullGlam: 29 },
    anklet: { basePrice: 15, baseSlots: 23, includedSpecial: 2, fullGlam: 42 },
    necklace: { basePrice: 22, baseSlots: 34, includedSpecial: 2, fullGlam: 64 },
    ring: { basePrice: 7.5, baseSlots: 7, includedSpecial: 1, fullGlam: 15 }
};
const CHARM_SETS = {
  bestFriends: {
    charms: ['best.png', 'ends.png', 'fri.png'],
    message: 'Best Friends charms must be bought together in 3 different items',
    requiredCount: 3
  },
  mrAndMrs: {
    charms: ['mrmrs1.png', 'mrmrs2.png'],
    message: 'Mr and Mrs. charms must be bought together in 2 different items',
    requiredCount: 2
  },
  soulmates: {
    charms: ['love.png', 'love2.png'],
    message: 'Soulmates charms must be bought together in 2 different items',
    requiredCount: 2
  }
};

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

/* NEW: Bracelet Capture Functions */
async function captureBraceletDesign() {
    const jewelryPiece = document.getElementById('jewelry-piece');
    
    try {
        const canvas = await html2canvas(jewelryPiece, {
            useCORS: true,
            allowTaint: false,
            logging: true,
            scale: 2,
            backgroundColor: null
        });

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png', 0.95);
        });
    } catch (error) {
        console.error('Error capturing design:', error);
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

    // Add delivery fee if requested
    if (includeDelivery) {
        const deliveryFee = 2.5;
        return totalPrice + deliveryFee;
    }
    
    return totalPrice;
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

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const cartCountElement = document.querySelector('.cart-count');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotalElement.innerHTML = 'Total: 0 JDs';
        cartCountElement.textContent = '0';
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 2.5;
    const total = subtotal + deliveryFee;
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-preview">
                <img src="${item.imageUrl}" alt="Design Preview" class="cart-item-image">
                <div class="cart-item-details">
                    <strong>${item.product.charAt(0).toUpperCase() + item.product.slice(1)}</strong>
                    <div>Size: ${item.size}</div>
                    <div>${item.isFullGlam ? 'Full Glam' : `${item.charms.length} charms`}</div>
                    <div>${item.price.toFixed(2)} JDs</div>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    cartTotalElement.innerHTML = `
        <div class="price-breakdown">
            <div class="price-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)} JDs</span>
            </div>
            <div class="price-row delivery-fee">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)} JDs</span>
            </div>
            <div class="price-row total-price">
                <span>Total:</span>
                <span>${total.toFixed(2)} JDs</span>
            </div>
        </div>
    `;
    
    cartCountElement.textContent = cart.length;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.currentTarget.dataset.id;
            const index = cart.findIndex(item => item.id === itemId);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCartDisplay();
            }
        });
    });
}

function updatePrice() {
    const totalPrice = calculatePrice(false); // Don't include delivery in main display
    
    // Update price display without delivery
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
            charmText += `, ${paidSpecials} extra specials (+${paidSpecials * 2} JDs)`;
        }
        if (rareCount > 0) {
            charmText += `, ${rareCount} rare (+${rareCount * 3} JDs)`;
        }
        if (customCount > 0) {
            charmText += `, ${customCount} custom (+${customCount * 3.5} JDs)`;
        }
        
        charmPriceElement.textContent = charmText;
    } else {
        const freeSpecials = product.includedSpecial;
        const paidSpecials = Math.max(0, specialCount - freeSpecials);
        
        basePriceElement.textContent = `Base Price: ${product.basePrice + SIZE_CHARTS[currentProduct][currentSize].price} JDs`;
        let charmText = `Charms: ${Math.min(specialCount, freeSpecials)}/${freeSpecials} free specials`;
        
        if (paidSpecials > 0) {
            charmText += `, ${paidSpecials} paid specials (+${paidSpecials * 2} JDs)`;
        }
        if (rareCount > 0) {
            charmText += `, ${rareCount} rare (+${rareCount * 3} JDs)`;
        }
        if (customCount > 0) {
            charmText += `, ${customCount} custom (+${customCount * 3.5} JDs)`;
        }
        
        charmPriceElement.textContent = charmText;
    }

    totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)} JDs`;
    
    return totalPrice;
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

        productBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const product = btn.dataset.type;
                productBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                initProduct(product);
            });
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
        document.getElementById('order-total-display').textContent = total.toFixed(2);

    });

   document.getElementById('add-to-cart-bottom').addEventListener('click', async () => {
    const addToCartBtn = document.getElementById('add-to-cart-bottom');
    const jewelryPiece = document.getElementById('jewelry-piece');
    
    try {
        // First validate charm sets
        const invalidSets = validateCharmSets();
        if (invalidSets.length > 0) {
            const errorMessages = invalidSets.map(set => 
                `${set.message}\n\nCurrently have: ${set.currentCount}/${set.requiredCount}`
            ).join('\n\n');
            
            const proceed = confirm(
                `${errorMessages}\n\nDo you want to add this item anyway? ` +
                `You can add the remaining charms in another item.`
            );
            
            if (!proceed) {
                return;
            }
        }
        
        // Rest of your cart addition logic...
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        const designBlob = await captureBraceletDesign();
        const designUrl = URL.createObjectURL(designBlob);
        
        const cartItem = {
            id: Date.now().toString(),
            product: currentProduct,
            size: currentSize,
            isFullGlam: isFullGlam,
            materialType: materialType,
            price: calculatePrice(false), // Price without delivery
            charms: Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])')).map(img => ({
                src: img.src,
                type: img.dataset.type
            })),
            imageUrl: designUrl,
            imageBlob: designBlob,
            timestamp: new Date().toISOString()
        };
        
        cart.push(cartItem);
        updateCartDisplay();
        
        alert('Design added to cart!');
        cartElements.cartPreview.classList.add('active');
        
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
        document.getElementById('order-total-display').textContent = total.toFixed(2);

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
            
            // 3. Proceed with order submission
            const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
            const deliveryFee = 2.5;
            const total = subtotal + deliveryFee;
            
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
                items: await Promise.all(cart.map(async (item) => ({
                    product: item.product,
                    size: item.size,
                    price: item.price,
                    imageUrl: item.imageUrl,
                    imageBase64: await blobToBase64(item.imageBlob),
                    charms: item.charms,
                    isFullGlam: item.isFullGlam,
                    materialType: item.materialType,
                    timestamp: new Date().toISOString()
                }))),
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                total: total,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'pending'
            };
    
            // Upload payment proof if Cliq payment
            if (formData.get('payment') === 'Cliq') {
                const paymentProofFile = document.getElementById('payment-proof').files[0];
                if (paymentProofFile) {
                    const fileName = `payment-proofs/${Date.now()}_${paymentProofFile.name}`;
                    const storageRef = storage.ref(fileName);
                    await storageRef.put(paymentProofFile);
                    orderData.paymentProofUrl = await storageRef.getDownloadURL();
                }
            }
    
            // Submit to Firestore
            const orderRef = await db.collection('orders').add(orderData);
            console.log('Order submitted with ID:', orderRef.id);
    
            // Clear cart and reset form
            cart.length = 0;
            updateCartDisplay();
            form.reset();
            paymentProofContainer.style.display = 'none';
    
            // Show confirmation
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

function placeSelectedCharm(slot) {
    const charmSrc = selectedCharm.dataset.charm;
    const charmType = selectedCharm.dataset.type;
    let quantity = parseInt(selectedCharm.dataset.quantity) || 1;
    
    // For non-custom charms, check availability
    if (charmType !== 'custom') {
        if (quantity <= 0) {
            alert('This charm is out of stock!');
            return;
        }
        
        // Check if this charm is already used (unless quantity > 1)
        if (usedCharms.has(charmSrc) && quantity <= 1) {
            alert('You can only add this charm once!');
            return;
        }
    }

    // Handle long charm placement if needed
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
    
    // Create a container for the long charm
    const longContainer = document.createElement('div');
    longContainer.className = 'slot long-slot';
    
    // Create the long charm image
    const longCharm = document.createElement('img');
    longCharm.src = selectedCharm.src.startsWith('data:') 
        ? selectedCharm.src 
        : selectedCharm.dataset.charm;
    longCharm.className = 'long-charm';
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
} else if (isDanglyCharm) {
        // For dangly charm, just make the slot taller
        slot.classList.add('has-dangly');
        
        const danglyImg = document.createElement('img');
        danglyImg.src = selectedCharm.src.startsWith('data:') 
            ? selectedCharm.src 
            : selectedCharm.dataset.charm;
        danglyImg.className = 'dangly-charm';
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
        
        addCharmToSlot(slot, src, selectedCharm.dataset.type, selectedCharm.classList.contains('sold-out'));
        
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
    updatePrice();
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
function removeCharmFromSlot(slot) {
    const charm = slot.querySelector('img:not([data-type="base"])');
    if (!charm) return;
    
    const charmSrc = charm.dataset.charm;
    const charmType = charm.dataset.type;
    const isDangly = charm.classList.contains('dangly-charm');
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
            e.stopPropagation(); // Prevent event bubbling
            
            // If already selected, deselect it
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedCharm = null;
                return;
            }
            
            // Deselect all other charms
            document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
            
            // Select this charm
            this.classList.add('selected');
            selectedCharm = this;
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
        charmElement.dataset.quantity = charm.quantity || 1; 
        
        // Check if it's a long charm
        const isLongCharm = charm.src.includes('long');
        if (isLongCharm) {
            charmElement.classList.add('long-charm');
        }
        
        // Update styling based on quantity
        if (charm.quantity <= 0) {
            charmElement.classList.add('out-of-stock');
            charmElement.style.opacity = '0.5';
            charmElement.style.cursor = 'not-allowed';
        }

        if (usedCharms.has(charm.src)) {
            charmElement.classList.add('used');
        }

        charmElement.addEventListener('click', () => {
            const quantity = parseInt(charmElement.dataset.quantity) || 1;
            
            // Don't allow selection if out of stock
            if (quantity <= 0) {
                return;
            }
            
            // Don't allow selection if already used (unless quantity > 1)
            if (quantity === 1 && usedCharms.has(charm.src)) {
                return;
            }
            
            // Deselect all other charms
            document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
            
            // Select this charm
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

    // Separate dangly charms when viewing "All" category
    let filteredCharms = [];
    let danglyCharms = [];

    rareCharms.forEach(charm => {
        // First filter by category
        if (currentRareCategory !== 'all' && charm.category !== currentRareCategory) {
            return;
        }

        const isGoldVariant = charm.src.includes('-gold.png');
        const isGoldCategory = charm.category === 'gold';
        const isDangly = charm.src.includes('dangly') || charm.category === 'dangly';

        // For 'all' category, separate dangly charms
        if (currentRareCategory === 'all' && isDangly) {
            danglyCharms.push(charm);
            return;
        }

        // For 'all' category, show gold variants and gold category items when gold is selected
        if (currentRareCategory === 'all') {
            if (showGoldVariants) {
                if (isGoldVariant || isGoldCategory) {
                    filteredCharms.push(charm);
                }
            } else {
                if (!isGoldVariant && !isGoldCategory) {
                    filteredCharms.push(charm);
                }
            }
            return;
        }

        // For other categories with gold variants
        if (hasGoldVariants) {
            if (showGoldVariants) {
                if (isGoldVariant) {
                    filteredCharms.push(charm);
                }
            } else {
                if (!isGoldVariant) {
                    filteredCharms.push(charm);
                }
            }
            return;
        }

        // If category has no gold variants, show all charms
        filteredCharms.push(charm);
    });

    // Add dangly charms at the end for "All" category
    if (currentRareCategory === 'all') {
        filteredCharms = [...filteredCharms, ...danglyCharms];
    }

    // Create and append non-dangly charms first
    filteredCharms.forEach(charm => {
        const charmElement = createCharm(charm.src, `Rare Charm ${charm.src}`, 'rare');
        charmElement.classList.add('rare');
        charmElement.dataset.charm = charm.src;
        charmElement.dataset.category = charm.category;
        charmElement.dataset.quantity = charm.quantity || 1;
        
        if (charm.quantity <= 0) {
            charmElement.classList.add('out-of-stock');
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

        rareCharmsGrid.appendChild(charmElement);
    });

    // Add separator for dangly charms in "All" category
    if (currentRareCategory === 'all' && danglyCharms.length > 0) {
        const separator = document.createElement('div');
        separator.className = 'dangly-separator';
        separator.style.width = '100%';
        separator.style.height = '1px';
        separator.style.backgroundColor = '#f5a0c2';
        separator.style.margin = '1rem 0';
        rareCharmsGrid.appendChild(separator);

        const danglyLabel = document.createElement('div');
        danglyLabel.textContent = 'Dangly Charms';
        danglyLabel.style.textAlign = 'center';
        danglyLabel.style.fontWeight = 'bold';
        danglyLabel.style.color = '#d6336c';
        danglyLabel.style.marginBottom = '1rem';
        rareCharmsGrid.appendChild(danglyLabel);
    }

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
            selectedCharm = null;
            updateSpecialCharmsDisplay();
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
    img.dataset.charm = src;
    
    // Add quantity badge
    const quantityBadge = document.createElement('div');
    quantityBadge.className = 'quantity-badge';
    
    // Find quantity from data
    let quantity = 1;
    if (type === 'special') {
        const charmData = specialCharms.find(c => c.src === src);
        quantity = charmData ? (charmData.quantity || 1) : 1;
    } else if (type === 'rare') {
        const charmData = rareCharms.find(c => c.src === src);
        quantity = charmData ? (charmData.quantity || 1) : 1;
    }
    
    img.dataset.quantity = quantity;
    quantityBadge.textContent = quantity;
    img.appendChild(quantityBadge);
    
    // Check charm types
    if (src.includes('long')) {
        img.classList.add('long-charm');
        img.style.width = '96px';
        img.style.height = '48px';
    } 
    else if (src.includes('dangly')) {
        img.classList.add('dangly-charm');
        img.style.width = '48px';
        img.style.height = '96px';
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
