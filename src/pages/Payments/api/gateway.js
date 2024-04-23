import { collection } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import {getShortMonthFormat} from '../../../utils/dateUtils';

const postConverter = {
  //   toFirestore(post) {
  //     return { author: post.author, title: post.title };
  //   },
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
    return collection(db, 'balanutsa', 'transactions', 'payments', year, month).withConverter(postConverter);
}

const paymentsListRef = collection(
  db,
  'balanutsa',
  'transactions',
  'payments',
  '2024',
  '04'
).withConverter(postConverter);

export { getPaymentsListRef, paymentsListRef };


