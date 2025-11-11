import { auth, provider, db } from "./firebaseConfig.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-button");
googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href="comments.html";

    }) .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

})

