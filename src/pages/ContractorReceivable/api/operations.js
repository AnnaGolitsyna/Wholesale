import {
  getDoc,
  collectionGroup,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {getRef} from '../../../api/getRef';
import { getReceivableDocRef } from '../../Receivable';

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

const getTransactionsDataById = async (id) => {
  try {


    const transactions = query(
      collectionGroup(...getRef('2024-07-09', 'invoices')),
      where('name.value', '==', id)
    );
    const querySnapshot = await getDocs(transactions);
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, ' => ', doc.data());
    // });
     const transactionsData = [];
     querySnapshot.forEach((doc) => {
       transactionsData.push({ id: doc.id, ...doc.data() });
     });
     return transactionsData;



  } catch (error) {
    console.error('Error getting transactions data by id:', error);
    throw error;
  }
};

export { getContractorReceivableData, getTransactionsDataById };
