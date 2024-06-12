// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4bP5LKBl6AI4tTRBXaEHZ84uPk_xbX7Y",
    authDomain: "my-to-do-list-f5bdb.firebaseapp.com",
    projectId: "my-to-do-list-f5bdb",
    storageBucket: "my-to-do-list-f5bdb.appspot.com",
    messagingSenderId: "299508950200",
    appId: "1:299508950200:web:c8f9ae086350d84f54804d",
    measurementId: "G-J3GE039YBG"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Function to add a task to Firestore
function addTaskToFirestore(taskText, reminder) {
    // Add task to Firestore
    db.collection("tasks").add({
            task: taskText,
            reminderTime: reminder
        })
        .then((docRef) => {
            console.log("Task added with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding task: ", error);
        });
}

// Function to retrieve tasks from Firestore
function getTasksFromFirestore() {
    db.collection("tasks").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const taskData = doc.data();
                const taskId = doc.id;
                const taskText = taskData.task;
                const reminder = taskData.reminderTime;

                // Create UI elements for each task
                let li = document.createElement("li");
                li.innerHTML = `
                      <span>${taskText}</span>
                      <input type="datetime-local" class="edit-time" value="${reminder}" style="display: none;">
                      <button class="edit-btn">Edit</button>
                      <button class="delete-btn">&times;</button>
                  `;
                li.setAttribute('data-id', taskId);
                listContainer.appendChild(li);
            });
        })
        .catch((error) => {
            console.error("Error getting tasks: ", error);
        });
}

// Function to check if the user is authenticated
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        // No need to redirect here, let the other logic handle it.
    } else {
        // No user is signed in.
        // Redirect to the login page or any other page
        window.location.href = "login.html"; // Assuming login.html is your login page
    }
});

// Call function to retrieve tasks from Firestore when the page loads
window.addEventListener('load', getTasksFromFirestore);
