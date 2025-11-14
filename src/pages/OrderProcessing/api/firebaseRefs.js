import { collection, doc } from 'firebase/firestore';
import { getCatalogRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';
import productConverter from './converter';

const refCode = REF_CODE_TYPES.PRODUCTS_FOR_ORDERS;

/**
 * Get the products collection reference with converter
 * @returns {CollectionReference} Firestore collection reference
 */
const getProductsListRef = () => {
  return collection(...getCatalogRef(refCode)).withConverter(productConverter);
};

/**
 * Get a specific product document reference with converter
 * @param {string} id - Product document ID (value field)
 * @returns {DocumentReference} Firestore document reference
 */
const getProductDocRef = (id) => {
  return doc(...getCatalogRef(refCode), id).withConverter(productConverter);
};

export { getProductsListRef, getProductDocRef };
