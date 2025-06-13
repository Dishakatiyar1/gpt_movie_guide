// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWDmTmeXwpLzukwSklfRt0hOb9ZWCMoRU",
  authDomain: "netflixgpt-2ac14.firebaseapp.com",
  projectId: "netflixgpt-2ac14",
  storageBucket: "netflixgpt-2ac14.appspot.com",
  messagingSenderId: "679828956937",
  appId: "1:679828956937:web:13c31b68bccb93d559d5d8",
  measurementId: "G-0E9LQFF65Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// As all firebase APIs need this 'auth' so we are exporting it from here
export const auth = getAuth();
