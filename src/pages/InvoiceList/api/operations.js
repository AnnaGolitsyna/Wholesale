import {
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { getInvoicesListRef, getInvoiceDocRef, refCode } from './firebaseRefs';
import { getDocNumber } from '../../../features/docNumbering';
import { addTransactionIntoReceivable } from '../../Receivable';

const createInvoice = async (value) => {
  try {
    const docNumber = await getDocNumber(refCode, value.date);
    // await console.log('operations', value);
    await addDoc(getInvoicesListRef(value.date), {
      ...value,
      docNumber,
    });

    await addTransactionIntoReceivable(value);
    
  } catch (error) {
    console.error('Error creating an invoice from Firebase:', error);
    throw new Error('Error creating an invoice from Firebase:' + error.message);
  }
};

const updateInvoice = async (value) => {
  try {
    const docRef = getInvoiceDocRef(value.date, value.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setDoc(docRef, {
        ...value,
      });
    } else {
      throw new Error(
        'No such document! Документ не найден, проверьте правильность выполнения запроса!'
      );
    }
  } catch (error) {
    console.error('Error updating an invoice from Firebase:', error);
    throw new Error('Error updating an invoice from Firebase:', error);
  }
};

const deleteInvoice = async (value) => {
  try {
    const docRef = getInvoiceDocRef(value.date, value.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
    } else {
      throw new Error(
        'No such document! Документ не найден, проверьте правильность выполнения запроса!'
      );
    }
  } catch (error) {
    console.error('Error deleting an invoice from Firebase:', error);
    throw new Error('Error deleting an invoice from Firebase:', error);
  }
};

export { createInvoice, updateInvoice, deleteInvoice };
