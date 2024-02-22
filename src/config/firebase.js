// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChZeo4xjfiJzprPpRRMzpx_VnRU8nW1jw",
    authDomain: "aplikasi-quiz-app.firebaseapp.com",
    projectId: "aplikasi-quiz-app",
    storageBucket: "aplikasi-quiz-app.appspot.com",
    messagingSenderId: "390713595444",
    appId: "1:390713595444:web:9a3006f806380baae05c61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth separately

export { app, auth }; // Export both app and auth