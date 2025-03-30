// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwAh6cbCZ18skAliGnIh14l42LcQXmdPM",
  authDomain: "waxtan-2b463.firebaseapp.com",
  projectId: "waxtan-2b463",
  storageBucket: "waxtan-2b463.firebasestorage.app",
  messagingSenderId: "792783291064",
  appId: "1:792783291064:web:a8e8872e12527d6d54aa4d",
  measurementId: "G-J0N35SR2TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();