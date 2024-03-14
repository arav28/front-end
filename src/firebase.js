// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "rentalappnew.firebaseapp.com",
  projectId: "rentalappnew",
  storageBucket: "rentalappnew.appspot.com",
  messagingSenderId: "650400989166",
  appId: "1:650400989166:web:c2e95c0edd3da247f618ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);