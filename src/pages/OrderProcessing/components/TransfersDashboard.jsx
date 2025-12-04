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
import {
  groupBySchedule,
  groupByDateAndDocNumber,
  getScheduleStatistics,
} from '../utils/scheduleGrouping';
import dayjs from 'dayjs';

const { Text } = Typography;

// Schedule filter groups configuration
const scheduleFilterGroups = {
  // nextWeek: ['week', 'pk', 'zenit', 'lvov'],
  request: ['month', 'burda', 'yarmarka'],
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

const TransfersDashboard = ({ data, isActive }) => {
  // Combined tab key: 'orders-all', 'orders-request', 'saved-all', 'saved-nextWeek'
  const [activeTab, setActiveTab] = useState('orders-all');
  const [hoveredPopovers, setHoveredPopovers] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [month, setMonth] = useSearchParamState(
    'month',
    getThisMonth(),
    getShortMonthFormat
  );
  const { token } = theme.useToken();

  // Trigger refresh when component becomes active
  React.useEffect(() => {
    if (isActive) {
      setRefreshKey((prev) => prev + 1);
    }
  }, [isActive]);

  // Handle tab change and set appropriate date
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);

    // Set default date for saved-nextWeek tab
    if (newTab === 'saved-nextWeek') {
      setSelectedDate(dayjs().add(7, 'day'));
    } else {
      setSelectedDate(null);
    }
  };

  // Fetch transfers data - handle weeks spanning two months
  const transfersRefs = useMemo(() => {
    const refs = [getTransfersListRef(month)];

    // If a week is selected and it spans two months, fetch from both
    if (selectedDate) {
      const weekStart = selectedDate.startOf('week');
      const weekEnd = selectedDate.endOf('week');

      if (weekStart.month() !== weekEnd.month()) {
        const secondMonth = getShortMonthFormat(weekEnd.toDate());
        if (secondMonth !== month) {
          refs.push(getTransfersListRef(secondMonth));
        }
      }
    }

    return refs;
  }, [month, selectedDate, refreshKey]);

  // Fetch from first month
  const [transfersData1, isLoadingTransfers1, transfersError1] =
    useCollectionData(transfersRefs[0]);

  // Fetch from second month if needed
  const [transfersData2, isLoadingTransfers2, transfersError2] =
    useCollectionData(transfersRefs.length > 1 ? transfersRefs[1] : null);

  // Combine transfers from both months
  const transfersData = useMemo(() => {
    const combined = [...(transfersData1 || [])];
    if (transfersData2 && transfersRefs.length > 1) {
      combined.push(...transfersData2);
    }
    return combined;
  }, [transfersData1, transfersData2, transfersRefs.length]);

  const isLoadingTransfers = isLoadingTransfers1 || isLoadingTransfers2;
  const transfersError = transfersError1 || transfersError2;

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
        if (!item.date) return false;
        const itemDate = new Date(item.date);
        return itemDate >= now && itemDate <= nextWeek;
      });
    }

    return datePickerFilteredData;
  }, [datePickerFilteredData, dataSource, filter]);

  // Determine source data based on data source selector
  const sourceData = useMemo(() => {
    if (dataSource === 'orders') {
      return data || [];
    }

    // For 'saved-nextWeek' tab, combine week schedule data and filtered transfers
    if (filter === 'nextWeek') {
      const weekScheduleData = (data || []).filter(
        (item) => item.scedule === 'week'
      );
      return [...weekScheduleData, ...(dateFilteredTransfers || [])];
    }

    return dateFilteredTransfers || [];
  }, [dataSource, data, dateFilteredTransfers, filter]);

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
              allowClear={activeTab === 'saved-all'}
              disabled={activeTab !== 'saved-all'}
              style={{ width: 200, marginLeft: '8px' }}
              picker='week'
            />
          </Flex>
        </Space>

        {/* Vertical Tabs for Data Source and Filters */}
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
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
  isActive: PropTypes.bool,
};

export default TransfersDashboard;
