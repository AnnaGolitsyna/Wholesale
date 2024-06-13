import { collection, doc, query, where } from 'firebase/firestore';
import {getRef} from '../../../api/getRef';
import invoiceConverter from './converter';


const refCode = 'invoices';

const getInvoicesListRef = (date, docType) => {
  let ref = collection(...getRef(date, refCode)).withConverter(invoiceConverter);

  if (docType) {
    ref = query(ref, where('docType', '==', docType));
  }

  return ref;
};

const getInvoiceDocRef = (date, id) => {
  return doc(...getRef(date, refCode), id).withConverter(invoiceConverter);
};

export { getInvoicesListRef, getInvoiceDocRef, refCode };
