// Wait for Firebase to be ready
function waitForFirebase() {
    return new Promise((resolve) => {
        if (window.firebaseReady && window.auth && window.db) {
            resolve();
            return;
        }
        
        const checkFirebase = () => {
            if (window.firebaseReady && window.auth && window.db) {
                resolve();
            } else {
                setTimeout(checkFirebase, 100);
            }
        };
        checkFirebase();
    });
}
window.charmDataLoaded = false;

// Global variables - declare at the top
let jewelryPiece;

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
let watchPoolContainer = null; // Add this with your other global variables
const maxIndividualSlots = 10;
const globalUsedCharms = new Map(); // Change from Set to Map to track quantities
const charmQuantities = {}; // Tracks remaining quantities
const disableCOD = false; // Set this to false to show COD option again
// Constants
window.initProduct = initProduct;
let selectionMonitor = null;

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
    // Watch sizes (same as bracelet but charm count reduced by 4)
    'watch': {
        '15.2-16.2': { charms: 14, price: 0, display: '15.2cm - 16.2cm (14 charms)' },
        '16.2-17.1': { charms: 15, price: 0.5, display: '16.2cm - 17.1cm (+0.5 JDs, 15 charms)' },
        '17.1-18.1': { charms: 16, price: 1, display: '17.1cm - 18.1cm (+1 JD, 16 charms)' },
        '18.1-19.2': { charms: 17, price: 1.5, display: '18.1cm - 19.2cm (+1.5 JDs, 17 charms)' },
        '19.2-20': { charms: 18, price: 2, display: '19.2cm - 20cm (+2 JDs, 18 charms)' },
        '20-21': { charms: 19, price: 2.5, display: '20cm - 21cm (+2.5 JDs, 19 charms)' },
        '21-22': { charms: 20, price: 3, display: '21cm - 22cm (+3 JDs, 20 charms)' }
    },
    // Apple Watch sizes (same as bracelet but charm count reduced by 5)
    'apple-watch': {
        '15.2-16.2': { charms: 13, price: 0, display: '15.2cm - 16.2cm (13 charms)' },
        '16.2-17.1': { charms: 14, price: 0.5, display: '16.2cm - 17.1cm (+0.5 JDs, 14 charms)' },
        '17.1-18.1': { charms: 15, price: 1, display: '17.1cm - 18.1cm (+1 JD, 15 charms)' },
        '18.1-19.2': { charms: 16, price: 1.5, display: '18.1cm - 19.2cm (+1.5 JDs, 16 charms)' },
        '19.2-20': { charms: 17, price: 2, display: '19.2cm - 20cm (+2 JDs, 17 charms)' },
        '20-21': { charms: 18, price: 2.5, display: '20cm - 21cm (+2.5 JDs, 18 charms)' },
        '21-22': { charms: 19, price: 3, display: '21cm - 22cm (+3 JDs, 19 charms)' }
    },
   'keychain': {
    '5 charms': { charms: 5, price: 0, display: '5 charms' },
    '6 charms': { charms: 6, price: 1, display: '6 charms' },
    '7 charms': { charms: 7, price: 2, display: '7 charms'},
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
    individual: { basePrice: 3, baseSlots: 1, includedSpecial: 0, fullGlam: 0 },
    'watch': { basePrice: 20, baseSlots: 14, includedSpecial: 1, fullGlam: 35 }, // Bracelet charms -4
    'apple-watch': { basePrice: 18, baseSlots: 13, includedSpecial: 1, fullGlam: 32 }, // Bracelet charms -5
    'keychain': { basePrice: 6, baseSlots: 5, includedSpecial: 1, fullGlam: 13 }
};
let currentWatchBase = 'basecharms/watch1.png'; // Default watch base


const WATCH_POOL = [
    {
        id: 'watch1',
        name: 'Classic White center Silver Square Watch',
        image: 'basecharms/watch1.png',
        soldOut: false
    },
    {
        id: 'watch2',
        name: 'Black center Silver Heart Watch',
        image: 'basecharms/watch2.png',
        soldOut: true
    },
    {
        id: 'watch3',
        name: 'Green center Gold Heart Watch ',
        image: 'basecharms/watch3.png',
        soldOut: true  // This one is sold out
    },
    {
        id: 'watch4',
        name: 'Black center Silver Circular Watch',
        image: 'basecharms/watch4.png',
        soldOut: false
    },
     {
        id: 'watch5',
        name: 'White center Silver Square Watch',
        image: 'basecharms/watch5.png',
        soldOut: false
    },{
        id: 'pink-seashell-watch',
        name: 'Pink center Gold Seashell Watch',
        image: 'basecharms/pink-seashell-watch.png',
        soldOut: false
    },{
        id: 'blue-seashell-watch',
        name: 'Blue center Gold Seashell Watch',
        image: 'basecharms/blue-seashell-watch.png',
        soldOut: false
    },{
        id: 'pink-gold-watch',
        name: 'Pink Center Gold Watch',
        image: 'basecharms/pink-gold-watch.png',
        soldOut: false
    },
];

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
        isDangly: true,  // Forces dangly behavior
        watchScaling: 0.5 // 50% smaller on watches
    },
    dophinset: {
        charms: ['rares/love/c218.png', 'rares/love/c219.png'],
        message: 'Dolphin charms must be in 2 different items',
        requiredCount: 2,
        isDangly: true,
        watchScaling: 0.5
    }
};

function getCharmSet(charmSrc) {
    if (!charmSrc) return null;
    
    return Object.values(CHARM_SETS).find(set => 
        set.charms.some(charm => charm && charmSrc.includes(charm))
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
// Authentication functions


// Auth functions
async function signUpUser(email, password, displayName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Create user profile in Firestore
        await db.collection('users').doc(user.uid).set({
            email: email,
            displayName: displayName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Update profile
        await user.updateProfile({
            displayName: displayName
        });
        
        return user;
    } catch (error) {
        throw new Error(getAuthErrorMessage(error));
    }
}

async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(getAuthErrorMessage(error));
    }
}

async function logoutUser() {
    try {
        await auth.signOut();
        showToast('Logged out successfully', 'success');
    } catch (error) {
        showToast('Error logging out', 'error');
    }
}
// Order History Functions
async function loadUserOrderHistory(userId) {
    try {
        const ordersRef = db.collection('orders');
        // Get orders where userId matches OR userEmail matches (for guest orders)
        const userOrdersQuery = ordersRef.where('userId', '==', userId);
        const guestOrdersQuery = ordersRef.where('userEmail', '==', auth.currentUser.email);
        
        const [userSnapshot, guestSnapshot] = await Promise.all([
            userOrdersQuery.get(),
            guestOrdersQuery.get()
        ]);
        
        const orders = [];
        
        userSnapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        
        guestSnapshot.forEach(doc => {
            // Avoid duplicates
            if (!orders.find(order => order.id === doc.id)) {
                orders.push({ id: doc.id, ...doc.data() });
            }
        });
        
        // Sort by timestamp
        orders.sort((a, b) => (b.timestamp?.toDate() || 0) - (a.timestamp?.toDate() || 0));
        
        displayOrderHistory(orders);
        
    } catch (error) {
        console.error('Error loading order history:', error);
    }
}

function displayOrderHistory(orders) {
    const ordersContent = document.getElementById('orders-content');
    if (!ordersContent) return;

    if (orders.length === 0) {
        ordersContent.innerHTML = `
            <div class="empty-orders">
                <p>No orders yet</p>
                <p>Start designing your perfect jewelry piece!</p>
            </div>
        `;
        return;
    }

    const ordersHTML = orders.map(order => `
        <div class="order-item" data-order-id="${order.id}">
            <div class="order-header">
                <div class="order-info">
                    <strong>Order #${order.clientOrderId}</strong>
                    <span class="order-date">${formatOrderDate(order.timestamp)}</span>
                </div>
                <div class="order-status">
                    <span class="status-badge ${order.status}">${order.status}</span>
                    <span class="order-total">${order.total} JOD</span>
                </div>
            </div>
            <div class="order-items-preview">
                ${order.items.slice(0, 2).map(item => `
                    <div class="order-item-preview">
                        <span>${item.product} (${item.size})</span>
                        <span>${item.price} JOD</span>
                    </div>
                `).join('')}
                ${order.items.length > 2 ? 
                    `<div class="order-item-preview" style="color: #666; font-style: italic;">
                        +${order.items.length - 2} more items...
                    </div>` : ''}
            </div>
            <button class="view-order-btn" onclick="viewOrderDetails('${order.id}')">
                View Details
            </button>
        </div>
    `).join('');

    ordersContent.innerHTML = ordersHTML;
}

// Remove the old standalone order history section
function removeStandaloneOrderHistory() {
    const oldOrderHistory = document.getElementById('order-history-section');
    if (oldOrderHistory) {
        oldOrderHistory.remove();
    }
}
function hideOrderHistory() {
    const orderHistorySection = document.getElementById('order-history-section');
    if (orderHistorySection) {
        orderHistorySection.style.display = 'none';
    }
}

function formatOrderDate(timestamp) {
    if (!timestamp) return 'Date unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

async function viewOrderDetails(orderId) {
    try {
        const orderDoc = await db.collection('orders').doc(orderId).get();
        if (orderDoc.exists) {
            const order = orderDoc.data();
            showOrderDetailsModal(order);
        }
    } catch (error) {
        console.error('Error loading order details:', error);
        showToast('Error loading order details', 'error');
    }
}

function showOrderDetailsModal(order) {
    // Create modal for order details
    const modalHTML = `
        <div class="modal active" id="order-details-modal">
            <div class="order-modal-content">
                <h2>Order Details - #${order.clientOrderId}</h2>
                
                <div class="order-details-section">
                    <h3>Order Information</h3>
                    <div class="detail-row">
                        <span>Order Date:</span>
                        <span>${formatOrderDate(order.timestamp)}</span>
                    </div>
                    <div class="detail-row">
                        <span>Status:</span>
                        <span class="status-badge ${order.status}">${order.status}</span>
                    </div>
                    <div class="detail-row">
                        <span>Total:</span>
                        <span>${order.total} JOD</span>
                    </div>
                    <div class="detail-row">
                        <span>Payment Method:</span>
                        <span>${order.paymentMethod}</span>
                    </div>
                </div>

                <div class="order-details-section">
                    <h3>Items</h3>
                    ${order.items.map((item, index) => `
                        <div class="order-item-detail">
                            <div class="item-header">
                                <strong>${item.product} (${item.size})</strong>
                                <span>${item.price} JOD</span>
                            </div>
                            <div class="item-details">
                                <span>Material: ${item.materialType}</span>
                                <span>Full Glam: ${item.isFullGlam ? 'Yes' : 'No'}</span>
                                <span>Charms: ${item.charms.length}</span>
                            </div>
                            ${item.designImage ? `
                                <div class="item-design">
                                    <img src="${item.designImage}" alt="Design" style="max-width: 200px; border-radius: 8px;">
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>

                <div class="order-details-section">
                    <h3>Delivery Information</h3>
                    <div class="detail-row">
                        <span>Name:</span>
                        <span>${order.customer.name}</span>
                    </div>
                    <div class="detail-row">
                        <span>Phone:</span>
                        <span>${order.customer.phone}</span>
                    </div>
                    <div class="detail-row">
                        <span>Address:</span>
                        <span>${order.customer.address}, ${order.customer.governorate}</span>
                    </div>
                </div>

                <button class="btn cancel-btn" onclick="closeOrderDetails()">
                    Close
                </button>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeOrderDetails() {
    const modal = document.getElementById('order-details-modal');
    if (modal) {
        modal.remove();
    }
}
function updateAuthUI(user) {
    const authButton = document.getElementById('auth-button');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');
    
    if (user) {
        authButton.style.display = 'none';
        userProfile.style.display = 'block';
        userName.textContent = `Hello, ${user.displayName || user.email}`;
        
        // Remove any old standalone order history
        removeStandaloneOrderHistory();
        
        // Setup collapsible orders
        setTimeout(() => {
            setupCollapsibleOrders();
        }, 100);
        
    } else {
        authButton.style.display = 'block';
        userProfile.style.display = 'none';
    }
}
function expandOrdersForNewOrder() {
    const collapsibleOrders = document.getElementById('collapsible-orders');
    const collapseBtn = document.getElementById('collapse-orders');
    
    if (collapsibleOrders && !collapsibleOrders.classList.contains('expanded')) {
        collapsibleOrders.classList.add('expanded');
        if (collapseBtn) collapseBtn.classList.remove('collapsed');
        
        // Load orders if needed
        const currentUser = auth.currentUser;
        if (currentUser) {
            loadUserOrderHistory(currentUser.uid);
        }
    }
}


function getAuthErrorMessage(error) {
    console.log('Auth error code:', error.code);
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            return 'This email is already registered. Please login instead.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters long.';
        case 'auth/user-not-found':
            return 'No account found with this email. Please check your email or create a new account.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/operation-not-allowed':
            return 'Email/password accounts are not enabled. Please contact support.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        default:
            return error.message || 'Authentication failed. Please try again.';
    }
}
// Require auth for checkout
// Update the checkout button handler
function setupAuthProtectedCheckout() {
    const placeOrderBtn = document.getElementById('order-btn');
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            const currentUser = auth.currentUser;
            
            if (!currentUser) {
                e.preventDefault();
                showAccountCreationPrompt();
                return false;
            }
        });
    }
}

// Show account creation prompt
function showAccountCreationPrompt() {
    const modalHTML = `
        <div class="modal active" id="account-prompt-modal">
            <div class="order-modal-content">
                <h2>Create an Account?</h2>
                <p>Would you like to create an account to save your order history and track your purchases?</p>
                <div class="prompt-options">
                    <button class="btn confirm-order-btn" id="create-account-yes">
                        <i class="fas fa-user-plus"></i> Yes, Create Account
                    </button>
                    <button class="btn cancel-btn" id="continue-guest">
                        <i class="fas fa-shopping-bag"></i> Continue as Guest
                    </button>
                    <button class="btn" id="already-have-account">
                        <i class="fas fa-sign-in-alt"></i> I Already Have an Account
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.getElementById('create-account-yes').addEventListener('click', () => {
        document.getElementById('account-prompt-modal').remove();
        document.getElementById('auth-modal').classList.add('active');
        document.querySelector('.auth-tab[data-tab="signup"]').click();
    });
    
    document.getElementById('continue-guest').addEventListener('click', () => {
        document.getElementById('account-prompt-modal').remove();
        // Proceed with guest checkout
        proceedWithGuestCheckout();
    });
    
    document.getElementById('already-have-account').addEventListener('click', () => {
        document.getElementById('account-prompt-modal').remove();
        document.getElementById('auth-modal').classList.add('active');
        document.querySelector('.auth-tab[data-tab="login"]').click();
    });
}

function proceedWithGuestCheckout() {
    // Show the order modal for guest checkout
    orderModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Calculate and display order summary
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 2.5;
    const total = subtotal + deliveryFee;
    
    document.getElementById('order-subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)} JDs`;
    document.getElementById('order-delivery').textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
    document.getElementById('order-total-price').textContent = `Total: ${total.toFixed(2)} JDs`;
}
function createBaseSlot() {
    const slot = document.createElement('div');
    slot.className = 'slot';
    
    // Special handling for watches
    const isWatch = currentProduct === 'watch' || currentProduct === 'apple-watch';
    
    if (isWatch) {
        slot.style.cssText = `
            width: 40px;
            height: 40px;
            margin: 0 1px;
            flex-shrink: 0;
        `;
    }

    // Base charm image
    const baseImg = document.createElement('img');
    baseImg.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
    baseImg.dataset.type = 'base';
    baseImg.style.width = '100%';
    baseImg.style.height = '100%';
    baseImg.style.objectFit = 'contain';
    slot.appendChild(baseImg);
    
    slot.addEventListener('click', function() {
        handleSlotClick(this);
    });
    
    return slot;
}
// Modify your captureBraceletDesign function to use this:
async function captureBraceletDesign() {
    let jewelryPiece = document.getElementById('jewelry-piece');
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
function initializeCharmQuantities() {
    // Clear previous quantities
    for (const key in charmQuantities) {
        delete charmQuantities[key];
    }
    
    // Process all charms
    specialCharms.forEach(charm => {
        if (charm && charm.src) {
            // Use the exact path from your data
            charmQuantities[charm.src] = charm.quantity;
        }
    });
    
    rareCharms.forEach(charm => {
        if (charm && charm.src) {
            charmQuantities[charm.src] = charm.quantity;
        }
    });
}


// Check if adding a charm would complete a set
function checkCharmSetOnAdd(charmSrc) {
    const set = getCharmSet(charmSrc);
    if (!set) return true; // Not part of a set
    
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'))
        .map(img => img.src);
    
    const setCharmsPlaced = placedCharms.filter(placedSrc => 
        set.charms.some(charm => placedSrc.includes(charm))
    ).length;
    
    if (setCharmsPlaced + 1 === set.requiredCount) {
        return confirm(`${set.name} Alert!\n\n${set.message}\n\nYou're about to complete this set. Continue?`);
    }
    return true;
}

// Validate all sets in cart before checkout
function validateAllSetsInCart() {
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

    return invalidSets;
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeCharmQuantities();
    updateCharmDisplays();
});
function showSetWarning(charmSet) {
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'))
        .map(img => img.src);
    
    const setCharmsPlaced = placedCharms.filter(src => 
        charmSet.charms.some(charm => src.includes(charm))
    ).length;
    
    if (setCharmsPlaced > 0 && setCharmsPlaced < charmSet.requiredCount) {
        const remaining = charmSet.requiredCount - setCharmsPlaced;
        const warningMsg = `${charmSet.name} Set Notice:\n${charmSet.message}` +
            `\n\nYou still need to add ${remaining} more charm(s) from this set.`;
        
        showCustomWarningModal(warningMsg);
    }
}
function calculatePrice(includeDelivery = false) {
    // Handle individual charms separately
    if (currentProduct === 'individual') {
        const basePrice = 3; // Fixed base price of 3 JDs for individual charms
        
        let charmCost = 0;
        const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));
        
        placedCharms.forEach(charm => {
            if (charm.dataset.type === 'special') {
                charmCost += 2;
            } else if (charm.dataset.type === 'rare') {
                charmCost += 3;
            } else if (charm.dataset.type === 'custom') {
                charmCost += 3.5;
            } else if (charm.classList.contains('long-charm')) {
                charmCost += 6;
            }
        });
        
        const subtotal = basePrice + charmCost;
        const delivery = includeDelivery ? 2.5 : 0;
        const total = subtotal + delivery;
        
        return {
            subtotal: parseFloat(subtotal.toFixed(2)),
            discount: 0,
            total: parseFloat(total.toFixed(2)),
            delivery: parseFloat(delivery.toFixed(2))
        };
    }
     
    // Verify valid product and size data
    if (!PRODUCTS[currentProduct] || !SIZE_CHARTS[currentProduct] || !SIZE_CHARTS[currentProduct][currentSize]) {
        console.error(`Missing price data for ${currentProduct} size ${currentSize}`);
        return {
            subtotal: 0,
            discount: 0,
            total: 0,
            delivery: 0,
            basePrice: 0,
            charmCost: 0
        };
    }

    const product = PRODUCTS[currentProduct];
    const sizeData = SIZE_CHARTS[currentProduct][currentSize];
    
    // Calculate base price
    let originalPrice = isFullGlam ? product.fullGlam : (product.basePrice + sizeData.price);
    let totalPrice = originalPrice;

    // Apply material upgrades
    if (materialType === 'gold' && currentProduct === 'bracelet') {
        totalPrice += 1;
        originalPrice -= 1;
    } else if (materialType === 'gold') {
        totalPrice += 1;
        originalPrice += 1;
    } else if (materialType === 'mix') {
        totalPrice += 2.5;
        originalPrice += 2.5;
    }

    // Count all placed charms and calculate costs
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));
    let specialCount = 0;
    let rareCount = 0;
    let customCount = 0;
    let longCharmCount = 0;

    placedCharms.forEach(charm => {
        const type = charm.dataset.type;
        if (type === 'long') {
            longCharmCount++;
        } else if (type === 'special') {
            specialCount++;
        } else if (type === 'rare') {
            rareCount++;
        } else if (type === 'custom') {
            customCount++;
        }
    });
     
    // Apply charm costs to both prices
    if (!isFullGlam) {
        const includedSpecials = 1;
        const paidSpecials = Math.max(0, specialCount - includedSpecials);
        totalPrice += paidSpecials * 2;
        originalPrice += paidSpecials * 2;
    }
     
    // Add costs for rare, custom, and long charms
    totalPrice += rareCount * 3;
    originalPrice += rareCount * 3;
    
    totalPrice += customCount * 3.5;
    originalPrice += customCount * 3.5;
    
    totalPrice += longCharmCount * 6;
    originalPrice += longCharmCount * 6;

    // Check for discount eligibility
    let discountApplied = 0;
    const MINIMUM_FOR_DISCOUNT = 15.00;
    let qualifiesForDiscount = originalPrice >= MINIMUM_FOR_DISCOUNT;
    
    if (qualifiesForDiscount) {
        // Check for first order discount
        if (checkFirstOrderDiscount()) {
            discountApplied = Math.min(originalPrice * 0.1, 5);
            totalPrice = originalPrice - discountApplied;
        }
        
        // Check for seasonal discount
        const currentDate = new Date();
        const discountEndDate = new Date('2026-2-13');
        if (currentDate <= discountEndDate) {
            const seasonalDiscount = Math.min(originalPrice * 0.1, 5);
            discountApplied = Math.max(discountApplied, seasonalDiscount);
            totalPrice = originalPrice - discountApplied;
        }
    }

    // Ensure all values are valid numbers
    originalPrice = parseFloat(originalPrice.toFixed(2));
    totalPrice = parseFloat(totalPrice.toFixed(2));
    discountApplied = parseFloat(discountApplied.toFixed(2));

    if (includeDelivery) {
        const deliveryFee = 2.5;
        return {
            subtotal: originalPrice,
            discount: discountApplied,
            total: totalPrice + deliveryFee,
            delivery: deliveryFee,
            basePrice: isFullGlam ? product.fullGlam : product.basePrice + sizeData.price,
            charmCost: totalPrice - (isFullGlam ? product.fullGlam : product.basePrice + sizeData.price),
            longCharmCount: longCharmCount,
            specialCount: specialCount,
            rareCount: rareCount,
            customCount: customCount,
            qualifiesForDiscount: qualifiesForDiscount,
            minimumForDiscount: MINIMUM_FOR_DISCOUNT
        };
    }
    
    return {
        subtotal: originalPrice,
        discount: discountApplied,
        total: totalPrice,
        delivery: 0,
        basePrice: isFullGlam ? product.fullGlam : product.basePrice + sizeData.price,
        charmCost: totalPrice - (isFullGlam ? product.fullGlam : product.basePrice + sizeData.price),
        longCharmCount: longCharmCount,
        specialCount: specialCount,
        rareCount: rareCount,
        customCount: customCount,
        qualifiesForDiscount: qualifiesForDiscount,
        minimumForDiscount: MINIMUM_FOR_DISCOUNT
    };
}
function safeDisplayPrice(price) {
    if (isNaN(price) || price === null || price === undefined) {
        return '0.00';
    }
    return parseFloat(price).toFixed(2);
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
async function uploadImageToFirebase(imageData, folder = 'designs/') {
    try {
        // Convert data URL to blob
        let blob;
        if (typeof imageData === 'string' && imageData.startsWith('data:')) {
            const response = await fetch(imageData);
            blob = await response.blob();
        } else if (imageData instanceof Blob) {
            blob = imageData;
        } else {
            throw new Error('Invalid image data format');
        }

        // Create unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileName = `${folder}${timestamp}_${randomString}.png`;
        
        console.log('Uploading file:', fileName);
        
        // Get storage reference
        const storageRef = firebase.storage().ref(fileName);
        
        // Upload with metadata
        const uploadTask = storageRef.put(blob, {
            contentType: 'image/png',
            customMetadata: {
                uploadedBy: 'customer',
                uploadedAt: new Date().toISOString()
            }
        });

        // Wait for upload to complete
        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Progress monitoring
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload progress:', progress + '%');
                },
                (error) => {
                    console.error('Upload error:', error);
                    reject(new Error(`Upload failed: ${error.message}`));
                },
                async () => {
                    try {
                        // Get download URL
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                        console.log('File available at:', downloadURL);
                        resolve(downloadURL);
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                        reject(error);
                    }
                }
            );
        });
    } catch (error) {
        console.error('Upload process error:', error);
        throw error;
    }
}
function updateJewelryPiece() {
    let jewelryPiece = document.getElementById('jewelry-piece');
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
    
    if (!preview || !previewImage || !previewName || !previewType) return;
    
    previewImage.src = charmElement.src;
    
    // Get charm name
    let charmName = charmElement.dataset.name || 'Recommended Charm';
    if (!charmElement.dataset.name) {
        // Extract name from src as fallback
        const src = charmElement.src;
        if (src.includes('special/')) {
            charmName = src.split('special/')[1]?.split('.')[0]?.replace(/[-_]/g, ' ') || 'Special Charm';
        } else if (src.includes('rares/')) {
            charmName = src.split('rares/')[1]?.split('.')[0]?.replace(/[-_]/g, ' ') || 'Rare Charm';
        }
    }
    
    previewName.textContent = charmName.charAt(0).toUpperCase() + charmName.slice(1);
    
    // Get charm type and pricing
    const charmType = charmElement.dataset.type;
    if (charmType === 'special') {
        previewType.textContent = 'Special Charm (+2 JDs)';
    } else if (charmType === 'rare') {
        previewType.textContent = 'Rare Charm (+3 JDs)';
    } else {
        previewType.textContent = 'Charm';
    }
    
    preview.classList.add('active');
    selectedCharmPreview = charmElement;
}
    
    // Function to hide the charm preview
    function hideSelectedCharmPreview() {
    const preview = document.getElementById('selected-charm-preview');
    if (preview) {
        preview.classList.remove('active');
    }
    selectedCharmPreview = null;
    
    // Resume scrolling when charm is deselected
    resumeRecommendedScroll();
}
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDiscountInfo = document.getElementById('cart-discount-info');
    const cartDiscountAmount = document.getElementById('cart-discount-amount');
    const cartDelivery = document.getElementById('cart-delivery');
    const cartTotal = document.querySelector('.cart-total');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartSubtotal.textContent = 'Subtotal: 0.00 JDs';
        cartTotal.textContent = 'Total: 0.00 JDs';
        cartDiscountInfo.style.display = 'none';
        cartDelivery.textContent = 'Delivery Fee: 2.50 JDs';
        return;
    }
    
    let itemsHTML = '';
    const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    const discountedSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = 2.5;
    
    // 🎯 CHECK MINIMUM ORDER FOR DISCOUNT
    const MINIMUM_ORDER = 15.00;
    const qualifiesForDiscount = subtotal >= MINIMUM_ORDER;
    let additionalDiscount = 0;
    
    if (qualifiesForDiscount) {
        const currentDate = new Date();
        const discountEndDate = new Date('2025-10-31');
        
        if (currentDate <= discountEndDate) {
            const potentialDiscount = subtotal * 0.1;
            const alreadyDiscounted = subtotal - discountedSubtotal;
            additionalDiscount = Math.min(potentialDiscount - alreadyDiscounted, 5 - alreadyDiscounted);
        }
    }
    
    const totalBeforeDiscount = discountedSubtotal + deliveryFee;
    const finalTotal = totalBeforeDiscount - additionalDiscount;

    // Display cart items
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
    cartDelivery.textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
    
    // 🎯 BEAUTIFUL CART DISCOUNT DISPLAY
    // In your updateCartDisplay function, update the discount section:
if (additionalDiscount > 0) {
    cartDiscountInfo.style.display = 'block';
    cartDiscountAmount.innerHTML = `
        <div class="cart-discount-applied">
            <span class="discount-badge">🎉 10%</span>
            <span class="discount-amount">-${additionalDiscount.toFixed(2)} JDs</span>
        </div>
    `;
    
    cartTotal.innerHTML = `
        <div class="cart-total-with-discount">
            <span class="original-price" style="text-decoration: line-through; font-size: 0.9rem; color: #999; margin-right: 8px;">
                ${totalBeforeDiscount.toFixed(2)}
            </span>
            <span class="final-price" style="font-weight: bold; color: #d6336c; font-size: 1rem;">
                ${finalTotal.toFixed(2)} JDs
            </span>
        </div>
    `;
} else if (qualifiesForDiscount) {
    cartDiscountInfo.style.display = 'block';
    cartDiscountAmount.innerHTML = `
        <div class="cart-discount-eligible">
            <span class="discount-badge">⭐</span>
            <span>10% OFF at checkout</span>
        </div>
    `;
    cartTotal.textContent = `Total: ${totalBeforeDiscount.toFixed(2)} JDs`;
} else {
    cartDiscountInfo.style.display = 'block';
    const amountNeeded = (MINIMUM_ORDER - subtotal).toFixed(2);
    cartDiscountAmount.innerHTML = `
        <div class="cart-discount-not-eligible">
            <span class="discount-badge">+${amountNeeded}</span>
            <span>for 10% OFF</span>
        </div>
    `;
    cartTotal.textContent = `Total: ${totalBeforeDiscount.toFixed(2)} JDs`;
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
    try {
        const priceData = calculatePrice(false);
        
        // Update prices
        const basePriceElement = document.getElementById('base-price');
        const charmPriceElement = document.getElementById('charm-price');
        const totalPriceElement = document.getElementById('total-price');
        const discountOfferElement = document.getElementById('discount-offer');
        
        if (basePriceElement) {
            basePriceElement.querySelector('span:last-child').textContent = `${safeDisplayPrice(priceData.base)} JDs`;
        }
        
        if (charmPriceElement) {
            charmPriceElement.querySelector('span:last-child').textContent = `${safeDisplayPrice(priceData.charmCost)} JDs`;
        }
        
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total: ${safeDisplayPrice(priceData.total)} JDs`;
        }
        
        // Update discount offer on RIGHT side
        if (discountOfferElement) {
            discountOfferElement.className = 'discount-right'; // Reset class
            
            if (priceData.discount > 0) {
                // Discount is already applied
                discountOfferElement.classList.add('success');
                discountOfferElement.innerHTML = `
                    <div class="discount-line1">🎉 15% OFF!</div>
                    <div class="discount-line2">Saved ${safeDisplayPrice(priceData.discount)}</div>
                `;
                
                // Update total to show discount
                totalPriceElement.innerHTML = `
                    <span style="text-decoration: line-through; color: #999; margin-right: 8px;">
                        ${safeDisplayPrice(priceData.subtotal)} JDs
                    </span>
                    <span style="color: #d6336c;">
                        ${safeDisplayPrice(priceData.total)} JDs
                    </span>
                `;
                
            } else if (priceData.qualifiesForDiscount && priceData.subtotal > 0) {
                // Eligible for discount
                discountOfferElement.classList.add('info');
                discountOfferElement.innerHTML = `
                    <div class="discount-line1">⭐ 15% OFF!</div>
                    <div class="discount-line2">Ready to apply</div>
                `;
                
            } else if (priceData.subtotal > 0 && priceData.subtotal < priceData.minimumForDiscount) {
                // Need more to qualify
                const amountNeeded = (priceData.minimumForDiscount - priceData.subtotal).toFixed(2);
                discountOfferElement.classList.add('warning');
                discountOfferElement.innerHTML = `
                    <div class="discount-line1">Add ${amountNeeded} JDs</div>
                    <div class="discount-line2">for 15% OFF!</div>
                `;
                
            } else {
                // Default message
                discountOfferElement.classList.add('info');
                discountOfferElement.innerHTML = `
                    <div class="discount-line1">Add 5 JDs</div>
                    <div class="discount-line2">to get 15% OFF!</div>
                `;
            }
        }
        
    } catch (error) {
        console.log('Price update failed:', error);
        // Set default values
        const totalPriceElement = document.getElementById('total-price');
        const discountOfferElement = document.getElementById('discount-offer');
        
        if (totalPriceElement) totalPriceElement.textContent = 'Total: 0.00 JDs';
        if (discountOfferElement) {
            discountOfferElement.className = 'discount-right info';
            discountOfferElement.innerHTML = `
                <div class="discount-line1">Add 5 JDs</div>
                <div class="discount-line2">to get 15% OFF!</div>
            `;
        }
    }
}
function getCharmBreakdownText() {
    const placedCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'));
    let specialCount = 0, rareCount = 0, customCount = 0;

    placedCharms.forEach(charm => {
        const type = charm.dataset.type;
        if (type === 'special') specialCount++;
        else if (type === 'rare') rareCount++;
        else if (type === 'custom') customCount++;
    });

    const product = PRODUCTS[currentProduct];
    const freeSpecials = isFullGlam ? product.baseSlots : product.includedSpecial;
    const paidSpecials = Math.max(0, specialCount - freeSpecials);

    let text = `Charms: ${Math.min(specialCount, freeSpecials)}/${freeSpecials} free specials`;
    if (paidSpecials > 0) text += `, ${paidSpecials} paid (+${(paidSpecials * 2).toFixed(2)} JD)`;
    if (rareCount > 0) text += `, ${rareCount} rare (+${(rareCount * 3).toFixed(2)} JD)`;
    if (customCount > 0) text += `, ${customCount} custom (+${(customCount * 3.5).toFixed(2)} JD)`;

    return text;
}
function initWatchPool() {
    // Remove existing watch pool if it exists
    if (watchPoolContainer && watchPoolContainer.parentNode) {
        watchPoolContainer.parentNode.removeChild(watchPoolContainer);
    }

    watchPoolContainer = document.createElement('div');
    watchPoolContainer.className = 'watch-pool-container';
    watchPoolContainer.style.display = 'flex';
    watchPoolContainer.style.flexWrap = 'wrap';
    watchPoolContainer.style.justifyContent = 'center';
    watchPoolContainer.style.gap = '15px';
    watchPoolContainer.style.margin = '20px auto';
    watchPoolContainer.style.padding = '15px';
    watchPoolContainer.style.background = '#fff0f5';
    watchPoolContainer.style.borderRadius = '16px';
    
    WATCH_POOL.forEach(watch => {
        const watchOption = document.createElement('div');
        watchOption.className = 'watch-option';
        if (watch.soldOut) watchOption.classList.add('sold-out');
        
        const watchImg = document.createElement('img');
        watchImg.src = watch.image;
        watchImg.style.width = '100px';
        watchImg.style.height = '100px';
        watchImg.style.objectFit = 'contain';
        watchOption.appendChild(watchImg);
        
        if (watch.soldOut) {
            const soldOutLabel = document.createElement('div');
            soldOutLabel.className = 'sold-out-label';
            soldOutLabel.textContent = 'SOLD OUT';
            watchOption.appendChild(soldOutLabel);
        } else {
            watchOption.addEventListener('click', () => {
                currentWatchBase = watch.image;
                updateWatchBase();
            });
        }
        
        watchPoolContainer.appendChild(watchOption);
    });
    
    // Insert watch pool in the correct location
    const specialCharmsPool = document.querySelector('.charm-pool');
    if (specialCharmsPool) {
        specialCharmsPool.parentNode.insertBefore(watchPoolContainer, specialCharmsPool);
    } else {
        // Fallback to inserting after jewelry piece
        let jewelryPiece = document.getElementById('jewelry-piece');
        if (jewelryPiece) {
            jewelryPiece.parentNode.insertBefore(watchPoolContainer, jewelryPiece.nextSibling);
        }
    }
}
function centerScrollOnLoad() {
  let jewelryPiece = document.getElementById('jewelry-piece');
  if (jewelryPiece) {
    // Calculate center position after a small delay to allow rendering
    setTimeout(() => {
      jewelryPiece.scrollLeft = (jewelryPiece.scrollWidth - jewelryPiece.clientWidth) / 2;
    }, 100);
  }
}

// Call this after initializing the jewelry piece
document.addEventListener('DOMContentLoaded', centerScrollOnLoad);

function initSpecialProductWithBase(productType) {
  let jewelryPiece = document.getElementById('jewelry-piece');
  jewelryPiece.innerHTML = '';
  jewelryPiece.className = `${productType}-container`;
  
  // Base styles for all types
  jewelryPiece.style.cssText = `
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    align-items: center;
    padding: 10px;
    min-width: 100%;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
  `;
  
  const slotCount = SIZE_CHARTS[productType][currentSize].charms;

  if (productType === 'keychain') {
    // Restore keychain functionality
    jewelryPiece.style.justifyContent = 'flex-start';
    
    const baseContainer = document.createElement('div');
    baseContainer.className = 'product-base-container';
    baseContainer.style.flexShrink = '0';
    
    const baseImg = document.createElement('img');
    baseImg.src = 'basecharms/keychain-base.png';
    baseImg.className = 'product-base-image';
    baseImg.style.cssText = `
      width: 120px;
      height: auto;
      object-fit: contain;
    `;
    baseContainer.appendChild(baseImg);
    jewelryPiece.appendChild(baseContainer);
    
    for (let i = 0; i < slotCount; i++) {
      jewelryPiece.appendChild(createBaseSlot());
    }
  } 
  else if (productType === 'watch' || productType === 'apple-watch') {
    // Revised watch initialization that keeps all charms visible
    jewelryPiece.style.justifyContent = 'flex-start'; // Changed back to flex-start
    
    const slotsBefore = Math.floor(slotCount / 2);
    const slotsAfter = slotCount - slotsBefore;

    // Add left slots directly to jewelry piece
    for (let i = 0; i < slotsBefore; i++) {
      jewelryPiece.appendChild(createBaseSlot());
    }

    // Create base container
    const baseContainer = document.createElement('div');
    baseContainer.className = 'product-base-container';
    baseContainer.style.cssText = `
      flex-shrink: 0;
      margin: 0 15px;
      display: flex;
      justify-content: center;
    `;
    
    const baseImg = document.createElement('img');
    baseImg.className = 'product-base-image';
    baseImg.src = productType === 'watch' 
      ? (currentWatchBase || 'basecharms/watch-base.png')
      : 'basecharms/apple-watch-base.png';
    baseImg.style.cssText = `
      width: auto;
      height: 120px;
      max-width: 300px;
      object-fit: contain;
    `;
    
    baseContainer.appendChild(baseImg);
    jewelryPiece.appendChild(baseContainer);

    // Add right slots directly to jewelry piece
    for (let i = 0; i < slotsAfter; i++) {
      jewelryPiece.appendChild(createBaseSlot());
    }

    // Calculate initial scroll position to center the base
    setTimeout(() => {
      const baseElement = jewelryPiece.querySelector('.product-base-container');
      if (baseElement) {
        const containerCenter = jewelryPiece.clientWidth / 2;
        const baseCenter = baseElement.offsetLeft + (baseElement.offsetWidth / 2);
        const scrollPosition = baseCenter - containerCenter;
        
        jewelryPiece.scrollLeft = scrollPosition;
      }
    }, 100);
  }
}
function handleCharmSelection(charmElement) {
    console.log('🎯 === CHARM SELECTION START ===');
    
    // Prevent selection if already sold out
    if (charmElement.classList.contains('sold-out') || charmElement.classList.contains('out-of-stock')) {
        alert('This charm is out of stock!');
        return;
    }
    
    // Toggle selection - Unified logic for all charms
    if (charmElement.classList.contains('selected')) {
        console.log('🔽 Deselecting charm');
        charmElement.classList.remove('selected');
        selectedCharm = null;
        hideSelectedCharmPreview();
    } else {
        console.log('🔼 Selecting new charm');
        
        // Remove selection from ALL charms (including recommended)
        document.querySelectorAll('.charm.selected, .recommended-charm-image.selected').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Select this charm
        charmElement.classList.add('selected');
        selectedCharm = charmElement;
        
        // Ensure data attributes
        ensureCharmDataAttributes(charmElement);
        
        // Update preview
        updateSelectedCharmPreview(charmElement);
    }
    
    console.log('🎯 === CHARM SELECTION END ===');
}
function debugSelectedCharm() {
    console.log('=== DEBUG SELECTED CHARM ===');
    console.log('selectedCharm:', selectedCharm);
    if (selectedCharm) {
        console.log('src:', selectedCharm.src);
        console.log('dataset:', selectedCharm.dataset);
        console.log('classList:', selectedCharm.classList);
    }
    console.log('============================');
}
// Add this debug function and call it when there are issues
function debugCharmSelection() {
    console.log('=== DEBUG CHARM SELECTION ===');
    console.log('selectedCharm:', selectedCharm);
    if (selectedCharm) {
        console.log('selectedCharm details:', {
            src: selectedCharm.src,
            dataset: selectedCharm.dataset,
            classList: Array.from(selectedCharm.classList)
        });
    }
    
    // Check all recommended charms
    const recommendedCharms = document.querySelectorAll('.recommended-charm-image');
    console.log('Total recommended charms:', recommendedCharms.length);
    recommendedCharms.forEach((charm, index) => {
        console.log(`Recommended charm ${index}:`, {
            src: charm.src,
            dataset: charm.dataset,
            hasClickListener: !!charm.onclick
        });
    });
}

function handleSlotClick(slot) {
    // If there's a selected charm, try to place it
    if (selectedCharm) {
        const existingCharm = slot.querySelector('img:not([data-type="base"])');
        
        // If there's already a charm in this slot, remove it first
        if (existingCharm) {
            removeCharmFromSlot(slot);
            
            // If we're clicking the same charm type, just remove it (toggle behavior)
            if (existingCharm.src === selectedCharm.src) {
                selectedCharm = null;
                hideSelectedCharmPreview();
                return;
            }
        }
        
        // Now place the new charm - use a unified function
        placeSelectedCharm(slot);
        
        // Resume scrolling after placing charm
        resumeRecommendedScroll();
    } 
    // If no charm selected but slot has a charm, remove it
    else {
        const existingCharm = slot.querySelector('img:not([data-type="base"])');
        if (existingCharm) {
            removeCharmFromSlot(slot);
        }
    }
}
function updateWatchBase() {
    const baseImg = document.querySelector('.product-base-image');
    if (baseImg && currentWatchBase) {
        baseImg.src = currentWatchBase;
    }
}
function initStandardJewelry(productType) {
    let jewelryPiece = document.getElementById('jewelry-piece');
    
    // Normal jewelry piece styling
    jewelryPiece.className = '';
    jewelryPiece.style.display = 'flex';
    jewelryPiece.style.flexWrap = 'wrap';
    jewelryPiece.style.gap = '4px';
    jewelryPiece.style.justifyContent = 'center';

    // Create normal slots with editable bases
    const slotCount = SIZE_CHARTS[productType][currentSize].charms;
    for (let i = 0; i < slotCount; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        
        // Normal base charm (editable)
        const baseImg = document.createElement('img');
        baseImg.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
        baseImg.dataset.type = 'base';
        baseImg.style.width = '100%';
        baseImg.style.height = '100%';
        
        slot.appendChild(baseImg);
        jewelryPiece.appendChild(slot);
    }
}

function centerJewelryPiece() {
  let jewelryPiece = document.getElementById('jewelry-piece');
  if (!jewelryPiece) return;
  
  // Don't center if it's a keychain (we want left-aligned)
  if (jewelryPiece.classList.contains('keychain-container')) return;
  
  // Calculate center position
  const centerScroll = (jewelryPiece.scrollWidth - jewelryPiece.clientWidth) / 2;
  
  // Apply with smooth behavior
  jewelryPiece.scrollTo({
    left: centerScroll,
    behavior: 'auto' // Changed from 'smooth' for immediate centering
  });
  
  // Update scroll indicators
  updateScrollIndicators();
}

// Call this after initializing jewelry piece and after any updates

function initProduct(product) {
    // Store existing charms before clearing (only for individual mode)
    let existingCharms = [];
    if (currentProduct === 'individual') {
        existingCharms = Array.from(jewelryPiece.querySelectorAll('.slot'))
            .map(slot => {
                const charm = slot.querySelector('img:not([data-type="base"])');
                return charm ? {
                    src: charm.src,
                    type: charm.dataset.type,
                    isLong: slot.classList.contains('long-slot'),
                    isDangly: slot.classList.contains('has-dangly')
                } : null;
            })
            .filter(Boolean);
    }

    // Set the current product
    currentProduct = product;
    
    // Set default size based on product type
    if (product === 'keychain') {
        currentSize = '5 charms';
    } else if (product === 'watch' || product === 'apple-watch') {
        currentSize = '15.2-16.2';
    } else if (product !== 'individual') {
        // For other products, use their first available size
        const sizes = Object.keys(SIZE_CHARTS[product]);
        if (sizes.length > 0) {
            currentSize = sizes[0];
        }
    }

    // Update UI elements
    const individualControls = document.getElementById('individual-controls');
    const sizeControls = document.getElementById('size-controls');
    const materialSelector = document.querySelector('.material-selector');
    const fullGlamBtn = document.getElementById('full-glam-btn');
    const addCharmsLabel = document.querySelector('.add-charms-label');

    // Reset design state
    jewelryPiece.innerHTML = '';
    selectedCharm = null;
    hideSelectedCharmPreview();
    usedCharms.clear();

    // Update size dropdown
    updateSizeOptions(product);

    // Handle product-specific UI
    if (product === 'watch' || product === 'apple-watch' || product === 'keychain') {
        if (individualControls) individualControls.style.display = 'none';
        if (sizeControls) sizeControls.style.display = 'block';
        if (materialSelector) materialSelector.style.display = 'none';
        if (fullGlamBtn) fullGlamBtn.style.display = 'none';
        
        initSpecialProductWithBase(product);
    } 
    else if (product === 'individual') {
        // Show individual controls
        if (individualControls) individualControls.style.display = 'flex';
        
        // Hide irrelevant elements
        if (sizeControls) sizeControls.style.display = 'none';
        if (materialSelector) materialSelector.style.display = 'none';
        if (fullGlamBtn) fullGlamBtn.style.display = 'none';
        if (addCharmsLabel) addCharmsLabel.style.display = 'none';
        
        // Initialize individual slots with preserved charms
        updateIndividualSlots(existingCharms);
    } 
    else {
        if (individualControls) individualControls.style.display = 'none';
        if (sizeControls) sizeControls.style.display = 'block';
        if (materialSelector) materialSelector.style.display = 'flex';
        if (fullGlamBtn) fullGlamBtn.style.display = 'block';
        if (addCharmsLabel) addCharmsLabel.style.display = 'block';
        
        initJewelryPiece();
        isFullGlam = false;
        if (fullGlamBtn) fullGlamBtn.classList.remove('active');
    }
    if (product === 'watch') {
        initWatchPool(); // Initialize watch pool for watch products
        if (individualControls) individualControls.style.display = 'none';
        if (sizeControls) sizeControls.style.display = 'block';
        if (materialSelector) materialSelector.style.display = 'none';
        if (fullGlamBtn) fullGlamBtn.style.display = 'none';
        
        initSpecialProductWithBase(product);
    }else {
        // Hide watch pool for other products
        if (watchPoolContainer) watchPoolContainer.style.display = 'none';
        // ... rest of initialization ...
    }
    // Update material display
    updateBaseCharms();
    
    // Update product button active state
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === product) {
            btn.classList.add('active');
        }
    });

    // Update price display
    updatePrice();
    
    setTimeout(() => {
        centerJewelryPiece();
    }, 100);
}
function isLoveOrDolphinCharm(src) {
    const loveDolphinCharmPaths = [
        'rares/love/6.png',
        'rares/love/7.png',
        'rares/love/c218.png',
        'rares/love/c219.png'
    ];
    
    return loveDolphinCharmPaths.some(path => src.includes(path));
}

function updateScrollIndicators() {
  const container = document.querySelector('.bracelet-container');
  if (!container) return;
  
  let jewelryPiece = document.getElementById('jewelry-piece');
  const scrollLeft = jewelryPiece.scrollLeft;
  const maxScroll = jewelryPiece.scrollWidth - jewelryPiece.clientWidth;
  
  container.classList.toggle('scroll-start', scrollLeft <= 10);
  container.classList.toggle('scroll-end', scrollLeft >= maxScroll - 10);
}

// Add event listener
document.getElementById('jewelry-piece')?.addEventListener('scroll', updateScrollIndicators);

// Initial check
updateScrollIndicators();


// Make sure your event listener is set up correctly:
document.getElementById('size')?.addEventListener('change', function() {
    updateJewelrySize(this.value);
});

// Set up product change listeners
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const product = this.dataset.type;
        initProduct(product);
    });
});
function checkSelectionSetup() {
    console.log('Current product:', currentProduct);
    console.log('Current size:', currentSize);
    
    const sizeSelect = document.getElementById('size');
    if (sizeSelect) {
        console.log('Size selector options:', sizeSelect.options);
        console.log('Selected value:', sizeSelect.value);
    } else {
        console.error('Size selector not found!');
    }
    
    console.log('SIZE_CHARTS:', SIZE_CHARTS[currentProduct]);
}
function handleWatchSlotClick(slot) {
    if (selectedCharm) {
        const charmSrc = selectedCharm.src;
        const isSpecialDangly = isLoveOrDolphinCharm(charmSrc);
        
        if (isSpecialDangly) {
            // Special handling for love/dolphin charms on watches
            slot.classList.add('has-dangly');
            slot.style.height = '80px'; // Double height for watches
            
            const charmImg = document.createElement('img');
            charmImg.src = charmSrc;
            charmImg.className = 'dangly-charm';
            charmImg.style.width = '40px';
            charmImg.style.height = '80px';
            slot.appendChild(charmImg);
        } else {
            // Normal charm handling
            const existingCharm = slot.querySelector('img:not([data-type="base"])');
            if (existingCharm) {
                slot.removeChild(existingCharm);
                return;
            }
            
            const charmImg = document.createElement('img');
            charmImg.src = charmSrc;
            charmImg.style.width = '30px';
            charmImg.style.height = '30px';
            slot.appendChild(charmImg);
        }
    }
}
function updateSizeOptions(product) {
    const sizeSelect = document.getElementById('size');
    if (!sizeSelect) {
        console.error('Size selector not found!');
        return;
    }

    // Clear existing options
    sizeSelect.innerHTML = '';

    // Get available sizes for this product
    const sizes = SIZE_CHARTS[product];
    if (!sizes) return;

    // Add new options
    Object.entries(sizes).forEach(([size, data]) => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = data.display;
        sizeSelect.appendChild(option);
    });

    // Set default selection
    if (sizes[currentSize]) {
        sizeSelect.value = currentSize;
    } else {
        currentSize = Object.keys(sizes)[0];
        sizeSelect.value = currentSize;
    }
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
        updatePrice(); // Force price update immediately
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

    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}
// Update the updateIndividualSlots function:

function updateIndividualSlots(preservedCharms = []) {
    let jewelryPiece = document.getElementById('jewelry-piece');
    jewelryPiece.innerHTML = '';
    jewelryPiece.className = 'individual-container';
    
    // Store existing charms if not provided
    if (preservedCharms.length === 0) {
        preservedCharms = Array.from(jewelryPiece.querySelectorAll('.slot'))
            .map(slot => {
                const charm = slot.querySelector('img:not([data-type="base"])');
                return charm ? {
                    src: charm.src,
                    type: charm.dataset.type,
                    isLong: slot.classList.contains('long-slot'),
                    isDangly: slot.classList.contains('has-dangly')
                } : null;
            })
            .filter(Boolean);
    }

    for (let i = 0; i < individualSlotCount; i++) {
        const slotContainer = document.createElement('div');
        slotContainer.className = 'slot-container';
        
        const slot = document.createElement('div');
        slot.className = 'slot individual-slot';
        slot.style.width = '84px';
        slot.style.height = '84px';

        // Add base charm
        const baseImg = document.createElement('img');
        baseImg.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
        baseImg.dataset.type = 'base';
        baseImg.style.width = '100%';
        baseImg.style.height = '100%';
        slot.appendChild(baseImg);

        // Add existing charm if available for this position
        if (i < preservedCharms.length) {
            const charmData = preservedCharms[i];
            const charmImg = document.createElement('img');
            charmImg.src = charmData.src;
            charmImg.dataset.type = charmData.type;
            charmImg.style.width = '100%';
            charmImg.style.height = '100%';
            charmImg.style.objectFit = 'contain';
            
            if (charmData.isLong) {
                slot.style.width = '168px';
                charmImg.classList.add('long-charm');
            } 
            else if (charmData.isDangly) {
                slot.style.height = '168px';
                slot.classList.add('has-dangly');
                charmImg.classList.add('dangly-charm');
            }
            
            slot.appendChild(charmImg);
        }

        slot.addEventListener('click', function() {
            handleSlotClick(this);
        });
        
        slotContainer.appendChild(slot);

        // Add controls to last slot
        if (i === individualSlotCount - 1) {
            const controls = document.createElement('div');
            controls.className = 'slot-controls';
            
            const minusBtn = document.createElement('button');
            minusBtn.className = 'control-btn minus-btn';
            minusBtn.innerHTML = '-';
            minusBtn.disabled = individualSlotCount <= 1;
            minusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (individualSlotCount > 1) {
                    individualSlotCount--;
                    // Pass the current charms to preserve them
                    const currentCharms = Array.from(jewelryPiece.querySelectorAll('.slot'))
                        .map(s => {
                            const c = s.querySelector('img:not([data-type="base"])');
                            return c ? {
                                src: c.src,
                                type: c.dataset.type,
                                isLong: s.classList.contains('long-slot'),
                                isDangly: s.classList.contains('has-dangly')
                            } : null;
                        })
                        .filter(Boolean);
                    updateIndividualSlots(currentCharms);
                    updatePrice();
                }
            });
            
            const plusBtn = document.createElement('button');
            plusBtn.className = 'control-btn plus-btn';
            plusBtn.innerHTML = '+';
            plusBtn.disabled = individualSlotCount >= maxIndividualSlots;
            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (individualSlotCount < maxIndividualSlots) {
                    individualSlotCount++;
                    // Pass the current charms to preserve them
                    const currentCharms = Array.from(jewelryPiece.querySelectorAll('.slot'))
                        .map(s => {
                            const c = s.querySelector('img:not([data-type="base"])');
                            return c ? {
                                src: c.src,
                                type: c.dataset.type,
                                isLong: s.classList.contains('long-slot'),
                                isDangly: s.classList.contains('has-dangly')
                            } : null;
                        })
                        .filter(Boolean);
                    updateIndividualSlots(currentCharms);
                    updatePrice();
                }
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

    // KEEP ONLY THIS ONE addToCartBtn EVENT LISTENER - REMOVE THE DUPLICATE BELOW
    addToCartBtn.addEventListener('click', async () => {
        try {
            // First validate charm sets in current design
            const currentCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'))
                .map(img => ({ src: img.src, type: img.dataset.type }));
            
            const invalidSets = validateCharmsForSets(currentCharms);
            if (invalidSets.length > 0) {
                const errorMessages = invalidSets.map(set => 
                    `• ${set.name}: ${set.message}\n  (Problem: ${set.problem})`
                ).join('\n\n');
                
                showCustomWarningModal(
                    `Cannot Add to Cart!\n\nDesign has invalid charm sets:\n\n${errorMessages}\n\n` +
                    'Please fix these issues before adding to cart.'
                );
                return;
            }

            // If validation passes, proceed with adding to cart
            addToCartBtn.disabled = true;
            addToCartBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';

            // Capture design as data URL (no storage upload)
            const designImage = await captureBraceletDesign();
            const priceData = calculatePrice(false);
            
            const cartItem = {
                id: Date.now().toString(),
                product: currentProduct,
                symbol: '🍓',
                size: currentSize,
                isFullGlam: isFullGlam,
                materialType: materialType,
                price: priceData.total,
                originalPrice: priceData.subtotal,
                designImage: designImage, // Store data URL directly
                charms: currentCharms,
                timestamp: new Date().toISOString()
            };
            
            cart.push(cartItem);
            updateCartDisplay();
            
            showToast('Design added to cart!');
            cartPreview.classList.add('active');
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            showToast('Could not add design to cart', 'error');
        } finally {
            addToCartBtn.disabled = false;
            addToCartBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        }
    });

    // REMOVE EVERYTHING FROM HERE DOWN TO THE DUPLICATE CATCH BLOCK

    // 2. Update the checkout button event listener
    placeOrderBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        
        // Validate before showing order modal
        const invalidSets = validateCartForCheckout();
        if (invalidSets.length > 0) {
            const errorMessages = invalidSets.map(set => 
                `• ${set.name}: ${set.message}\n  (Problem: ${set.problem})`
            ).join('\n\n');
            
            showCustomWarningModal(
                `Cannot Checkout!\n\nYour cart has invalid charm sets:\n\n${errorMessages}\n\n` +
                'Please complete these sets or remove the charms.'
            );
            return;
        }
        
        // If validation passes, show order modal
        orderModal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Calculate order totals
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const deliveryFee = 2.5;
        const total = subtotal + deliveryFee;
        
        document.getElementById('order-subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)} JDs`;
        document.getElementById('order-delivery').textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
        document.getElementById('order-total-price').textContent = `Total: ${total.toFixed(2)} JDs`;
    });
}
function validateCharmsForSets(charms) {
    const invalidSets = [];
    const currentItemCharmSrcs = charms.map(c => c.src);

    // Check for sets with multiple charms in this item
    Object.values(CHARM_SETS).forEach(set => {
        const charmsInItem = set.charms.filter(setCharm => 
            currentItemCharmSrcs.some(src => src.includes(setCharm))
        ).length;
        
        if (charmsInItem > 1) {
            invalidSets.push({
                name: set.name,
                message: set.message,
                problem: `Multiple charms in same item (${charmsInItem} found)`
            });
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
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    // Check minimum order amount
    const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    const MINIMUM_ORDER = 15.00;
   
    
    // Validate charm sets
    const invalidSets = validateCartForCheckout();
    if (invalidSets.length > 0) {
        const errorMessages = invalidSets.map(set => 
            `• ${set.name}: ${set.message}\n  (Problem: ${set.problem})`
        ).join('\n\n');
        
        showCustomWarningModal(
            `Cannot Checkout!\n\nYour cart has invalid charm sets:\n\n${errorMessages}\n\n` +
            'Please complete these sets or remove the charms.'
        );
        return;
    }
    
    // If validation passes, show order modal
    orderModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Calculate order totals with beautiful discount display
    const deliveryFee = 2.5;
    const totalBeforeDiscount = subtotal + deliveryFee;
    
    // Calculate discount
    let discount = 0;
    if (subtotal >= MINIMUM_ORDER) {
        discount = Math.min(subtotal * 0.1, 5);
    }
    
    const finalTotal = totalBeforeDiscount - discount;
    
    // Update order summary with beautiful discount display
    document.getElementById('order-subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)} JDs`;
    document.getElementById('order-delivery').textContent = `Delivery Fee: ${deliveryFee.toFixed(2)} JDs`;
    
    if (discount > 0) {
        document.getElementById('order-total-price').innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="text-decoration: line-through; color: #999;">
                        ${totalBeforeDiscount.toFixed(2)} JDs
                    </span>
                    <span style="font-weight: bold; color: #d6336c; font-size: 1.2rem;">
                        ${finalTotal.toFixed(2)} JDs
                    </span>
                </div>
                <div style="color: #4CAF50; font-size: 0.9rem; font-weight: bold;">
                    🎉 10% Discount Applied! (-${discount.toFixed(2)} JDs)
                </div>
            </div>
        `;
    } else {
        document.getElementById('order-total-price').textContent = `Total: ${finalTotal.toFixed(2)} JDs`;
    }
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
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    // Skip COD radio if disabled
    if (disableCOD && radio.value === 'Cash') return;
    
    radio.addEventListener('change', function() {
        if (this.value === 'PayPal') {
            document.getElementById('paypal-button-container').style.display = 'block';
            document.getElementById('payment-proof-container').style.display = 'none';
        } else if (this.value === 'Cliq') {
            document.getElementById('paypal-button-container').style.display = 'none';
            document.getElementById('payment-proof-container').style.display = 'block';
        } else if (this.value === 'Cash') {
            document.getElementById('paypal-button-container').style.display = 'none';
            document.getElementById('payment-proof-container').style.display = 'none';
        }
    });
});
async function handleFormSubmit(e, isPayPalSuccess = false, paypalData = null) {
    if (e && e.preventDefault) e.preventDefault();
    
    const form = e.target || document.getElementById('order-form');
    const submitButton = form.querySelector('button[type="submit"]');

    // Prevent multiple submissions
    if (window.orderSubmissionInProgress) return;
    window.orderSubmissionInProgress = true;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
        let formData;
        if (!isPayPalSuccess) {
            formData = new FormData(form);
            
            // Validate form fields
            const requiredFields = ['full-name', 'phone', 'governorate', 'address', 'payment'];
            const missingFields = requiredFields.filter(field => !formData.get(field));
            
            if (missingFields.length > 0) {
                throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            }
        } else {
            formData = new FormData();
            // Add PayPal data to formData
            Object.entries(paypalData).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }

        // Calculate order totals
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const deliveryFee = 2.5;
        const totalJOD = subtotal + deliveryFee;
        const totalUSD = (totalJOD * JOD_TO_USD_RATE).toFixed(2);

        // Create order data
        const orderData = await prepareOrderData(formData, totalJOD, totalUSD, isPayPalSuccess ? paypalData : null);
        
        // Submit to Firestore
        const orderRef = await db.collection('orders').add(orderData);
        console.log('Order submitted with ID:', orderRef.id);

        // Send email notifications
        await sendOrderNotifications(orderRef.id, orderData);

        // Clear cart and reset form
        cart.length = 0;
        updateCartDisplay();
        if (form.reset) form.reset();
        if (paymentProofContainer) paymentProofContainer.style.display = 'none';

        // Show confirmation
        orderIdSpan.textContent = orderRef.id;
        orderModal.classList.remove('active');
        orderConfirmation.classList.add('active');
         if (auth.currentUser) {
            setTimeout(expandOrdersForNewOrder, 1000);
        }
        showToast('Order submitted successfully!', 'success');
        
    } catch (error) {
        console.error('Order submission failed:', error);
        showToast(error.message || 'Order submission failed. Please try again.', 'error');
    } finally {
        window.orderSubmissionInProgress = false;
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-check-circle"></i> Confirm Order';
        }
    }
}

// Email notification function
async function sendOrderNotifications(orderId, orderData) {
    try {
        // Get the cloud function
        const sendOrderEmails = firebase.functions().httpsCallable('sendOrderEmails');
        
        // Call the function
        const result = await sendOrderEmails({
            orderId: orderId,
            orderData: orderData,
            customerEmail: orderData.customer.email,
            customerName: orderData.customer.name
        });
        
        console.log('Email notifications sent:', result.data);
    } catch (error) {
        console.error('Failed to send email notifications:', error);
        // Don't throw error - order should still be saved even if emails fail
    }
}
async function prepareOrderData(formData, totalJOD, totalUSD, paypalData = null) {
    const paymentMethod = formData.get('payment') || (paypalData ? 'PayPal' : 'Unknown');
    const currentUser = auth.currentUser;
    
    // Store design images as data URLs
    const itemsWithDesigns = cart.map((item) => {
        return {
            product: item.product,
            size: item.size,
            price: item.price,
            originalPrice: item.originalPrice,
            designImage: item.designImage,
            isFullGlam: item.isFullGlam,
            materialType: item.materialType,
            charms: item.charms,
            timestamp: new Date().toISOString()
        };
    });

    // Build order data with user info
    const orderData = {
        clientOrderId: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        customer: {
            name: formData.get('full-name') || 'Not provided',
            phone: formData.get('phone') || 'Not provided',
            phone2: formData.get('phone2') || null,
            governorate: formData.get('governorate') || 'Not provided',
            address: formData.get('address') || 'Not provided',
            notes: formData.get('notes') || null,
            email: formData.get('customer-email') || (currentUser ? currentUser.email : null)
        },
        // Enhanced user linking
        userId: currentUser ? currentUser.uid : null,
    userEmail: currentUser ? currentUser.email : formData.get('customer-email'),
    isGuestOrder: currentUser ? false : true,
        userName: currentUser ? currentUser.displayName : formData.get('full-name'),
        paymentMethod: paymentMethod,
        currency: "JOD",
        amountJOD: totalJOD,
        amountUSD: totalUSD,
        exchangeRate: JOD_TO_USD_RATE,
        paymentStatus: paymentMethod === 'PayPal' ? 'paid' : 'pending',
        paymentDetails: paypalData,
        items: itemsWithDesigns,
        subtotal: cart.reduce((sum, item) => sum + item.price, 0),
        deliveryFee: 2.5,
        total: totalJOD,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'pending',
        // Add for easy querying
        userOrderIndex: currentUser ? `${currentUser.uid}_${Date.now()}` : null
    };

    // Handle payment proof for Cliq
    if (paymentMethod === 'Cliq') {
        const paymentProofFile = document.getElementById('payment-proof')?.files[0];
        if (paymentProofFile) {
            try {
                const paymentProofDataUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(paymentProofFile);
                });
                orderData.paymentProof = paymentProofDataUrl;
            } catch (error) {
                console.error('Failed to process payment proof:', error);
            }
        }
    }
    
    return orderData;
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
    // In your setupOrderFunctionality function, update the form submission:
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        handleFormSubmit(e);
    });
}
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
  let jewelryPiece = document.getElementById('jewelry-piece');
  jewelryPiece.innerHTML = '';
  
  // Remove any extra classes that might affect sizing
  jewelryPiece.className = '';
  
  // For watches/apple watches, use special initialization
  if (currentProduct === 'watch' || currentProduct === 'apple-watch' || currentProduct === 'keychain') {
    initSpecialProductWithBase(currentProduct);
    return;
  }
  
  // For individual charms
  if (currentProduct === 'individual') {
    updateIndividualSlots();
    return;
  }

  // Create slots with exact fit
  const slotCount = SIZE_CHARTS[currentProduct][currentSize].charms;
  for (let i = 0; i < slotCount; i++) {
    jewelryPiece.appendChild(createBaseSlot());
  }
  
  // Center the scroll after creation
  centerScrollOnLoad();
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

function showCustomWarningModal(message) {
    let warningModal = document.getElementById('custom-warning-modal');
    
    if (!warningModal) {
        warningModal = document.createElement('div');
        warningModal.id = 'custom-warning-modal';
        warningModal.className = 'modal warning-modal';
        warningModal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <div class="warning-message">${message}</div>
                <button class="confirm-btn">OK, I Understand</button>
            </div>
        `;
        document.body.appendChild(warningModal);
        
        warningModal.querySelector('.close-btn').addEventListener('click', () => {
            warningModal.style.display = 'none';
        });
        warningModal.querySelector('.confirm-btn').addEventListener('click', () => {
            warningModal.style.display = 'none';
        });
    }
    
    warningModal.querySelector('.warning-message').innerHTML = message;
    warningModal.style.display = 'flex';
}
// Helper functions for specific charm types
function handleLongCharmPlacement(slot, charmSrc, charmType, isWatch, baseSize) {
    const slotIndex = Array.from(jewelryPiece.children).indexOf(slot);
    
    if (slotIndex + 1 >= jewelryPiece.children.length) {
        alert("Not enough space for a long charm at this position!");
        return;
    }
    
    const longContainer = document.createElement('div');
    longContainer.className = 'slot long-slot';
    longContainer.style.width = `${baseSize * 2}px`;
    longContainer.style.height = `${baseSize}px`;
    
    const longCharm = document.createElement('img');
    longCharm.src = charmSrc;
    longCharm.className = 'long-charm';
    longCharm.dataset.type = charmType;
    longCharm.style.width = '100%';
    longCharm.style.height = '100%';
    longContainer.appendChild(longCharm);
    
    slot.replaceWith(longContainer);
    jewelryPiece.children[slotIndex + 1].remove();
    
    longContainer.addEventListener('click', () => handleSlotClick(longContainer));
}

function handleDanglyCharmPlacement(slot, charmSrc, charmType, isWatch, baseSize) {
    slot.classList.add('has-dangly');
    slot.style.height = `${baseSize * 2}px`;

    const charmImg = document.createElement('img');
    charmImg.src = charmSrc;
    charmImg.className = 'dangly-charm';
    charmImg.dataset.type = charmType;
    charmImg.style.width = '100%';
    charmImg.style.height = '100%';
    
    slot.innerHTML = '';
    slot.appendChild(charmImg);
}

function handleRegularCharmPlacement(slot, charmSrc, charmType) {
    const charmImg = document.createElement('img');
    charmImg.src = charmSrc;
    charmImg.dataset.type = charmType;
    charmImg.style.width = '100%';
    charmImg.style.height = '100%';
    
    slot.innerHTML = '';
    slot.appendChild(charmImg);
}
function ensureCharmDataAttributes(charmElement) {
    console.log('🔧 Ensuring data attributes for:', charmElement);
    
    // Always set data-charm from src if not present
    if (!charmElement.dataset.charm && charmElement.src) {
        charmElement.dataset.charm = charmElement.src;
        console.log('Set data-charm to:', charmElement.src);
    }
    
    // Always set data-type if not present
    if (!charmElement.dataset.type) {
        if (charmElement.classList.contains('special')) {
            charmElement.dataset.type = 'special';
        } else if (charmElement.classList.contains('rare')) {
            charmElement.dataset.type = 'rare';
        } else {
            // Default for recommended charms
            charmElement.dataset.type = 'rare';
        }
        console.log('Set data-type to:', charmElement.dataset.type);
    }
    
    // Ensure quantity
    if (!charmElement.dataset.quantity) {
        charmElement.dataset.quantity = '1';
    }
    
    console.log('Final dataset:', charmElement.dataset);}
function ensureCharmDataAttributes(charmElement) {
    if (!charmElement) return;
    
    // Ensure data-charm is set
    if (!charmElement.dataset.charm) {
        charmElement.dataset.charm = charmElement.src;
    }
    
    // Ensure data-type is set
    if (!charmElement.dataset.type) {
        if (charmElement.src.includes('special/')) {
            charmElement.dataset.type = 'special';
        } else if (charmElement.src.includes('rares/')) {
            charmElement.dataset.type = 'rare';
        } else {
            charmElement.dataset.type = 'rare'; // default
        }
    }
    
    // Ensure data-name is set
    if (!charmElement.dataset.name) {
        const src = charmElement.src;
        let name = 'Recommended Charm';
        if (src.includes('special/')) {
            name = src.split('special/')[1]?.split('.')[0]?.replace(/[-_]/g, ' ') || 'Special Charm';
        } else if (src.includes('rares/')) {
            name = src.split('rares/')[1]?.split('.')[0]?.replace(/[-_]/g, ' ') || 'Rare Charm';
        }
        charmElement.dataset.name = name;
    }
    
    console.log('🔧 Ensured data attributes:', charmElement.dataset);
}
function testCharmSelection() {
    console.log('=== TESTING CHARM SELECTION ===');
    console.log('selectedCharm global variable:', selectedCharm);
    
    const allCharms = document.querySelectorAll('.charm, .recommended-charm-image');
    console.log('Total charms found:', allCharms.length);
    
    const selectedCharms = document.querySelectorAll('.charm.selected, .recommended-charm-image.selected');
    console.log('Selected charms:', selectedCharms.length);
    
    // Test clicking the first recommended charm
    const firstRecommended = document.querySelector('.recommended-charm-image');
    if (firstRecommended) {
        console.log('First recommended charm:', firstRecommended);
        console.log('Clicking first recommended charm...');
        firstRecommended.click();
    }
}

function placeSelectedCharm(slot) {
    if (!selectedCharm) return;

    // Get charm details using the exact path from your data
    const charmSrc = selectedCharm.dataset.charm || selectedCharm.src;
    const charmType = selectedCharm.dataset.type;
    const charmSet = getCharmSet(charmSrc);
    const isWatch = currentProduct === 'watch' || currentProduct === 'apple-watch';
    
    // Determine if it's a long or dangly charm - Check both grid and recommended charms
    const isDanglyCharm = selectedCharm.classList.contains('dangly-charm') || 
                         isLoveOrDolphinCharm(charmSrc) ||
                         charmSrc.includes('dangly') ||
                         (selectedCharm.dataset.category && selectedCharm.dataset.category.includes('dangly'));
    
    const isLongCharm = selectedCharm.classList.contains('long-charm') ||
                       charmSrc.includes('long') ||
                       (selectedCharm.dataset.category && selectedCharm.dataset.category.includes('long'));

    // For grid charms, check their category data
    if (!isDanglyCharm && !isLongCharm) {
        const charmCategory = selectedCharm.dataset.category;
        if (charmCategory === 'dangly') isDanglyCharm = true;
        if (charmCategory === 'long') isLongCharm = true;
    }

    // Check inventory using exact path matching
    if (charmType !== 'custom') {
        if (charmQuantities[charmSrc] === undefined) {
            console.error('Charm not found in inventory:', charmSrc);
            return;
        }
        
        if (charmQuantities[charmSrc] <= 0) {
            alert('This charm is out of stock!');
            selectedCharm.classList.add('sold-out');
            selectedCharm.style.opacity = '0.5';
            selectedCharm.style.pointerEvents = 'none';
            selectedCharm.classList.remove('selected');
            selectedCharm = null;
            return;
        }
    }

    // Check charm set rules
    if (charmSet) {
        // Check if any part of this set is already in current item
        const currentItemCharms = Array.from(jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])'))
            .map(img => img.src);
        
        const setCharmsInItem = charmSet.charms.some(setCharm => 
            currentItemCharms.some(charm => charm.includes(setCharm))
        );
        
        if (setCharmsInItem) {
            alert(`${charmSet.message}\n\nCannot add multiple charms from this set to the same item.`);
            return;
        }

        // Check if adding would complete the set in cart
        if (wouldCompleteSetInCart(charmSet)) {
            if (!confirm(`${charmSet.message}\n\nYou're about to complete this set. Continue?`)) {
                return;
            }
        }
    }

    // Remove existing charm if any
    const existingCharm = slot.querySelector('img:not([data-type="base"])');
    if (existingCharm) {
        removeCharmFromSlot(slot);
    }

    // Remove base charm for all cases except watches
    if (!isWatch) {
        const baseCharm = slot.querySelector('img[data-type="base"]');
        if (baseCharm) {
            slot.removeChild(baseCharm);
        }
    }

    // Create new charm image
    const charmImg = document.createElement('img');
    charmImg.src = charmSrc;
    charmImg.dataset.type = charmType;
    charmImg.dataset.charm = charmSrc; // Store exact path
    charmImg.style.objectFit = 'contain';

    // Set proper sizing based on charm type and product
    const baseSize = isWatch ? 40 : 84;
    
    if (isLongCharm) {
        const slotIndex = Array.from(jewelryPiece.children).indexOf(slot);
        if (slotIndex + 1 >= jewelryPiece.children.length) {
            alert("Not enough space for a long charm!");
            return;
        }

        const longContainer = document.createElement('div');
        longContainer.className = 'slot long-slot';
        longContainer.style.width = `${baseSize * 2}px`;
        longContainer.style.height = `${baseSize}px`;

        charmImg.style.width = '100%';
        charmImg.style.height = '100%';
        longContainer.appendChild(charmImg);
        
        slot.replaceWith(longContainer);
        jewelryPiece.children[slotIndex + 1].remove();
        longContainer.addEventListener('click', () => handleSlotClick(longContainer));
    } 
    else if (isDanglyCharm) {
        // SPECIAL DANGLY HANDLING - Remove base charm even for watches
        if (isWatch) {
            const baseCharm = slot.querySelector('img[data-type="base"]');
            if (baseCharm) {
                slot.removeChild(baseCharm);
            }
        }
        
        slot.classList.add('has-dangly');
        slot.style.height = `${baseSize * 2}px`;
        charmImg.className = 'dangly-charm';
        charmImg.style.width = '100%';
        charmImg.style.height = '100%';
        slot.appendChild(charmImg);
    }
    else {
        // Regular charm
        charmImg.style.width = '100%';
        charmImg.style.height = '100%';
        slot.appendChild(charmImg);
    }

    // Update quantity if not custom charm
    if (charmType !== 'custom') {
        charmQuantities[charmSrc]--;
        
        // Immediate UI update for the selected charm
        if (charmQuantities[charmSrc] <= 0) {
            selectedCharm.classList.add('sold-out');
            selectedCharm.style.opacity = '0.5';
            selectedCharm.style.pointerEvents = 'none';
        }
        
        // Update all instances of this charm in the UI
        document.querySelectorAll(`.charm[data-charm="${charmSrc}"]`).forEach(charmEl => {
            charmEl.dataset.quantity = charmQuantities[charmSrc];
            if (charmQuantities[charmSrc] <= 0) {
                charmEl.classList.add('sold-out');
                charmEl.style.opacity = '0.5';
                charmEl.style.pointerEvents = 'none';
            }
        });
    }
    hidePointingFinger();
    // Clear selection
    selectedCharm.classList.remove('selected');
    selectedCharm = null;
    hideSelectedCharmPreview();
    updatePrice();
}

function removeCharmFromSlot(slot) {
    const charm = slot.querySelector('img:not([data-type="base"])');
    if (!charm) return;

    const charmSrc = charm.dataset.charm || charm.src;
    const charmType = charm.dataset.type;
    const isDangly = slot.classList.contains('has-dangly');
    const isLong = slot.classList.contains('long-slot');

    // Restore quantity
    if (charmType !== 'custom') {
        charmQuantities[charmSrc]++;
        updateCharmDisplays();
    }

    // Clear slot
    slot.innerHTML = '';

    // ALWAYS restore silver/gold base charm (even for watches)
    const baseImg = document.createElement('img');
    baseImg.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
    baseImg.dataset.type = 'base';
    slot.appendChild(baseImg);

    // Reset slot styles
    if (isDangly) {
        slot.style.height = '';
        slot.classList.remove('has-dangly');
    }

    updatePrice();
}
// Update charm displays
function updateCharmDisplays() {
    document.querySelectorAll('.charm').forEach(charmEl => {
        if (!charmEl || !charmEl.src) return;
        
        // Use exact matching with the paths from your data
        const charmSrc = charmEl.dataset.charm || charmEl.src;
        const quantity = charmQuantities[charmSrc];
        
        if (quantity !== undefined) {
            charmEl.dataset.quantity = quantity;
            
            if (quantity <= 0) {
                charmEl.classList.add('sold-out');
                charmEl.style.opacity = '0.5';
                charmEl.style.pointerEvents = 'none';
            } else {
                charmEl.classList.remove('sold-out');
                charmEl.style.opacity = '1';
                charmEl.style.pointerEvents = 'auto';
            }
        }
    });
}
// Reset all charm states (call when starting new order)
function resetCharmStates() {
    globalUsedCharms.clear();
    initializeCharmQuantities();
    updateCharmDisplays();
}document.querySelectorAll('.charm').forEach(charm => {
    charm.addEventListener('click', function() {
        const charmSrc = this.src;
        const remainingQuantity = parseInt(this.dataset.quantity) || 1;
        
        // Don't allow selection if no quantity left
        if (remainingQuantity <= 0) {
            alert('This charm is out of stock!');
            return;
        }
        
        // Toggle selection
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            selectedCharm = null;
            hideSelectedCharmPreview();
        } else {
            document.querySelectorAll('.charm').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedCharm = this;
            updateSelectedCharmPreview(this);
        }
    });
});
function addClearDesignButton() {
    const clearBtn = document.createElement('button');
    clearBtn.id = 'clear-design-btn';
    clearBtn.textContent = 'Clear Design';
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your current design?')) {
            jewelryPiece.innerHTML = '';
            initJewelryPiece();
            resetCharmStates();
            selectedCharm = null;
            hideSelectedCharmPreview();
            updatePrice();
        }
    });
    
    // Add the button to your UI
    document.querySelector('.design-controls').appendChild(clearBtn);
}

// Initialize when page loads and charm data is ready
document.addEventListener('DOMContentLoaded', () => {
    // Call this after your charm data is loaded
    initializeCharmQuantities();
    updateCharmDisplays();
});
function createCharm(src, alt, type, isDangly = false) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'charm';
    img.dataset.type = type;
    
    // Extract category from path to determine if long/dangly
    const isDanglyFromPath = src.includes('dangly') || isDangly;
    const isLongFromPath = src.includes('long');
    
    // Also check if it's in a dangly/long category
    let category = '';
    if (src.includes('rares/dangly/')) category = 'dangly';
    else if (src.includes('rares/long/')) category = 'long';
    
    const isWatchView = currentProduct === 'watch' || currentProduct === 'apple-watch';
    
    if (isDanglyFromPath || category === 'dangly') {
        img.classList.add('dangly-charm');
        img.style.width = isWatchView ? '80px' : '168px';
        img.style.height = isWatchView ? '40px' : '84px';
    } 
    else if (isLongFromPath || category === 'long') {
        img.classList.add('long-charm');
        img.style.width = isWatchView ? '40px' : '84px';
        img.style.height = isWatchView ? '80px' : '168px';
    } 
    else {
        img.style.width = isWatchView ? '40px' : '84px';
        img.style.height = isWatchView ? '40px' : '84px';
    }
    
    // Store category information for later use
    if (category) {
        img.dataset.category = category;
    }
    
    return img;
}

function wouldCompleteSetInCart(charmSet) {
    const allCharmsInCart = cart.flatMap(item => item.charms.map(c => c.src));
    const currentSetCharms = charmSet.charms.filter(charm => 
        allCharmsInCart.some(c => c.includes(charm))
    ).length;
    
    return currentSetCharms + 1 === charmSet.requiredCount;
}
function validateCartForCheckout() {
    const invalidSets = [];
    const allCharmsInCart = cart.flatMap(item => item.charms.map(c => c.src));

    Object.values(CHARM_SETS).forEach(set => {
        // Check for incomplete sets
        const foundCharms = set.charms.filter(charm => 
            allCharmsInCart.some(c => c.includes(charm))
        ).length;
        
        if (foundCharms > 0 && foundCharms < set.requiredCount) {
            invalidSets.push({
                name: set.name,
                message: set.message,
                problem: `Incomplete set (${foundCharms}/${set.requiredCount} charms)`
            });
        }
        
        // Check for multiple charms from same set in single items
        cart.forEach(item => {
            const charmsInItem = set.charms.filter(setCharm => 
                item.charms.some(c => c.src.includes(setCharm))
            ).length;
            
            if (charmsInItem > 1) {
                invalidSets.push({
                    name: set.name,
                    message: set.message,
                    problem: `Multiple charms in "${item.product}" item`
                });
            }
        });
    });

    return invalidSets;
}
function beforeCheckout() {
    const invalidSets = validateCartForCheckout();
    if (invalidSets.length > 0) {
        const errorMessages = invalidSets.map(set => 
            `• ${set.name}: ${set.message}\n  (Current: ${set.current}/${set.required})`
        ).join('\n\n');
        
        showCustomWarningModal(
            `Cannot Checkout!\n\nYou have incomplete charm sets:\n\n${errorMessages}\n\n` +
            'Please complete these sets or remove the charms.'
        );
        return false;
    }
    return true;
}
function updateCharmInventory(charmSrc, newQuantity) {
    // Update quantity in DOM
    document.querySelectorAll(`.charm[data-charm="${charmSrc}"]`).forEach(charmEl => {
        charmEl.dataset.quantity = newQuantity;
        
        if (newQuantity <= 0) {
            charmEl.classList.add('out-of-stock');
            charmEl.style.opacity = '0.5';
            charmEl.style.pointerEvents = 'none';
            usedCharms.add(charmSrc);
        }
    });
    
    // Update in our data arrays
    const allCharms = [...specialCharms, ...rareCharms];
    const charmData = allCharms.find(c => c.src === charmSrc);
    if (charmData) charmData.quantity = newQuantity;
}
// Updates charm quantity in the pool
function updateCharmQuantity(charmSrc) {
    // Find all charm elements with this source
    const charmElements = document.querySelectorAll(`.charm[src="${charmSrc}"]`);
    
    if (charmElements.length === 0) return;
    
    // Get quantity from first element (assuming they all have same quantity)
    let quantity = parseInt(charmElements[0].dataset.quantity) || 1;
    quantity = Math.max(0, quantity - 1); // Ensure doesn't go below 0
    
    // Update quantity on all matching elements
    charmElements.forEach(charmEl => {
        charmEl.dataset.quantity = quantity;
        
        if (quantity <= 0) {
            charmEl.classList.add('out-of-stock');
            charmEl.style.opacity = '0.5';
            charmEl.style.cursor = 'not-allowed';
        }
    });
    
    // Update in data arrays
    const allCharms = [...specialCharms, ...rareCharms];
    const charmData = allCharms.find(c => c.src === charmSrc);
    if (charmData) charmData.quantity = quantity;
    
    console.log(`Updated ${charmSrc} quantity to ${quantity}`);
}

function restoreCharmQuantity(charmSrc) {
    // Find all charm elements with this source
    const charmElements = document.querySelectorAll(`.charm[src="${charmSrc}"]`);
    
    if (charmElements.length === 0) return;
    
    // Get quantity from first element
    let quantity = parseInt(charmElements[0].dataset.quantity) || 0;
    quantity += 1;
    
    // Update quantity on all matching elements
    charmElements.forEach(charmEl => {
        charmEl.dataset.quantity = quantity;
        
        if (quantity > 0) {
            charmEl.classList.remove('out-of-stock');
            charmEl.style.opacity = '1';
            charmEl.style.cursor = 'pointer';
        }
    });
    
    // Update in data arrays
    const allCharms = [...specialCharms, ...rareCharms];
    const charmData = allCharms.find(c => c.src === charmSrc);
    if (charmData) charmData.quantity = quantity;
    
    console.log(`Restored ${charmSrc} quantity to ${quantity}`);
}

// Handles long charm removal (restores 2 slots)
function handleLongCharmRemoval(slot, slotIndex) {
    slot.remove();
    
    const newSlot1 = createBaseSlot();
    const newSlot2 = createBaseSlot();
    
    if (slotIndex >= 0) {
        jewelryPiece.insertBefore(newSlot1, jewelryPiece.children[slotIndex]);
        jewelryPiece.insertBefore(newSlot2, jewelryPiece.children[slotIndex + 1]);
    } else {
        jewelryPiece.appendChild(newSlot1);
        jewelryPiece.appendChild(newSlot2);
    }
}
function createBaseSlot() {
    const slot = document.createElement('div');
    slot.className = 'slot';
    
    // Set smaller slot size for watches
    if (currentProduct === 'watch' || currentProduct === 'apple-watch') {
        slot.style.width = '40px';
        slot.style.height = '40px';
        slot.style.margin = '0 1px';
    }

    const baseImg = document.createElement('img');
    baseImg.src = materialType === 'silver' ? 'basecharms/silver.png' : 'basecharms/gold.png';
    baseImg.dataset.type = 'base';
    slot.appendChild(baseImg);
    
    slot.addEventListener('click', function() {
        handleSlotClick(this);
    });
    
    return slot;
}
function initCharms() {
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
    const hasGoldVariantsInCurrentCategory = specialCharms.some(charm => {
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
        if (hasGoldVariantsInCurrentCategory) {
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
    if (hasGoldVariantsInCurrentCategory) {
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
    const hasGoldVariantsInCurrentCategory = rareCharms.some(charm => {
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
        if (hasGoldVariantsInCurrentCategory) {
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
    if (hasGoldVariantsInCurrentCategory) {
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
    
    const isWatchView = currentProduct === 'watch' || currentProduct === 'apple-watch';
    
    if (isDangly || src.includes('dangly')) {
        img.classList.add('dangly-charm');
        img.style.width = isWatchView ? '80px' : '168px';
        img.style.height = isWatchView ? '40px' : '84px';
    } 
    else if (src.includes('long')) {
        img.classList.add('long-charm');
        img.style.width = isWatchView ? '40px' : '84px';
        img.style.height = isWatchView ? '80px' : '168px';
    } 
    else {
        img.style.width = isWatchView ? '40px' : '84px';
        img.style.height = isWatchView ? '40px' : '84px';
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
            // Ensure base charm stays locked
            baseImg.dataset.locked = 'true';
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
        });
    });

    // Set first category as default for special charms
    if (firstSpecialCategory) {
        currentSpecialCategory = firstSpecialCategory;
        specialCategoryTabs[0].classList.add('active');
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
// Add this near your other constants
const JOD_TO_USD_RATE = 1.41;

// Update the PayPal button integration
paypal.Buttons({
    style: {
        layout: 'vertical',
        disableFunding: 'card,credit',
        billingAddress: 'hidden',
        shippingAddress: 'none'
    },
    createOrder: function(data, actions) {
        if (!document.getElementById('pay-paypal').checked) {
            return;
        }
        
        // Calculate totals properly
        const totalText = document.getElementById('order-total-price').textContent;
        const totalJOD = parseFloat(totalText.replace('Total: ', '').replace(' JDs', ''));
        
        // Store for later use
        window.currentOrderTotalJOD = totalJOD;
        
        // Convert to USD
        const totalUSD = (totalJOD * JOD_TO_USD_RATE).toFixed(2);
        
        console.log('Creating PayPal order:', { totalJOD, totalUSD });
        
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: totalUSD,
                    currency_code: "USD"
                }
            }],
            application_context: {
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW'
            }
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Use the stored total
            const totalJOD = window.currentOrderTotalJOD;
            const totalUSD = (totalJOD * JOD_TO_USD_RATE).toFixed(2);
            
            // Store transaction details
            const transactionDetails = {
                paypal_transaction_id: details.id,
                amount_jod: totalJOD,
                amount_usd: totalUSD,
                exchange_rate: JOD_TO_USD_RATE
            };
            
            // Add hidden fields to form
            const form = document.getElementById('order-form');
            for (const [key, value] of Object.entries(transactionDetails)) {
                let input = form.querySelector(`[name="${key}"]`);
                if (!input) {
                    input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    form.appendChild(input);
                }
                input.value = value;
            }
            
            console.log('PayPal transaction completed:', transactionDetails);
            
            // Submit the form programmatically
            handleFormSubmit(new Event('submit'), true, transactionDetails);
        });
    },
    onError: function(err) {
        console.error('PayPal error:', err);
        showToast('Payment failed: ' + err.message, 'error');
    }
}).render('#paypal-button-container');
async function submitOrderForm(form, paypalData) {
    const submitButton = form.querySelector('button[type="submit"]');
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Process the order data
        const orderData = await prepareOrderData(form, paypalData);
        
        // Submit to Firestore
        const orderRef = await db.collection('orders').add(orderData);
        
        // Clear cart and show confirmation
        cart.length = 0;
        updateCartDisplay();
        form.reset();
        
        orderIdSpan.textContent = orderRef.id;
        orderModal.classList.remove('active');
        orderConfirmation.classList.add('active');
        
    } catch (error) {
        console.error('Order submission failed:', error);
        showToast(error.message || 'Order submission failed', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-check-circle"></i> Confirm Order';
    }
}


function showOrderConfirmation(orderData) {
    document.getElementById('confirmation-total').textContent = 
        `${orderData.total.toFixed(2)} JOD`;
    
    // For PayPal payments, show USD conversion
    if (orderData.paymentMethod === 'PayPal') {
        const usdAmount = (orderData.total * JOD_TO_USD_RATE ).toFixed(2);
        document.getElementById('confirmation-usd').textContent = 
            `(~${usdAmount} USD)`;
        document.getElementById('confirmation-usd').style.display = 'inline';
    } else {
        document.getElementById('confirmation-usd').style.display = 'none';
    }
}
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}


function updateJewelrySize(size) {
  currentSize = size;
  
  // Special handling for watches and keychains
  if (currentProduct === 'watch' || currentProduct === 'apple-watch' || currentProduct === 'keychain') {
    initSpecialProductWithBase(currentProduct);
  } else {
    initJewelryPiece();
  }
  
  updatePrice();
  
  // Ensure proper display after size change
  setTimeout(() => {
    centerJewelryPiece();
  }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIABLE DECLARATIONS =====
    const homepage = document.getElementById('homepage');
    const designerPage = document.getElementById('designer-page');
    const backBtn = document.getElementById('back-to-home');
    const productCards = document.querySelectorAll('#homepage .product-card');
    const productButtons = document.querySelectorAll('.product-btn');
    const menu = document.querySelector('.collapsible-menu');
    const menuToggle = document.querySelector('.menu-toggle'); // DECLARE HERE
    const menuContent = document.querySelector('.menu-content'); // DECLARE HERE
    setTimeout(initFiltersOnce, 1000);
    // ===== MAIN INITIALIZATION =====
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
        
        setupAuthProtectedCheckout();
        
        // Get DOM elements with null checks
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
        
        if (disableCOD) {
            const codOption = document.getElementById('pay-cash');
            if (codOption) {
                codOption.closest('.payment-option').style.display = 'none';
                const paypalOption = document.getElementById('pay-paypal');
                if (paypalOption) {
                    paypalOption.checked = true;
                    document.getElementById('paypal-button-container').style.display = 'block';
                }
            }
        }
        
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
        
        if (!window.orderFormInitialized) {
            setupOrderFunctionality();
            window.orderFormInitialized = true;
        }
        
        updatePrice();
        console.log('Application initialized successfully');
        
        setTimeout(() => {
            updatePrice();
        }, 500);
        
    } catch (error) {
        console.error('Initialization error:', error);
        console.log('Application loaded with minor issues');
    }
    
    // ===== UI SETUP FUNCTIONS =====
    function adjustJewelryWidth() {
        if (jewelryPiece) {
            const viewportWidth = window.innerWidth;
            jewelryPiece.style.maxWidth = Math.min(viewportWidth - 40, 800) + 'px';
        }
    }
    
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
    
    function handleMobileViewport() {
        if (!jewelryPiece) return;
        const isMobile = window.innerWidth <= 480;
        if (isMobile) {
            jewelryPiece.style.overflowX = 'auto';
            jewelryPiece.style.flexWrap = 'nowrap';
            jewelryPiece.style.padding = '5px';
        } else {
            jewelryPiece.style.overflowX = '';
            jewelryPiece.style.flexWrap = '';
            jewelryPiece.style.padding = '';
        }
    }
    
    function updateCartButtonPosition() {
        const cartButton = document.getElementById('cart-button');
        if (!cartButton) return;
        const scrollY = window.scrollY;
        cartButton.style.top = scrollY > 100 ? '20px' : '90px';
    }
    
    function initializeProductText() {
        const productCards = document.querySelectorAll('.product-card');
        const productNames = {
            'bracelet': 'Bracelet',
            'watch': 'Watch',
            'individual': 'Single charms-No bracelet',
            'anklet': 'Anklet',
            'ring': 'Ring',
            'apple-watch': 'Apple Watch',
            'keychain': 'Key chain'
        };
        
        productCards.forEach(card => {
            const productType = card.dataset.type;
            let productText = card.querySelector('.product-text');
            if (!productText) {
                productText = document.createElement('div');
                productText.className = 'product-text';
                card.appendChild(productText);
            }
            if (productNames[productType]) {
                productText.textContent = productNames[productType];
            }
        });
    }
    
    // ===== SETUP UI COMPONENTS =====
    adjustJewelryWidth();
    centerJewelryPiece();
    
    window.addEventListener('resize', adjustJewelryWidth);
    window.addEventListener('resize', centerJewelryPiece);
    window.addEventListener('scroll', updateStickyHeader);
    window.addEventListener('resize', updateStickyHeader);
    window.addEventListener('load', handleMobileViewport);
    window.addEventListener('resize', handleMobileViewport);
    window.addEventListener('scroll', updateCartButtonPosition);
    window.addEventListener('load', updateCartButtonPosition);
    
    updateStickyHeader();
    initializeProductText();
    setupScrollArrows();
    
    // ===== PAGE NAVIGATION =====
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productType = this.getAttribute('data-type');
            console.log('Product card clicked:', productType);
            
            homepage.style.display = 'none';
            designerPage.style.display = 'block';
            
            if (typeof initProduct === 'function') {
                initProduct(productType);
            } else {
                console.error('initProduct function not found');
                currentProduct = productType;
                initJewelryPiece();
                updatePrice();
            }
            
            productButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-type') === productType) {
                    btn.classList.add('active');
                }
            });
        });
    });
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            designerPage.style.display = 'none';
            homepage.style.display = 'block';
        });
    }
    
    productButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productType = this.getAttribute('data-type');
            initProduct(productType);
        });
    });
    
// In your menu initialization code, replace the click handlers:

if (menuToggle && menuContent) {
    console.log('Initializing collapsible menu...');
    
    // Initialize with menu hidden
    menuContent.style.display = 'none';
    
    // Toggle menu when clicking the button
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const isVisible = menuContent.style.display === 'block';
        
        if (isVisible) {
            // Close menu
            menuContent.style.display = 'none';
            menuToggle.classList.remove('active');
        } else {
            // Open menu
            menuContent.style.display = 'block';
            menuToggle.classList.add('active');
        }
    });
 // 1. SINGLE handler for menu headers (Rare and Special sections)
document.querySelectorAll('.menu-header').forEach(header => {
    header.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        console.log('Menu header clicked:', this.textContent);
        
        // Toggle the parent section
        const section = this.closest('.menu-section');
        
        // Toggle this section
        section.classList.toggle('active');
        
        // Update arrow
        const arrow = this.querySelector('.fa-chevron-down');
        if (arrow) {
            arrow.style.transform = section.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        }
        
        // DON'T close the menu - headers only toggle subcategories
        // DON'T filter charms - headers are not filter categories
    });
});

// 2. THEN, handle actual filter items (sub-items and "All Charms")
document.querySelectorAll('.sub-item, .menu-item[data-category="all"]').forEach(item => {
    // Skip if it's a menu-header (headers are already handled above)
    if (item.classList.contains('menu-header')) return;
    
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        console.log('Filter item clicked:', this.dataset.category);
        
        const category = this.dataset.category || 'all';
        
        // Update active state
        document.querySelectorAll('.menu-item.active, .sub-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
        });
        this.classList.add('active');
        
        // CLOSE MENU IMMEDIATELY
        menuContent.style.display = 'none';
        menuToggle.classList.remove('active');
        
        // Filter charms (this happens after menu closes)
        filterCharmsByCategory(category);
        updateFilterStatus(category);
    });
});
       // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('🔑 Escape key pressed, closing menu');
            menuContent.style.display = 'none';
            menuToggle.classList.remove('active');
            // Also close any open sections
            document.querySelectorAll('.menu-section.active').forEach(section => {
                section.classList.remove('active');
            });
        }
    });
    
    // FIXED: Close menu when clicking outside or on the overlay
document.addEventListener('click', function(e) {
    if (menuContent.style.display !== 'block') return;
    
    const clickedElement = e.target;
    
    // Check if clicked on the menu toggle button
    const isToggleClick = menuToggle.contains(clickedElement);
    
    // Check if clicked inside the actual menu content (not the ::before overlay)
    const isRealMenuClick = clickedElement.closest('.menu-item, .sub-item, .menu-header, .menu-section');
    
    // If clicked outside AND not on toggle, close menu
    if (!isToggleClick && !isRealMenuClick) {
        menuContent.style.display = 'none';
        menuToggle.classList.remove('active');
        
        // Also close any open sections
        document.querySelectorAll('.menu-section.active').forEach(section => {
            section.classList.remove('active');
        });
    }
});
    console.log('Menu initialization complete');
}
    
    // Add error handling for price updates
    window.addEventListener('error', function(e) {
        if (e.message.includes('price') || e.message.includes('NaN')) {
            console.log('Price calculation error detected, resetting...');
            updatePrice();
        }
    });



    function initializeProductText() {
        const productCards = document.querySelectorAll('.product-card');
        const productNames = {
            'bracelet': 'Bracelet',
            'watch': 'Watch',
            'individual': 'Single charms-No bracelet',
            'anklet': 'Anklet',
            'ring': 'Ring',
            'apple-watch': 'Apple Watch',
            'keychain': 'Key chain'
        };

        productCards.forEach(card => {
            const productType = card.dataset.type;
            let productText = card.querySelector('.product-text');
            
            // Create text element if it doesn't exist
            if (!productText) {
                productText = document.createElement('div');
                productText.className = 'product-text';
                card.appendChild(productText);
            }
            
            // Set the appropriate text
            if (productNames[productType]) {
                productText.textContent = productNames[productType];
            }
        });
    }

    // Initialize product text first
    initializeProductText();
    // Initialize all product slideshows
    const slideshows = document.querySelectorAll('.product-slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.product-slide');
        const indicators = slideshow.querySelectorAll('.slideshow-indicator');
        const prevBtn = slideshow.querySelector('.slideshow-nav.prev');
        const nextBtn = slideshow.querySelector('.slideshow-nav.next');
        
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) {
                indicators[currentSlide].classList.add('active');
            }
        }
        
        // Function to go to next slide
        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Function to go to previous slide
        function prevSlide() {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }
        
        // Start automatic slideshow
        function startSlideshow() {
            if (slides.length > 1) {
                slideInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
            }
        }
        
        // Stop automatic slideshow
        function stopSlideshow() {
            clearInterval(slideInterval);
        }
        
        // Only set up controls if there are multiple slides
        if (slides.length > 1) {
            // Event listeners for navigation
            if (nextBtn) {
                nextBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    nextSlide();
                    stopSlideshow();
                    startSlideshow();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    prevSlide();
                    stopSlideshow();
                    startSlideshow();
                });
            }
            
            // Event listeners for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showSlide(index);
                    stopSlideshow();
                    startSlideshow();
                });
            });
            
            // Pause slideshow on hover
            slideshow.addEventListener('mouseenter', stopSlideshow);
            slideshow.addEventListener('mouseleave', startSlideshow);
            
            // Start the slideshow
            startSlideshow();
        } else {
            // Hide navigation and indicators if only one slide
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (indicators.length > 0) {
                indicators[0].style.display = 'none';
            }
        }
    });
    
    // Only convert simple product cards to slideshow if they actually have multiple images
    const simpleProductCards = document.querySelectorAll('.product-card:not(:has(.product-slideshow))');
    
    // Define which products actually have multiple images
    const productsWithMultipleImages = {
        'bracelet': ['bracelet.png', 'bracelet2.png', 'bracelet3.png', 'bracelet4.png', 'bracelet5.png'],
        'watch': ['watch.png', 'watch2.png'],
        'individual': ['individual.png', 'individual2.png'],
        'anklet': ['anklet.png', 'anklet2.png', 'anklet3.png'],
        'ring': ['ring.png', 'ring2.png', 'ring3.png', 'ring4.png', 'ring5.png'],
        'apple-watch': ['apple-watch.png', 'apple-watch2.png','apple-watch3.png'],
        'keychain': ['keychain.png', 'keychain2.png']
    };
    
    simpleProductCards.forEach(card => {
        const productType = card.dataset.type;
        
        // Only create slideshow if this product has multiple images defined
        if (productsWithMultipleImages[productType]) {
            const img = card.querySelector('.product-image');
            
            if (img) {
                const imageContainer = card.querySelector('.product-image-container') || card;
                const imagePaths = productsWithMultipleImages[productType];
                
                // Create slideshow structure
                let slidesHTML = '';
                let indicatorsHTML = '';
                
                imagePaths.forEach((path, index) => {
                    const isActive = index === 0 ? 'active' : '';
                    slidesHTML += `
                        <div class="product-slide ${isActive}">
                            <img src="products/${path}" alt="${productType} design ${index + 1}">
                        </div>
                    `;
                    
                    if (imagePaths.length > 1) {
                        const indicatorActive = index === 0 ? 'active' : '';
                        indicatorsHTML += `<div class="slideshow-indicator ${indicatorActive}"></div>`;
                    }
                });
                
                const slideshowHTML = `
                    <div class="product-slideshow" data-product="${productType}">
                        ${slidesHTML}
                        ${imagePaths.length > 1 ? `
                            <div class="slideshow-indicators">
                                ${indicatorsHTML}
                            </div>
                            <div class="slideshow-nav prev">‹</div>
                            <div class="slideshow-nav next">›</div>
                        ` : ''}
                    </div>
                `;
                
                // Replace the simple image with slideshow
                if (imageContainer.classList.contains('product-image-container')) {
                    imageContainer.innerHTML = slideshowHTML;
                } else {
                    // Create container if it doesn't exist
                    const newContainer = document.createElement('div');
                    newContainer.className = 'product-image-container';
                    newContainer.innerHTML = slideshowHTML;
                    img.replaceWith(newContainer);
                }
            }
        }
    });
    
    // Re-initialize slideshows for newly created ones
    setTimeout(() => {
        const newSlideshows = document.querySelectorAll('.product-slideshow');
        newSlideshows.forEach(slideshow => {
            if (!slideshow.dataset.initialized) {
                const slides = slideshow.querySelectorAll('.product-slide');
                const indicators = slideshow.querySelectorAll('.slideshow-indicator');
                const prevBtn = slideshow.querySelector('.slideshow-nav.prev');
                const nextBtn = slideshow.querySelector('.slideshow-nav.next');
                
                let currentSlide = 0;
                let slideInterval;
                
                function showSlide(index) {
                    slides.forEach(slide => slide.classList.remove('active'));
                    indicators.forEach(indicator => indicator.classList.remove('active'));
                    
                    currentSlide = index;
                    slides[currentSlide].classList.add('active');
                    if (indicators[currentSlide]) {
                        indicators[currentSlide].classList.add('active');
                    }
                }
                
                function nextSlide() {
                    let nextIndex = (currentSlide + 1) % slides.length;
                    showSlide(nextIndex);
                }
                
                function startSlideshow() {
                    if (slides.length > 1) {
                        slideInterval = setInterval(nextSlide, 2000);
                    }
                }
                
                function stopSlideshow() {
                    clearInterval(slideInterval);
                }
                
                // Only set up controls if there are multiple slides
                if (slides.length > 1) {
                    if (nextBtn) {
                        nextBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            nextSlide();
                            stopSlideshow();
                            startSlideshow();
                        });
                    }
                    
                    if (prevBtn) {
                        prevBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            prevSlide();
                            stopSlideshow();
                            startSlideshow();
                        });
                    }
                    
                    indicators.forEach((indicator, index) => {
                        indicator.addEventListener('click', function(e) {
                            e.stopPropagation();
                            showSlide(index);
                            stopSlideshow();
                            startSlideshow();
                        });
                    });
                    
                    slideshow.addEventListener('mouseenter', stopSlideshow);
                    slideshow.addEventListener('mouseleave', startSlideshow);
                    
                    startSlideshow();
                }
                
                slideshow.dataset.initialized = 'true';
            }
        });
    }, 100);
    
    if (!menuToggle || !menuContent) return;
    
    // Toggle menu visibility
    
    
    // Toggle sections
    document.querySelectorAll('.menu-header').forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            const section = this.closest('.menu-section');
            section.classList.toggle('active');
            
            // Update arrow
            const arrow = this.querySelector('.fa-chevron-down');
            if (arrow) {
                arrow.style.transform = section.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });
    

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target)) {
            menuContent.style.display = 'none';
            menu.classList.remove('active');
        }
    });

        // Initialize with "All" charms by default
    loadCharmsByCategory('all');
    
 // 1. FIRST, handle menu headers separately (Rare/Special toggles)
document.querySelectorAll('.menu-header').forEach(header => {
    header.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        console.log('Menu header clicked:', this.textContent);
        
        // Toggle the parent section
        const section = this.closest('.menu-section');
        const isActive = section.classList.contains('active');
        
        // Toggle this section
        section.classList.toggle('active');
        
        // Update arrow
        const arrow = this.querySelector('.fa-chevron-down');
        if (arrow) {
            arrow.style.transform = section.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        }
        
        // DON'T close the menu - headers only toggle subcategories
        // DON'T filter charms - headers are not filter categories
    });
});

// 2. THEN, handle actual filter items (sub-items and "All Charms")
document.querySelectorAll('.sub-item, .menu-item[data-category="all"]').forEach(item => {
    // Skip if it's a menu-header (headers are already handled above)
    if (item.classList.contains('menu-header')) return;
    
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        console.log('Filter item clicked:', this.dataset.category);
        
        const category = this.dataset.category || 'all';
        
        // Update active state
        document.querySelectorAll('.menu-item.active, .sub-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
        });
        this.classList.add('active');
        
        // CLOSE MENU IMMEDIATELY
        menuContent.style.display = 'none';
        menuToggle.classList.remove('active');
        
        // Filter charms (this happens after menu closes)
        filterCharmsByCategory(category);
        updateFilterStatus(category);
    });
});
    
    // Set "All" as default active
    const allMenuItem = document.querySelector('.menu-item[data-category="all"]');
    if (allMenuItem) {
        allMenuItem.classList.add('active');
    }

        // Close menu by default on mobile
    if (window.innerWidth <= 768) {
        const menuContent = document.querySelector('.menu-content');
        if (menuContent) {
            menuContent.style.display = 'none';
        }
    }
        // Wait for grid to load
    setTimeout(() => {
        // Add click events to ALL menu items
        document.querySelectorAll('.menu-item, .sub-item').forEach(item => {
            item.addEventListener('click', function() {
                const category = this.dataset.category || 'all';
                console.log('Menu clicked:', category);
                filterCharmsByCategory(category);
            });
        });
        
        // Test: Set default to "all" when page loads
        filterCharmsByCategory('all');
    }, 1000);


  // Load charms data
// In your DOMContentLoaded handler:
setTimeout(() => {
    console.log('Step 1: Checking DOM elements...');
    
    const grid = document.getElementById('modern-charms-grid');
    if (!grid) {
        console.log('No modern charms grid found');
        return;
    }
    
    console.log('Step 2: Loading charm data...');
    
    // Load charm data first
    loadCharmDataWithRetry(2).then(() => {
        console.log('✓ All charm data loaded');
        
        // Populate grid FIRST
        populateCharmsGridWithRealData();
        
        // THEN initialize other components with delays
        setTimeout(() => {
            initializeCharmFilters();
            initializeRecommendedCharms();
        }, 1000);
        
    }).catch(error => {
        console.error('Failed to load charm data:', error);
    });
}, 1500); // Increased delay
});

function loadCharmDataWithRetry(maxRetries = 3, retryCount = 0) {
    return loadCharmDataDynamically().catch(error => {
        if (retryCount < maxRetries) {
            console.log(`🔄 Retry ${retryCount + 1}/${maxRetries}...`);
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(loadCharmDataWithRetry(maxRetries, retryCount + 1));
                }, 1000 * (retryCount + 1));
            });
        }
        throw error;
    });
}

function showCharmDataError(grid) {
    grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #d6336c;">
            <p>⚠️ Could not load charms database</p>
            <p style="font-size: 0.9rem; margin-top: 10px;">The charm images may not display properly</p>
            <button onclick="reloadCharmData()" style="margin-top: 15px; padding: 10px 20px; background: #d6336c; color: white; border: none; border-radius: 8px; font-weight: bold;">
                Try Again
            </button>
        </div>
    `;
}

    


function handleMobileViewport() {
    const isMobile = window.innerWidth <= 480;
    let jewelryPiece = document.getElementById('jewelry-piece');
    
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
function initializeRecommendedCharms() {
    console.log('🔄 Initializing recommended charms...');
    
    const recommendedBar = document.getElementById('recommended-charms-bar');
    const recommendedScroll = document.getElementById('recommended-charms-scroll');
    
    if (!recommendedBar || !recommendedScroll) {
        console.log('⚠️ Recommended charms elements not found - this is okay if you removed them');
        return; // Just return instead of erroring
    }

    // Your actual recommended charms
    const recommendedCharmNames = [
        'rares/newc2r/c224.png',
        'rares/sporty/sporty2.png',
        'rares/sporty/sporty13.png',
        'rares/love/c218.png',
        'rares/gold/gold11.png',
        'rares/love/c219.png',
        'special/teddy/teddy2.png',
        'rares/graduation/grad.png',
        'special/new-collection/50.png',
        'rares/sporty/sporty9.png',
        'rares/hgs/hgs6.png',
        'rares/newc2r/c222.png',
        'rares/gold/gold8.png',
        'special/bows/pink.png',
        'special/beach/x15.png',
        'rares/new-collection/19-gold.png',
        'special/cute specials/special.png',
        'rares/disney/stitch.png',
        'rares/hgs/20.png',
        'special/red/94-gold.png',
        'rares/newc3r/c31.png',
        'rares/newc2r/c252.png',
        'rares/newc3r/c37.png',
        'rares/dangly/16s.png',
        'rares/sanrio/metalkitty.png',
        'rares/newc2r/c2145.png',
        'rares/newc2r/c29-gold.png',
        'rares/newc2r/c27.png',
        'rares/newc2r/c229.png',
        'rares/newc2r/c2115.png',
        'rares/love/mrmrs2.png',
        'rares/love/mrmrs1.png'
    ];

    // Clear existing content
    recommendedScroll.innerHTML = '';

    // Filter out sold-out charms
    const availableRecommendedCharms = recommendedCharmNames.filter(charmPath => {
        // Check if charm exists in our inventory
        const charmData = [...specialCharms, ...rareCharms].find(c => c.src === charmPath);
        return !charmData || (charmData.quantity || 1) > 0;
    });

    if (availableRecommendedCharms.length === 0) {
        console.log('No available recommended charms');
        recommendedBar.style.display = 'none'; // Hide the bar if no charms
        return;
    }

    // Create charm elements
    availableRecommendedCharms.forEach((charmPath, index) => {
        const charmItem = document.createElement('div');
        charmItem.className = 'recommended-charm-item';
        charmItem.dataset.index = index;
        
        const charmImg = document.createElement('img');
        charmImg.src = charmPath;
        
        // Extract charm name from path for alt text
        const pathParts = charmPath.split('/');
        const fileName = pathParts[pathParts.length - 1].split('.')[0];
        charmImg.alt = `Recommended ${fileName}`;
        
        charmImg.className = 'recommended-charm-image charm';
        
        // Set data attributes based on path
        if (charmPath.includes('special/')) {
            charmImg.dataset.type = 'special';
        } else if (charmPath.includes('rares/')) {
            charmImg.dataset.type = 'rare';
        } else {
            charmImg.dataset.type = 'rare'; // default
        }
        
        charmImg.dataset.charm = charmPath;
        charmImg.dataset.name = fileName.replace(/[-_]/g, ' ');
        
        charmItem.appendChild(charmImg);
        recommendedScroll.appendChild(charmItem);

        // Add click event listeners
        charmItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleRecommendedCharmClick(this, charmImg);
        });
        
        charmImg.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleRecommendedCharmClick(charmItem, this);
        });
    });

    console.log('✅ Recommended charms initialized with', availableRecommendedCharms.length, 'charms');
    
    // Start scrolling animation after a delay
    setTimeout(startRecommendedScroll, 2000);
}

function startRecommendedScroll() {
    const scrollContainer = document.querySelector('.recommended-charms-scroll');
    if (!scrollContainer) return;
    
    // Remove any existing animation
    scrollContainer.style.animation = 'none';
    
    // Force reflow
    scrollContainer.offsetHeight;
    
    // Start new animation
    scrollContainer.style.animation = 'scrollRecommended 20s linear infinite';
}

function stopRecommendedScroll() {
    const scrollContainer = document.querySelector('.recommended-charms-scroll');
    if (scrollContainer) {
        scrollContainer.style.animationPlayState = 'paused';
    }
}

function resumeRecommendedScroll() {
    const scrollContainer = document.querySelector('.recommended-charms-scroll');
    if (scrollContainer) {
        scrollContainer.style.animationPlayState = 'running';
    }
}

function handleRecommendedCharmClick(charmItem, charmImg) {
    console.log('🎯 Recommended charm clicked');
    
    // Stop scrolling when charm is selected
    stopRecommendedScroll();
    
    // If clicking the same charm that's already selected, deselect it
    if (charmItem.classList.contains('selected')) {
        console.log('🔽 Deselecting charm');
        charmItem.classList.remove('selected');
        charmImg.classList.remove('selected');
        selectedCharm = null;
        hideSelectedCharmPreview();
        resumeRecommendedScroll(); // Resume scrolling when deselected
        return;
    }
    
    // Remove selection from all recommended charms
    document.querySelectorAll('.recommended-charm-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Remove selection from all regular charms
    document.querySelectorAll('.charms-grid .charm').forEach(charm => {
        charm.classList.remove('selected');
    });
    
    // Select this charm
    charmItem.classList.add('selected');
    charmImg.classList.add('selected');
    
    // Set as the global selected charm
    selectedCharm = charmImg;
    
    // Ensure data attributes are properly set
    ensureCharmDataAttributes(selectedCharm);
    
    // Update preview
    updateSelectedCharmPreview(charmImg);
    
    console.log('✅ Charm selected and locked:', selectedCharm);
    console.log('✅ Charm data:', selectedCharm.dataset);
    
    // Resume scrolling after 5 seconds if still selected
    setTimeout(() => {
        if (selectedCharm === charmImg) {
            resumeRecommendedScroll();
        }
    }, 5000);
}

function handleRecommendedCharmClick(charmItem, charmImg) {
    console.log('🎯 Recommended charm clicked:', charmImg.dataset.name);
    
    // Remove selection from all recommended charms
    document.querySelectorAll('.recommended-charm-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Remove selection from all regular charms
    document.querySelectorAll('.charms-grid .charm').forEach(charm => {
        charm.classList.remove('selected');
    });
    
    // Select this charm
    charmItem.classList.add('selected');
    charmImg.classList.add('selected');
    
    // Set as the global selected charm
    selectedCharm = charmImg;
    
    // Update preview
    updateSelectedCharmPreview(charmImg);
    
    // Pause scrolling temporarily
    const scrollContainer = document.querySelector('.recommended-charms-scroll');
    if (scrollContainer) {
        scrollContainer.classList.add('paused');
        setTimeout(() => {
            scrollContainer.classList.remove('paused');
        }, 3000);
    }
    
    console.log('✅ Charm selected:', selectedCharm);
    console.log('✅ Charm data:', {
        src: selectedCharm.src,
        type: selectedCharm.dataset.type,
        name: selectedCharm.dataset.name
    });
}
function setupCharmEventListeners() {
    // This will be called whenever charms are updated
    document.querySelectorAll('.charm').forEach(charm => {
        charm.addEventListener('click', function(e) {
            e.stopPropagation();
            handleCharmSelection(this);
        });
    });
}


function setupScrollArrows() {
    document.querySelectorAll('.category-tabs-container').forEach(container => {
        const tabs = container.querySelector('.category-tabs');
        const leftArrow = container.querySelector('.scroll-arrow.left');
        const rightArrow = container.querySelector('.scroll-arrow.right');
        
        // Check if we need arrows (content is scrollable)
        const checkArrows = () => {
            if (tabs.scrollWidth > tabs.clientWidth) {
                leftArrow.classList.remove('hidden');
                rightArrow.classList.remove('hidden');
                updateArrowVisibility();
            } else {
                leftArrow.classList.add('hidden');
                rightArrow.classList.add('hidden');
            }
        };
        
        // Update arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            const scrollLeft = tabs.scrollLeft;
            const maxScroll = tabs.scrollWidth - tabs.clientWidth;
            
            leftArrow.classList.toggle('hidden', scrollLeft <= 10);
            rightArrow.classList.toggle('hidden', scrollLeft >= maxScroll - 10);
        };
        
        // Scroll functions
        leftArrow.addEventListener('click', () => {
            tabs.scrollBy({ left: -200, behavior: 'smooth' });
        });
        
        rightArrow.addEventListener('click', () => {
            tabs.scrollBy({ left: 200, behavior: 'smooth' });
        });
        
        // Update arrows on scroll
        tabs.addEventListener('scroll', updateArrowVisibility);
        
        // Check on load and resize
        checkArrows();
        window.addEventListener('resize', checkArrows);
    });
}

// Call this in your DOMContentLoaded

function testRecommendedCharms() {
    console.log('🧪 TESTING RECOMMENDED CHARMS');
    
    // Test if elements exist
    const recommendedBar = document.getElementById('recommended-charms-bar');
    const recommendedScroll = document.getElementById('recommended-charms-scroll');
    const charmItems = document.querySelectorAll('.recommended-charm-item');
    
    console.log('Recommended bar:', !!recommendedBar);
    console.log('Recommended scroll:', !!recommendedScroll);
    console.log('Charm items found:', charmItems.length);
    
    // Test clicking the first charm
    if (charmItems.length > 0) {
        console.log('🧪 Clicking first recommended charm...');
        charmItems[0].click();
        
        // Check selection after click
        setTimeout(() => {
            const selected = document.querySelector('.recommended-charm-item.selected');
            console.log('Selected after click:', !!selected);
            console.log('Global selectedCharm:', selectedCharm);
        }, 100);
    }
}

// Make it available globally
window.testRecommendedCharms = testRecommendedCharms;

// Make it available in console
window.addEventListener('scroll', updateCartButtonPosition);
window.addEventListener('load', updateCartButtonPosition);
// Check if user qualifies for countdown discount AND order qualifies
function userQualifiesForCountdownDiscount() {
    const currentUser = auth.currentUser;
    
    // Check if order qualifies (subtotal over 15 JOD)
    const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    if (subtotal < 15) {
        return false;
    }
    
    // User-specific key
    const userKey = currentUser ? `offerCountdown_${currentUser.uid}` : 'offerCountdown_guest';
    
    // Check if already used countdown discount
    if (localStorage.getItem(`${userKey}_used`)) {
        return false;
    }
    
    // For logged-in users: only new users (no previous orders)
    if (currentUser) {
        const hasOrderedBefore = localStorage.getItem(`hasOrdered_${currentUser.uid}`);
        return !hasOrderedBefore; // Only new users qualify
    }
    
    // For guests: always qualify (they're always "new")
    return true;
}// Update the offer banner based on user type and order amount
function updateOfferBanner() {
    const offerBanner = document.getElementById('offer-banner');
    const offerText = document.querySelector('.offer-text');
    if (!offerText || !offerBanner) return;
    
    const currentUser = auth.currentUser;
    const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    
    // Hide banner if order doesn't qualify
    if (subtotal < 15) {
        offerBanner.style.display = 'none';
        return;
    }
    
    // Show appropriate message
    if (currentUser) {
        offerText.innerHTML = `Welcome! Complete your first order over 15 JOD in <span id="countdown-timer">10:00</span> to get 10% OFF!`;
    } else {
        offerText.innerHTML = `New customer? Complete your order over 15 JOD in <span id="countdown-timer">10:00</span> to get 10% OFF!`;
    }
    
    offerBanner.style.display = 'block';
}// Enhanced Countdown Timer that checks order amount
function startCountdownTimer() {
    const timerElement = document.getElementById('countdown-timer');
    const offerBanner = document.getElementById('offer-banner');
    const closeButton = document.getElementById('close-offer');
    
    if (!timerElement) return;

    // Check if user AND order qualify for the countdown discount
    const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    if (!userQualifiesForCountdownDiscount() || subtotal < 15) {
        if (offerBanner) offerBanner.style.display = 'none';
        return;
    }

    let timeLeft = 600; // 10 minutes in seconds
    
    // Load saved time from localStorage with user-specific key
    const userKey = auth.currentUser ? `offerCountdown_${auth.currentUser.uid}` : 'offerCountdown_guest';
    const savedTime = localStorage.getItem(userKey);
    
    if (savedTime) {
        const elapsed = Math.floor((Date.now() - parseInt(savedTime)) / 1000);
        timeLeft = Math.max(0, 600 - elapsed);
        
        // If time expired, remove qualification
        if (timeLeft <= 0) {
            localStorage.removeItem(userKey);
            localStorage.removeItem(`${userKey}_qualified`);
            if (offerBanner) offerBanner.style.display = 'none';
            return;
        }
    } else {
        // Start new countdown and mark as qualified
        localStorage.setItem(userKey, Date.now().toString());
        localStorage.setItem(`${userKey}_qualified`, 'true');
    }
    
    const countdown = setInterval(() => {
        // Re-check if order still qualifies (in case items were removed)
        const currentSubtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
        if (currentSubtotal < 15) {
            clearInterval(countdown);
            if (offerBanner) offerBanner.style.display = 'none';
            return;
        }
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            if (offerBanner) offerBanner.style.display = 'none';
            localStorage.removeItem(userKey);
            localStorage.removeItem(`${userKey}_qualified`);
        } else {
            timeLeft--;
        }
    }, 1000);
    
    // Close button
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (offerBanner) offerBanner.style.display = 'none';
        });
    }
}// Comprehensive discount eligibility check with order amount requirement
function checkAllDiscountEligibility() {
    const currentUser = auth.currentUser;
    const now = new Date();
    const discountEndDate = new Date('2024-07-25'); // Your existing date
    const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    
    let eligibleDiscounts = [];
    
    // 1. Date-based discount (your existing logic) - requires 15 JOD
    if (now <= discountEndDate && subtotal >= 15) {
        eligibleDiscounts.push({
            type: 'seasonal',
            message: '🎊 Seasonal Sale: 10% off orders above 15 JOD!',
            maxAmount: 5,
            requiresAmount: 15
        });
    }
    
    // 2. Countdown discount for new users/guests - requires 15 JOD
    if (userQualifiesForCountdownDiscount() && subtotal >= 15) {
        eligibleDiscounts.push({
            type: 'countdown',
            message: '⏰ Limited Time: 10% off your first order over 15 JOD!',
            maxAmount: 5,
            requiresAmount: 15
        });
    }
    
    // 3. First order discount (if not already covered by countdown) - requires 15 JOD
    if (currentUser && !localStorage.getItem(`hasOrdered_${currentUser.uid}`) && subtotal >= 15) {
        eligibleDiscounts.push({
            type: 'welcome',
            message: '🎉 Welcome! Enjoy 10% off your first order over 15 JOD!',
            maxAmount: 5,
            requiresAmount: 15
        });
    }
    
    return eligibleDiscounts;
}// Show message when order is below minimum for discount
function showMinimumAmountMessage() {
    const subtotal = cart.reduce((sum, item) => sum + item.originalPrice, 0);
    const discountMessages = document.getElementById('discount-messages');
    
    if (subtotal > 0 && subtotal < 15) {
        const amountNeeded = (15 - subtotal).toFixed(2);
        if (discountMessages) {
            discountMessages.innerHTML = `
                <div class="discount-message info">
                    💡 Add ${amountNeeded} JOD more to qualify for discounts!
                </div>
            `;
        }
    } else if (subtotal >= 15) {
        // Clear the message when qualified
        if (discountMessages) {
            discountMessages.innerHTML = '';
        }
    }
}
function checkFirstOrderDiscount() {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;
    
    const hasOrderedBefore = localStorage.getItem(`hasOrdered_${currentUser.uid}`);
  
    
    return false;
}
function setupCollapsibleOrders() {
    const profileHeader = document.getElementById('profile-header');
    const collapseBtn = document.getElementById('collapse-orders');
    const collapsibleOrders = document.getElementById('collapsible-orders');
    const ordersContent = document.getElementById('orders-content');

    if (!profileHeader || !collapseBtn) return;

    let isExpanded = false;

    // Toggle orders when clicking profile header
    profileHeader.addEventListener('click', (e) => {
        // Don't trigger if clicking logout button
        if (e.target.closest('.logout-btn')) return;
        
        toggleOrders();
    });

    // Toggle orders when clicking collapse button
    collapseBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent profile header click
        toggleOrders();
    });

    function toggleOrders() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            collapsibleOrders.classList.add('expanded');
            collapseBtn.classList.remove('collapsed');
            
            // Load orders if not already loaded
            if (ordersContent.children.length === 0) {
                loadUserOrderHistory(auth.currentUser.uid);
            }
        } else {
            collapsibleOrders.classList.remove('expanded');
            collapseBtn.classList.add('collapsed');
        }
    }

    // Close orders when clicking outside
    document.addEventListener('click', (e) => {
        if (!collapsibleOrders.contains(e.target) && !profileHeader.contains(e.target)) {
            if (isExpanded) {
                collapsibleOrders.classList.remove('expanded');
                collapseBtn.classList.add('collapsed');
                isExpanded = false;
            }
        }
    });
}
function updateShippingProgress() {
    const progressFill = document.getElementById('progress-fill');
    const amountNeeded = document.getElementById('amount-needed');
    const progressPercent = document.querySelector('.progress-percent');
    
    if (!progressFill) return;
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const freeShippingThreshold = 15; // Free shipping at 15 JOD
    const amountNeededValue = Math.max(0, freeShippingThreshold - subtotal);
    const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
    
    if (amountNeeded) {
        amountNeeded.textContent = amountNeededValue.toFixed(2);
    }
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressPercent) {
        progressPercent.textContent = `${Math.round(progress)}%`;
    }
    
    // Show/hide based on progress
    const shippingProgress = document.getElementById('shipping-progress');
    if (shippingProgress) {
        if (subtotal >= freeShippingThreshold) {
            shippingProgress.innerHTML = `
                <div style="text-align: center; color: #4CAF50; font-weight: bold;">
                    🎉 Congratulations! You qualify for FREE shipping!
                </div>
            `;
        } else if (subtotal > 0) {
            shippingProgress.style.display = 'block';
        } else {
            shippingProgress.style.display = 'none';
        }
    }
}

let hasGoldVariantsInPool = false; // Renamed to avoid conflict
// Modern Pool Manager - Complete Fixed Version
function checkForGoldVariantsInPool(pool) {
    const allCharms = getCurrentPoolCharms(pool);
    return allCharms.some(charm => charm.src && charm.src.includes('-gold.png'));
}

function getCurrentPoolCharms(poolType) {
    let allCharms = [];
    
    if (poolType === 'all' || poolType === 'special' || poolType === 'trending') {
        allCharms = allCharms.concat(specialCharms.map(c => ({...c, type: 'special'})));
    }
    
    if (poolType === 'all' || poolType === 'rare' || poolType === 'trending') {
        allCharms = allCharms.concat(rareCharms.map(c => ({...c, type: 'rare'})));
    }
    
    return allCharms;
}



// Initialize modern pool when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for everything to load
    setTimeout(() => {
        if (document.getElementById('modern-charms-grid')) {
            console.log('Initializing modern pool...');
        } else {
            console.warn('Modern pool elements not found, using legacy pools');
        }
    }, 1000);
});

// Also update when product changes
function updateModernPoolOnProductChange() {
    if (document.getElementById('modern-charms-grid')) {
        updateModernPoolDisplay();
    }
}// User Circle Management
function initUserCircle() {
    const userCircle = document.getElementById('user-circle');
    const userPopup = document.getElementById('user-popup');
    const logoutCircleBtn = document.getElementById('logout-circle');
    const viewOrdersBtn = document.getElementById('view-orders');
    const closeOrdersModal = document.getElementById('close-orders-modal');
    const ordersModal = document.getElementById('orders-modal');
    
    if (!userCircle || !userPopup) return;
    
    // Toggle popup when clicking user circle
    userCircle.addEventListener('click', function(e) {
        e.stopPropagation();
        userPopup.classList.toggle('show');
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!userCircle.contains(e.target) && !userPopup.contains(e.target)) {
            userPopup.classList.remove('show');
        }
    });
    
    // Logout functionality
    if (logoutCircleBtn) {
        logoutCircleBtn.addEventListener('click', () => {
            logoutUser();
            userPopup.classList.remove('show');
        });
    }
    
    // View orders functionality
    if (viewOrdersBtn) {
        viewOrdersBtn.addEventListener('click', () => {
            userPopup.classList.remove('show');
            showOrdersModal();
        });
    }
    
    // Close orders modal
    if (closeOrdersModal && ordersModal) {
        closeOrdersModal.addEventListener('click', () => {
            ordersModal.classList.remove('active');
        });
    }
}

function showOrdersModal() {
    const ordersModal = document.getElementById('orders-modal');
    const ordersList = document.getElementById('orders-list');
    
    if (!ordersModal || !ordersList) return;
    
    const currentUser = auth.currentUser;
    if (!currentUser) {
        ordersList.innerHTML = `
            <div class="empty-orders-compact">
                <i class="fas fa-user-slash"></i>
                <p>Please login to view orders</p>
            </div>
        `;
        ordersModal.classList.add('active');
        return;
    }
    
    // Show loading
    ordersList.innerHTML = `
        <div class="empty-orders-compact">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading orders...</p>
        </div>
    `;
    
    ordersModal.classList.add('active');
    
    // Load user orders
    loadUserOrderHistory(currentUser.uid).then(orders => {
        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-orders-compact">
                    <i class="fas fa-shopping-bag"></i>
                    <p>No orders yet</p>
                    <p style="font-size: 0.8rem; margin-top: 5px;">Start designing your perfect piece!</p>
                </div>
            `;
            return;
        }
        
        const ordersHTML = orders.map(order => `
            <div class="order-item-compact" data-order-id="${order.id}">
                <div class="order-header-compact">
                    <div class="order-id">#${order.clientOrderId}</div>
                    <div class="order-status-compact status-${order.status}">
                        ${order.status}
                    </div>
                </div>
                <div style="font-size: 0.8rem; color: #666; margin-bottom: 8px;">
                    ${formatOrderDate(order.timestamp)}
                </div>
                <div class="order-total-compact">
                    ${order.total} JOD
                </div>
                <button class="btn" style="margin-top: 8px; padding: 4px 12px; font-size: 0.8rem;" 
                        onclick="viewOrderDetails('${order.id}')">
                    View Details
                </button>
            </div>
        `).join('');
        
        ordersList.innerHTML = ordersHTML;
    }).catch(error => {
        console.error('Error loading orders:', error);
        ordersList.innerHTML = `
            <div class="empty-orders-compact">
                <i class="fas fa-exclamation-circle"></i>
                <p>Error loading orders</p>
                <p style="font-size: 0.8rem;">Please try again</p>
            </div>
        `;
    });
}

// Update auth state handler
function updateAuthUI(user) {
    const authButton = document.getElementById('auth-button');
    const userCircleContainer = document.getElementById('user-circle-container');
    const circleUserName = document.getElementById('circle-user-name');
    const circlePointsCount = document.getElementById('circle-points-count');
    
    if (user) {
        // Hide login button, show user circle
        if (authButton) authButton.style.display = 'none';
        if (userCircleContainer) userCircleContainer.style.display = 'block';
        
        // Update user info
        if (circleUserName) {
            circleUserName.textContent = user.displayName || user.email.split('@')[0];
        }
        
        // Load user points (you'll need to implement this)
        loadUserPoints(user.uid).then(points => {
            if (circlePointsCount) {
                circlePointsCount.textContent = points || '0';
            }
        });
        
    } else {
        // Show login button, hide user circle
        if (authButton) authButton.style.display = 'block';
        if (userCircleContainer) userCircleContainer.style.display = 'none';
    }
}

// Load user points from Firestore
async function loadUserPoints(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data().points || 0;
        }
        return 0;
    } catch (error) {
        console.error('Error loading user points:', error);
        return 0;
    }
}

// Update order history loading for compact view
async function loadUserOrderHistory(userId) {
    try {
        const ordersRef = db.collection('orders');
        const userOrdersQuery = ordersRef.where('userId', '==', userId);
        const guestOrdersQuery = ordersRef.where('userEmail', '==', auth.currentUser.email);
        
        const [userSnapshot, guestSnapshot] = await Promise.all([
            userOrdersQuery.get(),
            guestOrdersQuery.get()
        ]);
        
        const orders = [];
        
        userSnapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        
        guestSnapshot.forEach(doc => {
            if (!orders.find(order => order.id === doc.id)) {
                orders.push({ id: doc.id, ...doc.data() });
            }
        });
        
        // Sort by timestamp
        orders.sort((a, b) => (b.timestamp?.toDate() || 0) - (a.timestamp?.toDate() || 0));
        
        return orders;
        
    } catch (error) {
        console.error('Error loading order history:', error);
        throw error;
    }
}

// Format date for compact display
function formatOrderDate(timestamp) {
    if (!timestamp) return 'Date unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

// Initialize user circle on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for auth to initialize
    setTimeout(initUserCircle, 1000);
});

//------------------------------
function loadCharmsByCategory(category) {
    console.log('Loading charms for category:', category);
    
    // Clear existing charms
    const charmsGrid = document.querySelector('.modern-charms-grid');
    if (charmsGrid) {
        charmsGrid.innerHTML = '<div class="loading">Loading charms...</div>';
    }
    

}


function handleModernCharmSelection(charmElement, imgElement, charmData) {
    console.log('🎯 Modern charm selected:', charmData.src);
    
    // Remove selection from all charms
    document.querySelectorAll('.modern-charm.selected, .charm.selected').forEach(c => {
        c.classList.remove('selected');
    });
    
    // Check if sold out
    if (charmData.quantity <= 0) {
        alert('This charm is out of stock!');
        return;
    }
    
    // Select this charm
    charmElement.classList.add('selected');
    
    // Create selected charm object
    selectedCharm = imgElement.cloneNode(true);
    selectedCharm.dataset.type = charmData.src.includes('rares/') ? 'rare' : 'special';
    selectedCharm.dataset.charm = charmData.src;
    selectedCharm.dataset.quantity = charmData.quantity || 1;
    
    console.log('✅ Charm selected:', {
        src: selectedCharm.src,
        type: selectedCharm.dataset.type,
        quantity: selectedCharm.dataset.quantity
    });
    
    // Update preview
    updateSelectedCharmPreview(selectedCharm);
}
function filterCharmsByCategory(category) {
    console.log(`🔍 filterCharmsByCategory called with: ${category} | Gold filter: ${showGoldVariants}`);
    
    const grid = document.getElementById('modern-charms-grid');
    const goldToggleWrapper = document.querySelector('.gold-toggle-wrapper');
    
    if (!grid) return;
    
    // Check if this category has gold variants
    const hasGoldVariants = checkIfCategoryHasGoldVariants(category);
    
    // Update gold toggle visibility
    if (goldToggleWrapper) {
        if (hasGoldVariants) {
            goldToggleWrapper.classList.remove('no-gold');
            console.log(`✅ Showing gold toggle for ${category} (has gold variants)`);
        } else {
            goldToggleWrapper.classList.add('no-gold');
            console.log(`❌ Hiding gold toggle for ${category} (no gold variants)`);
            
            // Reset to silver view when hiding toggle
            showGoldVariants = false;
            const goldToggle = document.getElementById('gold-toggle');
            if (goldToggle) {
                goldToggle.classList.remove('active');
                const handle = goldToggle.querySelector('.toggle-handle');
                if (handle) {
                    handle.style.transform = 'translateX(3px)';
                }
                const track = goldToggle.querySelector('.toggle-track');
                if (track) {
                    track.style.background = 'linear-gradient(90deg, #c0c0c0 100%, #ffd700 0%)';
                }
            }
        }
    }
    
    // Get all charms
    const allCharms = [...specialCharms, ...rareCharms];
    
    // Filter by category first
    let filteredCharms = allCharms;
    
    if (category !== 'all') {
        filteredCharms = allCharms.filter(charm => {
            // Handle special cases
            if (category === 'rare') {
                return charm.src.includes('rares/');
            } else if (category === 'special') {
                return charm.src.includes('special/');
            } else {
                return charm.category === category;
            }
        });
    }
    
    console.log(`📊 After category filter: ${filteredCharms.length} charms`);
    
    // Filter by gold/silver if the category has gold variants
    if (hasGoldVariants) {
        filteredCharms = filteredCharms.filter(charm => {
            const isGoldVariant = charm.src && charm.src.includes('-gold.png');
            return showGoldVariants ? isGoldVariant : !isGoldVariant;
        });
        console.log(`📊 After gold filter: ${filteredCharms.length} charms (showGold: ${showGoldVariants})`);
    }
    
    // Clear grid and display filtered charms
    grid.innerHTML = '';
    
    if (filteredCharms.length === 0) {
        grid.innerHTML = `
            <div class="no-charms-message">
                <i class="fas fa-search"></i>
                <p>No charms found</p>
                <p class="hint">Try a different filter or toggle gold/silver</p>
            </div>
        `;
        return;
    }
    
    // Display filtered charms
    // In your filterCharmsByCategory function, when creating grid charms:
filteredCharms.forEach((charm, index) => {
    if (!charm.src || charm.quantity <= 0) return;
    
    const charmItem = document.createElement('div');
    charmItem.className = 'modern-charm';
    charmItem.dataset.category = charm.category || 'uncategorized';
    
    // Check if it's gold
    const isGoldVariant = charm.src.includes('-gold.png');
    charmItem.dataset.isGold = isGoldVariant;
    
    if (charm.src.includes('rares/')) {
        charmItem.dataset.type = 'rare';
    } else if (charm.src.includes('special/')) {
        charmItem.dataset.type = 'special';
    }
    
    // Create charm image with proper styling
    const img = createCharm(charm.src, charm.name || `Charm ${index + 1}`, 
                          charmItem.dataset.type, 
                          charm.category === 'dangly');
    
    
    
    charmItem.appendChild(img);
    grid.appendChild(charmItem);
    
    // Add click handler
    charmItem.addEventListener('click', () => {
        handleModernCharmSelection(charmItem, img, charm);
    });
});
    
    console.log(`✅ Displayed ${filteredCharms.length} charms for category: ${category}`);
    updateCharmCount();
}

function detectCharmType(charmSrc, charmElement) {
    // Check if already marked
    if (charmElement.classList.contains('dangly-charm')) return 'dangly';
    if (charmElement.classList.contains('long-charm')) return 'long';
    
    // Check by path
    if (charmSrc.includes('dangly') || isLoveOrDolphinCharm(charmSrc)) {
        return 'dangly';
    }
    
    if (charmSrc.includes('long')) {
        return 'long';
    }
    
    // Check by category
    const category = charmElement.dataset.category;
    if (category === 'dangly') return 'dangly';
    if (category === 'long') return 'long';
    
    // Check if in a dangly/long folder
    if (charmSrc.includes('/dangly/')) return 'dangly';
    if (charmSrc.includes('/long/')) return 'long';
    
    return 'regular';
}
function checkIfCategoryHasGoldVariants(category) {
    const allCharms = [...specialCharms, ...rareCharms];
    
    if (category === 'all') {
        // Check if ANY charms in entire collection have gold
        return allCharms.some(charm => charm.src && charm.src.includes('-gold.png'));
    } 
    else if (category === 'rare') {
        // Check if any RARE charms have gold
        return allCharms.some(charm => 
            charm.src && 
            charm.src.includes('-gold.png') && 
            charm.src.includes('rares/')
        );
    }
    else if (category === 'special') {
        // Check if any SPECIAL charms have gold
        return allCharms.some(charm => 
            charm.src && 
            charm.src.includes('-gold.png') && 
            charm.src.includes('special/')
        );
    }
    else if (category === 'newc3r') {  // Gulf category - should return false
        // Gulf category has NO gold charms
        return false;
    }
    else {
        // For other specific categories, check their gold status
        return allCharms.some(charm => 
            charm.src && 
            charm.src.includes('-gold.png') && 
            charm.category === category
        );
    }
}
let filtersInitialized = false;
function initializeGoldToggle() {
    const goldToggle = document.getElementById('gold-toggle');
    if (!goldToggle) return;
    
    // Set initial state
    goldToggle.classList.toggle('active', showGoldVariants);
    
    // Add click event
    goldToggle.addEventListener('click', function() {
        showGoldVariants = !showGoldVariants;
        this.classList.toggle('active');
        
        // Update toggle visuals
        const handle = this.querySelector('.toggle-handle');
        const track = this.querySelector('.toggle-track');
        
        if (showGoldVariants) {
            handle.style.transform = 'translateX(42px)';
            track.style.background = 'linear-gradient(90deg, #c0c0c0 0%, #ffd700 100%)';
        } else {
            handle.style.transform = 'translateX(3px)';
            track.style.background = 'linear-gradient(90deg, #c0c0c0 100%, #ffd700 0%)';
        }
        
        console.log(`🔄 Gold filter changed to: ${showGoldVariants ? 'GOLD' : 'SILVER'}`);
        
        // Get current category and re-filter
        const activeItem = document.querySelector('.menu-item.active, .sub-item.active');
        const currentCategory = activeItem ? activeItem.dataset.category : 'all';
        
        // Re-filter with new gold setting
        filterCharmsByCategory(currentCategory);
        
        // Update charm count
        updateCharmCount();
    });
    
    console.log('Gold toggle initialized');
}

// Call this in your DOMContentLoaded after other initializations
setTimeout(initializeGoldToggle, 1000);
function initializeCharmFilters() {
    if (filtersInitialized) return;
    
    console.log('Initializing charm filters...');
    
    const menuItems = document.querySelectorAll('.menu-item, .sub-item');
    if (!menuItems.length) return;
    
    // Remove existing listeners first
    menuItems.forEach(item => {
        item.replaceWith(item.cloneNode(true));
    });
    
    // Get fresh references
    const freshItems = document.querySelectorAll('.menu-item, .sub-item');
    
    freshItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const category = this.dataset.category || 'all';
            
            // Debounce: Don't filter if already on this category
            if (this.classList.contains('active')) return;
            
            console.log('Filter clicked:', category);
            
            // Update UI
            freshItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Filter charms
            filterCharmsByCategory(category);
        });
    });
    
    filtersInitialized = true;
    
    // Set default filter
    setTimeout(() => {
        const allMenuItem = document.querySelector('.menu-item[data-category="all"]');
        if (allMenuItem && !allMenuItem.classList.contains('active')) {
            allMenuItem.click();
        }
    }, 1000);
}



function loadCharmDataDynamically() {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.charmDataLoaded && window.specialCharms && window.rareCharms) {
            console.log('✓ Charm data already loaded');
            resolve();
            return;
        }
        
        // Check if script is already being loaded
        if (window.charmDataLoading) {
            console.log('⏳ Charm data already loading, waiting...');
            const checkInterval = setInterval(() => {
                if (window.charmDataLoaded) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            return;
        }
        
        window.charmDataLoading = true;
        console.log('📦 Loading charms.js...');
        
        const script = document.createElement('script');
        script.src = 'charms.js?v=' + Date.now();
        script.async = true;
        
        script.onload = () => {
            console.log('✓ charms.js loaded successfully');
            window.charmDataLoaded = true;
            window.charmDataLoading = false;
            
            // Wait for data to be processed
            setTimeout(() => {
                if (window.specialCharms && window.rareCharms) {
                    console.log(`✓ Charm data ready: ${window.specialCharms.length} special, ${window.rareCharms.length} rare`);
                    resolve();
                } else {
                    reject('Charm data still not available');
                }
            }, 500);
        };
        
        script.onerror = () => {
            console.error('❌ Failed to load charms.js');
            window.charmDataLoading = false;
            reject('Failed to load charm data');
        };
        
        document.head.appendChild(script);
    });
}
function populateCharmsGridWithRealData() {
    console.log('🔍 populateCharmsGridWithRealData called');
    
    const grid = document.getElementById('modern-charms-grid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="loading">Loading charms...</div>';
    
    if (!window.specialCharms || !window.rareCharms) {
        console.log('⏳ Charm data not loaded yet');
        return;
    }
    
    const allCharms = [...window.specialCharms, ...window.rareCharms];
    
    // Filter out sold out charms immediately
    const availableCharms = allCharms.filter(charm => {
        return charm.quantity > 0;
    });
    
    console.log(`✓ Filtered: ${availableCharms.length} available charms (removed ${allCharms.length - availableCharms.length} sold out)`);
    
    if (availableCharms.length === 0) {
        grid.innerHTML = '<div class="loading">No available charms</div>';
        return;
    }
    
    grid.innerHTML = '';
    
    availableCharms.forEach((charm, index) => {
        if (!charm.src) return;
        
        const charmItem = document.createElement('div');
        charmItem.className = 'modern-charm';
        charmItem.dataset.category = charm.category || 'uncategorized';
        
        // Check if it's gold
        const isGoldVariant = charm.src.includes('-gold.png');
        charmItem.dataset.isGold = isGoldVariant;
        
        if (charm.src.includes('rares/')) {
            charmItem.dataset.type = 'rare';
        } else if (charm.src.includes('special/')) {
            charmItem.dataset.type = 'special';
        }
        
        const img = document.createElement('img');
        img.src = charm.src;
        img.alt = charm.name || `Charm ${index + 1}`;
        img.dataset.isGold = isGoldVariant;
        
        
        
        charmItem.appendChild(img);
        grid.appendChild(charmItem);
        
        charmItem.addEventListener('click', () => {
            handleModernCharmSelection(charmItem, img, charm);
        });
    });
    
    console.log(`✅ Populated grid with ${availableCharms.length} available charms`);
    window.charmsLoaded = true;
    
    // Check current category and show/hide gold toggle
    const activeItem = document.querySelector('.menu-item.active, .sub-item.active');
    const currentCategory = activeItem ? activeItem.dataset.category : 'all';
    setTimeout(() => {
        filterCharmsByCategory(currentCategory);
    }, 100);
}function updateCharmCount() {
    const grid = document.getElementById('modern-charms-grid');
    const charmCount = document.getElementById('charm-count');
    
    if (!grid || !charmCount) return;
    
    // Count only visible charms (not sold out, not filtered out)
    const visibleCharms = Array.from(grid.querySelectorAll('.modern-charm'))
        .filter(charm => charm.style.display !== 'none' && charm.offsetParent !== null);
    
    charmCount.textContent = `${visibleCharms.length} charms`;
}
// In your app.js or script section
// Hide sold out charms in JavaScript too
function filterSoldOutCharms() {
    document.querySelectorAll('.modern-charm.sold-out').forEach(charm => {
        charm.style.display = 'none';
    });
}

function reloadCharmData() {
    console.log('🔄 Manually reloading charm data...');
    
    // Remove old script if exists
    const oldScript = document.querySelector('script[src*="charms.js"]');
    if (oldScript) {
        oldScript.remove();
    }
    
    // Reset flags
    window.charmDataLoaded = false;
    window.specialCharms = undefined;
    window.rareCharms = undefined;
    
    // Reload
    loadCharmDataDynamically().then(() => {
        console.log('✅ Charm data reloaded successfully');
        populateCharmsGridWithRealData();
    }).catch(error => {
        console.error('❌ Failed to reload charm data:', error);
    });
}
// Also filter when switching categories
document.querySelectorAll('.menu-item, .sub-item').forEach(item => {
    item.addEventListener('click', () => {
        setTimeout(filterSoldOutCharms, 100);
    });
});
function initFiltersOnce() {
    if (!filtersInitialized) {
        initializeCharmFilters();
        filtersInitialized = true;
    }
}

// Update filter status display
function updateFilterStatus(category) {
    const filterStatus = document.getElementById('current-filter');
    if (!filterStatus) return;
    
    // Map category codes to display names
    const categoryNames = {
        'all': '✨ All Charms',
        'rare': '💎 Rare Charms',
        'special': '✨ Special Charms',
        'hgs': '🔥 Hot Girl Summer',
        'sanrio': '🎀 Sanrio',
        'newc3r': '🌴 Gulf & Egypt',
        'butterflies': '🦋 Butterflies',
        'sporty': '🏎️ Sporty',
        'night': '🌙 Whimsy Night',
        'rcute': '🍓 Cute',
        'careers': '💼 Careers',
        'pets': '🐾 Pets',
        'gold': '⭐ Gold',
        'disney': '🏰 Disney',
        'love': '💗 Love/Family',
        'dangly': '✨ Dangly',
        'random': '🎲 Random',
        'long': '📏 Long',
        'graduation': '🎓 Graduation',
        'newc2s': '🌟 New Collection',
        'teddy': '🧸 Teddy Bears',
        'girly': '👛 Girly',
        'bows': '🎀 Bows',
        'beach': '🏖️ Beach',
        'red': '🔴 Red',
        'cute': '🌸 First Collection',
        'cutespecials': '💫 Cute Specials',
        'flowers': '🌷 Flowers',
        'fruity': '🍓 Fruity',
        'mushrooms': '🍄 Mushrooms',
        'simple': '✨ Simple & Cute'
    };
    
    filterStatus.textContent = categoryNames[category] || category;
}
// Emergency reload of charms.js
setTimeout(() => {
    if (!window.specialCharms || !window.rareCharms) {
        console.log('Attempting to load charms.js...');
        const script = document.createElement('script');
        script.src = 'charms.js?v=' + Date.now(); // Cache bust
        script.onload = () => {
            console.log('charms.js loaded, reinitializing...');
            populateCharmsGridWithRealData();
        };
        document.head.appendChild(script);
    }
}, 2000);
function showPointingFinger() {
    const pointingFinger = document.getElementById('pointing-finger');
    if (!pointingFinger) return;
    
    // Check if user is new or hasn't added charms yet
    const hasAddedCharms = localStorage.getItem('hasAddedCharms');
    const placedCharms = jewelryPiece.querySelectorAll('.slot img:not([data-type="base"])').length;
    
    // Show if no charms placed and it's first time or new session
    if (placedCharms === 0 && (!hasAddedCharms || sessionStorage.getItem('showFinger') !== 'false')) {
        pointingFinger.style.display = 'block';
        
        // Hide after 10 seconds or when charm is added
        setTimeout(() => {
            pointingFinger.style.display = 'none';
            sessionStorage.setItem('showFinger', 'false');
        }, 10000);
    } else {
        pointingFinger.style.display = 'none';
    }
}

// Hide finger when charm is added
function hidePointingFinger() {
    const pointingFinger = document.getElementById('pointing-finger');
    if (pointingFinger) {
        pointingFinger.style.display = 'none';
        localStorage.setItem('hasAddedCharms', 'true');
        sessionStorage.setItem('showFinger', 'false');
    }
}

// Call showPointingFinger when page loads and product changes
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showPointingFinger, 1000);
});
