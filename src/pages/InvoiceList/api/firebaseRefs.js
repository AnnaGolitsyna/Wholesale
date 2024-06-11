import { collection, doc } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import paymentConverter from './converter';
import { getShortMonthFormat } from '../../../utils/dateUtils';

const refCode = 'invoices';
const getRefCollection = (year, month) => {
  return collection(db, 'balanutsa', 'transactions', year, refCode, month);
};
const getInvoicesListRef = (date) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');
  return collection(getRefCollection(year, month)).withConverter(
    paymentConverter
  );
};

const getInvoiceDocRef = (date, id) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');

  return doc(getRefCollection(year, month), id).withConverter(paymentConverter);
};

export { getInvoicesListRef, getInvoiceDocRef, refCode };
