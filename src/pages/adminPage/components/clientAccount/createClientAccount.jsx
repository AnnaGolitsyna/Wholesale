import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../api/firestore';

export const createClientAccount = async (contractorId, password) => {
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

    // Step 2: Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
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
  }
};
