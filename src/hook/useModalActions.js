import {
  useAddGoodsMutation,
  useUpdateProductMutation,
} from '../pages/Goods/api/goodsApi';
import {
  useAddContractorMutation,
  useUpdateContractorMutation,

} from '../pages/Contractors/api/contractorsApi';
import { closeModalContractor } from '../pages/Contractors/api/contractorsSlice';
import { closeModalGoods } from '../features/catalog/goodsSlice';

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

  // if (!typeData) {
  //   return null;
  // }


  const actionList = {
    Contractor: {
     // closeModal: closeModalContractor,
      createItem: addContractor,
      updateItem: updateContractor,
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

  console.log('hook', typeData, actionList[typeData]);

  return actionList[typeData];
};

export default useModalActions;
