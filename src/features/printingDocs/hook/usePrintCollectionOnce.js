import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { getRef } from '../api/getRef';
import useInvoiceStyleByType from '../../../hook/useInvoiceStyleByType';
import { PRINT_DATA_PARSERS } from '../constants/printDataParser';

const usePrintCollectionOnce = (type, data) => {
  const ref = getRef(type);
  const [snapshot, loading, error] = useCollectionOnce(ref);
  const { modalDetails } = useInvoiceStyleByType();

  if (loading) return { loading };
  if (error) return { error };

  try {
    if (snapshot) {
      const templateFields = snapshot.docs.reduce(
        (acc, doc) => ({
          ...acc,
          [doc.id]: doc.data(),
        }),
        {}
      );

      const parser = PRINT_DATA_PARSERS[type];
      return parser ? parser(templateFields, modalDetails, data) : {};
    }
  } catch (err) {
    console.error('Error parsing data:', err);
    throw new Error('Failed to get data', err);
  }
};

export default usePrintCollectionOnce;
