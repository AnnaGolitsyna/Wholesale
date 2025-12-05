import { useState, useCallback } from 'react';

/**
 * Custom hook to manage save workflow
 * Handles: save mode selection, date selection, save operations
 */
export const useOrderSave = (
  client,
  allItems,
  onSave,
  onSaveDetailedOrder,
  onClose,
  resetChanges,
  isSupplierMode
) => {
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [saveMode, setSaveMode] = useState('simple');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [orderDate, setOrderDate] = useState(null);
  const [receivedDate, setReceivedDate] = useState(null);

  // Open save modal (for suppliers) or save directly (for clients)
  const handleSaveClick = useCallback(() => {
    if (isSupplierMode) {
      setSaveModalVisible(true);
      setSaveMode('simple');
    } else {
      performSimpleSave();
    }
  }, [isSupplierMode]);

  // Perform simple save
  const performSimpleSave = useCallback(() => {
    if (onSave && client) {
      onSave(client.id, allItems, isSupplierMode ? 'supplier' : 'client');
      resetChanges();
      onClose();
      return true;
    }
    return false;
  }, [onSave, client, allItems, resetChanges, onClose, isSupplierMode]);

  // Handle save mode selection
  const handleProceedWithSaveMode = useCallback(() => {
    if (saveMode === 'simple') {
      setSaveModalVisible(false);
      performSimpleSave();
    } else {
      setSaveModalVisible(false);
      setDateModalVisible(true);
    }
  }, [saveMode, performSimpleSave]);

  // Handle detailed save with dates
  const handleSaveWithDates = useCallback(() => {
    if (!orderDate || !receivedDate) {
      return false;
    }

    const detailedOrderItems = allItems.map((item) => ({
      ...item,
      orderDate: orderDate.format('YYYY-MM-DD'),
      receivedDate: receivedDate.format('YYYY-MM-DD'),
      orderTimestamp: orderDate.valueOf(),
      receivedTimestamp: receivedDate.valueOf(),
      deliveryDays: receivedDate.diff(orderDate, 'day'),
      supplierId: client.id,
      supplierName: client.name,
      createdAt: new Date().toISOString(),
    }));

    // Save to detailed tracking list
    if (onSaveDetailedOrder) {
      onSaveDetailedOrder(client.id, detailedOrderItems);
    }

    // Also update simple list
    if (onSave) {
      onSave(client.id, allItems, isSupplierMode ? 'supplier' : 'client');
    }

    // Reset and close
    setDateModalVisible(false);
    setOrderDate(null);
    setReceivedDate(null);
    resetChanges();
    onClose();

    return true;
  }, [
    orderDate,
    receivedDate,
    allItems,
    client,
    onSaveDetailedOrder,
    onSave,
    resetChanges,
    onClose,
  ]);

  // Cancel all modals
  const handleCancelAll = useCallback(() => {
    setSaveModalVisible(false);
    setDateModalVisible(false);
    setOrderDate(null);
    setReceivedDate(null);
    setSaveMode('simple');
  }, []);

  // Cancel save mode modal
  const handleCancelSaveModal = useCallback(() => {
    setSaveModalVisible(false);
    setSaveMode('simple');
  }, []);

  // Cancel date modal and go back
  const handleCancelDateModal = useCallback(() => {
    setDateModalVisible(false);
    setOrderDate(null);
    setReceivedDate(null);
    setSaveModalVisible(true);
  }, []);

  // Disable received date before order date
  const disabledReceivedDate = useCallback(
    (current) => {
      if (!orderDate) {
        return false;
      }
      return current && current < orderDate.startOf('day');
    },
    [orderDate]
  );

  return {
    saveModalVisible,
    saveMode,
    setSaveMode,
    dateModalVisible,
    orderDate,
    setOrderDate,
    receivedDate,
    setReceivedDate,
    handleSaveClick,
    performSimpleSave,
    handleProceedWithSaveMode,
    handleSaveWithDates,
    handleCancelAll,
    handleCancelSaveModal,
    handleCancelDateModal,
    disabledReceivedDate,
  };
};
