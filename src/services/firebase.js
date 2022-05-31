import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyA94xnBvaR7OAipZ-t4Kdz2WVqHUGpOcyM",
    authDomain: "novi-weather.firebaseapp.com",
    projectId: "novi-weather",
    storageBucket: "novi-weather.appspot.com",
    messagingSenderId: "792757699715",
    appId: "1:792757699715:web:db82c5f53d28e3d044c7b6"
});

export const firebaseAuth = getAuth(firebaseApp);
