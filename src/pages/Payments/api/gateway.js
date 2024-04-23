import { collection } from 'firebase/firestore';
import { db } from '../../../config/firestore';

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

export const paymentsListRef = collection(
  db,
  'balanutsa',
  'transactions',
  'payments',
  '2024',
  '04'
).withConverter(postConverter);;


