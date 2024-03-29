import { getFieldsForContractorsFormList } from '../../../pages/Contractors';
import { getAdditionalFieldsForContractorsFormList } from '../../../pages/Contractors';
import { getFieldsForGoodsFormList } from '../../../pages/Goods';
import { getFieldsForPaymentsFormList } from '../../finance/utils/getFormList';

/**
 * Retrieves the fields for a form list based on the form type, action type, and data.
 *
 * @param {object} form - The form object
 * @param {string} typeData - The type of data
 * @param {string} actionType - The action type
 * @param {object} data - The data object
 * @return {array} The fields for the form list
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
