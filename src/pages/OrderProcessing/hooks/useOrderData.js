import { useState, useMemo, useCallback } from 'react';
import {
  useGetContractorsListQuery,
  useUpdateContractorMutation,
} from '../../Contractors';
import { useFirebaseProductsList } from '../api/operations';

/**
 * Custom hook for managing order data with search and filtering
 *
 * Uses Firebase as source of truth
 * Handles search term state, filtered data computation, and save functionality
 * Enriches listOrderedItems with product details (inBox, schedule, refundsType, etc.)
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

  // Fetch products from Firebase for enrichment
  const { data: products = [] } = useFirebaseProductsList();

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

  // Helper function to enrich order items with product details
  const enrichOrderItems = useCallback(
    (items) => {
      if (!items || !products.length) return items;

      return items.map((item) => {
        const productInfo = products.find((p) => p.value === item.value);
        return {
          ...item,
          // Add product details from Firebase
          inBox: productInfo?.inBox,
          scedule: productInfo?.scedule,
          refundsType: productInfo?.refundsType,
          weekly: productInfo?.weekly,
          amountOdered: productInfo?.amountOdered,
          key: item.value,
        };
      });
    },
    [products]
  );

  // Enrich all contractors with product details
  const enrichedContractors = useMemo(() => {
    if (!contractors.length) return [];

    return contractors.map((contractor) => ({
      ...contractor,
      listOrderedItems: enrichOrderItems(contractor.listOrderedItems || []),
    }));
  }, [contractors, enrichOrderItems]);

  // Filter contractors based on search term and sort by name
  const filteredContractors = useMemo(() => {
    if (!enrichedContractors) return [];

    const filtered = searchTerm
      ? enrichedContractors.filter((contractor) =>
          contractor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : enrichedContractors;

    // Sort by name ascending
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [enrichedContractors, searchTerm]);

  // Get only clients (buyers and all-purpose, not suppliers)
  const clientsData = useMemo(() => {
    return filteredContractors
      .filter((contractor) => contractor.category !== 'supplier')
      .map((contractor) => {
        // For all-purpose contractors, filter out barter items
        if (contractor.category === 'all-purpose') {
          return {
            ...contractor,
            listOrderedItems: (contractor.listOrderedItems || []).filter(
              (item) => item.isBarter === false
            ),
          };
        }
        return contractor;
      });
  }, [filteredContractors]);

  // Get only suppliers
  const suppliersData = useMemo(() => {
    return filteredContractors
      .filter((contractor) => contractor.category !== 'buyer')
      .map((contractor) => {
        // For all-purpose contractors, filter only barter items
        if (contractor.category === 'all-purpose') {
          return {
            ...contractor,
            listOrderedItems: (contractor.listOrderedItems || []).filter(
              (item) => item.isBarter === true
            ),
          };
        }
        return contractor;
      });
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
    handleSearch,

    // Data arrays (all now enriched with product details)
    contractors: filteredContractors,
    orderData: enrichedContractors, // Full unfiltered enriched data
    clientsData,
    suppliersData,
    contractorsWithOrders,

    // Save functionality
    handleSaveItems,
    isSaving,

    // Loading states
    isLoading,
    isError,
    error,
  };
};
