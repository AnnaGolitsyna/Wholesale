import React, { useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  Statistic,
  Segmented,
  Empty,
  Space,
  Tag,
  Typography,
  ConfigProvider,
  List,
  theme,
  Popover,
  Spin,
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
  // Two separate state managers for data source and filters
  const [dataSource, setDataSource] = useState('orders'); // 'orders' | 'saved'
  const [ordersFilter, setOrdersFilter] = useState('all'); // 'all' | 'request'
  const [savedFilter, setSavedFilter] = useState('all'); // 'all' | 'nextWeek'
  
  const [hoveredPopovers, setHoveredPopovers] = useState({});
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

  console.log('transferData', transfersData);

  // Popover handlers
  const handleHoverChange = (scheduleName, open) => {
    setHoveredPopovers((prev) => ({ ...prev, [scheduleName]: open }));
  };

  // Filter and transform transfers data to match products in data array
  const filteredTransfersData = useMemo(() => {
    if (!transfersData || !data) return [];

    // Get all product IDs from the data array
    const productIds = new Set(
      data.map((product) => product.value || product.productId)
    );

    // Transform and filter transfers
    const transformedData = transfersData.flatMap((transfer) => {
      // Filter items that match products in data
      const matchingItems = transfer.items.filter((item) =>
        productIds.has(item.productId)
      );

      if (matchingItems.length === 0) return [];

      // Transform each matching item into the product summary format
      return matchingItems.map((item) => ({
        productName: item.productName,
        label: item.productName,
        value: item.productId,
        totalCount: item.count,
        scedule: transfer.scedule,
        clients: transfer.contractor
          ? [
              {
                name: transfer.contractor.name,
                id: transfer.contractor.id,
              },
            ]
          : [],
        createdAt: transfer.timestamp || transfer.date,
      }));
    });

    // Sort by date (newest first) - important for filtering by date later
    return transformedData.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
  }, [transfersData, data]);

  console.log('filteredTransfersData', filteredTransfersData);

  // Filter saved transfers by date if needed
  const dateFilteredTransfers = useMemo(() => {
    if (dataSource !== 'saved' || savedFilter === 'all') {
      return filteredTransfersData;
    }

    if (savedFilter === 'nextWeek') {
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);

      return filteredTransfersData.filter((item) => {
        if (!item.createdAt) return false;
        const itemDate = new Date(item.createdAt);
        return itemDate >= now && itemDate <= nextWeek;
      });
    }

    return filteredTransfersData;
  }, [filteredTransfersData, dataSource, savedFilter]);

  // Determine source data based on data source selector
  const sourceData = useMemo(() => {
    if (dataSource === 'orders') {
      return data || [];
    } else {
      return dateFilteredTransfers || [];
    }
  }, [dataSource, data, dateFilteredTransfers]);

  // Group data by schedule
  const scheduleGroups = useMemo(() => {
    return groupBySchedule(sourceData);
  }, [sourceData]);

  // Apply schedule type filtering
  const filteredSchedules = useMemo(() => {
    // For 'saved' data source, no schedule filtering
    if (dataSource === 'saved') {
      return scheduleGroups;
    }

    // For 'orders' data source, apply schedule type filtering
    if (ordersFilter === 'all') {
      return scheduleGroups;
    }

    if (ordersFilter === 'request' && scheduleFilterGroups.request) {
      return scheduleGroups.filter((schedule) =>
        scheduleFilterGroups.request.includes(schedule.scheduleName)
      );
    }

    return scheduleGroups;
  }, [scheduleGroups, dataSource, ordersFilter]);

  // Determine loading state
  const isLoading = useMemo(() => {
    return dataSource === 'saved' ? isLoadingTransfers : false;
  }, [dataSource, isLoadingTransfers]);

  // Check for errors
  const hasError = useMemo(() => {
    return dataSource === 'saved' ? !!transfersError : false;
  }, [dataSource, transfersError]);

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
        {/* Header with Overall Statistics */}
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Primary Filter: Data Source Selector */}
          <Segmented
            value={dataSource}
            onChange={(value) => {
              setDataSource(value);
              // Reset secondary filters when changing data source
              if (value === 'orders') {
                setOrdersFilter('all');
              } else {
                setSavedFilter('all');
              }
            }}
            options={[
              { label: 'Текущие заказы', value: 'orders' },
              { label: 'Сохраненные раскладки', value: 'saved' },
            ]}
            block
            size="large"
          />

          {/* Secondary Filter: Orders Filter (only when dataSource is 'orders') */}
          {dataSource === 'orders' && (
            <Segmented
              value={ordersFilter}
              onChange={setOrdersFilter}
              options={[
                { label: 'Все', value: 'all' },
                { label: 'По требованию', value: 'request' },
              ]}
              block
            />
          )}

          {/* Secondary Filter: Saved Transfers Filter (only when dataSource is 'saved') */}
          {dataSource === 'saved' && (
            <Segmented
              value={savedFilter}
              onChange={setSavedFilter}
              options={[
                { label: 'Все раскладки', value: 'all' },
                { label: 'Следующая неделя', value: 'nextWeek' },
              ]}
              block
            />
          )}

          {/* Error state */}
          {hasError ? (
            <Empty
              description="Ошибка загрузки данных"
              style={{ marginTop: '50px' }}
            />
          ) : /* Loading state */ isLoading ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <Spin size="large" />
              <div style={{ marginTop: '16px' }}>
                <Text type="secondary">Загрузка раскладок...</Text>
              </div>
            </div>
          ) : filteredSchedules.length === 0 ? (
            <Empty
              description="Нет данных для отображения"
              style={{ marginTop: '50px' }}
            />
          ) : (
            /* Schedule Cards Grid */
            <Row gutter={[16, 16]}>
              {filteredSchedules.map((schedule, index) => (
                <Col xs={24} sm={12} lg={8} xl={6} key={index}>
                  <Card
                    hoverable
                    title={
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
                          <ProductsPopoverContent
                            products={schedule.products}
                          />
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
                        open={hoveredPopovers[schedule.scheduleName]}
                        onOpenChange={(open) =>
                          handleHoverChange(schedule.scheduleName, open)
                        }
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
                </Col>
              ))}
            </Row>
          )}
        </Space>
      </div>
    </ConfigProvider>
  );
};

TransfersDashboard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TransfersDashboard;
