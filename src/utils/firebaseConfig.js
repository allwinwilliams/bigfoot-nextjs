
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA_GDTRogTROzAE3Akjrj5KnogNVqOyl6A",
  authDomain: "bigfoot-nextjs.firebaseapp.com",
  projectId: "bigfoot-nextjs",
  storageBucket: "bigfoot-nextjs.appspot.com",  // This is the storage bucket name
  messagingSenderId: "155632982512",
  appId: "1:155632982512:web:04888e5e5896ccc82be535",
  measurementId: "G-M1G9TEZ19C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { db, storage, analytics };