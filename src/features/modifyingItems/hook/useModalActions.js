import {
  useAddGoodsMutation,
  useUpdateProductMutation,
} from '../../../pages/Goods';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../../../pages/Contractors';
import { createPayment, updatePayment } from '../../../pages/Payments';

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


  const actionList = {
    Contractor: {
      // closeModal: closeModalContractor,
      createItem: addContractor,
      updateItem: updateContractor,
      btnText: 'Создать нового контрагента',
    },
    ContractorAdditional: {
      // closeModal: closeModalContractor,
      createItem: addContractor,
      updateItem: updateContractor,
      btnText: 'Добавить связанную компанию - посредника',
    },
    Goods: {
      //closeModal: closeModalGoods,
      createItem: addGoods,
      updateItem: updateProduct,
      btnText: 'Создать новый товар',
    },
    Payment: {
      createItem: createPayment,
      updateItem: updatePayment,
      btnText: 'Создать новую оплату',
    },
  };

  // console.log('hook', typeData, actionList[typeData]);

  return actionList[typeData];
};

export default useModalActions;
