// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE6eFEOhKdg5k-wxaSo6bsH9b2QO3QnAA",
  authDomain: "codev-7810d.firebaseapp.com",
  projectId: "codev-7810d",
  storageBucket: "codev-7810d.appspot.com",
  messagingSenderId: "24071170869",
  appId: "1:24071170869:web:977749f339556c3ff7ba7c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Correctly initialized auth
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider }; // Named exports