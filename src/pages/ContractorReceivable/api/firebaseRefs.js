import { collection, query, where } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';


const getTransactionsListByIdRef = (refCode, period, id) => {
   if (!refCode || !period || !id) {
     throw new Error(
       'Invalid parameters: refCode, period, and id are required'
     );
   }

   const collectionRef = collection(...getRef(refCode, period));
   return query(collectionRef, where('name.value', '==', id));
};

export { getTransactionsListByIdRef }