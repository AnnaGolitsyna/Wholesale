import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage order items state and operations
 * Handles: item list, selection, CRUD operations, change tracking
 */
export const useOrderItems = (client, visible) => {
  const [allItems, setAllItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize items when drawer opens
  useEffect(() => {
    if (client?.listOrderedItems && visible) {
      setAllItems([...client.listOrderedItems]);
      setSelectedItemIds([]);
      setHasChanges(false);
    }
  }, [client, visible]);

  // Update item count
  const updateItemCount = useCallback((itemValue, newCount) => {
    const validCount = Math.max(0, newCount ?? 0);
    setAllItems((prev) => {
      const updated = prev.map((item) =>
        (item.value || item.id) === itemValue
          ? { ...item, count: validCount }
          : item
      );
      return updated;
    });
    setHasChanges(true);
  }, []);

  // Delete item
  const deleteItem = useCallback((itemValue) => {
    setAllItems((prev) =>
      prev.filter((item) => (item.value || item.id) !== itemValue)
    );
    setSelectedItemIds((prev) => prev.filter((id) => id !== itemValue));
    setHasChanges(true);
  }, []);

  // Add items from product list
  const addItemsFromProductList = useCallback((selectedProducts) => {
    const newItems = selectedProducts.map((product) => ({
      value: product.value,
      label: product.label,
      count: 1,
      scedule: product.scedule,
      weekly: product.weekly,
      datesList: product.datesList,
    }));

    setAllItems((prev) => [...prev, ...newItems]);
    setSelectedItemIds((prev) => [
      ...prev,
      ...newItems.map((item) => item.value),
    ]);
    setHasChanges(true);

    return newItems.length;
  }, []);

  // Handle selection change
  const handleSelectionChange = useCallback((newSelectedIds) => {
    setSelectedItemIds(newSelectedIds);
  }, []);

  // Reset to original items
  const resetItems = useCallback(() => {
    if (client?.listOrderedItems) {
      setAllItems([...client.listOrderedItems]);
      setHasChanges(false);
    }
  }, [client]);

  // Reset selection
  const resetSelection = useCallback(() => {
    setSelectedItemIds([]);
  }, []);

  return {
    allItems,
    selectedItemIds,
    hasChanges,
    updateItemCount,
    deleteItem,
    addItemsFromProductList,
    handleSelectionChange,
    resetItems,
    resetSelection,
  };
};
