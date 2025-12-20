import { useGetContractorsListQuery } from '../pages/Contractors';
import { categoryContractor } from '../constants/categoryContractor';

const useGetContractorsTreeSelect = (filterType) => {
  const { data, isError } = useGetContractorsListQuery(true);
  if (isError || !data) return [];

  const filteredContractors =
    filterType === 'payments'
      ? data
      : data?.filter(({ category }) =>
          categoryContractor
            .find((el) => el.value === category)
            ?.invoiceType.includes(filterType)
        );

  return filteredContractors
    ?.map(({ name, id, category, categoryPrice, relatedCompanies }) => {
      const isDisabled = relatedCompanies.some((el) => el.active);
      const children = relatedCompanies
        .filter((el) => el.active)
        .map(({ name, id, category, categoryPrice }) => ({
          title: name,
          value: id,
          category,
          categoryPrice,
        }));

      return {
        title: name,
        value: id,
        disabled: isDisabled,
        category,
        categoryPrice,
        isFilter: true,
        children: children || [],
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};

export default useGetContractorsTreeSelect;