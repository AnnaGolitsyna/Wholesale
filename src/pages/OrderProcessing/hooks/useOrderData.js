import { useState, useMemo } from 'react';
import { useGetContractorsListQuery } from '../../Contractors';

/**
 * Custom hook for managing order data with search and filtering
 *
 * Uses Firebase as source of truth - no local state management
 * Only handles search term state and filtered data computation
 */
export const useOrderData = () => {
  // Search term state
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch contractors from Firebase (active only)
  const {
    data: contractors,
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(true);

  // Filter contractors based on search term and sort by name
  const filteredContractors = useMemo(() => {
    if (!contractors) return [];

    const filtered = searchTerm
      ? contractors.filter((contractor) =>
          contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : contractors;

    // Sort by name ascending
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [contractors, searchTerm]);

  // Get only clients (buyers and all-purpose, not suppliers)
  const clientsData = useMemo(() => {
    return filteredContractors.filter(
      (contractor) => contractor.category !== 'supplier'
    );
  }, [filteredContractors]);

  // Get only suppliers
  const suppliersData = useMemo(() => {
    return filteredContractors.filter(
      (contractor) => contractor.category === 'supplier'
    );
  }, [filteredContractors]);

  // Get only contractors that have order items
  const contractorsWithOrders = useMemo(() => {
    return filteredContractors.filter(
      (contractor) =>
        contractor.listOrderedItems && contractor.listOrderedItems.length > 0
    );
  }, [filteredContractors]);

  return {
    // Search state
    searchTerm,
    setSearchTerm,

    // Data arrays
    contractors: filteredContractors,
    clientsData,
    suppliersData,
    contractorsWithOrders,

    // Loading states
    isLoading,
    isError,
    error,
  };
};
