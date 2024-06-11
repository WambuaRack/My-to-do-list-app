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

// Get a reference to the Firestore service
const db = firebase.firestore();

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

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    const taskText = inputBox.value;
    const reminder = reminderTime.value;

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <input type="datetime-local" class="edit-time" value="${reminder}" style="display: none;">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">&times;</button>
    `;
    listContainer.appendChild(li);

    const deleteBtn = li.querySelector('.delete-btn');
    const editBtn = li.querySelector('.edit-btn');
    const taskSpan = li.querySelector('span');
    const editTime = li.querySelector('.edit-time');

    deleteBtn.addEventListener('click', () => {
        // Remove task from Firestore when deleted from UI
        const taskId = li.getAttribute('data-id');
        if (taskId) {
            db.collection("tasks").doc(taskId).delete()
                .then(() => {
                    console.log("Task successfully deleted from Firestore!");
                })
                .catch((error) => {
                    console.error("Error removing task: ", error);
                });
        }
        li.remove();
    });

    editBtn.addEventListener('click', () => {
        // Code for editing task
        // ...
    });

    // Add task to Firestore
    addTaskToFirestore(taskText, reminder);

    inputBox.value = "";
    reminderTime.value = "";
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

// Call function to retrieve tasks from Firestore when the page loads
window.addEventListener('load', getTasksFromFirestore);
