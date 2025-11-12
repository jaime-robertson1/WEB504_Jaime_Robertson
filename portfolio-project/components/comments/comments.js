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


auth.languageCode = 'en'

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("User signed in:", user.displayName);
    } else {
        console.log("No user signed in.")
    } 
});

const googleLogin = document.getElementById("google-login-button");
googleLogin.addEventListener("click", function(){
    provider.setCustomParameters({ prompt: "select_account"});
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href="loggedin-comments.html";

    }) .catch((error) => {
        console.error("Sign-in error:", error.code, error.message);
    });

})

const googleLogout = document.getElementById("google-logout-button");
googleLogout.addEventListener("click", function(){
    signOut(auth)
    window.location.href="comments.html";
})

const commentInput = document.getElementById("comment-input");
const submitComment = document.getElementById("submit-comment");

submitComment.addEventListener("click", async () => { 
    const text = commentInput.value.trim();

    if (!currentUser) {
        alert("User not loaded");
        return;
    }

    try {
        await addDoc(collection(db, "comments"), {
            text,
            user: currentUser.displayName,
            time: serverTimestamp()
        });
        commentInput.value = "";
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    });

    const commentsList = document.getElementById("comments-list");

    const q = query(collection(db, "comments"), orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
        commentsList.innerHTML = "";
        snapshot.forEach((doc) => {
            const comment = doc.data();
            const item = document.createElement("p");
            item.textContent = `${comment.user}: ${comment.text}`;
            commentsList.appendChild(item);
        });
    });

    
