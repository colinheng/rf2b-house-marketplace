// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg0nPNRAfkzgxofSn01l3QWrzMM0oOTIc",
  authDomain: "house-marketplace-app-c19ba.firebaseapp.com",
  projectId: "house-marketplace-app-c19ba",
  storageBucket: "house-marketplace-app-c19ba.appspot.com",
  messagingSenderId: "320768501348",
  appId: "1:320768501348:web:8d479c1088e7e56cc4e171"
};


// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()