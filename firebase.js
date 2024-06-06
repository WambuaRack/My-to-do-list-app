// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4bP5LKBl6AI4tTRBXaEHZ84uPk_xbX7Y",
  authDomain: "my-to-do-list-f5bdb.firebaseapp.com",
  projectId: "my-to-do-list-f5bdb",
  storageBucket: "my-to-do-list-f5bdb.appspot.com",
  messagingSenderId: "299508950200",
  appId: "1:299508950200:web:6861d87924ba0aa654804d",
  measurementId: "G-2QQNZR3YLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
