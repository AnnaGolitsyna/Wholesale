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
    const receivableDocRef = await getReceivableDocRef(id);
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

const getTransactionsDataById = async (id) => {
  const results = [];

  try {
    const invoicesQuery = getTransactionsListByIdRef(
      'invoices',
      '2024-07',
      id
    );
    const paymentsQuery = getTransactionsListByIdRef(
      'payments',
      '2024-07',
      id
    );

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

// const getTransactionsDataById = async (id) => {
//   const results = [];

//   try {
//     console.log('Querying with id:', id);

//     const invoicesRef = collection(...getRef('invoices', '2024-07-07'));
//     const invoicesQuery = query(invoicesRef, where('name.value', '==', id));
//     console.log('Invoices query:', invoicesQuery);

//     const invoicesSnapshot = await getDocs(invoicesQuery);
//     console.log('Invoices snapshot size:', invoicesSnapshot.size);

//     const paymentsRef = collection(...getRef('payments', '2024-07-07'));
//     const paymentsQuery = query(paymentsRef, where('name.value', '==', id));
//     console.log('Payments query:', paymentsQuery);

//     const paymentsSnapshot = await getDocs(paymentsQuery);
//     console.log('Payments snapshot size:', paymentsSnapshot.size);

//     invoicesSnapshot.forEach((doc) => {
//       console.log('Invoice doc:', doc.id, doc.data());
//       results.push({ ...doc.data(), id: doc.id });
//     });

//     paymentsSnapshot.forEach((doc) => {
//       console.log('Payment doc:', doc.id, doc.data());
//       const newData = {
//         ...doc.data(),
//         id: doc.id,
//         docType: 'payments',
//       };
//       results.push(newData);
//     });

//     console.log('Final results:', results);

//     return results.map((el) => {
//       return {
//         ...el,
//         label: operationTypes[el.docType][el.type].text,
//       };
//     });
//   } catch (error) {
//     console.error('Error fetching transaction data:', error);
//     throw error;
//   }
// };
