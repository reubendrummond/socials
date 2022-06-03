import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuq4a7FIf45u1iN29bp-QjiCZFCsc-6Mo",
  authDomain: "socials-af98b.firebaseapp.com",
  projectId: "socials-af98b",
  storageBucket: "socials-af98b.appspot.com",
  messagingSenderId: "372062678695",
  appId: "1:372062678695:web:a607da2d1e5a8035c27582",
  measurementId: "G-6NSGS4XL8B",
};

// initialise Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
