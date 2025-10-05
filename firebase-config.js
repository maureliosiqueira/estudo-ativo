// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ5Pgzv08pcR6Xfp-SdjdYmqqSw7brNQ4",
  authDomain: "estudo-ativo-projeto.firebaseapp.com",
  projectId: "estudo-ativo-projeto",
  storageBucket: "estudo-ativo-projeto.firebasestorage.app",
  messagingSenderId: "257330913879",
  appId: "1:257330913879:web:4babb1b1fa4a77cd7bb912",
  measurementId: "G-SJT94J9CP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
