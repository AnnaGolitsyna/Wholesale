import { scheduleType } from '../../../constants/productsDetail';

/**
 * Groups product summary data by schedule
 * @param {Array} productSummary - Array of products from useProductSummary
 * @returns {Array} - Grouped data by schedule with statistics
 */
export const groupBySchedule = (productSummary) => {
  if (!productSummary || productSummary.length === 0) {
    return [];
  }

  const grouped = productSummary.reduce((acc, product) => {
    // ⚠️ Note: The field is "scedule" (typo in data), not "schedule"
    const schedule = product.scedule || 'unassigned';
    // Saved transfers must not be merged — use docNumber as part of the key when present
    const key = product.docNumber ? `${schedule}_${product.docNumber}` : schedule;

    if (!acc[key]) {
      acc[key] = {
        scheduleName: schedule,
        dataSource: product.docNumber ? 'saved' : 'orders',
        stockType: product.stockType || null,
        products: [],
        totalProducts: 0,
        totalQuantity: 0,
        totalClients: 0,
        refundsTypes: new Set(),
        createdDates: [],
        isBarter: false,
        weeklyCount: 0,
        date: product.date,
        docNumber: product.docNumber,
      };
    }

    acc[key].products.push(product);
    acc[key].totalProducts += 1;
    acc[key].totalQuantity += product.totalCount || 0;

    // Count unique clients
    if (product.clients && Array.isArray(product.clients)) {
      acc[key].totalClients += product.clients.length;
    }

    if (product.refundsType) {
      acc[key].refundsTypes.add(product.refundsType);
    }

    if (product.createdAt) {
      acc[key].createdDates.push(product.createdAt);
    }

    if (product.isBarter) {
      acc[key].isBarter = true;
    }

    if (product.weekly) {
      acc[key].weeklyCount += 1;
    }

    return acc;
  }, {});

  // Convert to array and add additional statistics
  return Object.values(grouped)
    .map((schedule) => {
      // Get unique client names
      const allClientNames = schedule.products
        .flatMap((p) =>
          (p.clients || []).map((c) => c.name || c.clientName || '')
        )
        .filter(Boolean);

      const uniqueClients = new Set(allClientNames).size;

      // Find most recent update
      const lastUpdated =
        schedule.createdDates.length > 0
          ? new Date(Math.max(...schedule.createdDates.map((d) => new Date(d))))
          : null;

      return {
        ...schedule,
        refundsTypes: Array.from(schedule.refundsTypes),
        uniqueClients,
        lastUpdated,
      };
    })
    .sort((a, b) => {
      // Sort by schedule priority
      if (a.scheduleName === 'unassigned') return 1;
      if (b.scheduleName === 'unassigned') return -1;

      const priorityA = scheduleType[a.scheduleName]?.priority || 999;
      const priorityB = scheduleType[b.scheduleName]?.priority || 999;

      return priorityA - priorityB;
    });
};

/**
 * Groups transfer data by date and docNumber
 * @param {Array} transfersData - Array of transfer items
 * @returns {Array} - Grouped data by date and docNumber
 */
export const groupByDateAndDocNumber = (transfersData) => {
  if (!transfersData || transfersData.length === 0) {
    return [];
  }

  const grouped = transfersData.reduce((acc, item) => {
    const key = `${item.date}_${item.docNumber}`;

    if (!acc[key]) {
      acc[key] = {
        date: item.date,
        docNumber: item.docNumber,
        docId: item.docId,
        scheduleName: item.scedule,
        dataSource: 'saved',
        stockType: item.stockType || null,
        products: [],
        totalProducts: 0,
        totalQuantity: 0,
        uniqueClients: 0,
        refundsTypes: new Set(),
      };
    }

    acc[key].products.push(item);
    acc[key].totalProducts += 1;
    acc[key].totalQuantity += item.totalCount || 0;

    // Collect refunds types
    if (item.refundsType) {
      acc[key].refundsTypes.add(item.refundsType);
    }

    return acc;
  }, {});

  // Convert to array and calculate unique clients
  return Object.values(grouped).map((group) => {
    const allClientNames = group.products
      .flatMap((p) => (p.clients || []).map((c) => c.name || c.clientName || ''))
      .filter(Boolean);

    const uniqueClients = new Set(allClientNames).size;

    return {
      ...group,
      uniqueClients,
      refundsTypes: Array.from(group.refundsTypes),
    };
  });
};

/**
 * Get schedule statistics summary
 * @param {Array} scheduleGroups - Grouped schedule data
 * @returns {Object} - Overall statistics
 */
export const getScheduleStatistics = (scheduleGroups) => {
  if (!scheduleGroups || scheduleGroups.length === 0) {
    return {
      totalSchedules: 0,
      totalProducts: 0,
      totalQuantity: 0,
      totalClients: 0,
      schedulesByType: {},
    };
  }

  return {
    totalSchedules: scheduleGroups.length,
    totalProducts: scheduleGroups.reduce((sum, s) => sum + s.totalProducts, 0),
    totalQuantity: scheduleGroups.reduce((sum, s) => sum + s.totalQuantity, 0),
    totalClients: scheduleGroups.reduce((sum, s) => sum + s.uniqueClients, 0),
    schedulesByType: scheduleGroups.reduce((acc, s) => {
      acc[s.scheduleName] = s.totalProducts;
      return acc;
    }, {}),
    weeklyProducts: scheduleGroups.reduce((sum, s) => sum + s.weeklyCount, 0),
    barterSchedules: scheduleGroups.filter((s) => s.isBarter).length,
  };
};
