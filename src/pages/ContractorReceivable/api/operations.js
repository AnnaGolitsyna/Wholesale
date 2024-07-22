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

const getContractorReceivableData = async (id) => {
  try {
    const receivableDocRef = await getReceivableDocRef(id);
    const receivableDocSnap = await getDoc(receivableDocRef);

    if (receivableDocSnap.exists()) {
      const receivableData = receivableDocSnap.data();
      //console.log('receivableData', receivableData);
      return {
        ...receivableData,
        sum: receivableData.debet - receivableData.credit,
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

const getTransactionsDataById = async () => {
  const results = [];

  try {
    const invoicesSnapshot = await getDocs(
      collection(...getRef('invoices', '2024-07-07'))
    );

    const paymentsSnapshot = await getDocs(
      collection(...getRef('payments', '2024-07-07'))
    );

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
