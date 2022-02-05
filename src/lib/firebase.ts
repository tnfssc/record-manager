import "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_APIKEY as string,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTHDOMAIN as string,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECTID as string,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGEBUCKET as string,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGINGSENDERID as string,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APPID as string,
};

// Sanity check
Object.entries(firebaseConfig).forEach(([prop, envar]) => {
  if (typeof envar !== "string") {
    throw new Error(`Firebase config is missing: ${prop}`);
  }
});
// end sanity check

const firebaseApp = initializeApp(firebaseConfig);

firebaseApp.automaticDataCollectionEnabled = false;

export default firebaseApp;

export const auth = getAuth(firebaseApp);
export const signOut = () => firebaseSignOut(auth);
export const useAuth = () => useAuthState(auth);
