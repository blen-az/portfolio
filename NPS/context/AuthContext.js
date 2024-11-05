import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Create the AuthContext to provide user and authentication functions
export const AuthContext = createContext();

// AuthContextProvider: Wraps the app with authentication state and methods
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores authenticated user data
  const [isAuthenticated, setIsAuthenticated] = useState(undefined); // Tracks authentication state

  // Set up a listener for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in
        setIsAuthenticated(true);
        const userData = await fetchUserData(firebaseUser.uid);
        // If user data doesn't exist in Firestore, log them out
        if (!userData) {
          await logout();
          alert('Your account data was not found. Please sign up again.');
        }
      } else {
        // User is logged out
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsubscribe; // Clean up the listener on component unmount
  }, []);

  // Fetch user data from Firestore
  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Update the user state with data from Firestore
        setUser({
          uid: userId,
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin ?? false, // Default to false if isAdmin is undefined
        });
        return data;
      } else {
        return null; // No user data found
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // Return null on error
    }
  };

  // Login user with email and password
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      // Map Firebase error codes to friendly messages
      let msg = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email format.';
      if (error.code === 'auth/wrong-password') msg = 'Incorrect password.';
      if (error.code === 'auth/user-not-found') msg = 'User not found.';
      return { success: false, msg };
    }
  };

  // Register a new user with email, password, and username
  const register = async (email, password, username) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // Save additional user info to Firestore
      await setDoc(doc(db, 'users', response.user.uid), { username, email, isAdmin: false });
      return { success: true };
    } catch (error) {
      // Map Firebase error codes to friendly messages
      let msg = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email format.';
      if (error.code === 'auth/email-already-in-use') msg = 'Email is already registered.';
      if (error.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.';
      return { success: false, msg };
    }
  };

  // Log out the current user
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user data
      setIsAuthenticated(false); // Update authentication state
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  // Provide user data and authentication methods to the app
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
