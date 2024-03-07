import {
  useAddGoodsMutation,
  useUpdateProductMutation,
} from '../../../pages/Goods';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../../../pages/Contractors';

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
    },
    Goods: {
      //closeModal: closeModalGoods,
      createItem: addGoods,
      updateItem: updateProduct,
      btnText: 'Создать новый товар',
    },
  };

  // console.log('hook', typeData, actionList[typeData]);

  return actionList[typeData];
};

export default useModalActions;
