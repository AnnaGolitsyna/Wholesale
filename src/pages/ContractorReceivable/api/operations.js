import { getDoc, sum } from 'firebase/firestore';
import { getReceivableDocRef } from '../../Receivable';

const getContractorReceivableData = async (id) => {
  try {
    const receivableDocRef = await getReceivableDocRef(id);
    const receivableDocSnap = await getDoc(receivableDocRef);

    if (receivableDocSnap.exists()) {
      const receivableData = receivableDocSnap.data();
      console.log('receivableData', receivableData);
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

export { getContractorReceivableData };
