// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_iOEwu71dL4Lmfl7Km8lSlYFzSuubbzY",
    authDomain: "italian-charms.firebaseapp.com",
    projectId: "italian-charms",
  storageBucket: "italian-charms.firebasestorage.app" ,// ← MUST match your CORS-configured bucket
    messagingSenderId: "156559643870",
    appId: "1:156559643870:web:a14807a2a6d1761b71de4f"
}; 


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Initialize services - FIXED: Use firebase.auth() not auth directly
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Make them globally available
window.firebase = firebase;
window.auth = auth;
window.db = db;
window.storage = storage;

console.log('Firebase initialized successfully');
