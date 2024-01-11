import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../config/firestore';

const fetchPaymentsList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'payments'));
    return querySnapshot.docs.map((el) => ({
      ...el.data(),
      key: el.id,
    }));
  } catch (error) {
    console.error('Error fetching payList from Firebase:', error);
    throw new Error('Error fetching payList:', error);
  }
};

const createPayment = async (value) => {
  try {
    const formattedDate = value.date.format('YYYY-MM-DD');
    await addDoc(collection(db, 'payments'), {
      ...value,
      date: formattedDate,
    });
  } catch (error) {
    console.error('Error creating payment from Firebase:', error);
    throw new Error('Error creating payment:', error);
  }
};

const deletePayment = async (id) => {
  try {
    await deleteDoc(doc(db, 'payments', id));
  } catch (error) {
    console.error('Error deleting payment from Firebase:', error);
    throw new Error('Error deleting payment:', error);
  }
};

const updatePayment = async (value, id) => {
  try {
    const formattedDate = value.date.format('YYYY-MM-DD');

    await setDoc(doc(db, 'payments', id), {
      ...value,
      date: formattedDate,
    });
  } catch (error) {
    console.error('Error updating payment from Firebase:', error);
    throw new Error('Error updating payment:', error);
  }
};

export { fetchPaymentsList, createPayment, deletePayment, updatePayment };
