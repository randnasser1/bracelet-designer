// Wait for Firebase to load completely
function initializeFirebase() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase not loaded yet');
        setTimeout(initializeFirebase, 100);
        return;
    }

    try {
        // Check if already initialized
        if (!firebase.apps.length) {
            const firebaseConfig = {
                apiKey: "AIzaSyD_iOEwu71dL4Lmfl7Km8lSlYFzSuubbzY",
                authDomain: "italian-charms.firebaseapp.com",
                projectId: "italian-charms",
                storageBucket: "italian-charms.firebasestorage.app",
                messagingSenderId: "156559643870",
                appId: "1:156559643870:web:a14807a2a6d1761b71de4f"
            };
            
            firebase.initializeApp(firebaseConfig);
            console.log('✅ Firebase initialized successfully');
        } else {
            console.log('✅ Firebase already initialized');
        }
        
        // Initialize services
        window.auth = firebase.auth();
        window.db = firebase.firestore();
        window.storage = firebase.storage();
        window.functions = firebase.functions();
        
        console.log('✅ Firebase services ready');
        
        // Signal that Firebase is ready
        window.firebaseReady = true;
        if (window.onFirebaseReady) {
            window.onFirebaseReady();
        }
        
    } catch (error) {
        console.error('❌ Firebase initialization failed:', error);
    }
}

// Start initialization
initializeFirebase();
