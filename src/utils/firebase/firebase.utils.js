import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Configuration

const firebaseConfig = {
  apiKey: "AIzaSyB1Dyd1CpyFbN0V57yGhHZrwuXBECc1Fo0",
  authDomain: "crwn-clothing-db-bc433.firebaseapp.com",
  projectId: "crwn-clothing-db-bc433",
  storageBucket: "crwn-clothing-db-bc433.appspot.com",
  messagingSenderId: "378790468498",
  appId: "1:378790468498:web:ccfd07da82297b48f7bf4b",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

// Providers

const providerGoogle = new GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: "select_account" });

// Sign-in methods

export const signInWithPopupGoogle = () =>
  signInWithPopup(auth, providerGoogle);

export const createUserDocumentFromAuth = async (userAuth, vars = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...vars,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
