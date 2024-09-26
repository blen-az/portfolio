// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'; // Corrected function name
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjGID_lIu4pNL8fhFcVjSniBgkDDCKQE0",
  authDomain: "chit-chat-6a00a.firebaseapp.com",
  projectId: "chit-chat-6a00a",
  storageBucket: "chit-chat-6a00a.appspot.com",
  messagingSenderId: "136532516359",
  appId: "1:136532516359:web:7cd0b1733e0e38ccbd54a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // Corrected function name
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
