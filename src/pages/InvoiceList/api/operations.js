import { addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getInvoicesListRef, getInvoiceDocRef, refCode } from './firebaseRefs';
import { getDocNumber } from '../../../features/docNumbering';
import {
  addTransactionIntoReceivable,
  updateTransactionInReceivable,
  deleteTransactionInReceivable,
} from '../../Receivable';
import invoiceConverter from './converter';
import { getShortDateFormat } from '../../../utils/dateUtils';

const createInvoice = async (value) => {
  try {
    const docNumber = await getDocNumber(refCode, value.date);

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
      const prevData = docSnap.data();
      const prevSum = prevData.sum;

      await updateTransactionInReceivable(prevSum, value);
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
      await deleteTransactionInReceivable(value);
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
