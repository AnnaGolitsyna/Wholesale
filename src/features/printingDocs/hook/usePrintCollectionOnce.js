import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { getRef } from '../api/getRef';
import useInvoiceStyleByType from '../../../hook/useInvoiceStyleByType';
import { parsePriceListData } from '../utils/parsePriceListData';
import { parseInvoiceData } from '../utils/parseInvoiceData';

const usePrintCollectionOnce = (type, data) => {
  const ref = getRef(type);
  const [snapshot, loading, error] = useCollectionOnce(ref);
  const { modalDetails } = useInvoiceStyleByType();

  if (loading) return { loading };
  if (error) return { error };

  const isPriceList = type === 'priceList';

  try {
    if (snapshot) {
      const templateFields = snapshot.docs.reduce((acc, doc) => {
        return { ...acc, [doc.id]: doc.data() };
      }, {});

      return isPriceList
        ? parsePriceListData(templateFields)
        : { ...parseInvoiceData(templateFields, modalDetails, data) };
    }
  } catch (err) {
    console.log('err', err);
    throw new Error('failed to get data', err);
  }
};

export default usePrintCollectionOnce;
