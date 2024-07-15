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
const addTransactionIntoReceivable = async (value) => {
  const userId = await value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);

  if (transactionDocSnap.exists()) {
    await updateDoc(
      transactionDocRef,
      { [value.type]: increment(value.sum), count: increment(1) },
      { merge: true }
    );
  } else {
    await setDoc(transactionDocRef, {
      name: value.name,
      debet: value.type === 'debet' ? value.sum : 0,
      credit: value.type === 'credit' ? value.sum : 0,
      count: 1,
    });
  }
};

const deleteTransactionInReceivable = async (value) => {
  
  const userId = await value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);

  if (transactionDocSnap.exists()) {

    await updateDoc(
      transactionDocRef,
      { [value.type]: increment(value.sum * -1), count: increment(-1) },

    );
  } else {
    throw new Error('No such company receivable!');
  }
};

export { addTransactionIntoReceivable, deleteTransactionInReceivable };
