import { useMemo } from 'react';
import { useGetContractorByIdQuery } from '../../Contractors';
import { categoryPricesObj } from '../../../constants/categoryPricesObj';

/**
 * Hook to fetch and derive contractor info for the client portal
 * @param {string} contractorId
 * @returns {Object} { contractor, priceCategory, categoryLabel, isLoading }
 */
export const useClientContractor = (contractorId) => {
  const { data: contractor, isLoading } = useGetContractorByIdQuery(contractorId);

  const priceCategory = contractor?.categoryPrice || 'retail';
  const categoryLabel = categoryPricesObj[priceCategory]?.label || priceCategory;
  const categoryColor = categoryPricesObj[priceCategory]?.color;

  return useMemo(
    () => ({ contractor, priceCategory, categoryLabel, categoryColor, isLoading }),
    [contractor, priceCategory, categoryLabel, categoryColor, isLoading]
  );
};
