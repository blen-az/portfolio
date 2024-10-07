// services/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';  // Import auth and db from firebase.js

// Register user function
export const registerUser = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      role: role,
      email: email,
    });

    return user;
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

// Login user function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { ...user, role: userData.role };
    } else {
      throw new Error('User role not found.');
    }
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};
