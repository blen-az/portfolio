import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyC6irx4ENIodU40NZmsRjnkv4LDlvUaZcY",
  authDomain: "payment-effb4.firebaseapp.com",
  projectId: "payment-effb4",
  storageBucket: "payment-effb4.appspot.com",
  messagingSenderId: "779402363444",
  appId: "1:779402363444:web:eff56b1a2011a8f88a4061"
};


const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


const db = getFirestore(app);

export { auth, db };
