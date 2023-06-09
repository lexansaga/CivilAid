// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA3ubvsPQedp3TMJecTHX4Nrg6wNrHPxvY",
    authDomain: "civilaid-65d59.firebaseapp.com",
    projectId: "civilaid-65d59",
    storageBucket: "civilaid-65d59.appspot.com",
    messagingSenderId: "643971800555",
    appId: "1:643971800555:web:6c8cb91a3262551a8a0dae",
    measurementId: "G-H1H3JLMC8F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
