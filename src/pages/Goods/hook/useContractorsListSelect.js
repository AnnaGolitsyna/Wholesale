import { useGetContractorsListQuery } from '../../Contractors';

const useContractorsListSelect = () => {
  const { data } = useGetContractorsListQuery(true);
 
  return data
    ?.filter(({ category }) => category !== 'buyer')
    .map(({ name, id }) => ({ label: name, value: id }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export default useContractorsListSelect;
