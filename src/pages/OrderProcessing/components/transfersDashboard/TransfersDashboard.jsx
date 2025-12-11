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
} from 'antd';
import useSearchParamState from '../../../../hook/useSearchParamState';
import { getThisMonth } from '../../../../utils/dateUtils';
import {
  groupBySchedule,
  groupByDateAndDocNumber,
} from '../../utils/scheduleGrouping';
import { getNextSunday } from '../../utils/dateUtils';
import { useTransfersData } from '../../hooks/useTransfersData';
import { transformTransfersData, filterByWeek } from '../../utils/transfersDataUtils';
import ScheduleCard from './ScheduleCard';

const { Text } = Typography;

// Schedule filter groups configuration
const scheduleFilterGroups = {
  request: ['month', 'burda'],
};

const TransfersDashboard = ({ data, isActive }) => {
  // Combined tab key: 'orders-request', 'saved-all', 'saved-nextWeek'
  const [activeTab, setActiveTab] = useState('saved-nextWeek');
  const [selectedDate, setSelectedDate] = useState(getNextSunday());
  const [month] = useSearchParamState('month', getThisMonth());
  const { token } = theme.useToken();

  // Handle tab change and set appropriate date
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);

    // Set default date for saved-nextWeek tab to next Sunday
    if (newTab === 'saved-nextWeek') {
      setSelectedDate(getNextSunday());
    } else {
      setSelectedDate(null);
    }
  };

  // Fetch transfers data using custom hook
  const { transfersData, isLoading: isLoadingTransfers, error: transfersError } =
    useTransfersData(month, selectedDate);

  // Parse active tab to get data source and filter
  const [dataSource, filter] = useMemo(() => {
    const [source, filterValue] = activeTab.split('-');
    return [source, filterValue];
  }, [activeTab]);

  // Transform transfers data
  const filteredTransformedData = useMemo(
    () => transformTransfersData(transfersData, data),
    [transfersData, data]
  );

  // Filter by selected week
  const datePickerFilteredData = useMemo(
    () => filterByWeek(filteredTransformedData, selectedDate),
    [filteredTransformedData, selectedDate]
  );

  // For 'saved' data source, use the week-filtered data
  // The datePickerFilteredData already handles week filtering correctly
  const dateFilteredTransfers = datePickerFilteredData;

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
  }, [
    dataSource,
    data,
    filteredTransformedData,
    dateFilteredTransfers,
    filter,
  ]);

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
          // Determine actual data source based on whether schedule has date/docNumber
          // If schedule has date and docNumber, it's from saved transfers
          // Otherwise, it's from orders (even in saved-nextWeek tab for week schedule)
          const actualDataSource =
            schedule.date && schedule.docNumber ? 'saved' : 'orders';

          return (
            <ScheduleCard
              key={index}
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
              format={(value) => {
                if (!value) return '';
                const start = value.format('DD.MM.YYYY');
                const end = value.add(6, 'day').format('DD.MM.YYYY');
                return `${start} - ${end}`;
              }}
              placeholder="Выберите неделю"
              allowClear={activeTab === 'saved-all'}
              disabled={activeTab !== 'saved-all'}
              style={{ width: 250, marginLeft: '8px' }}
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
