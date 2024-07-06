import {
  collection,
  doc,
  query,
  where,

} from 'firebase/firestore';
import { getRef } from '../../../api/getRef';
import invoiceConverter from './converter';

const refCode = 'invoices';

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
