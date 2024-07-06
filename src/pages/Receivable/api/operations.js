import {
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  increment,
} from 'firebase/firestore';
import { getReceivableDocRef } from './firebaseRefs';
const addTransactionIntoReceivable = async (value) => {
  const userId = await value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);

  if (transactionDocSnap.exists()) {
    await setDoc(
      transactionDocRef,
      { [value.type]: increment(value.sum) },
      { merge: true }
    );
  } else {
    await setDoc(transactionDocRef, {
      name: value.name,
      debet: value.type === 'debet' ? value.sum : 0,
      credit: value.type === 'credit' ? value.sum : 0,
    });
  }
};

export { addTransactionIntoReceivable };
