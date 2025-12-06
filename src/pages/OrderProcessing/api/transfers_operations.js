import { addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {
  getTransfersListRef,
  getTransfersDocRef,
  refCode,
} from './transfers_firebaseRefs';

import { getDocNumber } from '../../../features/docNumbering';

const createTransfer = async (value) => {
  try {
    const docNumber = await getDocNumber(refCode, value.date);

    // ✅ Explicitly define only the fields we want to save - no spread operators
    const transferDocument = {
      date: value.date,
      timestamp: value.timestamp,
      contractor: value.contractor,
      items: value.items,
      docNumber,
      docType: refCode,
      scedule: value.scedule,
    };

    await addDoc(getTransfersListRef(value.date), transferDocument);

    // TODO: Add any additional operations needed after creating a transfer
    // For example, updating inventory or contractor records
  } catch (error) {
    console.error('Error creating transfer from Firebase:', error);
    throw new Error('Error creating transfer from Firebase:', error);
  }
};

const updateTransfer = async (value) => {
  try {
    const docRef = getTransfersDocRef(value.date, value.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const prevData = docSnap.data();

      console.log('updateTransfer', prevData);
      

      // Add validation logic if needed
      // For example, checking if certain fields shouldn't be changed

      await setDoc(docRef, {
        ...value,
      });

      // TODO: Add any additional operations needed after updating a transfer
      // For example, updating related records if contractor or items changed
    } else {
      throw new Error(
        'No such document! Документ не найден, проверьте правильность выполнения запроса!'
      );
    }
  } catch (error) {
    console.error('Error updating transfer from Firebase:', error);
    throw new Error(`Error updating transfer from Firebase: ${error.message}`);
  }
};

const deleteTransfer = async (value) => {
  try {
    const docRef = getTransfersDocRef(value.date, value.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // TODO: Add any cleanup operations before deleting
      // For example, reverting inventory changes

      await deleteDoc(docRef);
    } else {
      throw new Error(
        'No such document! Документ не найден, проверьте правильность выполнения запроса!'
      );
    }
  } catch (error) {
    console.error('Error deleting transfer from Firebase:', error);
    throw new Error('Error deleting transfer from Firebase:', error);
  }
};

export { createTransfer, updateTransfer, deleteTransfer };
