import { useMemo } from 'react';
//import { mockOrderProductList } from '../components/orderProcessingPage/mockData';
import { useFirebaseProductsList } from '../api/operations';
/**
 * Custom hook for calculating product summary across all clients
 *
 * Aggregates:
 * - Total count per product
 * - List of clients ordering each product
 * - Schedule information
 * - Date information
 *
 * Note: Only includes clients (category !== 'supplier')
 */
export const useProductSummary = (orderData) => {
  const { data: products } = useFirebaseProductsList();
  return useMemo(() => {
    const summary = {};

    // Filter to only include clients, not suppliers
    const clientsOnly = orderData.filter(
      (client) => client.category !== 'supplier'
    );

    clientsOnly.forEach((client) => {
      client.listOrderedItems.forEach((item) => {
        if (!summary[item.value]) {
          // Find matching product info from mockOrderProductList
          const productInfo = products.find((p) => p.value === item.value);

          console.log('hook', productInfo, item);

          summary[item.value] = {
            ...productInfo,
            key: item.value,
            productName: item.label,
            totalCount: 0,
            clients: [],
            // scedule: productInfo?.scedule || null,
            // weekly: productInfo?.weekly || false,
            // lastDate:
            //   productInfo?.datesList?.[productInfo.datesList.length - 1] ||
            //   null,
          };
        }
        summary[item.value].totalCount += item.count;
        summary[item.value].clients.push({
          name: client.name,
          count: item.count,
        });
      });
    });

    // Sort by productName ascending
    return Object.values(summary).sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
  }, [orderData]);
};
