import { getFieldsForContractorsFormList } from '../../features/catalog/utils/contractors/getFormLists';
import { getFieldsForGoodsFormList } from '../../features/catalog/utils/goods/getFormList';

import { getFieldsForPaymentsFormList } from '../../features/finance/utils/getFormList';

const getFieldsForFormList = (form, typeData, actionType) => {
  const typesObj = {
    Contractor: getFieldsForContractorsFormList,
    Goods: getFieldsForGoodsFormList,
    Payment: getFieldsForPaymentsFormList,
  };

  const getFormList = typesObj[typeData];
  
  const {
    titleObj: { icon, titleText },
    formList,
  } = getFormList(form);

  const dynamicTitle = titleText[actionType] || 'Просмотр информации';

  return { icon, dynamicTitle, formList };
};

export { getFieldsForFormList };
