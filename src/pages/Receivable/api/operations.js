import { getDoc, setDoc, increment, updateDoc } from 'firebase/firestore';
import { getReceivableDocRef } from './firebaseRefs';
import { getShortDateFormat } from '../../../utils/dateUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';
import { FETCH_TYPES } from '../../../constants/fetchTypes';

const handleTransactionInReceivable = async (
  value,
  operationType,
  prevSum = 0
) => {
  const userId = await value.name.value;
  const transactionDocRef = getReceivableDocRef(userId);
  const transactionDocSnap = await getDoc(transactionDocRef);
  const date = getShortDateFormat(value.date);

  if (!transactionDocSnap.exists() && operationType !== FETCH_TYPES.ADD) {
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
      [OPERATION_TYPES.DEBET]:
        value.type === OPERATION_TYPES.DEBET ? value.sum : 0,
      [OPERATION_TYPES.CREDIT]:
        value.type === OPERATION_TYPES.CREDIT ? value.sum : 0,
      ...updates,
    });
  }
};

const calculateSumChange = (value, operationType, prevSum) => {
  switch (operationType) {
    case FETCH_TYPES.ADD:
      return value.sum;
    case FETCH_TYPES.UPDATE:
      return value.sum - prevSum;
    case FETCH_TYPES.DELETE:
      return -value.sum;
    default:
      throw new Error(`Invalid operation type: ${operationType}`);
  }
};

const getCountIncrement = (operationType) => {
  switch (operationType) {
    case FETCH_TYPES.ADD:
      return 1;
    case FETCH_TYPES.UPDATE:
      return 0;
    case FETCH_TYPES.DELETE:
      return -1;
    default:
      throw new Error(`Invalid operation type: ${operationType}`);
  }
};


export const addTransactionIntoReceivable = (value) =>
  handleTransactionInReceivable(value, FETCH_TYPES.ADD);

export const updateTransactionInReceivable = (prevSum, value) =>
  handleTransactionInReceivable(value, FETCH_TYPES.UPDATE, prevSum);

export const deleteTransactionInReceivable = (value) =>
  handleTransactionInReceivable(value, FETCH_TYPES.DELETE);

export const updateHistoryReceivable = async (userId, historyList) => {
  const receivableDocRef = getReceivableDocRef(userId);
  const receivableDocSnap = await getDoc(receivableDocRef);

  if (!receivableDocSnap.exists()) {
    throw new Error('No such company receivable!');
  }

  await updateDoc(receivableDocRef, {
    historyList: historyList,
  });
};