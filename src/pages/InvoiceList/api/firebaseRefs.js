import { collection, doc, query, where } from 'firebase/firestore';
import { db } from '../../../api/firestore';
import {getRef} from '../../../api/getRef';
import invoiceConverter from './converter';
import { getShortMonthFormat } from '../../../utils/dateUtils';

const refCode = 'invoices';
// const getRef = (date) => {
//   const formattedDate = getShortMonthFormat(date);
//   const [year, month] = formattedDate.split('-');
//   return [db, 'balanutsa', 'transactions', year, month, refCode];
// };
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
