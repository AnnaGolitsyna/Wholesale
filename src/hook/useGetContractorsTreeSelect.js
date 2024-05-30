import { useGetContractorsListQuery } from '../pages/Contractors';
import { categoryContractor } from '../constants/categoryContractor';

const useGetContractorsTreeSelect = (filterType) => {
  const { data } = useGetContractorsListQuery(true);

  // const filterParam =
  //   filterType === 'purchase' ? 'supplier' : 'all-purpose' || 'buyer';

  // const filteredData = data?.filter((el) => {
  //   console.log('el', el, categoryContractor);
  //   return el.category === filterParam;
  // });

  // console.log('test', categoryContractor, data, filteredData);

  return data
    ?.map(({ name, id, category, categoryPrice, relatedCompanies }) => {
      const isDisabled = relatedCompanies.some((el) => el.active)
        ? true
        : false;
      const isFilter = categoryContractor
        .find((el) => el.value === category)
        .invoiceType.includes(filterType);
      // console.log(
      //   'find',
      //   name,
      //   categoryContractor
      //     .find((el) => el.value === category)
      //     .invoiceType.includes(filterType)
      // );
      return {
        title: name,
        value: id,
        disabled: isDisabled,
        category,
        categoryPrice,
        isFilter,
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
    .filter((el) => el.isFilter)
    .sort((a, b) => a.title.localeCompare(b.title));
};

export default useGetContractorsTreeSelect;
