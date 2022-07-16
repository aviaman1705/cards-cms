import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCR6JFZuAdYXT-tn_WHvNKVq1XK_LoSSuI",
  authDomain: "mycardsdb-f82f6.firebaseapp.com",
  databaseURL: "https://mycardsdb-f82f6-default-rtdb.firebaseio.com",
  projectId: "mycardsdb-f82f6",
  storageBucket: "mycardsdb-f82f6.appspot.com",
  messagingSenderId: "758119207992",
  appId: "1:758119207992:web:3fb89d39615df1f77502cd",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// Storage
export async function upload(file, currentUser) {
  const fileRef = ref(storage, `images/${new Date().getTime()}.png`);

  //const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  return photoURL;
}
