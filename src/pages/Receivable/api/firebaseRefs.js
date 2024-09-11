import { collection, doc, query, where } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';


const refCode = REF_CODE_TYPES.RECEIVABLES;

const getReceivableDocRef = (userId) => {
  return doc(...getRef(refCode), userId);
};

const getReceivableListRef = () => {
  return collection(...getRef(refCode));
};

export { getReceivableDocRef, getReceivableListRef };
