// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDPQY613cEbDrxYXBINUw_uqhXqeG3uEKo",
  authDomain: "communi-trip.firebaseapp.com",
  projectId: "communi-trip",
  storageBucket: "communi-trip.appspot.com",
  messagingSenderId: "113717098727",
  appId: "1:113717098727:web:13fb7a92351474cf970a42"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const API_KEY = "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"
