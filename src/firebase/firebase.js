// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */

/* Conexion hacia la autenticación */
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDHD8AUesh5RCi2hdnRL1hNFooyfuFg4MM",
    authDomain: "eventos-web-sjd.firebaseapp.com",
    projectId: "eventos-web-sjd",
    storageBucket: "eventos-web-sjd.appspot.com",
    messagingSenderId: "598170838755",
    appId: "1:598170838755:web:85dc2968d5b3d25f1d07d6",
    measurementId: "G-8F9D9LYZHQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};