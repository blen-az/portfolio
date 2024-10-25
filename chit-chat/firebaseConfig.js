// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'; // For Firebase Authentication
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistent storage
import { getFirestore, collection } from 'firebase/firestore'; // For Firestore database

const firebaseConfig = {
  apiKey: "AIzaSyAjGID_lIu4pNL8fhFcVjSniBgkDDCKQE0",
  authDomain: "chit-chat-6a00a.firebaseapp.com",
  projectId: "chit-chat-6a00a",
  storageBucket: "chit-chat-6a00a.appspot.com",
  messagingSenderId: "136532516359",
  appId: "1:136532516359:web:7cd0b1733e0e38ccbd54a2"
};


const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage) // Correctly set up persistence
});


export const db = getFirestore(app);


export const usersRef = collection(db, 'users'); // Reference to 'users' collection
export const roomRef = collection(db, 'rooms'); // Reference to 'rooms' collection

