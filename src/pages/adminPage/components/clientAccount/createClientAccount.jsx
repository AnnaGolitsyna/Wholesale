// For admin to create client accounts
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../api/firestore';

export const createClientAccount = async (contractorId, password) => {
  // Simple username format
  const username = `user${contractorId}`;
  const email = `${username}@client.local`;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    console.log(`Client account created: ${username}`);
    console.log(`Login: ${username}`);
    console.log(`Password: ${password}`);

    return userCredential;
  } catch (error) {
    console.error('Error creating client account:', error);
    throw error;
  }
};

// Example usage (in admin panel or console):
// createClientAccount('10', '12345');
// This creates: dybenko10@client.local with password 12345
// User logs in with: dybenko10 / 12345
