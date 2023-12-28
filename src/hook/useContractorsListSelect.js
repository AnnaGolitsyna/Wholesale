import { useGetContractorsListQuery } from '../features/catalog/catalogApi';

const useContractorsListSelect = () => {
  const { data } = useGetContractorsListQuery(true);
  const newData = data
    ?.map(({ name, id }) => ({ label: name, value: id }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return newData;
};

export default useContractorsListSelect;
