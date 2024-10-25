import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Create AuthContext to manage authentication state
export const AuthContext = createContext();

// Provider component to wrap the app and manage authentication
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  // Fetch user data from Firestore, excluding profile picture URL
  const fetchUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUser({
        uid: userId,
        username: data.username,
        isAdmin: data.isAdmin || false, // Set admin status if available
      });
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
      if (msg.includes('(auth/network-request-failed)')) msg = 'Network error. Please check your connection.';
      return { success: false, msg };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  // Register function
  const register = async (email, password, username, isAdmin = false) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', response.user.uid), {
        username,
        isAdmin,
      });
      return { success: true, userId: response.user.uid };
    } catch (error) {
      let msg = error.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email format';
      if (msg.includes('(auth/email-already-in-use)')) msg = 'Email is already registered';
      if (msg.includes('(auth/weak-password)')) msg = 'Password should be at least 6 characters';
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
