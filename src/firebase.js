// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd3ZBcFk_cHy6MDRi0S3eWBJDNmFi_waQ",
  authDomain: "feedbacksystem-376ba.firebaseapp.com",
  projectId: "feedbacksystem-376ba",
  storageBucket: "feedbacksystem-376ba.firebasestorage.app",
  messagingSenderId: "1043003812152",
  appId: "1:1043003812152:web:a0f70d6f50f7fd80b039cd",
  measurementId: "G-LGFZQWENP4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
