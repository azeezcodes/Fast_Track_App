import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDXjidevJE_Z9ZTwXCzAdH_c42dsB6J-Y0",
    authDomain: "fastmarket-8051a.firebaseapp.com",
    projectId: "fastmarket-8051a",
    storageBucket: "fastmarket-8051a.appspot.com",
    messagingSenderId: "69885652061",
    appId: "1:69885652061:web:ec4bb9f26f56f99b0171b4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);