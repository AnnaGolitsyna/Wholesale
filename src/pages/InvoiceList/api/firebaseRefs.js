import { collection, doc } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import invoiceConverter from './converter';
import { getShortMonthFormat } from '../../../utils/dateUtils';

const refCode = 'invoices';
const getRefCollection = (year, month) => {
  return collection(db, 'balanutsa', 'transactions', year, refCode, month);
};
const getInvoicesListRef = (date, docType) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');
  console.log(
    'getInvoicesListRef',
    year,
    month,
    docType,
    `${refCode}_${docType}`
  );
  return collection(
    db,
    'balanutsa',
    'transactions',
    year,
    `${refCode}_${docType}`,
    month,

  ).withConverter(invoiceConverter);
};

const getInvoiceDocRef = (date, id) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');

  return doc(getRefCollection(year, month), id).withConverter(invoiceConverter);
};

export { getInvoicesListRef, getInvoiceDocRef, refCode };
