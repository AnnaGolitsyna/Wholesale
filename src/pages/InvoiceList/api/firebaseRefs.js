import { collection, doc, query, where } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import invoiceConverter from './converter';
import { getShortMonthFormat } from '../../../utils/dateUtils';

const refCode = 'invoices';
const getRef = (date) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');
  return [db, 'balanutsa', 'transactions', year, month, refCode];
};
const getInvoicesListRef = (date, docType) => {
  // const formattedDate = getShortMonthFormat(date);
  // const [year, month] = formattedDate.split('-');

  // let ref = collection(
  //   db,
  //   'balanutsa',
  //   'transactions',
  //   year,
  //   month,
  //   refCode
  // ).withConverter(invoiceConverter);
  let ref = collection(...getRef(date)).withConverter(invoiceConverter);

  if (docType) {
    ref = query(ref, where('docType', '==', docType));
  }

  return ref;
};

const getInvoiceDocRef = (date, id) => {
  // const formattedDate = getShortMonthFormat(date);
  // const [year, month] = formattedDate.split('-');

  return doc(...getRef(date), id).withConverter(invoiceConverter);
};

export { getInvoicesListRef, getInvoiceDocRef, refCode };
