import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWff0CKrum6gU3Sw5wS64oYIjAxs_yICM",
  authDomain: "inventory-c212e.firebaseapp.com",
  projectId: "inventory-c212e",
  storageBucket: "inventory-c212e.appspot.com",
  messagingSenderId: "499495395088",
  appId: "1:499495395088:web:dc477c808fa5ae28884f95",
  databaseURL:
    "https://inventory-c212e-default-rtdb.europe-west1.firebasedatabase.app",
  measurementId: "G-VC0KLFEHVS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
export const login = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

export const listenToValue = (uid, key, setValue, defaultValue) => {
  if (!uid) {
    return;
  }
  const db = getDatabase();
  const userRef = ref(db, `${uid}/${key}`);
  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    setValue(data || defaultValue);
  });
};

export const setValue = (uid, key, newValue) => {
  if (!uid) {
    return;
  }
  console.log("update db with", newValue);
  const db = getDatabase();
  set(ref(db, `${uid}/${key}`), newValue);
};
