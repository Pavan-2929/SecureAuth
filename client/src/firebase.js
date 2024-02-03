// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-2929.firebaseapp.com",
  projectId: "auth-2929",
  storageBucket: "auth-2929.appspot.com",
  messagingSenderId: "670921112600",
  appId: "1:670921112600:web:0dab16699fd7ebf25bd76d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
