// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAkqQYSy0mUK326NCG6FFllYO0Q0TPsQA",
  authDomain: "results-94c30.firebaseapp.com",
  projectId: "results-94c30",
  storageBucket: "results-94c30.appspot.com",
  messagingSenderId: "1000428286448",
  appId: "1:1000428286448:web:fb743eee4c36d61e202d35",
  measurementId: "G-S09JREBNWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let storage = getStorage(app);
export default storage;
