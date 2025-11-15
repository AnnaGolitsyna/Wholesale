import { useState, useMemo, useCallback } from 'react';
import {
  useGetContractorsListQuery,
  useUpdateContractorMutation,
} from '../../Contractors';

/**
 * Custom hook for managing order data with search and filtering
 *
 * Uses Firebase as source of truth
 * Handles search term state, filtered data computation, and save functionality
 */
export const useOrderData = () => {
  // Search term state
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch contractors from Firebase (active only)
  const {
    data: contractors = [],
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(true);

  // Get mutation for saving contractor updates to Firebase
  const [updateContractor, { isLoading: isSaving }] =
    useUpdateContractorMutation();

  // Handle search input changes
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // Handle saving items to Firebase
  const handleSaveItems = useCallback(
    async (clientId, updatedItems) => {
      const contractor = contractors.find((c) => c.id === clientId);

      if (!contractor) {
        console.error('Contractor not found:', clientId);
        return;
      }

      try {
        await updateContractor({
          key: clientId,
          ...contractor,
          listOrderedItems: updatedItems,
        });

        console.log('✅ Orders saved successfully for:', contractor.name);
      } catch (err) {
        console.error('❌ Error saving orders:', err);
      }
    },
    [contractors, updateContractor]
  );

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
      (contractor) => contractor.category !== 'buyer'
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
    // Search state and handlers
    searchTerm,
    setSearchTerm,
    handleSearch, // ✅ Added for MobileOrderProcessingPage

    // Data arrays
    contractors: filteredContractors,
    orderData: contractors, // ✅ Added alias for MobileOrderProcessingPage
    clientsData,
    suppliersData,
    contractorsWithOrders,

    // Save functionality
    handleSaveItems, // ✅ Added for MobileOrderProcessingPage
    isSaving,

    // Loading states
    isLoading,
    isError,
    error,
  };
};
