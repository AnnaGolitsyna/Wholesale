import { collection, doc } from 'firebase/firestore';
import { getCatalogRef } from '../../../../api/getRef';
import { REF_CODE_TYPES } from '../../../../api/refCodeTypes';
import contractorConverter from './converter';

const refCode = REF_CODE_TYPES.CONTRACTORS;

/**
 * Get the contractors collection reference with converter
 * @returns {CollectionReference} Firestore collection reference
 */
const getContractorsListRef = () => {
  return collection(...getCatalogRef(refCode)).withConverter(
    contractorConverter
  );
};

/**
 * Get a specific contractor document reference with converter
 * @param {string} id - Contractor document ID
 * @returns {DocumentReference} Firestore document reference
 */
const getContractorDocRef = (id) => {
  return doc(...getCatalogRef(refCode), id).withConverter(contractorConverter);
};

export { getContractorsListRef, getContractorDocRef };
