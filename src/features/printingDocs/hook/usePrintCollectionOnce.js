import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { Form } from 'antd';
import useInvoiceStyleByType from '../../../hook/useInvoiceStyleByType';
import { parsePriceListData } from '../utils/parsePriceListData';
import { getRef } from '../api/getRef';
import { useGetGoodsListQuery } from '../../../pages/Goods';
import { parseInvoiceData } from '../utils/parseInvoiceData';

const usePrintCollectionOnce = (type, data) => {
 // const form = Form.useFormInstance();
  const ref = getRef(type);
  const [snapshot, loading, error] = useCollectionOnce(ref);
  const { modalDetails } = useInvoiceStyleByType();

  // // Always call useGetGoodsListQuery, but use its result only if type === 'priceList'
  // const goodsListQuery = useGetGoodsListQuery(true);
  const isPriceList = type === 'priceList';

  // const data = isPriceList
  //   ? goodsListQuery.data || []
  //   : form.getFieldsValue('Invoice') || [];
  // const isLoading = isPriceList ? goodsListQuery.isLoading : false;
  // const isError = isPriceList ? goodsListQuery.isError : false;

  if (loading) return { loading };
  if (error) return { error };

  try {
    if (snapshot) {
      const templateFields = snapshot.docs.reduce((acc, doc) => {
        return { ...acc, [doc.id]: doc.data() };
      }, {});

     // return parsePriceListData(templateFields);

      return isPriceList
        ? parsePriceListData(templateFields)
        : { ...parseInvoiceData(templateFields, modalDetails, data) };
    }
  } catch (err) {
    console.log('err', err);
    throw new Error('failed to get data', err);
  }
  // const { data = [], isLoading, isError } = useGetGoodsListQuery(true);
  // const form = Form.useFormInstance();
  // const ref = getRef(type);
  // const [snapshot, loading, error] = useCollectionOnce(ref);
  // const { modalDetails } = useInvoiceStyleByType();
  // //const data = form.getFieldsValue('Invoice') || [];

  // //  console.log('data', data, modalDetails[data.type].titleToPrint);
  // console.log('use', type);

  // if (loading) return { loading };
  // if (error) return { error };

  // console.log('use', type);

  // if (loading || isLoading) return { loading: true };
  // if (error || isError) return { error: error || isError };

  // try {
  //   if (snapshot) {
  //     const templateFields = snapshot.docs.reduce((acc, doc) => {
  //       return { ...acc, [doc.id]: doc.data() };
  //     }, {});
  //     return type === 'priceList'
  //       ? { ...parsePriceListData(templateFields), data }
  //       : { ...parseInvoiceData(templateFields, modalDetails, data) };
  //   }
  // } catch (err) {
  //   console.log('err', err);
  //   throw new Error('failed to get data', err);
  // }
};

export default usePrintCollectionOnce;
