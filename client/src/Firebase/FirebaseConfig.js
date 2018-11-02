import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-IQLDEJyo4wMBqrd9eLS8mMiFJBpnx4c",
  authDomain: "e-ventory-a143d.firebaseapp.com",
  projectId: "e-ventory-a143d",
  storageBucket: "e-ventory-a143d.appspot.com",
  messagingSenderId: "420759612641",
  appId: "1:420759612641:web:6003585a83db7c31e8dba0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);