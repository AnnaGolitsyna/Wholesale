import { useGetContractorsListQuery } from '../../../pages/Contractors/api/contractorsApi';

const useGetCatalogData = (itemsStatus, getColumns, getToolBarItems) => {
  const catalogDataTypes = {
    contractors: useGetContractorsListQuery,
  };
  const { data, isLoading, isError, error } =
    catalogDataTypes.contractors(itemsStatus);

  // console.log('hook', data);
  const { columns, nestedColumns } = getColumns();
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
