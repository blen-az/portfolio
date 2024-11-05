import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  reload
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await reload(firebaseUser); // Reload user to get the latest email verification status
        if (firebaseUser.emailVerified) {
          setIsAuthenticated(true);
          setEmailVerified(true);
          const userData = await fetchUserData(firebaseUser.uid);
          if (!userData) {
            await logout();
            alert('Account data not found. Please sign up again.');
          }
        } else {
          setEmailVerified(false);
          await logout();
          alert('Please verify your email to activate your account.');
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
        setUser({ uid: userId, ...data });
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(response.user);
      await setDoc(doc(db, 'users', response.user.uid), { username, email, isAdmin: false });
      return { success: true, msg: 'Registration successful. Please check your email to verify your account.' };
    } catch (error) {
      let msg = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email format.';
      if (error.code === 'auth/email-already-in-use') msg = 'Email is already registered.';
      if (error.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.';
      return { success: false, msg };
    }
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert('Verification email resent. Please check your inbox.');
      } catch (error) {
        alert('Failed to resend verification email. Please try again.');
      }
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Reload user to get latest email verification status
      await reload(result.user);
      
      if (!result.user.emailVerified) {
        console.warn('Email not verified at login');
        setEmailVerified(false);
        return { success: false, msg: 'Please verify your email before logging in.' };
      }

      setEmailVerified(true);
      console.log('Login result:', result);
      return { success: true };
    } catch (error) {
      let msg = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email format.';
      if (error.code === 'auth/wrong-password') msg = 'Incorrect password.';
      if (error.code === 'auth/user-not-found') msg = 'User not found.';
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
    <AuthContext.Provider value={{ user, isAuthenticated, emailVerified, login, register, logout, resendVerificationEmail }}>
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
