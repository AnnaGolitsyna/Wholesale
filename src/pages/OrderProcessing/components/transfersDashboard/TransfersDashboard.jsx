import React, { useMemo, useState } from 'react';
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
  Segmented,
} from 'antd';
import useSearchParamState from '../../../../hook/useSearchParamState';

import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import {
  groupBySchedule,
  groupByDateAndDocNumber,
} from '../../utils/scheduleGrouping';
import { getNextMonday, getMondayOfWeek } from '../../utils/dateUtils';
import { useTransfersData } from '../../hooks/useTransfersData';
import {
  transformTransfersData,
  filterByWeek,
} from '../../utils/transfersDataUtils';
import ScheduleCard from './ScheduleCard';

const { Text } = Typography;
const { RangePicker } = DatePicker;

// Schedule filter groups configuration
const scheduleFilterGroups = {
  request: ['month', 'burda'],
};

const TransfersDashboard = ({ data, isActive }) => {
  // Combined tab key: 'orders-request', 'saved-all', 'saved-nextWeek'
  const [activeTab, setActiveTab] = useState('saved-nextWeek');
  const [selectedDate, setSelectedDate] = useState(getNextMonday());
  const [selectedSchedule, setSelectedSchedule] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [month] = useSearchParamState('month', getThisMonth(), getShortMonthFormat);
  const { token } = theme.useToken();

  // Handle tab change and set appropriate date
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSelectedSchedule('all');
    setSortOrder('desc');

    // Set default date for saved-nextWeek tab to next Monday
    if (newTab === 'saved-nextWeek') {
      setSelectedDate(getNextMonday());
    } else {
      // For saved-all and orders tabs, clear date filter
      setSelectedDate(null);
    }
  };

  // Fetch transfers data using custom hook
  const {
    transfersData,
    isLoading: isLoadingTransfers,
    error: transfersError,
  } = useTransfersData(month, selectedDate);

  // Parse active tab to get data source and filter
  const [dataSource, filter] = useMemo(() => {
    const [source, filterValue] = activeTab.split('-');
    return [source, filterValue];
  }, [activeTab]);

  // Transform transfers data
  // For 'saved' data source, skip product filtering to show all saved transfers
  const filteredTransformedData = useMemo(
    () => transformTransfersData(transfersData, data, dataSource === 'saved'),
    [transfersData, data, dataSource]
  );

  // Filter by selected week
  const datePickerFilteredData = useMemo(
    () => filterByWeek(filteredTransformedData, selectedDate),
    [filteredTransformedData, selectedDate]
  );

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
      return [...weekScheduleData, ...(datePickerFilteredData || [])];
    }

    // For 'saved-all', return week-filtered transfers
    return datePickerFilteredData || [];
  }, [dataSource, data, filteredTransformedData, datePickerFilteredData, filter]);

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

  // Build Segmented options from unique schedule names in saved-all
  const scheduleSegmentOptions = useMemo(() => {
    if (activeTab !== 'saved-all') return [];
    const names = [...new Set(filteredSchedules.map((s) => s.scheduleName).filter(Boolean))];
    return [{ label: 'Все', value: 'all' }, ...names.map((name) => ({ label: name, value: name }))];
  }, [filteredSchedules, activeTab]);

  // Apply segment filter and date sorting for saved-all
  const visibleSchedules = useMemo(() => {
    let result =
      activeTab === 'saved-all' && selectedSchedule !== 'all'
        ? filteredSchedules.filter((s) => s.scheduleName === selectedSchedule)
        : filteredSchedules;

    if (activeTab === 'saved-all') {
      result = [...result].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
    }

    return result;
  }, [filteredSchedules, activeTab, selectedSchedule, sortOrder]);

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

    if (visibleSchedules.length === 0) {
      return (
        <Empty
          description="Нет данных для отображения"
          style={{ marginTop: '50px' }}
        />
      );
    }

    return (
      <Flex wrap="wrap" gap={16}>
        {visibleSchedules.map((schedule, index) => {
          // Determine actual data source based on whether schedule has date/docNumber
          // If schedule has date and docNumber, it's from saved transfers
          // Otherwise, it's from orders (even in saved-nextWeek tab for week schedule)
          const actualDataSource =
            schedule.date && schedule.docNumber ? 'saved' : 'orders';

          // Create unique key: use docId if available, otherwise scheduleName + index
          const uniqueKey =
            schedule.docId || `${schedule.scheduleName}-${index}`;

          return (
            <ScheduleCard
              key={uniqueKey}
              schedule={schedule}
              activeTab={activeTab}
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
        {/* DatePicker for filtering by week - show for saved tabs */}
        {activeTab === 'saved-nextWeek' && (
          <Space
            direction="vertical"
            size="middle"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <Flex justify="space-between" align="center">
              <Text strong>Фильтр по неделе:</Text>
              <DatePicker
                value={selectedDate}
                onChange={(date) => {
                  // Convert selected date to the Monday of that week
                  const monday = getMondayOfWeek(date);
                  setSelectedDate(monday);
                }}
                format={(value) => {
                  if (!value) return '';
                  const start = value.startOf('week').format('DD.MM.YYYY');
                  const end = value.endOf('week').format('DD.MM.YYYY');
                  return `${start} - ${end}`;
                }}
                placeholder="Выберите неделю"
                style={{ width: 250 }}
                picker="week"
              />
            </Flex>
          </Space>
        )}

        {/* RangePicker with week picker for saved-all tab */}
        {activeTab === 'saved-all' && (
          <Space
            direction="vertical"
            size="middle"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <Flex justify="space-between" align="center">
              {scheduleSegmentOptions.length > 1 && (
                <Segmented
                  options={scheduleSegmentOptions}
                  value={selectedSchedule}
                  onChange={setSelectedSchedule}
                />
              )}
              <Segmented
                options={[
                  { label: 'Новые', value: 'desc' },
                  { label: 'Старые', value: 'asc' },
                ]}
                value={sortOrder}
                onChange={setSortOrder}
              />
            </Flex>
            <Flex justify="space-between" align="center">
              <Text strong>Фильтр по неделе:</Text>
              <RangePicker
                value={
                  selectedDate
                    ? [selectedDate, selectedDate.add(6, 'day')]
                    : null
                }
                onChange={(dates) => {
                  if (!dates || !dates[0]) {
                    setSelectedDate(null);
                    return;
                  }
                  // Convert selected date to the Monday of that week
                  const monday = getMondayOfWeek(dates[0]);
                  setSelectedDate(monday);
                }}
                format="DD.MM.YYYY"
                placeholder={['Начало недели', 'Конец недели']}
                allowClear
                style={{ width: 300 }}
                picker="week"
              />
            </Flex>
          </Space>
        )}

        {/* Vertical Tabs for Data Source and Filters */}
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabPosition="right"
          items={[
            {
              key: 'saved-nextWeek',
              label: 'Следующая неделя',
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
          ]}
          style={{ minHeight: '400px' }}
          type="card"
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
