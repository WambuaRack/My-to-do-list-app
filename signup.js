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

// Function to sign up a user with email and password
function signUpWithEmailAndPassword(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      console.log("User signed up:", user.uid);
      // Redirect to index.html after successful signup
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Handle errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign up error:", errorCode, errorMessage);
    });
}

// Function to handle form submission
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signUpWithEmailAndPassword(email, password);
});
