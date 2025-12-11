import { collection, doc } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';
import transferConverter from './transfers_converter';

const refCode = REF_CODE_TYPES.TRANSFERS;

// Use converter to properly handle document IDs
const getTransfersListRef = (date) => {
  return collection(...getRef(refCode, date)).withConverter(transferConverter);
};

const getTransfersDocRef = (date, id) => {
  return doc(...getRef(refCode, date), id).withConverter(transferConverter);
};

export { getTransfersListRef, getTransfersDocRef, refCode };
