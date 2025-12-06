import {
  useAddGoodsMutation,
  useUpdateProductMutation,
  getFieldsForGoodsFormList,
} from '../../../pages/Goods';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
  getFieldsForContractorsFormList,
  getAdditionalFieldsForContractorsFormList,
} from '../../../pages/Contractors';
import {
  createPayment,
  updatePayment,
  getFieldsForPaymentsFormList,
} from '../../../pages/Payments';
import {
  createInvoice,
  updateInvoice,
  getFieldsForInvoiceFormList,
  getAdditionalFieldsForInvoiceFormList,
  getEmptyFieldFormList,
} from '../../../pages/InvoiceList';
import {
  getFieldsForContractorOrderFormList,
  getAdditionalFieldsContractorOrderFormList,
  addOrderedProduct,
  updateOrderedProduct,
  getFieldsForOrderedProductsFormList,
} from '../../../pages/OrderProcessing';
import { FORM_TYPES } from '../../../constants/formTypes';

/**
 * Returns the action list for the given type data.
 *
 * @param {string} typeData - The type of data to retrieve action list for
 * @return {Object} The action list for the given type data
 */

const useModalActions = (typeData) => {
  const [addContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();
  const [addGoods] = useAddGoodsMutation();
  const [updateProduct] = useUpdateProductMutation();

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
        getFields: getAdditionalFieldsForContractorsFormList,
        btnText: 'Добавить связанную компанию - посредника',
      };
    case FORM_TYPES.CONTRACTOR_ORDER_ADDITIONAL:
      return {
        getFields: getAdditionalFieldsContractorOrderFormList,
        btnText: 'Добавить в заказ новый товар',
      };
    case FORM_TYPES.CONTRACTOR_ORDER:
      return {
        updateItem: updateContractor,
        getFields: getFieldsForContractorOrderFormList,
        btnText: 'Редактировать список заказов',
      };
    case FORM_TYPES.PRODUCT_BY_ORDER:
      return {
        createItem: addOrderedProduct,
        updateItem: updateOrderedProduct,
        getFields: getFieldsForOrderedProductsFormList,
        btnText: 'Добавить в заказ новый товар',
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
