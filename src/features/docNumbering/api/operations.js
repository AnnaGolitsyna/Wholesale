import { addDoc, getDoc, setDoc, collection, doc } from 'firebase/firestore';
import { getShortMonthFormat } from '../../../utils/dateUtils';
import { db } from '../../../config/firestore';

const docNumConverter = {
    toFirestore(value) {
      return { ...value };
    },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    const { number } = data;
    console.log(data, number);
    return number;
    // return {
    //   ...data,
    //   id: snapshot.id,
    //   key: snapshot.id,
    // };
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

const formattedNumber = (value) => {
  return `P-${value.toString().padStart(3, '0')}`;
};

// const setDocNumber = async (value) => {
//   try {
//     const formattedDate = value.date.format('YYYY-MM-DD');
//     await addDoc(getNumberingDocRef(formattedDate), {
//       number: value.docNumber,
//     });
//   } catch (error) {
//     console.error('Error creating payment from Firebase:', error);
//     throw new Error('Error creating payment:', error);
//   }
// };

const getDocNumber = async (date) => {
  try {
    const docRef = getNumberingDocRef(date);

    const prevDocNum = (await getDoc(docRef)).data() || 0;
    const newDocNum = formattedNumber(prevDocNum + 1);
    console.log('prevDocNum', prevDocNum, newDocNum);
    await setDoc(docRef, {
      number: prevDocNum + 1,
    });
    return newDocNum;
  } catch (error) {
    console.error('Error updating payment from Firebase:', error);
    throw error;
  }
};

export { getDocNumber };
