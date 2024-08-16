import { collection, doc, query, where } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';
import invoiceConverter from './converter';

const refCode = REF_CODE_TYPES.INVOICES;

const getInvoicesListRef = (date, docType) => {
  let ref = collection(...getRef(refCode, date)).withConverter(
    invoiceConverter
  );

  if (docType) {
    ref = query(ref, where('docType', '==', docType));
  }

  return ref;
};

const getInvoiceDocRef = (date, id) => {
  return doc(...getRef(refCode, date), id).withConverter(invoiceConverter);
};

export { getInvoicesListRef, getInvoiceDocRef, refCode };
