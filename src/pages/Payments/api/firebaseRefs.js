import { collection, doc } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';
import paymentConverter from './converter';


const refCode = REF_CODE_TYPES.PAYMENTS;

const getPaymentsListRef = (date) => {
  return collection(...getRef(refCode, date)).withConverter(paymentConverter);
};

const getPaymentsDocRef = (date, id) => {
  return doc(...getRef(refCode, date), id).withConverter(paymentConverter);
};

export { getPaymentsListRef, getPaymentsDocRef, refCode };
