import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub; // Cleanup subscription on unmount
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            setUser((prevUser) => ({
                ...prevUser,
                username: data.username,
                userId: data.userId
            }));
        }
    };

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            let msg = e.message;
            if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email format';
            if (msg.includes('(auth/wrong-password)')) msg = 'Incorrect password';
            if (msg.includes('(auth/network-request-failed)')) msg = 'Network error. Please check your connection.';
            return { success: false, msg };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    };

    const register = async (email, password, username, profileurl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", response.user.uid), {
                username,
                profileurl,
                userId: response.user.uid
            });
            return { success: true, userId: response.user.uid }; // Return user ID
        } catch (e) {
            let msg = e.message;
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

export const useAuth = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
};
