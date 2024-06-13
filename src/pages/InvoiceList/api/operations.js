import { addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { getInvoicesListRef, getInvoiceDocRef, refCode } from './firebaseRefs';
import { getDocNumber } from '../../../features/docNumbering';
//import { refCode } from './firebaseRefs';

const createInvoice = async (value) => {
  try {
    const docNumber = await getDocNumber(refCode, value.date);
    await addDoc(getInvoicesListRef(value.date), {
      ...value,
      docNumber,
    });
  } catch (error) {
    console.error('Error creating payment from Firebase:', error);
    throw new Error('Error creating payment from Firebase:', error);
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
    console.error('Error updating payment from Firebase:', error);
    throw new Error('Error updating payment from Firebase:', error);
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
    console.error('Error deleting payment from Firebase:', error);
    throw new Error('Error deleting payment from Firebase:', error);
  }
};

export { createInvoice, updateInvoice, deleteInvoice };
