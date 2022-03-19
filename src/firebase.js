import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt1a9FGGRLYztpmOj76LVmJsl_-a6ogMs",
  authDomain: "fipugram-4bd0c.firebaseapp.com",
  projectId: "fipugram-4bd0c",
  storageBucket: "fipugram-4bd0c.appspot.com",
  messagingSenderId: "1075526174075",
  appId: "1:1075526174075:web:8e9c559e76e36e630429de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { app, db };
