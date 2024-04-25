import { getDoc, setDoc, doc } from 'firebase/firestore';
import { getShortMonthFormat } from '../../../utils/dateUtils';
import { db } from '../../../config/firestore';

const docNumConverter = {
  toFirestore(value) {
    return { ...value };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    const { number } = data;
    return number;
  },
};

const getNumberingDocRef = (date) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');

  return doc(
    db,
    'balanutsa',
    'docNumbering',
    year,
    month,
    'payments',
    'doc'
  ).withConverter(docNumConverter);
};

const formattedNumber = (docCode, value) => {
  return `${docCode}-${value.toString().padStart(3, '0')}`;
};

const getDocNumber = async (docCode, date) => {
  try {
    const docRef = getNumberingDocRef(date);
    const prevDocNum = (await getDoc(docRef)).data() || 0;
    const newDocNum = prevDocNum + 1;
    const formattedNewDocNum = formattedNumber(docCode, newDocNum);

    await setDoc(docRef, {
      number: newDocNum,
    });
    return formattedNewDocNum;
  } catch (error) {
    console.error(
      'Error creating docNumber from Firebase:',
      error.code,
      error.message
    );
  throw new Error('Error creating docNumber from Firebase:', error);
  }
};

export { getDocNumber };
