// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlW57HxJrLjE2wGn-hB_nZodP-lueJK9k",
  authDomain: "tfg-jonathan-fd8f7.firebaseapp.com",
  projectId: "tfg-jonathan-fd8f7",
  storageBucket: "tfg-jonathan-fd8f7.appspot.com",
  messagingSenderId: "948681933199",
  appId: "1:948681933199:web:470d3634a88835bbfc4bfa",
  measurementId: "G-4JY86ZJMC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};