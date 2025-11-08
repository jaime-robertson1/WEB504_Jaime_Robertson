import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';


const firebaseConfig = {
  apiKey: "AIzaSyBaf5H5Zd-alKnCf4Kk4C7IqNVkMZ8uty8",
  authDomain: "personal-portfolio-ec826.firebaseapp.com",
  projectId: "personal-portfolio-ec826",
  storageBucket: "personal-portfolio-ec826.firebasestorage.app",
  messagingSenderId: "686871109893",
  appId: "1:686871109893:web:515e4c9b2cd702055ad76c"
};


export function isFirebaseConfigured() {
    const hasPlaceholders = firebaseConfig.apiKey === "AIzaSyBaf5H5Zd-alKnCf4Kk4C7IqNVkMZ8uty8" ||
                           firebaseConfig.apiKey.includes("AIzaSyBaf5H5Zd-alKnCf4Kk4C7IqNVkMZ8uty8");

    if (hasPlaceholders) {
        console.error('Firebase Configuration Error!');
        console.error('Please replace the placeholder values in js/firebaseConfig.js with your actual Firebase credentials.');
        console.error('Visit https://console.firebase.google.com/ to get your config values.');
        return false;
    }

    return true;
}


let app;
let storage;

try {
    app = initializeApp(firebaseConfig);
    storage = getStorage(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization failed:', error);
}

export { storage };

