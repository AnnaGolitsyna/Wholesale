import { collection, doc, query, where } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';
import receivableConverter from './converter';

const refCode = REF_CODE_TYPES.RECEIVABLES;

const getReceivableDocRef = (userId) => {
  return doc(...getRef(refCode), userId).withConverter(receivableConverter);
};

const getReceivableListRef = () => {
  return collection(...getRef(refCode));
};

export { getReceivableDocRef, getReceivableListRef };
