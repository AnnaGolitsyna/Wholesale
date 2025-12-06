import { useMemo } from 'react';
import { useFirebaseProductsList } from '../api/operations';

/**
 * Custom hook for calculating product summary across all clients and suppliers
 *
 * Aggregates:
 * - Total count per product (from clients)
 * - List of clients ordering each product
 * - Amount ordered from suppliers
 * - All product information from Firebase
 * - Client stock information
 *
 * Returns ALL products from Firebase, even those with no orders (totalCount: 0)
 *
 * Note: Clients exclude category 'supplier', suppliers include category 'supplier' and 'all-purpose'
 */
export const useProductSummary = (orderData) => {
  const { data: products } = useFirebaseProductsList();

 
  return useMemo(() => {
    const summary = {};

    // STEP 1: Initialize summary with ALL products from Firebase
    products?.forEach((product) => {
      summary[product.value] = {
        ...product, // Spreads all fields: scedule, inBox, createdAt, weekly, refundsType, isBarter, etc.
        key: product.value,
        productName: product.label,
        totalCount: 0,
        clients: [],
        amountOrdered: 0,
      };
    });

    // STEP 2: Filter to only include clients, not suppliers
    const clientsOnly = orderData?.filter(
      (client) => client.category !== 'supplier'
    );

    // STEP 3: Filter to get suppliers
    const suppliers = orderData
      ?.filter(
        (supplier) =>
          supplier.category === 'supplier' ||
          supplier.category === 'all-purpose'
      )
      .map((supplier) => {
        // For all-purpose suppliers, only include barter items
        if (supplier.category === 'all-purpose') {
          return {
            ...supplier,
            listOrderedItems: supplier.listOrderedItems?.filter(
              (item) => item.isBarter === true
            ),
          };
        }
        // For regular suppliers, return as is
        return supplier;
      });

    // STEP 4: Process client orders and update product counts
    clientsOnly?.forEach((client) => {
      client?.listOrderedItems?.forEach((item) => {
        // Skip barter items for all-purpose clients
        if (client.category === 'all-purpose' && item.isBarter === true) {
          return;
        }

        // Update existing product entry (all products were initialized in STEP 1)
        if (summary[item.value]) {
          summary[item.value].totalCount += item.count;

          // Add client with stock information
          summary[item.value].clients.push({
            name: client.name,
            count: item.count,
            stockType: client.stockType, // Stock type from client
            stockNumber: client.stockNumber, // Stock position from client
          });
        }
        // If product not in Firebase, skip silently (shouldn't happen with correct data)
      });
    });

    // STEP 5: Calculate amountOrdered for each product from suppliers
    Object.values(summary).forEach((product) => {
      // Check if this product is a barter item (from Firebase product info)
      const isBarter = product.isBarter === true;

      // Find supplier that has this product
      const supplierWithProduct = suppliers?.find((supplier) => {
        return supplier.listOrderedItems?.some((supplierItem) => {
          // Match by product value/key
          if (supplierItem.value !== product.key) return false;

          // For all-purpose suppliers, only consider items matching barter status
          if (supplier.category === 'all-purpose') {
            return supplierItem.isBarter === isBarter;
          }
          // For regular suppliers, consider all items
          return true;
        });
      });

      // Get amount ordered from supplier if found
      if (supplierWithProduct) {
        const supplierItem = supplierWithProduct.listOrderedItems.find(
          (item) => {
            if (item.value !== product.key) return false;

            // For all-purpose suppliers, match barter status
            if (supplierWithProduct.category === 'all-purpose') {
              return item.isBarter === isBarter;
            }
            // For regular suppliers, any matching item
            return true;
          }
        );

        product.amountOrdered = supplierItem?.count || 0;
      }
      // If no supplier found, amountOrdered remains 0 (set in STEP 1)
    });

    // STEP 6: Sort by productName ascending and return
    return Object.values(summary).sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
  }, [orderData, products]);
};
