// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt4nnTGId12UYEJvSqDb1n7yFIoZjaerM",
  authDomain: "stem-9e981.firebaseapp.com",
  projectId: "stem-9e981",
  storageBucket: "stem-9e981.appspot.com",
  messagingSenderId: "333588509949",
  appId: "1:333588509949:web:14f9948e5d7ca6dd177a94",
  measurementId: "G-45KCK378CQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
