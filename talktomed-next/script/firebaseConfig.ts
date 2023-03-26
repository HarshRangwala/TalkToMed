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
  apiKey: "AIzaSyCkp5YsizZ2uG87wbk7DYVyBWL0ROmONGg",
  authDomain: "talk2med-892ef.firebaseapp.com",
  projectId: "talk2med-892ef",
  storageBucket: "talk2med-892ef.appspot.com",
  messagingSenderId: "688053963401",
  appId: "1:688053963401:web:8b4006fc8fa54629389458",
  measurementId: "G-GY8VQN5B51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);