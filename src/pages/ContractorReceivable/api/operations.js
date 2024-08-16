import {
  getDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from 'firebase/firestore';
import { getReceivableDocRef } from '../../Receivable';
import { getRef } from '../../../api/getRef';
import { REF_CODE_TYPES } from '../../../api/refCodeTypes';
import { operationTypes } from '../../../constants/operationTypes';
import { getTransactionsListByIdRef } from './firebaseRefs';
import { getMonthsInRange } from '../../../utils/dateUtils';

const getContractorReceivableData = async (id) => {
  try {
    const receivableDocRef = getReceivableDocRef(id);
    const receivableDocSnap = await getDoc(receivableDocRef);

    if (receivableDocSnap.exists()) {
      const receivableData = receivableDocSnap.data();

      return {
        ...receivableData,
        receivable: receivableData.debet - receivableData.credit,
        name: receivableData.name.label,
      };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting receivable data:', error);
    throw error;
  }
};

const getTransactionsDataByIdAndMonth = async (id, month) => {
  try {
    const [invoicesSnapshot, paymentsSnapshot] = await Promise.all([
      getDocs(getTransactionsListByIdRef(REF_CODE_TYPES.INVOICES, month, id)),
      getDocs(getTransactionsListByIdRef(REF_CODE_TYPES.PAYMENTS, month, id)),
    ]);

    const combinedSnapshots = [
      ...invoicesSnapshot.docs,
      ...paymentsSnapshot.docs,
    ].map((doc) => {
      const data = doc.data();

      return {
        ...data,
        id: doc.id,
        label:
          operationTypes[data.docType][data.type]?.text || 'Unknown Operation',
      };
    });

    return combinedSnapshots;
  } catch (error) {
    console.error('Error fetching transaction data in the month:', error);
    throw error;
  }
};

// getTransactionsDataByIdAndRange
// input: period,id
// use getMonthsInRange(period)
// Promise.all
// maping months and fetching data by month, id
// output: transactions[]

const getTransactionsDataByIdAndRange = async (period, id) => {
  const months = getMonthsInRange(period);
  const transactions = await Promise.allSettled(
    months.map((month) => getTransactionsDataByIdAndMonth(id, month))
  );
  // Extract successful results
  const successfulResults = transactions
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value);

  // Optionally, handle rejected promises (log errors, etc.)
  const errors = transactions
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);

  if (errors.length) {
    console.error('Some transactions failed to fetch:', errors);
  }

  return successfulResults;
};




///////////////////

const getTransactionsDataById = async (id) => {
  try {
    const [invoicesSnapshot, paymentsSnapshot] = await Promise.all([
      getDocs(
        getTransactionsListByIdRef(REF_CODE_TYPES.INVOICES, '2024-07', id)
      ),
      getDocs(
        getTransactionsListByIdRef(REF_CODE_TYPES.PAYMENTS, '2024-07', id)
      ),
    ]);

    const combinedSnapshots = [
      ...invoicesSnapshot.docs,
      ...paymentsSnapshot.docs,
    ].map((doc) => {
      const data = doc.data();

      return {
        ...data,
        id: doc.id,
        label:
          operationTypes[data.docType][data.type]?.text || 'Unknown Operation',
      };
    });

    return combinedSnapshots;
  } catch (error) {
    console.error('Error fetching transaction data in the month:', error);
    throw error;
  }
  // const results = [];

  // try {
  //   const invoicesQuery = getTransactionsListByIdRef(
  //     REF_CODE_TYPES.INVOICES,
  //     '2024-07',
  //     id
  //   );
  //   const paymentsQuery = getTransactionsListByIdRef(
  //     REF_CODE_TYPES.PAYMENTS,
  //     '2024-08',
  //     id
  //   );

  //   const [invoicesSnapshot, paymentsSnapshot] = await Promise.all([
  //     getDocs(invoicesQuery),
  //     getDocs(paymentsQuery),
  //   ]);

  //   invoicesSnapshot.forEach((doc) => {
  //     results.push({ ...doc.data(), id: doc.id });
  //   });

  //   paymentsSnapshot.forEach((doc) => {
  //     const newData = {
  //       ...doc.data(),
  //       id: doc.id,
  //       docType: 'payments',
  //     };
  //     results.push(newData);
  //   });

  //   return results.map((el) => {
  //     return {
  //       ...el,
  //       label: operationTypes[el.docType][el.type].text,
  //     };
  //   });
  // } catch (error) {
  //   console.error('Error fetching transaction data:', error);
  //   throw error;
  // }
};

export {
  getContractorReceivableData,
  getTransactionsDataById,
  getTransactionsDataByIdAndRange,
};
