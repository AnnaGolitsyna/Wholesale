import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook to manage item filtering
 * Handles: filter mode, displayed items
 */
export const useItemFilter = (allItems, itemsWithReserve, selectedItemIds, isSupplierMode) => {
  const [filterMode, setFilterMode] = useState('all');

  // Get items to display based on filter mode
  const displayedItems = useMemo(() => {
    const items = isSupplierMode ? itemsWithReserve : allItems;

    if (filterMode === 'all') {
      return items;
    } else {
      return items
        .filter((item) => selectedItemIds.includes(item.value || item.id))
        .sort((a, b) => {
          const nameA = (a.label || a.name || '').toLowerCase();
          const nameB = (b.label || b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
    }
  }, [allItems, itemsWithReserve, selectedItemIds, filterMode, isSupplierMode]);

  // Auto-switch to selected mode when items are selected
  const handleSelectionChange = useCallback(
    (newSelectedIds, originalHandler) => {
      originalHandler(newSelectedIds);
      
      if (newSelectedIds.length > 0 && filterMode === 'all') {
        setFilterMode('selected');
      }
    },
    [filterMode]
  );

  return {
    filterMode,
    setFilterMode,
    displayedItems,
    handleSelectionChange,
  };
};
