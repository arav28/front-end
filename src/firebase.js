// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "mern-app-92537.firebaseapp.com",
  projectId: "mern-app-92537",
  storageBucket: "mern-app-92537.appspot.com",
  messagingSenderId: "894938373539",
  appId: "1:894938373539:web:6ec8fdf1adf94e78dd0e16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);