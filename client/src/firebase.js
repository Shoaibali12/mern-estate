// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGj33r8lQBtzrt_NR0cR9CIhHQqt9XXGQ",
  authDomain: "mern-estae-35d56.firebaseapp.com",
  projectId: "mern-estae-35d56",
  storageBucket: "mern-estae-35d56.firebasestorage.app",
  messagingSenderId: "545496156236",
  appId: "1:545496156236:web:4385ee181bbff737700ce9",
  measurementId: "G-WXM1VQ5PD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
