import { useState, useMemo, useCallback } from 'react';
import { mockData } from '../components/orderProcessingPage/mockData';

/**
 * Custom hook for managing order data state and operations
 *
 * Handles:
 * - Order data state management
 * - Search/filter functionality
 * - Save operations
 * - Separation of clients and suppliers
 */
export const useOrderData = () => {
  const [orderData, setOrderData] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search term changes
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // Save updated items for a client/supplier
  const handleSaveItems = useCallback((clientId, updatedItems) => {
    setOrderData((prevData) =>
      prevData.map((client) =>
        client.id === clientId
          ? { ...client, listOrderedItems: updatedItems }
          : client
      )
    );
  }, []);

  // Filter and sort all clients based on search term
  const filteredClients = useMemo(() => {
    const filtered = !searchTerm
      ? orderData
      : orderData.filter((client) => {
          const lowercased = searchTerm.toLowerCase();
          return client.name.toLowerCase().includes(lowercased);
        });

    // Sort by name ascending
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, orderData]);

  // Get only clients (category !== 'supplier')
  const clientsData = useMemo(() => {
    return filteredClients.filter((client) => client.category !== 'supplier');
  }, [filteredClients]);

  // Get only suppliers (category === 'supplier')
  const suppliersData = useMemo(() => {
    return filteredClients.filter((client) => client.category === 'supplier');
  }, [filteredClients]);

  return {
    orderData,
    setOrderData,
    handleSaveItems,
    searchTerm,
    handleSearch,
    clientsData,
    suppliersData,
  };
};
