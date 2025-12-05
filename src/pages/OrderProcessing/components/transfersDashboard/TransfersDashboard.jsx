import React, { useMemo, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import PropTypes from 'prop-types';
import {
  Flex,
  Empty,
  Space,
  Typography,
  ConfigProvider,
  theme,
  Spin,
  Tabs,
  DatePicker,
} from 'antd';
import { getTransfersListRef } from '../../api/transfers_firebaseRefs';
import useSearchParamState from '../../../../hook/useSearchParamState';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import {
  groupBySchedule,
  groupByDateAndDocNumber,
} from '../../utils/scheduleGrouping';
import ScheduleCard from './ScheduleCard';
import dayjs from 'dayjs';

const { Text } = Typography;

// Schedule filter groups configuration
const scheduleFilterGroups = {
  request: ['month', 'burda'],
};

const TransfersDashboard = ({ data, isActive }) => {
  // Combined tab key: 'orders-request', 'saved-all', 'saved-nextWeek'
  const [activeTab, setActiveTab] = useState('saved-nextWeek');
  const [hoveredPopovers, setHoveredPopovers] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [month] = useSearchParamState(
    'month',
    getThisMonth(),
    getShortMonthFormat
  );
  const { token } = theme.useToken();

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
  }, [month, selectedDate]);

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
  const filteredTransformedData = useMemo(() => {
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

  // Filter by selected week (from DatePicker with week picker)
  const datePickerFilteredData = useMemo(() => {
    if (!selectedDate) return filteredTransformedData;

    // Get start and end of the selected week
    const weekStart = selectedDate.startOf('week').format('YYYY-MM-DD');
    const weekEnd = selectedDate.endOf('week').format('YYYY-MM-DD');

    return filteredTransformedData.filter((item) => {
      if (!item.date) return false;
      return item.date >= weekStart && item.date <= weekEnd;
    });
  }, [filteredTransformedData, selectedDate]);

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

  // Determine source data based on data source selector and schedule
  const sourceData = useMemo(() => {
    if (dataSource === 'orders') {
      // For orders, use data for 'month', 'burda', 'week' schedules, filteredTransformedData for others
      const monthBurdaWeekData = (data || []).filter((item) =>
        ['month', 'burda', 'week'].includes(item.scedule)
      );
      const otherScheduleData = filteredTransformedData.filter(
        (item) => !['month', 'burda', 'week'].includes(item.scedule)
      );
      return [...monthBurdaWeekData, ...otherScheduleData];
    }

    // For 'saved-nextWeek' tab, combine week schedule data and filtered transfers
    if (filter === 'nextWeek') {
      const weekScheduleData = (data || []).filter(
        (item) => item.scedule === 'week'
      );
      return [...weekScheduleData, ...(dateFilteredTransfers || [])];
    }

    return dateFilteredTransfers || [];
  }, [dataSource, data, filteredTransformedData, dateFilteredTransfers, filter]);

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

    // For 'orders' data source with 'request' filter, apply schedule type filtering
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
            <ScheduleCard
              key={index}
              schedule={schedule}
              activeTab={activeTab}
              popoverKey={popoverKey}
              hoveredPopovers={hoveredPopovers}
              onHoverChange={handleHoverChange}
              dataSource={dataSource}
            />
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
          <Flex justify="flex-end" align="center">
            <Text strong>Фильтр по неделе:</Text>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              allowClear={activeTab === 'saved-all'}
              disabled={activeTab !== 'saved-all'}
              style={{ width: 200, marginLeft: '8px' }}
              picker="week"
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
