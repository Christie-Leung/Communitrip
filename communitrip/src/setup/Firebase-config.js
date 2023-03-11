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
  apiKey: "AIzaSyCtew0kDfFEJwwJa_9LXqcqYYhwykSiKe4",
  authDomain: "communitrip-8a54c.firebaseapp.com",
  projectId: "communitrip-8a54c",
  storageBucket: "communitrip-8a54c.appspot.com",
  messagingSenderId: "1004293768673",
  appId: "1:1004293768673:web:65b8de0a1ff8be598ffea0",
  measurementId: "G-JXVY8E9ZM8"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);