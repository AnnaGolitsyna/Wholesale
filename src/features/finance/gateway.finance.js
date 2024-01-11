import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../config/firestore';

const fetchPaimentsList = async () => {
  const querySnapshot = await getDocs(collection(db, 'payments'));
  return querySnapshot.docs.map((el) => ({
    ...el.data(),
    key: el.id,
  }));
};

const createPayment = async (value) => {
  const formattedDate = value.date.format('YYYY-MM-DD');
  console.log('fetch', formattedDate);
  await addDoc(collection(db, 'payments'), {
    ...value,
    date: formattedDate,
  });
};

const deletePayment = async (id) => {
  await deleteDoc(doc(db, 'payments', id));
};

const updatePayment = async (id, value) => {
  const formattedDate = value.date.format('YYYY-MM-DD');
  console.log('upd', value);
  await setDoc(doc(db, 'payments', id), {
    ...value,
    date: formattedDate,
  });
};

export { fetchPaimentsList, createPayment, deletePayment, updatePayment };
