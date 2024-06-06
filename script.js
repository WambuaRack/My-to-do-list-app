// Import Firebase initialization
import { app, analytics } from './firebase.js';

const inputBox = document.getElementById("input-box");
const reminderTime = document.getElementById("reminder-time");
const listContainer = document.getElementById("list-container");

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

    deleteBtn.addEventListener('click', () => li.remove());

    editBtn.addEventListener('click', () => {
        if (editBtn.textContent === 'Edit') {
            taskSpan.style.display = 'none';
            editTime.style.display = 'inline';
            inputBox.value = taskSpan.textContent;
            editBtn.textContent = 'Save';
        } else {
            taskSpan.textContent = inputBox.value;
            taskSpan.style.display = 'inline';
            editTime.style.display = 'none';
            editBtn.textContent = 'Edit';
            const newReminder = editTime.value;
            if (newReminder) {
                const reminderDate = new Date(newReminder);
                const currentTime = new Date();
                if (reminderDate > currentTime) {
                    const timeDifference = reminderDate - currentTime;
                    setTimeout(() => alert(`Reminder: ${taskSpan.textContent}`), timeDifference);
                } else {
                    alert("Please set a future time for the reminder.");
                }
            }
        }
    });

    // Set reminder if a valid time is provided
    if (reminder) {
        const reminderDate = new Date(reminder);
        const currentTime = new Date();
        if (reminderDate > currentTime) {
            const timeDifference = reminderDate - currentTime;
            setTimeout(function() {
                alert(`Reminder: ${taskText}`);
            }, timeDifference);
        } else {
            alert("Please set a future time for the reminder.");
        }
    }

    inputBox.value = "";
    reminderTime.value = "";
}

// Optional: Check reminders periodically (in case the user refreshes the page or adds tasks with delayed reminders)
function checkReminders() {
    const tasks = Array.from(listContainer.children);
    const currentTime = new Date();

    tasks.forEach(task => {
        const reminder = task.getAttribute('data-reminder');
        if (reminder) {
            const reminderDate = new Date(reminder);
            if (reminderDate <= currentTime && !task.classList.contains('notified')) {
                alert(`Reminder: ${task.textContent}`);
                task.classList.add('notified');
            }
        }
    });
}

// Check reminders every minute
setInterval(checkReminders, 60000);
