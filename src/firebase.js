
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage, ref } from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4vp02U5_As-iNevnvtxdzMYy2RWQeNeg",
  authDomain: "chat-88532.firebaseapp.com",
  projectId: "chat-88532",
  storageBucket: "chat-88532.appspot.com",
  messagingSenderId: "834751711041",
  appId: "1:834751711041:web:30334f13c90eb4a19e43c0"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();