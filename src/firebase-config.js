import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlscHSatPRxiQP2wmwdR4PxppCCZEicZE",
  authDomain: "our-notes-61410.firebaseapp.com",
  projectId: "our-notes-61410",
  storageBucket: "our-notes-61410.appspot.com",
  messagingSenderId: "430164974537",
  appId: "1:430164974537:web:a089012960bc89d46be618",
  measurementId: "G-3CJK24828Y"
};

const app = initializeApp(firebaseConfig);

// firebase.auth().signInAnonymously()
//   .then((userCredential) => {
//     // The anonymous user has been signed in
//     const user = userCredential.user;
//     console.log("Anonymous user UID:", user.uid);
//   })
//   .catch((error) => {
//     // Handle errors that occur during anonymous sign-in
//     console.error("Error signing in anonymously:", error);
//   });


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

// const analytics = getAnalytics(app);

// npm install -g firebase-tools