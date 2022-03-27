// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */

/* Conexion hacia la autenticación */
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiQNgo2K0DUddH_b9PPrbBJ2lQJ00NqUw",
    authDomain: "transmisiones-sjd.firebaseapp.com",
    projectId: "transmisiones-sjd",
    storageBucket: "transmisiones-sjd.appspot.com",
    messagingSenderId: "434052606042",
    appId: "1:434052606042:web:1657bb62b571ae3bb15063",
    measurementId: "G-KVVSN5W8W2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

const auth = getAuth(app);

export default auth;