import { FORM_TYPES } from './formTypes';
import {
  getFieldsForContractorsFormList,
  getAdditionalFieldsForContractorsFormList,
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../../../pages/Contractors/index';

import {
  getFieldsForGoodsFormList,
  useAddGoodsMutation,
  useUpdateProductMutation,
} from '../../../pages/Goods';
import {
  getFieldsForPaymentsFormList,
  createPayment,
  updatePayment,
} from '../../../pages/Payments';
import {
  getFieldsForInvoiceFormList,
  getAdditionalFieldsForInvoiceFormList,
  getEmptyFieldFormList,
  createInvoice,
  updateInvoice,
} from '../../../pages/InvoiceList';

console.log(
  'testStr',
  getFieldsForContractorsFormList,
  getAdditionalFieldsForContractorsFormList,
  useAddContractorMutation,
  useUpdateContractorMutation
);

export const formStructure = {
  [FORM_TYPES.CONTRACTOR]: {
    getFields: getFieldsForContractorsFormList,
    createItem: useAddContractorMutation,
    updateItem: useUpdateContractorMutation,
    btnText: 'Создать нового контрагента',
  },
  [FORM_TYPES.CONTRACTOR_ADDITIONAL]: {
    getFields: getAdditionalFieldsForContractorsFormList,

    btnText: 'Добавить связанную компанию - посредника',
  },
  [FORM_TYPES.GOODS]: {
    getFields: getFieldsForGoodsFormList,
    createItem: useAddGoodsMutation,
    updateItem: useUpdateProductMutation,
    btnText: 'Создать новый товар',
  },
  [FORM_TYPES.PAYMENT]: {
    getFields: getFieldsForPaymentsFormList,
    createItem: createPayment,
    updateItem: updatePayment,
    btnText: 'Создать новую оплату',
  },
  [FORM_TYPES.INVOICE]: {
    getFields: getFieldsForInvoiceFormList,
    createItem: createInvoice,
    updateItem: updateInvoice,
    btnText: 'Создать новый документ',
  },
  //   [FORM_TYPES.INVOICE_ADDITIONAL]: {
  //     getFields: getAdditionalFieldsForInvoiceFormList,
  //     btnText: 'Добавить дополнительные поля',
  //   },
  [FORM_TYPES.INVOICE_EMPTY_ADDITIONAL]: {
    getFields: getEmptyFieldFormList,
    btnText: 'Ввести вручную',
  },
  [FORM_TYPES.INVOICE_PRODUCTS_ADDITIONAL]: {
    getFields: getAdditionalFieldsForInvoiceFormList,
    btnText: 'Выбрать товары',
  },
};
