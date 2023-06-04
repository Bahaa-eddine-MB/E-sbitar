import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBVqk-0aE2ff7Es1LWPE1vZ2DsHXSmtQQ",
  authDomain: "online-shopping-368013.firebaseapp.com",
  projectId: "online-shopping-368013",
  storageBucket: "online-shopping-368013.appspot.com",
  messagingSenderId: "740302459564",
  appId: "1:740302459564:web:c4be394e00bbf67d308509",
  measurementId: "G-6SWZFX24F7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);