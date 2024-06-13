import { collection, doc } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import paymentConverter from './converter';


const refCode = 'payments';

const getPaymentsListRef = (date) => {
  return collection(...getRef(date, refCode)).withConverter(paymentConverter);
};

const getPaymentsDocRef = (date, id) => {
  return doc(...getRef(date, refCode), id).withConverter(paymentConverter);
};

export { getPaymentsListRef, getPaymentsDocRef, refCode };
