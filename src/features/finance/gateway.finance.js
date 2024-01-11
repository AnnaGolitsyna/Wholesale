import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  getDoc,
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
    const docRef = doc(db, 'payments', id);
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

const updatePayment = async (value, id) => {
  try {
     const docRef = doc(db, 'payments', id);
     const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const formattedDate = value.date.format('YYYY-MM-DD');

        await setDoc(docRef, {
          ...value,
          date: formattedDate,
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

export { fetchPaymentsList, createPayment, deletePayment, updatePayment };
