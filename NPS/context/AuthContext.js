import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Create AuthContext to manage authentication state
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        await fetchUserData(firebaseUser.uid); // Fetch user data on login
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // Fetch user data from Firestore, including admin status
  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const adminStatus = data.isAdmin || false; // Ensure it defaults to false if missing
        setUser({
          uid: userId,
          username: data.username,
          email: data.email,
          isAdmin: adminStatus,
        });
        console.log("Fetched user data:", { adminStatus }); // Log to confirm admin status
      } else {
        console.log("No user document found for:", userId);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let msg = error.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email format';
      if (msg.includes('(auth/wrong-password)')) msg = 'Incorrect password';
      if (msg.includes('(auth/user-not-found)')) msg = 'User not found';
      return { success: false, msg };
    }
  };

  // Register function with Firestore user document creation, including admin status
  const register = async (email, password, username, isAdmin = false) => {
    try {
      // Register user with Firebase Authentication
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // Create user document in Firestore
      await setDoc(doc(db, 'users', response.user.uid), {
        username,
        email,
        isAdmin,
      });

      return { success: true };
    } catch (error) {
      let msg = error.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email format';
      if (msg.includes('(auth/email-already-in-use)')) msg = 'Email is already registered';
      if (msg.includes('(auth/weak-password)')) msg = 'Password should be at least 6 characters';
      return { success: false, msg };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state on logout
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  // Display loading component while checking authentication state
  if (isAuthenticated === undefined) {
    return null; // Or a loading component here
  }

  console.log("Auth state:", { isAuthenticated, user }); // Log auth state to debug

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
