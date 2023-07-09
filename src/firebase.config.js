// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwKkIbRbNbSs83eu7wggyirZUG2M9EFYo",
    authDomain: "flashwin-7de35.firebaseapp.com",
    databaseURL: "https://flashwin-7de35-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "flashwin-7de35",
    storageBucket: "flashwin-7de35.appspot.com",
    messagingSenderId: "861915088466",
    appId: "1:861915088466:web:c32f1e7a9718810c95018b",
    measurementId: "G-RD1KWV8LM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { app, analytics, database }