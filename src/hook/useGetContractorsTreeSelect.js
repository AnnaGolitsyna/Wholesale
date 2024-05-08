import { useGetContractorsListQuery } from '../pages/Contractors';

const useGetContractorsTreeSelect = () => {
  const { data } = useGetContractorsListQuery(true);

  return data
    ?.map(({ name, id, category, categoryPrice, relatedCompanies }) => {
      const isDisabled = relatedCompanies.some((el) => el.active)
        ? true
        : false;
      return {
        title: name,
        value: id,
        disabled: isDisabled,
        category,
        categoryPrice,
        children:
          relatedCompanies
            ?.filter((el) => el.active)
            .map(({ name, id, category, categoryPrice }) => ({
              title: name,
              value: id,
              category,
              categoryPrice,
            })) || [],
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};

export default useGetContractorsTreeSelect;
