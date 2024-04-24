import { collection, addDoc, getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import {
  getShortMonthFormat,
  getShortDateFormat,
} from '../../../utils/dateUtils';

const paymentConverter = {
  toFirestore(value) {
    return { ...value, date: getShortDateFormat(value.date) };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot.id,
      key: snapshot.id,
    };
  },
};

const getPaymentsListRef = (date) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');
  // console.log('date', date, formattedDate, year, month);
  return collection(
    db,
    'balanutsa',
    'transactions',
    'payments',
    year,
    month
  ).withConverter(paymentConverter);
};

const createPayment = async (value) => {
  try {
    await addDoc(getPaymentsListRef(value.date), {
      ...value,
    });
  } catch (error) {
    console.error('Error creating payment from Firebase:', error);
    throw new Error('Error creating payment:', error);
  }
};

const getPaymentsDocRef = (date, id) => {
  const formattedDate = getShortMonthFormat(date);
  const [year, month] = formattedDate.split('-');

  console.log(
    'ref',
    doc(
      db,
      'balanutsa',
      'transactions',
      'payments',
      year,
      month,
      id
    ).withConverter(paymentConverter)
  );

  return doc(
    db,
    'balanutsa',
    'transactions',
    'payments',
    year,
    month,
    id
  ).withConverter(paymentConverter);
};
const updatePayment = async (value) => {
  try {
    const docRef = getPaymentsDocRef(value.date, value.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await setDoc(docRef, {
        ...value,
      });
    } else {
      throw new Error(
        'No such document! Документ не найден, проверьте правильность выполнения запроса!'
      );
    }
  } catch (error) {
    console.error('Error updating payment from Firebase:', error);
    throw error;
  }
};

// const paymentsListRef = collection(
//   db,
//   'balanutsa',
//   'transactions',
//   'payments',
//   '2024',
//   '04'
// ).withConverter(paymentConverter);

export { getPaymentsListRef, createPayment, updatePayment };
