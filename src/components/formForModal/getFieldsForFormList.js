import { getFieldsForContractorsFormList } from '../../features/catalog/utils/contractors/getFormLists';
import { getFieldsForGoodsFormList } from '../../features/catalog/utils/goods/getFormList';
import { getFieldsForPaymentsFormList } from '../../features/finance/utils/getFormList';
import { getAdditionalFieldsForContractorsFormList } from '../../features/catalog/utils/contractors/getAdditionalFormLists';

/**
 * Retrieves the fields for a form list based on the form type, action type, and data.
 *
 * @param {object} form - The form object
 * @param {string} typeData - The type of data
 * @param {string} actionType - The action type
 * @param {object} data - The data object
 * @return {type} The fields for the form list
 */

const getFieldsForFormList = (form, typeData, actionType, data) => {
  const typesObj = {
    Contractor: getFieldsForContractorsFormList,
    ContractorAdditional: getAdditionalFieldsForContractorsFormList,
    Goods: getFieldsForGoodsFormList,
    Payment: getFieldsForPaymentsFormList,
  };

  return typesObj[typeData](form, actionType, data);
};

export { getFieldsForFormList };
