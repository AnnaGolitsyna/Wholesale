import { db } from './firestore';
import { getShortMonthFormat } from '../utils/dateUtils';

const getRef = (refCode, date) => {
  if (!date) {
    return [db, 'balanutsa', 'transactions', refCode];
  } else {
    const formattedDate = getShortMonthFormat(date);
    const [year, month] = formattedDate.split('-');
    return [db, 'balanutsa', 'transactions', year, month, refCode];
  }
};


export { getRef };
