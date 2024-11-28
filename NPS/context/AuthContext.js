import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  reload,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    console.log('Setting up onAuthStateChanged listener.');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser);

      if (firebaseUser) {
        console.log('User is logged in:', firebaseUser);
        await reload(firebaseUser);
        console.log('User reloaded to check email verification status.');

        if (firebaseUser.emailVerified) {
          console.log('User email is verified.');
          setIsAuthenticated(true);
          setEmailVerified(true);
          const userData = await fetchUserData(firebaseUser.uid);

          if (!userData) {
            console.warn('User data not found. Logging out user.');
            await logout();
            alert('Account data not found. Please sign up again.');
          }
        } else {
          console.warn('User email is not verified. Logging out user.');
          setEmailVerified(false);
          await logout();
          alert('Please verify your email to activate your account.');
        }
      } else {
        console.log('No user is logged in.');
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const fetchUserData = async (userId) => {
    console.log('Fetching user data for user ID:', userId);
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('User data found:', docSnap.data());
        const data = docSnap.data();

        if (data.hasSeenGuide === undefined) {
          console.log('Adding missing "hasSeenGuide" field to user data.');
          await setDoc(docRef, { hasSeenGuide: false }, { merge: true });
          data.hasSeenGuide = false;
        }

        setUser({ uid: userId, ...data });
        return { uid: userId, ...data };
      } else {
        console.warn('No user data found in Firestore for user ID:', userId);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const register = async (email, password, username) => {
    console.log('Registering user with email:', email);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully. Sending email verification.');
      await sendEmailVerification(response.user);
      await setDoc(doc(db, 'users', response.user.uid), {
        username,
        email,
        isAdmin: false,
        hasSeenGuide: false,
      });
      console.log('User data stored in Firestore.');
      return { success: true, msg: 'Registration successful. Please check your email to verify your account.' };
    } catch (error) {
      console.error('Registration error:', error.code, error.message);
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
        console.log('Resending verification email to:', auth.currentUser.email);
        await sendEmailVerification(auth.currentUser);
        alert('Verification email resent. Please check your inbox.');
      } catch (error) {
        console.error('Error resending verification email:', error);
        alert('Failed to resend verification email. Please try again.');
      }
    }
  };

  const login = async (email, password) => {
    console.log('Logging in user with email:', email);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully:', result.user.uid);

      await reload(result.user);
      console.log('User reloaded to check email verification status.');

      if (!result.user.emailVerified) {
        console.warn('Email not verified. Login denied.');
        setEmailVerified(false);
        return { success: false, msg: 'Please verify your email before logging in.' };
      }

      setEmailVerified(true);
      const userData = await fetchUserData(result.user.uid);

      if (userData && userData.hasSeenGuide === false) {
        console.log('Redirecting user to UserGuide.');
        setUser(userData);
        return { success: true, navigateTo: 'UserGuide' };
      }

      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      let msg = 'An error occurred. Please try again.';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email format.';
      if (error.code === 'auth/wrong-password') msg = 'Incorrect password.';
      if (error.code === 'auth/user-not-found') msg = 'User not found.';
      return { success: false, msg };
    }
  };

  const logout = async () => {
    console.log('Logging out user.');
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      console.log('User logged out successfully.');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error.message);
      return { success: false, msg: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, emailVerified, login, register, logout, resendVerificationEmail }}
    >
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
