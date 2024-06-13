import { collection, doc } from 'firebase/firestore';
import { db } from '../../../api/firestore';
import paymentConverter from './converter';
import { getShortMonthFormat } from '../../../utils/dateUtils';

const refCode = 'payments';
const getPaymentsListRef = (date) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');
  return collection(
    db,
    'balanutsa',
    'transactions',
    refCode,
    year,
    month
  ).withConverter(paymentConverter);
};

const getPaymentsDocRef = (date, id) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');

  return doc(
    db,
    'balanutsa',
    'transactions',
    refCode,
    year,
    month,
    id
  ).withConverter(paymentConverter);
};

export { getPaymentsListRef, getPaymentsDocRef, refCode };
