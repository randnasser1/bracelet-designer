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

// Function declarations
function calculatePrice() {
   const product = PRODUCTS[currentProduct];
    const sizeData = SIZE_CHARTS[currentProduct][currentSize];
    
    let totalPrice = product.basePrice + sizeData.price;
    
    if (currentProduct === 'bracelet') {
        totalPrice += SIZE_CHARTS[currentProduct][currentSize].price;
    }
    
    if (materialType === 'gold') {
        totalPrice += 1;
    } else if (materialType === 'mix') {
        totalPrice += 2.5;
    }

    if (isFullGlam) {
        let glamPrice = PRODUCTS[currentProduct].fullGlam;
        let specialCount = 0;
        
        const slots = document.querySelectorAll('.slot img:not([data-type="base"])');
        slots.forEach(charm => {
            const type = charm.dataset.type;
            if (type === 'special') {
                specialCount++;
                if (specialCount > 18) {
                    glamPrice += 2;
                }
            } else if (type === 'rare') {
                glamPrice += 3;
            } else if (type === 'custom') {
                glamPrice += 3.5;
            }
        });
        
        return glamPrice;
    }

    const slots = document.querySelectorAll('.slot img:not([data-type="base"])');
    let specialCount = 0;
    
    slots.forEach(charm => {
        const type = charm.dataset.type;
        if (type === 'special') {
            specialCount++;
            if (specialCount > PRODUCTS[currentProduct].includedSpecial) {
                totalPrice += 2;
            }
        } else if (type === 'rare') {
            totalPrice += 3;
        } else if (type === 'custom') {
            totalPrice += 3.5;
        }
    });

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
        cartTotalElement.textContent = 'Total: 0 JDs';
        cartCountElement.textContent = '0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
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
    
    cartTotalElement.textContent = `Total: ${total.toFixed(2)} JDs`;
    cartCountElement.textContent = cart.length;
}

function updatePrice() {
    const product = PRODUCTS[currentProduct];
    const sizeData = SIZE_CHARTS[currentProduct][currentSize];
    
    // Calculate base price (product base + size upgrade)
    let basePrice = product.basePrice + sizeData.price;
    let totalPrice = basePrice;
    let charmPrice = 0;
    
    // Get all placed charms (excluding base charms)
    const slots = document.querySelectorAll('.slot img:not([data-type="base"])');
    let specialCount = 0;
    
    // Calculate charm costs
    slots.forEach(charm => {
        const type = charm.dataset.type;
        if (type === 'special') {
            specialCount++;
            if (!isFullGlam && specialCount > product.includedSpecial) {
                charmPrice += 2; // Additional special charms cost 2 JDs
            }
        } else if (type === 'rare') {
            charmPrice += 3; // Rare charms cost 3 JDs
        } else if (type === 'custom') {
            charmPrice += 3.5; // Custom charms cost 3.5 JDs
        }
    });

    // Full Glam pricing
    if (isFullGlam) {
        totalPrice = product.fullGlam;
        const freeSpecials = product.baseSlots; // Full glam includes baseSlots worth of free special charms
        const paidSpecials = Math.max(0, specialCount - freeSpecials);
        charmPrice += paidSpecials * 2; // Extra special charms beyond free limit
    } else {
        totalPrice += charmPrice;
    }

    // Material upgrades
    if (materialType === 'gold') {
        totalPrice += 1;
    } else if (materialType === 'mix') {
        totalPrice += 2.5;
    }

    // Update price display
    const basePriceElement = document.getElementById('base-price');
    const charmPriceElement = document.getElementById('charm-price');
    const totalPriceElement = document.getElementById('total-price');

    if (isFullGlam) {
        basePriceElement.textContent = `Full Glam Base Price: ${product.fullGlam} JDs`;
        charmPriceElement.textContent = `Additional Charms: ${charmPrice} JDs (${Math.min(specialCount, product.baseSlots)}/${product.baseSlots} free specials used)`;
    } else {
        const freeSpecials = product.includedSpecial;
        const paidSpecials = Math.max(0, specialCount - freeSpecials);
        
        basePriceElement.textContent = `Base Price: ${basePrice} JDs`;
        charmPriceElement.textContent = `Charms: ${charmPrice} JDs (${Math.min(specialCount, freeSpecials)}/${freeSpecials} free specials used + ${paidSpecials} paid)`;
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

        // Updated correct code
        sizeSelect.addEventListener('change', () => {
            updateJewelrySize(sizeSelect.value); // Now using the correct function name
            updatePrice(); // Make sure to update the price display too
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
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('order-total-price').textContent = total.toFixed(2) + ' JDs';
    });

    document.getElementById('add-to-cart-bottom').addEventListener('click', async () => {
        const addToCartBtn = document.getElementById('add-to-cart-bottom');
        const jewelryPiece = document.getElementById('jewelry-piece');
        
        try {
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
                price: calculatePrice(),
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

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const itemId = e.target.dataset.id;
            const index = cart.findIndex(item => item.id === itemId);
            if (index !== -1) {
                cart.splice(index, 1);
                updateCartDisplay();
            }
        }
    });
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
    console.log('Initializing order functionality...');
    
    orderModal = document.getElementById('order-modal');
    orderForm = document.getElementById('order-form');
    payCliqOption = document.getElementById('pay-cliq');
    paymentProofContainer = document.getElementById('payment-proof-container');
    orderConfirmation = document.getElementById('order-confirmation');
    closeConfirmation = document.getElementById('close-confirmation');
    orderIdSpan = document.getElementById('order-id');
    const placeOrderBtn = document.getElementById('order-btn');
    const payCliqRadio = document.getElementById('pay-cliq');
    const cancelOrderBtn = document.getElementById('cancel-order-btn');

    const missingElements = [];
    if (!orderModal) missingElements.push('order-modal');
    if (!orderForm) missingElements.push('order-form');
    if (!placeOrderBtn) missingElements.push('order-btn');
    
    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements.join(', '));
        alert('Critical components failed to load. Please refresh the page.');
        return;
    }

    orderForm.removeEventListener('submit', handleFormSubmit);
    if (placeOrderBtn) placeOrderBtn.removeEventListener('click', handlePlaceOrderClick);
    if (cancelOrderBtn) cancelOrderBtn.removeEventListener('click', handleCancelOrder);
    if (closeConfirmation) closeConfirmation.removeEventListener('click', handleCloseConfirmation);
    if (payCliqRadio) payCliqRadio.removeEventListener('change', handlePaymentChange);

    function handlePaymentChange(e) {
        if (paymentProofContainer) {
            paymentProofContainer.style.display = e.target.checked ? 'block' : 'none';
        }
    }

    function handlePlaceOrderClick() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById('order-total-price').textContent = `Total: ${total.toFixed(2)} JDs`;
        
        document.body.classList.add('modal-open');
        orderModal.classList.add('active');
    }

    function handleCancelOrder() {
        document.body.classList.remove('modal-open');
        orderModal.classList.remove('active');
        if (orderForm) orderForm.reset();
    }

    function handleCloseConfirmation() {
        if (orderConfirmation) orderConfirmation.classList.remove('active');
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        console.log('Form submission started');
    
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const orderIdSpan = document.getElementById('order-id');
        const orderModal = document.getElementById('order-modal');
        const orderConfirmation = document.getElementById('order-confirmation');
    
        if (!form || !submitButton || !orderModal || !orderConfirmation) {
            console.error('Missing required elements during form submission');
            alert('Form submission error. Please refresh and try again.');
            return;
        }
    
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        window.orderSubmissionInProgress = true;
    
        try {
            const formData = new FormData(form);
            const requiredFields = ['full-name', 'phone', 'governorate', 'address', 'payment'];
            const missingFields = requiredFields.filter(field => !formData.get(field));
    
            if (missingFields.length > 0) {
                throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            }
    
            if (formData.get('payment') === 'Cliq' && !document.getElementById('payment-proof').files[0]) {
                throw new Error('Payment proof is required for Cliq payments');
            }
    
            if (cart.length === 0) {
                throw new Error('Your cart is empty');
            }
    
            const orderData = {
                clientOrderId: `client-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`,
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
                total: cart.reduce((sum, item) => sum + item.price, 0),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'pending'
            };
    
            if (formData.get('payment') === 'Cliq') {
                const paymentProofFile = document.getElementById('payment-proof').files[0];
                if (paymentProofFile) {
                    const fileName = `payment-proofs/${Date.now()}_${paymentProofFile.name}`;
                    const storageRef = storage.ref(fileName);
                    await storageRef.put(paymentProofFile);
                    orderData.paymentProofUrl = await storageRef.getDownloadURL();
                }
            }
    
            console.log('Submitting order to Firebase...');
            const orderRef = await db.collection('orders').add(orderData);
            console.log('Order submitted with ID:', orderRef.id);
    
            cart.length = 0;
            updateCartDisplay();
            form.reset();
    
            if (orderIdSpan) orderIdSpan.textContent = orderRef.id;
            orderModal.classList.remove('active');
            orderConfirmation.classList.add('active');
            document.body.classList.remove('modal-open');
    
        } catch (error) {
            console.error('Order submission failed:', error);
            
            if (error.message.includes('Missing required fields')) {
                alert(error.message);
            } else if (error.message.includes('payment proof')) {
                alert('Please upload payment proof for Cliq payments');
            } else if (error.message.includes('cart is empty')) {
                alert('Your cart is empty. Please add items before ordering.');
            } else {
                alert('Order submission failed. Please check your connection and try again.');
            }
        } finally {
            window.orderSubmissionInProgress = false;
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-check-circle"></i> Confirm Order';
        }
    }

    orderForm.addEventListener('submit', handleFormSubmit);
    if (placeOrderBtn) placeOrderBtn.addEventListener('click', handlePlaceOrderClick);
    if (cancelOrderBtn) cancelOrderBtn.addEventListener('click', handleCancelOrder);
    if (closeConfirmation) closeConfirmation.addEventListener('click', handleCloseConfirmation);
    if (payCliqRadio) payCliqRadio.addEventListener('change', handlePaymentChange);

    if (paymentProofContainer) {
        paymentProofContainer.style.display = 'none';
    }

    console.log('Order functionality initialized successfully');
    window.orderFunctionalityInitialized = true;
}



    function handlePaymentChange(e) {
        paymentProofContainer.style.display = e.target.checked ? 'block' : 'none';
    }

    function handlePlaceOrderClick() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        document.getElementById('order-total-price').textContent = 
            `Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)} JDs`;
        document.body.classList.add('modal-open');
        orderModal.classList.add('active');
    }

    function handleCancelOrder() {
        document.body.classList.remove('modal-open');
        orderModal.classList.remove('active');
        orderForm.reset();
    }

    function handleCloseConfirmation() {
        orderConfirmation.classList.remove('active');
    }
    const payCliqRadio = document.getElementById('pay-cliq');
    const cancelOrderBtn = document.getElementById('cancel-order-btn');

    // 4. Add event listeners with duplicate protection
    if (orderForm) {
        // Remove any existing listeners to prevent duplicates
        orderForm.removeEventListener('submit', handleFormSubmit);
        orderForm.addEventListener('submit', handleFormSubmit);
    } 
    
    if (payCliqRadio) {
        // Remove any existing listeners to prevent duplicates
        payCliqRadio.removeEventListener('change', handlePaymentChange);
        payCliqRadio.addEventListener('change', handlePaymentChange);
    } else {
        console.error('Pay Cliq radio button not found');
    }
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', handlePlaceOrderClick);
    }
    
    if (cancelOrderBtn) {
        cancelOrderBtn.addEventListener('click', handleCancelOrder);
    }
    
    if (closeConfirmation) {
        closeConfirmation.addEventListener('click', handleCloseConfirmation);
    }

    // 5. Debugging setup
    console.debug('Order functionality initialized at:', new Date().toISOString());



// Update size-based slot counts to match the HTML select options
// Initialize maxSlots based on current size
 maxSlots = SIZE_CHARTS[currentProduct][currentSize].charms;


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
    if (isLongCharm) {
        // Your existing long charm placement logic...
    } else {
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
}
function handleSlotClick(slot) {
  if (selectedCharm) {
    const charmSrc = selectedCharm.dataset.charm;
    const charmSet = getCharmSet(charmSrc);
    
    if (charmSet) {
      // Check if all required charms from the set are being added
      const selectedCharms = Array.from(document.querySelectorAll('.slot img:not([data-type="base"])'))
        .map(img => img.dataset.charm);
      
      const hasOtherSetCharms = selectedCharms.some(src => 
        charmSet.charms.some(charm => src.includes(charm) && !src.includes(charmSrc))
      );
      
      if (!hasOtherSetCharms) {
        alert(charmSet.message);
        return;
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
    
    const setCharmsPlaced = placedCharms.filter(placedSrc => 
      charmSet.charms.some(charm => placedSrc.includes(charm))
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
    
    // If it's a long slot
    if (slot.classList.contains('long-slot')) {
        const baseSlot1 = createBaseSlot();
        const baseSlot2 = createBaseSlot();
        
        slot.replaceWith(baseSlot1);
        baseSlot1.after(baseSlot2);
    } else {
        // Regular slot
        charm.remove();
        
        // Add base charm back
        const baseImg = document.createElement('img');
        baseImg.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
        baseImg.dataset.type = 'base';
        slot.appendChild(baseImg);
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

        // In your charm click event listener:
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

    const filteredCharms = rareCharms.filter(charm => {
        // First filter by category
        if (currentRareCategory !== 'all' && charm.category !== currentRareCategory) {
            return false;
        }

        const isGoldVariant = charm.src.includes('-gold.png');
        const isGoldCategory = charm.category === 'gold';

        // For 'all' category, show gold variants and gold category items when gold is selected
        if (currentRareCategory === 'all') {
            if (showGoldVariants) {
                return isGoldVariant || isGoldCategory;
            }
            return !isGoldVariant && !isGoldCategory;
        }

        // For other categories with gold variants
        if (hasGoldVariants) {
            if (showGoldVariants) {
                return isGoldVariant;
            }
            return !isGoldVariant;
        }

        // If category has no gold variants, show all charms
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
}

function createCharm(src, alt, type) {
    const img = document.createElement('img');
    img.src = src.replace('bracelet-designer-main/', '');
    img.alt = alt;
    img.className = 'charm';
    img.dataset.type = type;
    img.dataset.charm = src;
    
    // Add quantity badge
    const quantityBadge = document.createElement('div');
    quantityBadge.className = 'quantity-badge';
    
    // Find the quantity from our data
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
    
    // Check if it's a long charm
    if (src.includes('long')) {
        img.classList.add('long-charm');
        img.style.width = '96px';
        img.style.height = '48px';
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
        if (!window.firebaseInitialized) {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                console.log('Firebase initialized successfully');
            }
            db = firebase.firestore();
            storage = firebase.storage();
            window.firebaseInitialized = true;
        }

        jewelryPiece = document.getElementById('jewelry-piece');
        specialCharmsGrid = document.getElementById('special-charms');
        rareCharmsGrid = document.getElementById('rare-charms');
        customCharmUpload = document.getElementById('custom-charm-upload');
        customCharmPreview = document.getElementById('custom-charm-preview');
        addCustomCharmBtn = document.getElementById('add-custom-charm');
        specialCategoryTabs = document.querySelectorAll('#special-categories .category-tab');
        rareCategoryTabs = document.querySelectorAll('#rare-categories .category-tab');
        
        cartButton = document.getElementById('cart-button');
        cartPreview = document.getElementById('cart-preview');
        cartCloseBtn = document.querySelector('.cart-close-btn');
        addToCartBtn = document.getElementById('add-to-cart-bottom');
        cartItems = document.getElementById('cart-items');
        placeOrderBtn = document.getElementById('order-btn');
                
        orderModal = document.getElementById('order-modal');
        orderForm = document.getElementById('order-form');
        payCliqOption = document.getElementById('pay-cliq');
        paymentProofContainer = document.getElementById('payment-proof-container');
        orderConfirmation = document.getElementById('order-confirmation');
        closeConfirmation = document.getElementById('close-confirmation');
        orderIdSpan = document.getElementById('order-id');

        initJewelryPiece();
        setupEventListeners();
        
        if (customCharmUpload && customCharmPreview && addCustomCharmBtn) {
            setupCustomCharmHandlers();
        }

        if (!window.orderFormInitialized) {
            setupOrderFunctionality();
            window.orderFormInitialized = true;
        }
       
    } catch (error) {
        console.error('Initialization error:', error);
        alert('Failed to initialize application. Please refresh the page.');
    }
});
