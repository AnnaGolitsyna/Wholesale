import { collection, doc } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';

const refCode = REF_CODE_TYPES.TRANSFERS;

// ✅ No converter needed - we explicitly define our transfer data structure
const getTransfersListRef = (date) => {
  return collection(...getRef(refCode, date));
};

const getTransfersDocRef = (date, id) => {
  return doc(...getRef(refCode, date), id);
};

export { getTransfersListRef, getTransfersDocRef, refCode };
