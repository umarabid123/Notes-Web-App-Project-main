// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4IZUPUJhDm80hHt4Vm-Oe5kq2jYxHg9s",
  authDomain: "notes-app-ac844.firebaseapp.com",
  projectId: "notes-app-ac844",
  storageBucket: "notes-app-ac844.firebasestorage.app",
  messagingSenderId: "175133541360",
  appId: "1:175133541360:web:1c7d3eb1ee08e837109335",
  measurementId: "G-1KRBQPHKCJ"
};



// Initialize Firebase


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;