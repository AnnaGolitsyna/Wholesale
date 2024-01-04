import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firestore';

const fetchPaimentsList = async () => {
  const querySnapshot = await getDocs(collection(db, 'payments'));
  return querySnapshot.docs.map((el) => ({
    ...el.data(),
    key: el.id,
  }));
};

export { fetchPaimentsList };
