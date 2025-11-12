import { useMemo } from 'react';

/**
 * Custom hook to calculate order statistics
 * Handles: totals, reserves, shortages for both client and supplier modes
 */
export const useOrderStatistics = (items, productSummary, isSupplierMode) => {
  // Calculate items with reserve data for supplier mode
  const itemsWithReserve = useMemo(() => {
    if (!isSupplierMode) return items;

    return items.map((item) => {
      const itemId = item.value || item.id;
      const productDemand = productSummary.find((p) => p.key === itemId);
      const clientsTotal = productDemand?.totalCount || 0;
      const reserve = item.count - clientsTotal;

      return {
        ...item,
        clientsTotal,
        reserve,
      };
    });
  }, [items, productSummary, isSupplierMode]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const displayItems = isSupplierMode ? itemsWithReserve : items;
    
    const totalOrder = displayItems.reduce(
      (sum, item) => sum + (item.count || 0),
      0
    );

    if (!isSupplierMode) {
      return { totalOrder };
    }

    const totalClients = displayItems.reduce(
      (sum, item) => sum + (item.clientsTotal || 0),
      0
    );
    const totalReserve = totalOrder - totalClients;
    const shortageCount = displayItems.filter(
      (item) => item.reserve < 0
    ).length;

    return { totalOrder, totalClients, totalReserve, shortageCount };
  }, [items, itemsWithReserve, isSupplierMode]);

  return {
    itemsWithReserve,
    statistics,
  };
};
