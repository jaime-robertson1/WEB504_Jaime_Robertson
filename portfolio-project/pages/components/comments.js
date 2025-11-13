// Importing neccessary components from the config file and Firebase
import { auth, provider, db } from "./firebaseConfig.js";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

// Sets google auth language to english
auth.languageCode = 'en'

// Sets that the user is not signed in by default
let currentUser = null;

// Whenever the auth state changes (sign in/out) this will run. 
// It makes sure that the user has properly loaded to make sure their details are displaying correctly in comments later
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("User signed in:", user.displayName);
    } else {
        console.log("No user signed in.")
    } 
});


// Google sign in button
const googleLogin = document.getElementById("google-login-button"); // Gets the button from html 
googleLogin.addEventListener("click", function(){ // Display the sign in on click
    provider.setCustomParameters({ prompt: "select_account"});
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href="loggedin-comments.html"; // Redirects to the logged in comments html page that is inly visable for signed in users

    }) .catch((error) => { // Display error message if user can't sign in
        console.error("Sign-in error:", error.code, error.message);
    });

})


// Google log out button
const googleLogout = document.getElementById("google-logout-button"); // Gets the button from html
googleLogout.addEventListener("click", function(){ //Display the sign out on click
    signOut(auth)
    window.location.href="comments.html"; // Directs back to the inital comments page prompting sign in
})


// Adding comments to Firestore

const commentInput = document.getElementById("comment-input");
const submitComment = document.getElementById("submit-comment");

submitComment.addEventListener("click", async () => { 
    const text = commentInput.value.trim();

    // Stops if the user hasn't been loaded yet
    // Prevents the user showing up as undefined when their displayName is fetched later
    if (!currentUser) {
        alert("User not loaded");
        return;
    }

    try {
        // Adds doc containing comment to the comments collection
        await addDoc(collection(db, "comments"), {
            text,                          // The text in the comment
            user: currentUser.displayName, // Displays the name of the acc posting
            time: serverTimestamp() // Time the comment was submitted
        });
        // Once the post comment button has been clicked and the comment submitted the comment input box returns to being empty
        commentInput.value = "";
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    });

    // Displays list of comments users have posted in real time
    const commentsList = document.getElementById("comments-list");
    // Orders the comments by newest first
    const q = query(collection(db, "comments"), orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
        commentsList.innerHTML = "";
        snapshot.forEach((doc) => { // This adds the real-time functionality 
            const comment = doc.data();
            const item = document.createElement("p");
            item.textContent = `${comment.user}: ${comment.text}`; // Formatting for how the comment appears
            commentsList.appendChild(item); // Adds the comment to the page
        });
    });

    
