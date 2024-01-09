import { getFieldsForContractorsFormList } from '../../features/catalog/utils/contractors/getFormLists';
import { getFieldsForGoodsFormList } from '../../features/catalog/utils/goods/getFormList';
import { getFieldsForPaymentsFormList } from '../../features/finance/utils/getFormList';

const getFieldsForFormList = (form, typeData, actionType, data) => {
  const typesObj = {
    Contractor: getFieldsForContractorsFormList,
    Goods: getFieldsForGoodsFormList,
    Payment: getFieldsForPaymentsFormList,
  };

  const getFormList = typesObj[typeData];

  const {
    titleObj: { iconTitle, titleText },
    formList,
  } = getFormList(form, data);

  const dynamicTitle = titleText[actionType] || 'Просмотр информации';

  return { iconTitle, dynamicTitle, formList };
};

export { getFieldsForFormList };
