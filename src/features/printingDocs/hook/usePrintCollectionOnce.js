import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { Form } from 'antd';
import useInvoiceStyleByType from '../../../hook/useInvoiceStyleByType';
import { parsePriceListData } from '../utils/parsePriceListData';
import { getRef } from '../api/getRef';
import { useGetGoodsListQuery } from '../../../pages/Goods';

const usePrintCollectionOnce = (type) => {
  const { data = [], isLoading, isError } = useGetGoodsListQuery(true);
  const form = Form.useFormInstance();
  const ref = getRef(type);
  const [snapshot, loading, error] = useCollectionOnce(ref);
  const { modalDetails } = useInvoiceStyleByType();
  //  const data = form.getFieldsValue('Invoice') || [];

  //  console.log('data', data, modalDetails[data.type].titleToPrint);
  console.log('use', type);

  if (loading) return { loading };
  if (error) return { error };

  try {
    if (snapshot) {
      const templateFields = snapshot.docs.reduce((acc, doc) => {
        return { ...acc, [doc.id]: doc.data() };
      }, {});
      return { ...parsePriceListData(templateFields), data };
    }
  } catch (err) {
    console.log('err', err);
    throw new Error('failed to get data', err);
  }
};

export default usePrintCollectionOnce;
