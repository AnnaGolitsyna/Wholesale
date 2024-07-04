import {
  useAddGoodsMutation,
  useUpdateProductMutation,
} from '../../../pages/Goods';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../../../pages/Contractors';
import { createPayment, updatePayment } from '../../../pages/Payments';
import { createInvoice, updateInvoice } from '../../../pages/InvoiceList';
import { FORM_TYPES } from '../constant/formTypes';

import { getFieldsForContractorsFormList } from '../../../pages/Contractors';
import { getAdditionalFieldsForContractorsFormList } from '../../../pages/Contractors';
import { getFieldsForGoodsFormList } from '../../../pages/Goods';
import { getFieldsForPaymentsFormList } from '../../../pages/Payments';
import {
  getFieldsForInvoiceFormList,
  getAdditionalFieldsForInvoiceFormList,
  getEmptyFieldFormList,
} from '../../../pages/InvoiceList';

//console.log('test', getFieldsForContractorsFormList);

/**
 * Returns the action list for the given type data.
 *
 * @param {string} typeData - The type of data to retrieve action list for
 * @return {Object} The action list for the given type data
 */
// const useModalActions = (typeData) => {
//   const [addContractor] = useAddContractorMutation();
//   const [updateContractor] = useUpdateContractorMutation();
//   const [addGoods] = useAddGoodsMutation();
//   const [updateProduct] = useUpdateProductMutation();

//   const actionList = {
//     Contractor: {
//       createItem: addContractor,
//       updateItem: updateContractor,
//       btnText: 'Создать нового контрагента',
//     },
//     ContractorAdditional: {
//       // createItem: addContractor,
//       // updateItem: updateContractor,
//       btnText: 'Добавить связанную компанию - посредника',
//     },
//     Goods: {
//       createItem: addGoods,
//       updateItem: updateProduct,
//       btnText: 'Создать новый товар',
//     },
//     Payment: {
//       createItem: createPayment,
//       updateItem: updatePayment,
//       btnText: 'Создать новую оплату',
//     },
//     Invoice: {
//       createItem: createInvoice,
//       updateItem: updateInvoice,
//       btnText: 'Создать новый документ',
//     },

//     InvoiceProductsAdditional: {
//       btnText: 'Выбрать товары',
//     },
//     InvoiceEmptyAdditional: {
//       btnText: 'Ввести вручную',
//     },
//   };

//   return actionList[typeData];
// };

const useModalActions = (typeData) => {
  // Call all hooks at the top level
  const [addContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();
  const [addGoods] = useAddGoodsMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Use switch only to return the appropriate object
  switch (typeData) {
    case FORM_TYPES.CONTRACTOR:
      return {
        createItem: addContractor,
        updateItem: updateContractor,
        getFields: getFieldsForContractorsFormList,
        btnText: 'Создать нового контрагента',
      };
    case FORM_TYPES.CONTRACTOR_ADDITIONAL:
      return {
        // createItem: addContractor,
        // updateItem: updateContractor,
        getFields: getAdditionalFieldsForContractorsFormList,
        btnText: 'Добавить связанную компанию - посредника',
      };
    case FORM_TYPES.GOODS:
      return {
        createItem: addGoods,
        updateItem: updateProduct,
        getFields: getFieldsForGoodsFormList,
        btnText: 'Создать новый товар',
      };
    case FORM_TYPES.PAYMENT:
      return {
        createItem: createPayment,
        updateItem: updatePayment,
        getFields: getFieldsForPaymentsFormList,
        btnText: 'Создать новую оплату',
      };
    case FORM_TYPES.INVOICE:
      return {
        createItem: createInvoice,
        updateItem: updateInvoice,
        getFields: getFieldsForInvoiceFormList,
        btnText: 'Создать новый документ',
      };
    case FORM_TYPES.INVOICE_PRODUCTS_ADDITIONAL:
      return {
        getFields: getAdditionalFieldsForInvoiceFormList,
        btnText: 'Выбрать товары',
      };
    case FORM_TYPES.INVOICE_EMPTY_ADDITIONAL:
      return {
        getFields: getEmptyFieldFormList,
        btnText: 'Ввести вручную',
      };
    default:
      throw new Error(`Unsupported form type: ${typeData}`);
  }
};

export default useModalActions;
