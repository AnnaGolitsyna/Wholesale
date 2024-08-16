import { getDoc } from 'firebase/firestore';
import { getReceivableDocRef } from '../../../Receivable';

const getContractorReceivableData = async (id) => {
  const receivableDocRef = getReceivableDocRef(id);

  try {
    const receivableDocSnap = await getDoc(receivableDocRef);

    if (!receivableDocSnap.exists()) {
      console.log(`No document found for id: ${id}`);
      return null;
    }

    const receivableData = receivableDocSnap.data();
    return {
      ...receivableData,
      receivable: receivableData.debet - receivableData.credit,
      name: receivableData.name.label,
    };
  } catch (error) {
    console.error('Error getting receivable data:', error);
    throw error;
  }
};

export { getContractorReceivableData };
