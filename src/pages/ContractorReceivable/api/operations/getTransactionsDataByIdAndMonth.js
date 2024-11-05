import { getDocs } from 'firebase/firestore';
import { REF_CODE_TYPES } from '../../../../api/refCodeTypes';
import { getTransactionsListByIdRef } from '../firebaseRefs';
import { operationTypes } from '../../../../constants/operationTypes';

const getTransactionsDataByIdAndMonth = async (id, month) => {
  try {
    const [invoicesSnapshot, paymentsSnapshot] = await Promise.all([
      getDocs(getTransactionsListByIdRef(REF_CODE_TYPES.INVOICES, month, id)),
      getDocs(getTransactionsListByIdRef(REF_CODE_TYPES.PAYMENTS, month, id)),
    ]);

    return [...invoicesSnapshot.docs, ...paymentsSnapshot.docs].map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        label:
          operationTypes[data.docType]?.[data.type]?.text ||
          'Unknown Operation',
        labelToPrint:
          operationTypes[data.docType]?.[data.type]?.textToPrint ||
          'Unknown Operation',
      };
    });
  } catch (error) {
    console.error(`Error fetching transaction data for month ${month}:`, error);
    throw error;
  }
};

export { getTransactionsDataByIdAndMonth };
