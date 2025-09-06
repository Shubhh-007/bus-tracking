import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAin2V4Isvr8XlgSSv8BvqI7nLBqrjcn2k",
  authDomain: "map-data-89084.firebaseapp.com",
  projectId: "map-data-89084",
  storageBucket: "map-data-89084.firebasestorage.app",
  messagingSenderId: "636782798202",
  appId: "1:636782798202:web:4ec267162f0c620b6aa2c3",
  measurementId: "G-XZCQ718EQV"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);






