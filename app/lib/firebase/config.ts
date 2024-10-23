// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9g4dM3qJHDiVvP_G1ta1jAGTwywU04VQ",
    authDomain: "receipt-gen-37288.firebaseapp.com",
    projectId: "receipt-gen-37288",
    storageBucket: "receipt-gen-37288.appspot.com",
    messagingSenderId: "379423369602",
    appId: "1:379423369602:web:abecdd9945a1d70d1a879b",
    measurementId: "G-CKZ5WNSZHD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
