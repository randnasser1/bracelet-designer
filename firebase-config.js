
const firebaseConfig = {
    apiKey: "AIzaSyD_iOEwu71dL4Lmfl7Km8lSlYFzSuubbzY",
    authDomain: "italian-charms.firebaseapp.com",
    projectId: "italian-charms",
  storageBucket: "italian-charms.firebasestorage.app" ,// ← MUST match your CORS-configured bucket
    messagingSenderId: "156559643870",
    appId: "1:156559643870:web:a14807a2a6d1761b71de4f"
}; 

// Wait for Firebase to load
function initializeFirebase() {
    if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully');
        
        // Initialize services
        window.auth = firebase.auth();
        window.db = firebase.firestore();
        window.storage = firebase.storage();
        window.functions = firebase.functions();
        
        console.log('Firebase services initialized');
    } else if (firebase.apps.length > 0) {
        console.log('Firebase already initialized');
    } else {
        console.log('Firebase not loaded yet');
    }
}

// Initialize when Firebase is ready
if (typeof firebase !== 'undefined') {
    initializeFirebase();
} else {
    // Retry after a short delay
    setTimeout(initializeFirebase, 1000);
}


