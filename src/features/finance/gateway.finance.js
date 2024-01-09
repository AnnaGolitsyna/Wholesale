import { collection, getDocs, addDoc } from 'firebase/firestore';
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
  const docRef = await addDoc(collection(db, 'payments'), {
    ...value,
    date: formattedDate,
  });
  console.log('Document written with ID: ', docRef.id);
};

export { fetchPaimentsList, createPayment };
