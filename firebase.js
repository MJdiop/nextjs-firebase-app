// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB6jnbcKjOmZjqSBhPd7WLfSfT9838usUo',
  authDomain: 'nextjs-firebase-app-ab321.firebaseapp.com',
  projectId: 'nextjs-firebase-app-ab321',
  storageBucket: 'nextjs-firebase-app-ab321.appspot.com',
  messagingSenderId: '887001417771',
  appId: '1:887001417771:web:3bc6d447e069e52dd6c26e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
