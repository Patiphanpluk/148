// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM86DKKFNuulKsKEAFqEM1F-XzosBuVx4",
  authDomain: "dynamic-qr-afbae.firebaseapp.com",
  projectId: "dynamic-qr-afbae",
  storageBucket: "dynamic-qr-afbae.firebasestorage.app",
  messagingSenderId: "589650390205",
  appId: "1:589650390205:web:c8eb14a74a34da34d99bd4",
  measurementId: "G-52KCB2KR05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
