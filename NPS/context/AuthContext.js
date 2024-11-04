// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        const userData = await fetchUserData(firebaseUser.uid);
        if (!userData) {
          await logout();
          alert('Your account data was not found. Please sign up again.');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser({
          uid: userId,
          username: data.username,
          email: data.email,
          isAdmin: data.isAdmin || false,
        });
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

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

  const register = async (email, password, username) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', response.user.uid), { username, email });
      return { success: true };
    } catch (error) {
      let msg = error.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email format';
      if (msg.includes('(auth/email-already-in-use)')) msg = 'Email is already registered';
      if (msg.includes('(auth/weak-password)')) msg = 'Password should be at least 6 characters';
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
