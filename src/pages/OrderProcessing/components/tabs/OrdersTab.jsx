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
  DatePicker,
} from 'antd';
import useSearchParamState from '../../../../hook/useSearchParamState';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import { groupBySchedule } from '../../utils/scheduleGrouping';
import { getNextSunday } from '../../utils/dateUtils';
import { useTransfersData } from '../../hooks/useTransfersData';
import { transformTransfersData, filterByWeek } from '../../utils/transfersDataUtils';
import ScheduleCard from '../transfersDashboard/ScheduleCard';

const { Text } = Typography;

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
  const [selectedDate, setSelectedDate] = useState(getNextSunday());
  const [month] = useSearchParamState('month', getThisMonth(), getShortMonthFormat);
  const { token } = theme.useToken();

  // Fetch transfers data using custom hook
  const { transfersData, isLoading: isLoadingTransfers, error: transfersError } =
    useTransfersData(month, selectedDate);

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
          // Determine actual data source based on whether schedule has date/docNumber
          const actualDataSource =
            schedule.date && schedule.docNumber ? 'saved' : 'orders';

          return (
            <ScheduleCard
              key={index}
              schedule={schedule}
              activeTab="saved-nextWeek"
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
              format={(value) => {
                if (!value) return '';
                const start = value.format('DD.MM.YYYY');
                const end = value.add(6, 'day').format('DD.MM.YYYY');
                return `${start} - ${end}`;
              }}
              placeholder="Выберите неделю"
              style={{ width: 250 }}
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
