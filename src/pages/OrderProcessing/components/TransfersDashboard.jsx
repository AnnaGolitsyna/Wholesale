import React, { useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import {
  Flex,
  Card,
  Statistic,
  Empty,
  Space,
  Tag,
  Typography,
  ConfigProvider,
  List,
  theme,
  Popover,
  Spin,
  Tabs,
  DatePicker,
} from 'antd';
import {
  CalendarOutlined,
  ShoppingOutlined,
  PrinterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { scheduleType, refundsType } from '../../../constants/productsDetail';
import { getTransfersListRef } from '../api/transfers_firebaseRefs';
import useSearchParamState from '../../../hook/useSearchParamState';
import { getThisMonth, getShortMonthFormat } from '../../../utils/dateUtils';
import dayjs from 'dayjs';

const { Text } = Typography;

// Schedule filter groups configuration
const scheduleFilterGroups = {
  nextWeek: ['week', 'pk', 'zenit', 'lvov'],
  request: ['month', 'burda', 'yarmarka'],
};

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

    if (!acc[schedule]) {
      acc[schedule] = {
        scheduleName: schedule,
        products: [],
        totalProducts: 0,
        totalQuantity: 0,
        totalClients: 0,
        refundsTypes: new Set(),
        createdDates: [],
        isBarter: false,
        weeklyCount: 0,
      };
    }

    acc[schedule].products.push(product);
    acc[schedule].totalProducts += 1;
    acc[schedule].totalQuantity += product.totalCount || 0;

    // Count unique clients
    if (product.clients && Array.isArray(product.clients)) {
      acc[schedule].totalClients += product.clients.length;
    }

    if (product.refundsType) {
      acc[schedule].refundsTypes.add(product.refundsType);
    }

    if (product.createdAt) {
      acc[schedule].createdDates.push(product.createdAt);
    }

    if (product.isBarter) {
      acc[schedule].isBarter = true;
    }

    if (product.weekly) {
      acc[schedule].weeklyCount += 1;
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
        scheduleName: item.scedule,
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
      .flatMap((p) =>
        (p.clients || []).map((c) => c.name || c.clientName || '')
      )
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

// Popover content for Products List
const ProductsPopoverContent = ({ products }) => (
  <div style={{ maxWidth: '350px', maxHeight: '400px', overflowY: 'auto' }}>
    <List
      size="small"
      dataSource={products}
      renderItem={(product) => (
        <List.Item style={{ padding: '8px 0' }}>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text strong style={{ fontSize: '13px', flex: 1 }}>
                {product.productName || product.label}
              </Text>
              <Tag color="blue" style={{ margin: 0 }}>
                {product.totalCount}
              </Tag>
            </div>
            {product.clients && product.clients.length > 0 && (
              <Text type="secondary" style={{ fontSize: '11px' }}>
                <UserOutlined style={{ marginRight: '4px' }} />
                {product.clients.map((c) => c.name || c.clientName).join(', ')}
              </Text>
            )}
          </Space>
        </List.Item>
      )}
    />
  </div>
);

ProductsPopoverContent.propTypes = {
  products: PropTypes.array.isRequired,
};

const TransfersDashboard = ({ data }) => {
  // Combined tab key: 'orders-all', 'orders-request', 'saved-all', 'saved-nextWeek'
  const [activeTab, setActiveTab] = useState('orders-all');
  const [hoveredPopovers, setHoveredPopovers] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useSearchParamState(
    'month',
    getThisMonth(),
    getShortMonthFormat
  );
  const { token } = theme.useToken();

  // Fetch transfers data
  const transfersListRef = useMemo(() => getTransfersListRef(month), [month]);
  const [transfersData, isLoadingTransfers, transfersError] =
    useCollectionData(transfersListRef);

  // Parse active tab to get data source and filter
  const [dataSource, filter] = useMemo(() => {
    const [source, filterValue] = activeTab.split('-');
    return [source, filterValue];
  }, [activeTab]);

  // Popover handlers
  const handleHoverChange = (scheduleName, open) => {
    setHoveredPopovers((prev) => ({ ...prev, [scheduleName]: open }));
  };

  // Filter and transform transfers data to match products in data array
  const i = useMemo(() => {
    if (!transfersData || !data) return [];

    // Create a map of product IDs to their data for quick lookup
    const productMap = new Map(
      data.map((product) => [product.value || product.productId, product])
    );

    // Transform and filter transfers
    const transformedData = transfersData.flatMap((transfer) => {
      // Filter items that match products in data
      const matchingItems = transfer.items.filter((item) =>
        productMap.has(item.productId)
      );

      if (matchingItems.length === 0) return [];

      // Transform each matching item into the product summary format
      return matchingItems.map((item) => {
        // Get the matching product from data to access its clients
        const matchingProduct = productMap.get(item.productId);

        return {
          productName: item.productName,
          label: item.productName,
          value: item.productId,
          totalCount: item.count,
          scedule: transfer.scedule,
          clients: matchingProduct?.clients || [],
          createdAt: transfer.timestamp || transfer.date,
          date: transfer.date,
          docNumber: transfer.docNumber,
        };
      });
    });

    // Sort by date (newest first) - important for filtering by date later
    return transformedData.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
  }, [transfersData, data]);

  console.log('data:', data, 'transferdata:', transfersData);

  console.log('i', i);

  // Filter by selected week (from DatePicker with week picker)
  const datePickerFilteredData = useMemo(() => {
    if (!selectedDate) return i;

    // Get start and end of the selected week
    const weekStart = selectedDate.startOf('week').format('YYYY-MM-DD');
    const weekEnd = selectedDate.endOf('week').format('YYYY-MM-DD');

    return i.filter((item) => {
      if (!item.date) return false;
      return item.date >= weekStart && item.date <= weekEnd;
    });
  }, [i, selectedDate]);

  // Filter saved transfers by date if needed
  const dateFilteredTransfers = useMemo(() => {
    if (dataSource !== 'saved' || filter === 'all') {
      return datePickerFilteredData;
    }

    if (filter === 'nextWeek') {
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);

      return datePickerFilteredData.filter((item) => {
        if (!item.createdAt) return false;
        const itemDate = new Date(item.createdAt);
        return itemDate >= now && itemDate <= nextWeek;
      });
    }

    return datePickerFilteredData;
  }, [datePickerFilteredData, dataSource, filter]);

  // Determine source data based on data source selector
  const sourceData = useMemo(() => {
    if (dataSource === 'orders') {
      return data || [];
    } else {
      return dateFilteredTransfers || [];
    }
  }, [dataSource, data, dateFilteredTransfers]);

  // Group data by schedule or by date+docNumber
  const scheduleGroups = useMemo(() => {
    // For 'saved-all' tab, group by date and docNumber
    if (activeTab === 'saved-all') {
      return groupByDateAndDocNumber(sourceData);
    }
    // For other tabs, group by schedule
    return groupBySchedule(sourceData);
  }, [sourceData, activeTab]);

  // Apply schedule type filtering
  const filteredSchedules = useMemo(() => {
    // For 'saved' data source, no schedule filtering
    if (dataSource === 'saved') {
      return scheduleGroups;
    }

    // For 'orders' data source, apply schedule type filtering
    if (filter === 'all') {
      return scheduleGroups;
    }

    if (filter === 'request' && scheduleFilterGroups.request) {
      return scheduleGroups.filter((schedule) =>
        scheduleFilterGroups.request.includes(schedule.scheduleName)
      );
    }

    return scheduleGroups;
  }, [scheduleGroups, dataSource, filter]);

  // Determine loading state
  const isLoading = useMemo(() => {
    return dataSource === 'saved' ? isLoadingTransfers : false;
  }, [dataSource, isLoadingTransfers]);

  // Check for errors
  const hasError = useMemo(() => {
    return dataSource === 'saved' ? !!transfersError : false;
  }, [dataSource, transfersError]);

  // Render content for tabs
  const renderContent = () => {
    if (hasError) {
      return (
        <Empty
          description="Ошибка загрузки данных"
          style={{ marginTop: '50px' }}
        />
      );
    }

    if (isLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" tip="Загрузка раскладок...">
            <div style={{ minHeight: '200px' }} />
          </Spin>
        </div>
      );
    }

    if (filteredSchedules.length === 0) {
      return (
        <Empty
          description="Нет данных для отображения"
          style={{ marginTop: '50px' }}
        />
      );
    }

    return (
      <Flex wrap="wrap" gap={16}>
        {filteredSchedules.map((schedule, index) => {
          // Create unique key for popover state
          const popoverKey =
            activeTab === 'saved-all'
              ? `${schedule.date}_${schedule.docNumber}`
              : schedule.scheduleName;

          return (
            <Card
              key={index}
              hoverable
              style={{
                flex: '1 1 200px',
                maxWidth: '300px',
              }}
              title={
                activeTab === 'saved-all' ? (
                  <Space direction="vertical" size={0}>
                    <Space>
                      <CalendarOutlined />
                      <Text strong>{schedule.date}</Text>
                    </Space>
                    <Tag color={scheduleType[schedule.scheduleName]?.color}>
                      {scheduleType[schedule.scheduleName]?.label}
                    </Tag>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Документ №{schedule.docNumber}
                    </Text>
                  </Space>
                ) : (
                  <Space>
                    <CalendarOutlined
                      style={{
                        color: scheduleType[schedule.scheduleName]?.color,
                      }}
                    />
                    <Tag color={scheduleType[schedule.scheduleName]?.color}>
                      {scheduleType[schedule.scheduleName]?.label}
                    </Tag>
                  </Space>
                )
              }
              extra={<PrinterOutlined />}
              styles={{
                body: { padding: '16px' },
              }}
            >
              <Card style={{ border: 'none', marginBottom: '16px' }}>
                {/* First Card.Grid with Popover */}
                <Popover
                  content={
                    <ProductsPopoverContent products={schedule.products} />
                  }
                  title={
                    <Space>
                      <ShoppingOutlined />
                      <span>Список товаров</span>
                    </Space>
                  }
                  trigger="hover"
                  placement="bottom"
                  overlayStyle={{ maxWidth: '400px' }}
                  open={hoveredPopovers[popoverKey]}
                  onOpenChange={(open) => handleHoverChange(popoverKey, open)}
                >
                  <Card.Grid
                    style={{
                      width: '50%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    hoverable
                  >
                    <Statistic
                      title="Товаров"
                      value={schedule.totalProducts}
                      valueStyle={{ fontSize: '20px' }}
                    />
                  </Card.Grid>
                </Popover>

                {/* Second Card.Grid without Popover */}
                <Card.Grid hoverable={false} style={{ width: '50%' }}>
                  <Statistic
                    title="Клиентов"
                    value={schedule.uniqueClients}
                    valueStyle={{ fontSize: '20px' }}
                  />
                </Card.Grid>
              </Card>

              {/* Refunds Types */}
              {schedule.refundsTypes.length > 0 && (
                <div>
                  <Text
                    type="secondary"
                    style={{
                      fontSize: '12px',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Типы возврата:
                  </Text>
                  <Space wrap size={[4, 4]}>
                    {schedule.refundsTypes.map((type, idx) => (
                      <Tag
                        key={idx}
                        style={{
                          background: refundsType[type]?.color,
                          border: '1px solid #2c5f5d',
                          margin: 0,
                        }}
                      >
                        {refundsType[type]?.label}
                      </Tag>
                    ))}
                  </Space>
                </div>
              )}
            </Card>
          );
        })}
      </Flex>
    );
  };

  if (!data || data.length === 0) {
    return (
      <Empty
        description="Нет данных о раскладках"
        style={{ marginTop: '50px' }}
      />
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBorderSecondary: token.saleOrderAccent,
            colorBgContainer: token.colorBgBaseDark,
          },
        },
      }}
    >
      <div>
        {/* DatePicker for filtering by date */}
        <Space
          direction="vertical"
          size="middle"
          style={{ width: '100%', marginBottom: '16px' }}
        >
          <Flex justify="flex-end" align='center'>
            <Text strong>Фильтр по неделе:</Text>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              allowClear
              style={{ width: 200, marginLeft: '8px' }}
              picker='week'
            />
          </Flex>
        </Space>

        {/* Vertical Tabs for Data Source and Filters */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabPosition="right"
          items={[
            {
              key: 'orders-all',
              label: 'Все',
              children: renderContent(),
            },
            {
              key: 'orders-request',
              label: 'По требованию',
              children: renderContent(),
            },
            {
              key: 'saved-all',
              label: 'Сохраненные',
              children: renderContent(),
            },
            {
              key: 'saved-nextWeek',
              label: 'Следующая неделя',
              children: renderContent(),
            },
          ]}
          style={{ minHeight: '400px' }}
        />
      </div>
    </ConfigProvider>
  );
};

TransfersDashboard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TransfersDashboard;
