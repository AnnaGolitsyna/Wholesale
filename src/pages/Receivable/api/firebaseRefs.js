import { collection, doc, query, where } from 'firebase/firestore';
import { getRef } from '../../../api/getRef';

const refCode = 'receivable';

const getReceivableDocRef = (userId) => {
    return doc(...getRef(refCode), userId);
}

export { getReceivableDocRef }