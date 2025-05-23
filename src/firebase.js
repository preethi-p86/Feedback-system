// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAd3ZBcFk_cHy6MDRi0S3eWBJDNmFi_waQ",
  authDomain: "feedbacksystem-376ba.firebaseapp.com",
  projectId: "feedbacksystem-376ba",
  storageBucket: "feedbacksystem-376ba.firebasestorage.app",
  messagingSenderId: "1043003812152",
  appId: "1:1043003812152:web:a0f70d6f50f7fd80b039cd",
  measurementId: "G-LGFZQWENP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };