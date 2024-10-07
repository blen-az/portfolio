import { children, createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth,db } from "../firebaseConfig";
import {addDoc, doc, getDoc, setDoc} from 'firebase/firestore'


export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=>{
        console.log('got user; ',user);
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsAuthenticated(true);
                setUser(user)
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
            return unsub;

    },[])

    const login = async (email, password)=>{
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success:true}
        }catch(e){
            let msg = e.message
            if(msg.includes('(auth/invalid-email)')) msg='Invalid email';
            if(msg.includes('(auth/network-request-failed)')) msg='Wrong credentials';
            return {success: false, msg};
        }
    }

    const logout = async ()=>{
        try{
            await signOut(auth);
            return {success: true}
        }catch(e){
            return {success: false, msg: e.message, error: e};
        }
    }

    const register = async (email, password, username, profileurl)=>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :',response?.user);

            await setDoc(doc(db,"users", response?.user?.uid),{
                username,
                profileurl,
                userId: response?.user?.uid
                
            });
            return {success: true, data: response?.user};


        }catch(e){
            let msg = e.message
            if(msg.includes('(auth/invalid-email)')) msg='Invalid email';
            if(msg.includes('(auth/email-already-in-use)')) msg='Email already exists';

            return {success: false, msg};
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
        )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');

    }
    return value;
}