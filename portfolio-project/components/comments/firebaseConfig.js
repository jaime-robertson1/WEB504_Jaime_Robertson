import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';


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

export function uploadFile(file, onProgress, onError, onComplete) {
    if (!file) {
        onError(new Error('No file provided'));
        return;
    }

    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
        'state_changed',

        (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(Math.round(progress));
            console.log(`Upload is ${progress.toFixed(2)}% done`);
        },

        (error) => {
            console.error('Upload error:', error);
            let errorMessage = 'Upload failed. Please try again.';
            switch (error.code) {
                case 'storage/unauthorized':
                    errorMessage = 'Permission denied. Check Firebase Storage rules.';
                    break;
                case 'storage/canceled':
                    errorMessage = 'Upload was canceled.';
                    break;
                case 'storage/unknown':
                    errorMessage = 'An unknown error occurred during upload.';
                    break;
            }

            onError(new Error(errorMessage));
        },

        async () => {
            try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File uploaded successfully');
                console.log('Download URL:', downloadURL);

                onComplete({
                    url: downloadURL,
                    name: file.name,
                    fullPath: storageRef.fullPath,
                    timestamp: timestamp
                });

            } catch (error) {
                console.error('Error getting download URL:', error);
                onError(error);
            }
        }
    );

    return uploadTask;
}


export async function listAllImages() {
    try {
        const imagesRef = ref(storage, 'images/');
        const result = await listAll(imagesRef);
        const imagePromises = result.items.map(async (imageRef) => {
            const url = await getDownloadURL(imageRef);

            return {
                url: url,
                name: imageRef.name,
                fullPath: imageRef.fullPath,
                timestamp: imageRef.name.split('_')[0]
            };
        });

        const images = await Promise.all(imagePromises);
        console.log(`Found ${images.length} images`);

        return images;

    } catch (error) {
        console.error('Error listing images:', error);
        throw error; 
    }
}

export function validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Please select an image file (JPEG, PNG, GIF, or WebP)'
        };
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return {
            valid: false,
            error: 'File size must be less than 5MB'
        };
    }

    return {
        valid: true
    };
}