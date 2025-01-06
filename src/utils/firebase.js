// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmeeKQOvoKHPHvglc2Aeq46m_x3Jecsas",
  authDomain: "ruleta-vitabella.firebaseapp.com",
  projectId: "ruleta-vitabella",
  storageBucket: "ruleta-vitabella.firebasestorage.app",
  messagingSenderId: "851131811124",
  appId: "1:851131811124:web:f7f7025783ada207051161",
  measurementId: "G-6RPYL4B213",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // Exporta la instancia de Firestore
