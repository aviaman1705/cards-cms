//import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCR6JFZuAdYXT-tn_WHvNKVq1XK_LoSSuI",
  authDomain: "mycardsdb-f82f6.firebaseapp.com",
  databaseURL: "https://mycardsdb-f82f6-default-rtdb.firebaseio.com",
  projectId: "mycardsdb-f82f6",
  storageBucket: "mycardsdb-f82f6.appspot.com",
  messagingSenderId: "758119207992",
  appId: "1:758119207992:web:3fb89d39615df1f77502cd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
