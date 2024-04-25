import { doc } from 'firebase/firestore';
import { getShortMonthFormat } from '../../../utils/dateUtils';
import { db } from '../../../config/firestore';
import { docNumConverter } from './converter';

export const getNumberingDocRef = (docCode, date) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');

  return doc(
    db,
    'balanutsa',
    'docNumbering',
    year,
    month,
    docCode,
    'doc'
  ).withConverter(docNumConverter);
};
