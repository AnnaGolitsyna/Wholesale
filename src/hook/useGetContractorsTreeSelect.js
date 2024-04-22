import { useGetContractorsListQuery } from '../pages/Contractors';

const useGetContractorsTreeSelect = () => {
  const { data } = useGetContractorsListQuery(true);

  return data
    ?.map(({ name, id, relatedCompanies }) => {
      const isDisabled = relatedCompanies.some((el) => el.active)
        ? true
        : false;
      return {
        title: name,
        value: id,
        disabled: isDisabled,
        children:
          relatedCompanies
            ?.filter((el) => el.active)
            .map(({ name, id }) => ({
              title: name,
              value: id,
            })) || [],
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};

export default useGetContractorsTreeSelect;
