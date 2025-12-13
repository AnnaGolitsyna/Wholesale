/**
 * Utility functions for building schedule card table data
 */

/**
 * Get available count (Наличие) for a product
 * @param {Object} product - Product object
 * @param {string} scheduleName - Schedule name
 * @returns {number} Available count
 */
export const getAvailableCount = (product, scheduleName) => {
  const isMainSchedule = ['week', 'month', 'burda'].includes(scheduleName);
  return isMainSchedule
    ? product.amountOrdered || 0
    : product.amountOrdered || 0;
};

/**
 * Get ordered count (Заказано) for a product
 * @param {Object} product - Product object
 * @param {string} dataSource - Data source ('orders' or 'saved')
 * @returns {number} Ordered count
 */
export const getOrderedCount = (product, dataSource) => {
  if (dataSource === 'orders') {
    return product.totalCount || 0;
  }

  // Sum all counts from clients array
  return (product.clients || []).reduce((sum, client) => {
    return sum + (client.count || 0);
  }, 0);
};

/**
 * Build client rows from products
 * @param {Array} products - Array of products
 * @returns {Array} Array of client rows with product counts
 */
const buildClientRows = (products) => {
  const clientsMap = new Map();

  products.forEach((product) => {
    if (product.clients && product.clients.length > 0) {
      product.clients.forEach((client) => {
        const clientKey =
          client.id || client.clientId || client.name || client.clientName;
        if (!clientsMap.has(clientKey)) {
          clientsMap.set(clientKey, {
            clientId: clientKey,
            clientName: client.name || client.clientName,
            stockType: client.stockType,
            stockNumber: client.stockNumber,
          });
        }
      });
    }
  });

  // Create rows for each client
  return Array.from(clientsMap.values()).map((client) => {
    const row = {
      key: client.clientId,
      clientName: client.clientName,
      stockType: client.stockType,
      stockNumber: client.stockNumber,
    };

    // For each product, check if this client ordered it
    products.forEach((product) => {
      const productId = product.value || product.productId;
      const clientOrder = product.clients?.find(
        (c) =>
          (c.id || c.clientId || c.name || c.clientName) === client.clientId
      );

      // Add count for this product
      row[productId] = clientOrder ? clientOrder.count || 0 : 0;
    });

    return row;
  });
};

/**
 * Calculate summary row for a group of clients
 * @param {Array} clientsGroup - Array of client rows
 * @param {Array} products - Array of products
 * @returns {Object} Summary row
 */
const calculateSummary = (clientsGroup, products) => {
  const summary = {
    key: `summary-${clientsGroup[0]?.stockType || 'unknown'}`,
    clientName: 'Итого',
    stockType: clientsGroup[0]?.stockType,
    isGroupHeader: false,
    isSummary: true,
  };

  // Sum up each product column
  products.forEach((product) => {
    const productId = product.value || product.productId;
    summary[productId] = clientsGroup.reduce(
      (sum, row) => sum + (row[productId] || 0),
      0
    );
  });

  return summary;
};

/**
 * Build top summary rows (Наличие, Заказано, Остаток)
 * @param {Array} products - Array of products
 * @param {string} scheduleName - Schedule name
 * @param {string} dataSource - Data source ('orders' or 'saved')
 * @returns {Array} Array of summary row objects
 */
const buildTopSummaryRows = (products, scheduleName, dataSource) => {
  const rows = [];

  // Row 1: Наличие (Available)
  const valueRow = {
    key: 'summary-value',
    clientName: 'Наличие',
    isTopSummary: true,
    summaryType: 'value',
  };
  products.forEach((product) => {
    const productId = product.value || product.productId;
    valueRow[productId] = getAvailableCount(product, scheduleName);
  });
  rows.push(valueRow);

  // Row 2: Заказано (Ordered)
  const totalCountRow = {
    key: 'summary-totalCount',
    clientName: 'Заказано',
    isTopSummary: true,
    summaryType: 'totalCount',
  };
  products.forEach((product) => {
    const productId = product.value || product.productId;
    totalCountRow[productId] = getOrderedCount(product, dataSource);
  });
  rows.push(totalCountRow);

  // Row 3: Остаток (Remainder)
  const differenceRow = {
    key: 'summary-difference',
    clientName: 'Остаток',
    isTopSummary: true,
    summaryType: 'difference',
  };
  products.forEach((product) => {
    const productId = product.value || product.productId;
    const availableValue = getAvailableCount(product, scheduleName);
    const orderedValue = getOrderedCount(product, dataSource);
    differenceRow[productId] = availableValue - orderedValue;
  });
  rows.push(differenceRow);

  return rows;
};

/**
 * Build complete table data for schedule card
 * @param {Object} schedule - Schedule object with products array
 * @param {string} dataSource - Data source ('orders' or 'saved')
 * @returns {Array} Complete table data with all rows
 */
export const buildScheduleTableData = (schedule, dataSource) => {
  const finalData = [];

  // Add top summary rows
  const summaryRows = buildTopSummaryRows(
    schedule.products,
    schedule.scheduleName,
    dataSource
  );
  finalData.push(...summaryRows);

  // Build client rows
  const rows = buildClientRows(schedule.products);

  // Group by stockType and sort by stockNumber
  const stockClients = rows
    .filter((r) => r.stockType === 'stock')
    .sort((a, b) => (a.stockNumber || 0) - (b.stockNumber || 0));

  const shopClients = rows
    .filter((r) => r.stockType === 'shop')
    .sort((a, b) => (a.stockNumber || 0) - (b.stockNumber || 0));

  // Add stock group if exists
  if (stockClients.length > 0) {
    finalData.push({
      key: 'header-stock',
      clientName: 'СКЛАД',
      stockType: 'stock',
      isGroupHeader: true,
    });
    finalData.push(...stockClients);
    finalData.push(calculateSummary(stockClients, schedule.products));
  }

  // Add shop group if exists
  if (shopClients.length > 0) {
    finalData.push({
      key: 'header-shop',
      clientName: 'МАГАЗИН',
      stockType: 'shop',
      isGroupHeader: true,
    });
    finalData.push(...shopClients);
    finalData.push(calculateSummary(shopClients, schedule.products));
  }

  return finalData;
};
