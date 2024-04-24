import { addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import {getPaymentsListRef, getPaymentsDocRef} from './firebaseRefs';

const createPayment = async (value) => {
  try {
    await addDoc(getPaymentsListRef(value.date), {
      ...value,
    });
  } catch (error) {
    console.error('Error creating payment from Firebase:', error);
    throw new Error('Error creating payment:', error);
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
    throw error;
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
    throw error;
  }
};



export { createPayment, updatePayment, deletePayment };
