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
  DatePicker,
} from 'antd';
import { getTransfersListRef } from '../../api/transfers_firebaseRefs';
import useSearchParamState from '../../../../hook/useSearchParamState';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import {
  groupBySchedule,
} from '../../utils/scheduleGrouping';
import ScheduleCard from '../transfersDashboard/ScheduleCard';
import dayjs from 'dayjs';

const { Text } = Typography;

// Get next Wednesday from today
const getNextWednesday = () => {
  const today = dayjs();
  const currentDay = today.day(); // 0 = Sunday, 3 = Wednesday
  const daysUntilWednesday = (3 - currentDay + 7) % 7;

  // If today is Wednesday, get next Wednesday (7 days)
  // Otherwise, get the upcoming Wednesday
  const daysToAdd = daysUntilWednesday === 0 ? 7 : daysUntilWednesday;

  return today.add(daysToAdd, 'day');
};

/**
 * OrdersTab Component
 *
 * Displays saved transfers for the next week
 * Features:
 * - Week date picker for filtering
 * - Shows week schedule data combined with filtered transfers
 * - Schedule cards grouped by schedule type
 */
const OrdersTab = ({ data }) => {
  const [hoveredPopovers, setHoveredPopovers] = useState({});
  const [selectedDate, setSelectedDate] = useState(getNextWednesday());
  const [month] = useSearchParamState(
    'month',
    getThisMonth(),
    getShortMonthFormat
  );
  const { token } = theme.useToken();

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

    // Sort by date (newest first)
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

  // Combine week schedule data from orders with filtered transfers
  const sourceData = useMemo(() => {
    const weekScheduleData = (data || []).filter(
      (item) => item.scedule === 'week'
    );
    return [...weekScheduleData, ...(datePickerFilteredData || [])];
  }, [data, datePickerFilteredData]);

  // Group data by schedule
  const scheduleGroups = useMemo(() => {
    return groupBySchedule(sourceData);
  }, [sourceData]);

  // Render content
  const renderContent = () => {
    if (transfersError) {
      return (
        <Empty
          description="Ошибка загрузки данных"
          style={{ marginTop: '50px' }}
        />
      );
    }

    if (isLoadingTransfers) {
      return (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" tip="Загрузка раскладок...">
            <div style={{ minHeight: '200px' }} />
          </Spin>
        </div>
      );
    }

    if (scheduleGroups.length === 0) {
      return (
        <Empty
          description="Нет данных для отображения"
          style={{ marginTop: '50px' }}
        />
      );
    }

    return (
      <Flex wrap="wrap" gap={16}>
        {scheduleGroups.map((schedule, index) => {
          const popoverKey = schedule.scheduleName;

          // Determine actual data source based on whether schedule has date/docNumber
          const actualDataSource =
            schedule.date && schedule.docNumber ? 'saved' : 'orders';

          return (
            <ScheduleCard
              key={index}
              schedule={schedule}
              activeTab="saved-nextWeek"
              popoverKey={popoverKey}
              hoveredPopovers={hoveredPopovers}
              onHoverChange={handleHoverChange}
              dataSource={actualDataSource}
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
        {/* DatePicker for filtering by week */}
        <Space
          direction="vertical"
          size="middle"
          style={{ width: '100%', marginBottom: '16px' }}
        >
          <Flex justify="space-between" align="center">
            <Text strong>Фильтр по неделе:</Text>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              style={{ width: 200 }}
              picker="week"
              disabled
            />
          </Flex>
        </Space>

        {/* Schedule Cards */}
        {renderContent()}
      </div>
    </ConfigProvider>
  );
};

OrdersTab.propTypes = {
  data: PropTypes.array.isRequired,
};

export default OrdersTab;
