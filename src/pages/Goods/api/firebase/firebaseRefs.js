import { collection, doc } from 'firebase/firestore';
import { getCatalogRef } from '../../../../api/getRef';
import { REF_CODE_TYPES } from '../../../../api/refCodeTypes';


const refCode = REF_CODE_TYPES.GOODS;

export const getGoodsListRef = () => {
    return collection(...getCatalogRef(refCode));
};