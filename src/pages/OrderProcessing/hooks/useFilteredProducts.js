import { useMemo } from 'react';

/**
 * Custom hook for filtering products based on search term
 *
 * @param {Array} productSummary - Array of product summary objects
 * @param {string} searchTerm - Current search term
 * @returns {Array} Filtered and sorted products
 */
export const useFilteredProducts = (productSummary, searchTerm) => {
  return useMemo(() => {
    const filtered = !searchTerm
      ? productSummary
      : productSummary.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Already sorted in productSummary, but maintain consistency
    return filtered;
  }, [searchTerm, productSummary]);
};
