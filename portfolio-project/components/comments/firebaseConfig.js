import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';


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
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization failed:', error);
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };

