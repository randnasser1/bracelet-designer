// Import Firebase SDK (via CDN or local bundler)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase config here:
const firebaseConfig = {
  apiKey: "AIzaSyDYdJWBV1FV3fnpeN2Gb-JvIyZA_UVpvLU",
  authDomain: "italian-charms-8d374.firebaseapp.com",
  projectId: "italian-charms-8d374",
  storageBucket: "italian-charms-8d374.appspot.com",
  messagingSenderId: "124054727452",
  appId: "1:124054727452:web:17f74d59a000b1577f68d9",
  measurementId: "G-NS34C74T1Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveBracelet(layout) {
  try {
    await addDoc(collection(db, "bracelets"), {
      layout: layout,
      createdAt: new Date().toISOString()
    });
    alert("Bracelet saved!");
  } catch (err) {
    console.error("Error saving bracelet:", err);
  }
}
