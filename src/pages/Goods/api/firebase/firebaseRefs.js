import { collection, doc } from 'firebase/firestore';
import { getCatalogRef } from '../../../../api/getRef';
import { REF_CODE_TYPES } from '../../../../api/refCodeTypes';
import goodsConverter from './converter';


const refCode = REF_CODE_TYPES.GOODS;

const getGoodsListRef = () => {
    return collection(...getCatalogRef(refCode)).withConverter(goodsConverter);
};

const getProductDocRef = (id) => {
  return doc(...getCatalogRef(refCode), id).withConverter(goodsConverter);
};

export { getGoodsListRef, getProductDocRef };

