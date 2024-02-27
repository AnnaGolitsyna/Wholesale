import { useGetContractorsListQuery } from '../../../pages/Contractors/api/contractorsApi';

const useGetCatalogData = (itemsStatus) => {
  const catalogDataTypes = {
    contractors: useGetContractorsListQuery,
  };
  const { data, isLoading, isError, error } =
    catalogDataTypes.contractors(itemsStatus);
  // console.log('hook', data);
  return { data, isLoading, isError, error };
};

export default useGetCatalogData;
