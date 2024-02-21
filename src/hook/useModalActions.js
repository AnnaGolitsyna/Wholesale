import {
  useAddContractorMutation,
  useUpdateContractorMutation,
  useAddGoodsMutation,
  useUpdateProductMutation,
} from '../features/catalog/catalogApi';
import { closeModalContractor } from '../features/catalog/contractorsSlice';
import { closeModalGoods } from '../features/catalog/goodsSlice';

const useModalActions = (typeData) => {
  const [addContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();
  const [addGoods] = useAddGoodsMutation();
  const [updateProduct] = useUpdateProductMutation();

  const actionList = {
    Contractor: {
      closeModal: closeModalContractor,
      createItem: addContractor,
      updateItem: updateContractor,
    },
    ContractorAdditional: {
      closeModal: closeModalContractor,
      createItem: addContractor,
      updateItem: updateContractor,
    },
    Goods: {
      closeModal: closeModalGoods,
      createItem: addGoods,
      updateItem: updateProduct,
    },
  };

  return actionList[typeData];
};

export default useModalActions ;
