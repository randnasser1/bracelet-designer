// Import Firebase SDK (via CDN or local bundler)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase config here:
const firebaseConfig = {
  apiKey: "YOUR-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-ID",
  appId: "YOUR-APP-ID"
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
