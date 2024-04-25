import { addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getPaymentsListRef, getPaymentsDocRef } from './firebaseRefs';
import { getDocNumber } from '../../../features/docNumbering';

const createPayment = async (value) => {
  try {
    const docCode = 'payments';
    const docNumber = await getDocNumber(docCode, value.date);
    await addDoc(getPaymentsListRef(value.date), {
      ...value,
      docNumber,
    });
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
