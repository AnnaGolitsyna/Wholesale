// import { formStructure } from '../constant/formStructure';
// export const getFieldsForFormList = (
//   form,
//   typeData,
//   actionType = 'create',
//   data
// ) => {
//   const formConfig = formStructure[typeData];

//   if (!formConfig || typeof formConfig.getFields !== 'function') {
//     throw new Error(`No getFields function found for typeData: ${typeData}`);
//   }

//   return formConfig.getFields(form, actionType, data);
// };

// import { getFieldsForContractorsFormList } from '../../../pages/Contractors';
// import { getAdditionalFieldsForContractorsFormList } from '../../../pages/Contractors';
// import { getFieldsForGoodsFormList } from '../../../pages/Goods';
// import { getFieldsForPaymentsFormList } from '../../../pages/Payments';
// import {
//   getFieldsForInvoiceFormList,
//   getAdditionalFieldsForInvoiceFormList,
//   getEmptyFieldFormList,
// } from '../../../pages/InvoiceList';

// /**
//  * Retrieves the fields for a form list based on the form type, action type, and data.
//  *
//  * @param {object} form - The form object
//  * @param {string} typeData - The type of data
//  * @param {string} actionType - The action type
//  * @param {object} data - The data object
//  * @return {array} The fields for the form list
//  */

// const getFieldsForFormList = (form, typeData, actionType, data) => {
//   const typesObj = {
//     Contractor: getFieldsForContractorsFormList,
//     ContractorAdditional: getAdditionalFieldsForContractorsFormList,
//     Goods: getFieldsForGoodsFormList,
//     Payment: getFieldsForPaymentsFormList,
//     Invoice: getFieldsForInvoiceFormList,
//     InvoiceProductsAdditional: getAdditionalFieldsForInvoiceFormList,
//     InvoiceEmptyAdditional: getEmptyFieldFormList,
//   };

//   return typesObj[typeData](form, actionType, data);
// };

// export { getFieldsForFormList };
