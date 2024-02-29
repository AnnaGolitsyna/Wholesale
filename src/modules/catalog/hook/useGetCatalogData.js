import { useGetContractorsListQuery } from '../../../pages/Contractors/api/contractorsApi';
import { useGetGoodsListQuery } from '../../../pages/Goods/api/goodsApi';
const useGetCatalogData = (typeData, itemsStatus, getColumns, getToolBarItems) => {
  const catalogDataTypes = {
    Contractor: useGetContractorsListQuery,
    Goods: useGetGoodsListQuery,
  };
  const { data, isLoading, isError, error } =
    catalogDataTypes[typeData](itemsStatus);

 // console.log('hook', data);
  const { columns, nestedColumns } = getColumns(data);

  const toolBarItems = getToolBarItems();

  return {
    data,
    isLoading,
    isError,
    error,
    toolBarItems,
    columns,
    nestedColumns,
  };
};

export default useGetCatalogData;
