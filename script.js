import { app, analytics } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);
const inputBox = document.getElementById("input-box");
const reminderTime = document.getElementById("reminder-time");
const listContainer = document.getElementById("list-container");

let currentUser = null;

// Function to add a task
function addTask() {
    if (!currentUser) {
        alert("Please log in to add tasks.");
        return;
    }

    // Your existing addTask() function code here...
}

// Function to check reminders
function checkReminders() {
    // Your existing checkReminders() function code here...
}

// Check reminders every minute
setInterval(checkReminders, 60000);

// Function to handle user authentication
function handleAuth() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!email || !password) {
        alert("Invalid email or password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            currentUser = userCredential.user;
            console.log("User logged in:", currentUser.email);
            alert("Logged in successfully!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error:", errorCode, errorMessage);
            alert("Login failed. Please try again.");
        });
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
        console.log("User is logged in:", user.email);
    } else {
        console.log("No user is logged in.");
    }
});

// Attach login functionality to a button click
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", handleAuth);
