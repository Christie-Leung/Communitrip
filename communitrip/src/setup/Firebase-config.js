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

  apiKey: "AIzaSyCIEWO-jKWHvRyJW_o7aRm2f8CA6CFIA0w",

  authDomain: "communitripp.firebaseapp.com",

  projectId: "communitripp",

  storageBucket: "communitripp.appspot.com",

  messagingSenderId: "903999228807",

  appId: "1:903999228807:web:db03441e2482d0e49a2122"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const API_KEY = "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"
