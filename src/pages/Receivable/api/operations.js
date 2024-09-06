import {
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  increment,
  updateDoc,
} from 'firebase/firestore';
import { getReceivableDocRef } from './firebaseRefs';
import { getShortDateFormat } from '../../../utils/dateUtils';
const addTransactionIntoReceivable = async (value) => {
  const userId = await value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);
console.log('value', value);


  if (transactionDocSnap.exists()) {
    await updateDoc(
      transactionDocRef,
      {
        [value.type]: increment(value.sum),
        count: increment(1),
        lastTransaction: value.date,
      },
      { merge: true }
    );
  } else {
    await setDoc(transactionDocRef, {
      name: value.name,
      debet: value.type === 'debet' ? value.sum : 0,
      credit: value.type === 'credit' ? value.sum : 0,
      count: 1,
      lastTransaction: value.date,
    });
  }
};

const updateTransactionInReceivable = async (prevSum, value) => {
  const userId = await value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);
  const difference = (await value.sum) - prevSum;

  if (transactionDocSnap.exists()) {
    await updateDoc(transactionDocRef, {
      [value.type]: increment(difference),
      count: increment(0), // This ensures the count doesn't change
    });
  } else {
    throw new Error('No such company receivable!');
  }
};

const deleteTransactionInReceivable = async (value) => {
  const userId = await value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);

  if (transactionDocSnap.exists()) {
    await updateDoc(transactionDocRef, {
      [value.type]: increment(value.sum * -1),
      count: increment(-1),
    });
  } else {
    throw new Error('No such company receivable!');
  }
};

export {
  addTransactionIntoReceivable,
  updateTransactionInReceivable,
  deleteTransactionInReceivable,
};
