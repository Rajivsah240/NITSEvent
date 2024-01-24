import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { FIREBASE_AUTH,FIRESTORE_DB } from './config/firebase';
import { getDoc, doc } from 'firebase/firestore';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn,setLoggedIn]=useState(false);

  const loginClub = async ({email,password}) => {
    try {
      // Validate email and password
      if (!email || !password) {
        throw new Error("Please enter both email and password.");
      }
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);    
      const userDocRef = doc(FIRESTORE_DB, 'clubUsers', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const { imageURL } = userData;

        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          imageURL,
          // clubName:userCredential.user.clubName
        });

        setLoggedIn(true);
      } else {
        throw new Error("User document not found.");
      }
      
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const loginStudent = async ({email,password}) => {
    try {
      // Validate email and password
      if (!email || !password) {
        throw new Error("Please enter both email and password.");
      }
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);    
      const userDocRef = doc(FIRESTORE_DB, 'studentUsers', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const { imageURL,name } = userData;

        // Set user state including the image URL
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          imageURL,
          name
        });

        setLoggedIn(true);
      } else {
        throw new Error("User document not found.");
      }
      
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setLoggedIn(false);
      setUser(null);
      
    } catch (error) {
      console.error('Logout failed', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user,loggedIn, loginClub,loginStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
