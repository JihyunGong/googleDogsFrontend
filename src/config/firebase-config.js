import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOpJImfzpHpNnZp8i1pvGwdtAEbOPKQiM",
  authDomain: "auth-b870c.firebaseapp.com",
  projectId: "auth-b870c",
  storageBucket: "auth-b870c.appspot.com",
  messagingSenderId: "210800307233",
  appId: "1:210800307233:web:422e9cadde3f6b66d34760"
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const provider = new GoogleAuthProvider();
export const signin = signInWithPopup;
export const signout = signOut;
