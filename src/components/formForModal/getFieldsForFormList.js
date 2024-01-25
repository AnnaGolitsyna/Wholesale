import { getFieldsForContractorsFormList } from '../../features/catalog/utils/contractors/getFormLists';
import { getFieldsForGoodsFormList } from '../../features/catalog/utils/goods/getFormList';
import { getFieldsForPaymentsFormList } from '../../features/finance/utils/getFormList';
import {getAdditionalFieldsForContractorsFormList} from '../../features/catalog/utils/contractors/getAdditionalFormLists'


const getFieldsForFormList = (form, typeData, actionType, data) => {
  const typesObj = {
    Contractor: getFieldsForContractorsFormList,
    ContractorAdditional: getAdditionalFieldsForContractorsFormList,
    Goods: getFieldsForGoodsFormList,
    Payment: getFieldsForPaymentsFormList,
  };

  const getFormList = typesObj[typeData];

  console.log('mainFL', data);
  const {
    titleObj: { iconTitle, titleText },
    formList,
  } = getFormList(form, data);

  const dynamicTitle = titleText[actionType] || 'Просмотр информации';

  return { iconTitle, dynamicTitle, formList };
};

export { getFieldsForFormList };
