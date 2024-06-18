import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { Form } from 'antd';
import { collection } from 'firebase/firestore';
import { db } from '../../../api/firestore';
import parseDataFromSnapshot from './parseDataFromSnapshot';
import  useInvoiceStyleByType  from '../../../hook/useInvoiceStyleByType';

const usePrintCollectionOnce = (type) => {
  const form = Form.useFormInstance();
  const ref = collection(db, 'balanutsa', 'dataToPrint', type);
  const [snapshot, loading, error] = useCollectionOnce(ref);
  const { modalDetails } = useInvoiceStyleByType();
  const data = form.getFieldsValue('Invoice') || [];

  console.log('data', data, modalDetails[data.type].titleToPrint);

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
