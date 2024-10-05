// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmSxslh68o_fObnB4sptzYB6tRQ7yyu8c",
  authDomain: "alumnihub-27ad9.firebaseapp.com",
  projectId: "alumnihub-27ad9",
  storageBucket: "alumnihub-27ad9.appspot.com",
  messagingSenderId: "549975697468",
  appId: "1:549975697468:web:b9ecaefe5a10de764fbb39",
  measurementId: "G-0DMT6SK8FQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);  // Initialize Firebase storage

export { storage };
