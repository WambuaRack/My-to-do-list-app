import { app, analytics } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth(app);
const inputBox = document.getElementById("input-box");
const reminderTime = document.getElementById("reminder-time");
const listContainer = document.getElementById("list-container");

const authContainer = document.getElementById("auth-container");
const taskContainer = document.getElementById("task-container");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const logoutButton = document.getElementById("logout-button");
const addTaskButton = document.getElementById("add-task-button");

let currentUser = null;

// Function to add a task
function addTask() {
    if (!currentUser) {
        alert("Please log in to add tasks.");
        return;
    }

    const task = inputBox.value.trim();
    const time = reminderTime.value;

    if (task && time) {
        const taskItem = document.createElement("div");
        taskItem.textContent = `${task} - Reminder at: ${time}`;
        listContainer.appendChild(taskItem);
        inputBox.value = "";
        reminderTime.value = "";
    } else {
        alert("Please enter a task and set a reminder time.");
    }
}

// Function to check reminders
function checkReminders() {
    // Your existing checkReminders() function code here...
}

// Check reminders every minute
setInterval(checkReminders, 60000);

// Function to handle user login
function handleLogin() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!email || !password) {
        alert("Invalid email or password.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            console.log("User logged in:", currentUser.email);
            alert("Logged in successfully!");
            updateUI();
        })
        .catch((error) => {
            console.error("Error:", error.code, error.message);
            alert("Login failed. Please try again.");
        });
}

// Function to handle user registration
function handleRegister() {
    const email = prompt("Enter your email:");
    const password = prompt("Enter your password:");

    if (!email || !password) {
        alert("Invalid email or password.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            console.log("User registered and logged in:", currentUser.email);
            alert("Registered and logged in successfully!");
            updateUI();
        })
        .catch((error) => {
            console.error("Error:", error.code, error.message);
            alert("Registration failed. Please try again.");
        });
}

// Function to handle user logout
function handleLogout() {
    signOut(auth)
        .then(() => {
            currentUser = null;
            console.log("User logged out");
            alert("Logged out successfully!");
            updateUI();
        })
        .catch((error) => {
            console.error("Error:", error.code, error.message);
            alert("Logout failed. Please try again.");
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
    updateUI();
});

// Update UI based on authentication state
function updateUI() {
    if (currentUser) {
        authContainer.style.display = "none";
        taskContainer.style.display = "block";
        logoutButton.style.display = "block";
    } else {
        authContainer.style.display = "block";
        taskContainer.style.display = "none";
        logoutButton.style.display = "none";
    }
}

// Attach event listeners
loginButton.addEventListener("click", handleLogin);
registerButton.addEventListener("click", handleRegister);
logoutButton.addEventListener("click", handleLogout);
addTaskButton.addEventListener("click", addTask);

updateUI();
