import { useGetContractorsListQuery } from '../features/catalog/catalogApi';

const useContractorsListSelect = () => {
  const { data } = useGetContractorsListQuery(true);
  const newData = data
    ?.map((item) => ({ label: item.name, value: item.id }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return newData;
};

export default useContractorsListSelect;
