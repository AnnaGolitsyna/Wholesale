import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import parseDataFromSnapshot from './parseDataFromSnapshot';

const usePrintCollectionOnce = (type) => {
  const priceListRef = collection(db, 'balanutsa', 'dataToPrint', type);
  const [snapshot, loading, error] = useCollectionOnce(priceListRef);

  if (loading) return { loading };
  if (error) return { error };

  try {
    if (snapshot) {
      return parseDataFromSnapshot(snapshot);
    }
  } catch (err) {
    console.log('err', err);
    throw new Error('failed to get data', err);
  }
};

export default usePrintCollectionOnce;
