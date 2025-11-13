// Importing neccessary components from Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// My config info
const firebaseConfig = {
  apiKey: "AIzaSyBaf5H5Zd-alKnCf4Kk4C7IqNVkMZ8uty8",
  authDomain: "personal-portfolio-ec826.firebaseapp.com",
  projectId: "personal-portfolio-ec826",
  storageBucket: "personal-portfolio-ec826.firebasestorage.app",
  messagingSenderId: "686871109893",
  appId: "1:686871109893:web:515e4c9b2cd702055ad76c"
};

let app;
let db;

try {
    app = initializeApp(firebaseConfig); // Uses the firebaseConfig info above to initialise firebase
    db = getFirestore(app); // Sets the database to be Firestore
    console.log('Firebase initialized successfully'); // Will show in the console if firebase has initialised properly
} catch (error) { // Will show in console if initialisation hasn't worked
    console.error('Firebase initialization failed:', error); // Useful for if some functionality isn't working, we can see why
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Sets the auth method to be Google sign in

export { auth, provider, db }; // Enabling these to be imported in comments.js

