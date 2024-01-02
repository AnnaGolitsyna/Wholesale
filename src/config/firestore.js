// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

console.log('test', process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

//    apiKey: 'AIzaSyCppiIs_tP-UqFBdCSZMsaMExIiZnuwl0w',
//     authDomain: 'wholesale2024-11201.firebaseapp.com',
//     projectId: 'wholesale2024-11201',
//     storageBucket: 'wholesale2024-11201.appspot.com',
//     messagingSenderId: '349374176639',
//     appId: '1:349374176639:web:b791ad551fb0e0f4828e4a',
