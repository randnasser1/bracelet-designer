// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_iOEwu71dL4Lmfl7Km8lSlYFzSuubbzY",
    authDomain: "italian-charms.firebaseapp.com",
    projectId: "italian-charms",
    storageBucket: "italian-charms.firebasestorage.app",
    messagingSenderId: "156559643870",
    appId: "1:156559643870:web:a14807a2a6d1761b71de4f"
};

// Wait for window to load completely
window.addEventListener('load', function() {
    console.log('Window loaded, checking Firebase...');
    
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase scripts failed to load!');
        return;
    }
    
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase initialized successfully');
        
        // Initialize services
        window.auth = firebase.auth();
        window.db = firebase.firestore();
        window.storage = firebase.storage();
        window.functions = firebase.functions();
        
        console.log('✅ All Firebase services ready');
        
        // Signal that Firebase is ready
        window.firebaseReady = true;
        
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
    }
});
