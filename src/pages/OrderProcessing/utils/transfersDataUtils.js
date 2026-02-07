/**
 * Transform and filter transfers data to match products in data array
 * @param {Array} transfersData - Raw transfers data from Firebase
 * @param {Array} productsData - Products data array
 * @param {boolean} skipFiltering - If true, include all transfer items regardless of product match
 * @returns {Array} Transformed and filtered data
 */
export const transformTransfersData = (transfersData, productsData, skipFiltering = false) => {
  if (!transfersData) return [];
  if (!skipFiltering && !productsData) return [];

  // Create a map of product IDs to their data for quick lookup
  const productMap = new Map(
    productsData?.map((product) => [product.value || product.productId, product]) || []
  );

  // Transform and filter transfers
  const transformedData = transfersData.flatMap((transfer) => {
    // If skipFiltering is true, include all items; otherwise filter by product match
    const itemsToProcess = skipFiltering
      ? transfer.items
      : transfer.items.filter((item) => productMap.has(item.productId));

    if (itemsToProcess.length === 0) return [];

    // Transform each item into the product summary format
    return itemsToProcess.map((item) => {
      // Get the matching product from data to access its clients
      const matchingProduct = productMap.get(item.productId);

      return {
        productName: item.productName,
        label: item.productName,
        value: item.productId,
        totalCount: matchingProduct?.totalCount || 0,
        amountOrdered: matchingProduct?.amountOrdered || 0,
        scedule: transfer.scedule,
        clients: matchingProduct?.clients || [],
        createdAt: transfer.timestamp || transfer.date,
        date: transfer.date,
        docNumber: transfer.docNumber,
        docId: transfer.id, // Include document ID for deletion
      };
    });
  });

  // Sort by date (newest first)
  return transformedData.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
    return dateB - dateA;
  });
};

/**
 * Filter data by selected week
 * @param {Array} data - Data array to filter
 * @param {dayjs.Dayjs|null} selectedDate - Selected date (should be Monday - start of week)
 * @returns {Array} Filtered data
 */
export const filterByWeek = (data, selectedDate) => {
  if (!selectedDate || !data) return data;

  // selectedDate should be a Monday (start of week)
  // Week goes from Monday to Sunday (7 days)
  const weekStart = selectedDate.format('YYYY-MM-DD');
  const weekEnd = selectedDate.add(6, 'day').format('YYYY-MM-DD');

  return data.filter((item) => {
    if (!item.date) return false;
    return item.date >= weekStart && item.date <= weekEnd;
  });
};
