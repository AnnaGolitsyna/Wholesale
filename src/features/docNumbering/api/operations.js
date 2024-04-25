import { getDoc, setDoc } from 'firebase/firestore';
import { getNumberingDocRef } from './docRefs';
import { getFormattedDocNum } from '../utils/getFormattedDocNum';

const getDocNumber = async (docCode, date) => {
  try {
    const docRef = getNumberingDocRef(docCode, date);
    const prevDocNum = (await getDoc(docRef)).data() || 0;
    const newDocNum = prevDocNum + 1;
    const formattedNewDocNum = getFormattedDocNum(docCode, newDocNum);

    await setDoc(docRef, {
      number: newDocNum,
    });
    return formattedNewDocNum;
  } catch (error) {
    console.error('Error creating docNumber from Firebase:', error);
    throw new Error('Error creating docNumber from Firebase:', error);
  }
};

export { getDocNumber };
