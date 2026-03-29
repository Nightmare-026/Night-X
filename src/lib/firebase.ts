import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBdyuD8E-0RtcsZINue8qrMuTTALeJf10",
  authDomain: "night-x-d6985.firebaseapp.com",
  projectId: "night-x-d6985",
  storageBucket: "night-x-d6985.firebasestorage.app",
  messagingSenderId: "468248055779",
  appId: "1:468248055779:web:2a86865e2abdc4dd52dad6",
  measurementId: "G-5LTYDQM4HY",
};

// Prevent re-initialization on hot-reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export { app, auth, db, googleProvider };
