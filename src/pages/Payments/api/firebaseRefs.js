import { collection, doc } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import paymentConverter from './converter';


const refCode = 'payments';

const getPaymentsListRef = (date) => {
  return collection(...getRef(refCode, date)).withConverter(paymentConverter);
};

const getPaymentsDocRef = (date, id) => {
  return doc(...getRef(refCode, date), id).withConverter(paymentConverter);
};

export { getPaymentsListRef, getPaymentsDocRef, refCode };
