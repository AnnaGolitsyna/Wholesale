// import { getDoc, setDoc, increment, updateDoc } from 'firebase/firestore';
// import { getReceivableDocRef } from './firebaseRefs';
// import { getShortDateFormat } from '../../../utils/dateUtils';
// const addTransactionIntoReceivable = async (value) => {
//   const userId = await value.name.value;
//   const transactionDocRef = getReceivableDocRef(userId);
//   const transactionDocSnap = await getDoc(transactionDocRef);
//   const date = await getShortDateFormat(value.date);

//   if (transactionDocSnap.exists()) {
//     await updateDoc(
//       transactionDocRef,
//       {
//         [value.type]: increment(value.sum),
//         count: increment(1),
//         lastTransaction: date,
//       },
//       { merge: true }
//     );
//   } else {
//     await setDoc(transactionDocRef, {
//       name: value.name,
//       debet: value.type === 'debet' ? value.sum : 0,
//       credit: value.type === 'credit' ? value.sum : 0,
//       count: 1,
//       lastTransaction: date,
//     });
//   }
// };

// const updateTransactionInReceivable = async (prevSum, value) => {
//   const userId = await value.name.value;
//   const transactionDocRef = getReceivableDocRef(userId);
//   const transactionDocSnap = await getDoc(transactionDocRef);
//   const difference = (await value.sum) - prevSum;
//   const date = await getShortDateFormat(value.date);

//   if (transactionDocSnap.exists()) {
//     await updateDoc(transactionDocRef, {
//       [value.type]: increment(difference),
//       count: increment(0), // This ensures the count doesn't change
//       lastTransaction: date,
//     });
//   } else {
//     throw new Error('No such company receivable!');
//   }
// };

// const deleteTransactionInReceivable = async (value) => {
//   const userId = await value.name.value;
//   const transactionDocRef = getReceivableDocRef(userId);
//   const transactionDocSnap = await getDoc(transactionDocRef);

//   if (transactionDocSnap.exists()) {
//     await updateDoc(transactionDocRef, {
//       [value.type]: increment(value.sum * -1),
//       count: increment(-1),
//     });
//   } else {
//     throw new Error('No such company receivable!');
//   }
// };

// export {
//   addTransactionIntoReceivable,
//   updateTransactionInReceivable,
//   deleteTransactionInReceivable,
// };
import { getDoc, setDoc, increment, updateDoc } from 'firebase/firestore';
import { getReceivableDocRef } from './firebaseRefs';
import { getShortDateFormat } from '../../../utils/dateUtils';

const OPERATION_TYPES = {
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
};

const TRANSACTION_TYPES = {
  DEBET: 'debet',
  CREDIT: 'credit',
};

const handleTransactionInReceivable = async (
  value,
  operationType,
  prevSum = 0
) => {
  const userId = value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);
  const date = await getShortDateFormat(value.date);

  if (!transactionDocSnap.exists() && operationType !== OPERATION_TYPES.ADD) {
    throw new Error('No such company receivable!');
  }

  const updates = {
    [value.type]: increment(calculateSumChange(value, operationType, prevSum)),
    count: increment(getCountIncrement(operationType)),
    lastTransaction: date,
  };

  if (transactionDocSnap.exists()) {
    await updateDoc(transactionDocRef, updates);
  } else {
    await setDoc(transactionDocRef, {
      name: value.name,
      [TRANSACTION_TYPES.DEBET]:
        value.type === TRANSACTION_TYPES.DEBET ? value.sum : 0,
      [TRANSACTION_TYPES.CREDIT]:
        value.type === TRANSACTION_TYPES.CREDIT ? value.sum : 0,
      ...updates,
    });
  }
};

const calculateSumChange = (value, operationType, prevSum) => {
  switch (operationType) {
    case OPERATION_TYPES.ADD:
      return value.sum;
    case OPERATION_TYPES.UPDATE:
      return value.sum - prevSum;
    case OPERATION_TYPES.DELETE:
      return -value.sum;
    default:
      throw new Error(`Invalid operation type: ${operationType}`);
  }
};

const getCountIncrement = (operationType) => {
  switch (operationType) {
    case OPERATION_TYPES.ADD:
      return 1;
    case OPERATION_TYPES.UPDATE:
      return 0;
    case OPERATION_TYPES.DELETE:
      return -1;
    default:
      throw new Error(`Invalid operation type: ${operationType}`);
  }
};

export const addTransactionIntoReceivable = (value) =>
  handleTransactionInReceivable(value, OPERATION_TYPES.ADD);

export const updateTransactionInReceivable = (prevSum, value) =>
  handleTransactionInReceivable(value, OPERATION_TYPES.UPDATE, prevSum);

export const deleteTransactionInReceivable = (value) =>
  handleTransactionInReceivable(value, OPERATION_TYPES.DELETE);
