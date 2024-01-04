
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

console.log('test', process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


//    apiKey: 'AIzaSyCppiIs_tP-UqFBdCSZMsaMExIiZnuwl0w',
//     authDomain: 'wholesale2024-11201.firebaseapp.com',
//     projectId: 'wholesale2024-11201',
//     storageBucket: 'wholesale2024-11201.appspot.com',
//     messagingSenderId: '349374176639',
//     appId: '1:349374176639:web:b791ad551fb0e0f4828e4a',
