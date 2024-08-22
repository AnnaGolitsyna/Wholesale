import { addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getPaymentsListRef, getPaymentsDocRef } from './firebaseRefs';
import { refCode } from './firebaseRefs';
import { getDocNumber } from '../../../features/docNumbering';
import {
  addTransactionIntoReceivable,
  updateTransactionInReceivable,
  deleteTransactionInReceivable,
} from '../../Receivable';

const createPayment = async (value) => {
  try {
    const docNumber = await getDocNumber(refCode, value.date);
    await addDoc(getPaymentsListRef(value.date), {
      ...value,
      docNumber,
      docType: refCode,
    });

    await addTransactionIntoReceivable(value);
  } catch (error) {
    console.error('Error creating payment from Firebase:', error);
    throw new Error('Error creating payment from Firebase:', error);
  }
};

const updatePayment = async (value) => {
  try {
    const docRef = getPaymentsDocRef(value.date, value.id);
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
    console.error('Error updating payment from Firebase:', error);
    throw new Error('Error updating payment from Firebase:', error);
  }
};

const deletePayment = async (value) => {
  try {
    const docRef = getPaymentsDocRef(value.date, value.id);
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
    console.error('Error deleting payment from Firebase:', error);
    throw new Error('Error deleting payment from Firebase:', error);
  }
};

export { createPayment, updatePayment, deletePayment };
