import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp, deleteApp } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../api/firestore';

export const createClientAccount = async (contractorId, password) => {
  let secondaryApp = null;
  try {
    // Step 1: Get contractor data
    const contractorRef = doc(db, 'balanutsa', 'catalogs', 'contractors', contractorId);
    const contractorDoc = await getDoc(contractorRef);

    if (!contractorDoc.exists()) {
      throw new Error('Контрактор не знайдено');
    }

    const contractorData = contractorDoc.data();

    if (!contractorData.email) {
      throw new Error('У контрактора немає email. Спочатку додайте email в картці контрактора');
    }

    // Step 2: Create a secondary Firebase app to avoid signing out the current admin
    secondaryApp = initializeApp(
      {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
      },
      'secondary'
    );
    const secondaryAuth = getAuth(secondaryApp);

    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      contractorData.email,
      password
    );

    console.log(`✅ Client account created:`);
    console.log(`Email: ${contractorData.email}`);
    console.log(`Login: ${contractorData.email.split('@')[0]}`);
    console.log(`Password: ${password}`);

    return {
      ...userCredential,
      email: contractorData.email,
      username: contractorData.email.split('@')[0],
    };
  } catch (error) {
    console.error('Error creating client account:', error);
    throw error;
  } finally {
    if (secondaryApp) {
      await deleteApp(secondaryApp);
    }
  }
};
