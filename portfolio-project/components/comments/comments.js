import { auth, provider, db } from "./firebaseConfig.js";
import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

auth.languageCode = 'en'

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

