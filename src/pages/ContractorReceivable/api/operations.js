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
import { operationTypes } from '../../../constants/operationTypes';
import { getTransactionsListByIdRef } from './firebaseRefs';

const getContractorReceivableData = async (id) => {
  try {
    const receivableDocRef = getReceivableDocRef(id);
    const receivableDocSnap = await getDoc(receivableDocRef);

    if (receivableDocSnap.exists()) {
      const receivableData = receivableDocSnap.data();
      //console.log('receivableData', receivableData);
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

// getTransactionsDataByIdAndRange
// input: period,id
// use getMonthsInRange(period)
// Promise.all
// maping months and fetching data by month, id
// output: transactions[]

// getTransactionsDataByIdAndMonth

const getTransactionsDataById = async (id) => {
  const results = [];

  try {
    const invoicesQuery = getTransactionsListByIdRef('invoices', '2024-07', id);
    const paymentsQuery = getTransactionsListByIdRef('payments', '2024-07', id);

    const [invoicesSnapshot, paymentsSnapshot] = await Promise.all([
      getDocs(invoicesQuery),
      getDocs(paymentsQuery),
    ]);

    invoicesSnapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });

    paymentsSnapshot.forEach((doc) => {
      const newData = {
        ...doc.data(),
        id: doc.id,
        docType: 'payments',
      };
      results.push(newData);
    });

    return results.map((el) => {
      return {
        ...el,
        label: operationTypes[el.docType][el.type].text,
      };
    });
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    throw error;
  }
};

export { getContractorReceivableData, getTransactionsDataById };
