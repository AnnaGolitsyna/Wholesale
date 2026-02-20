import { useState } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Empty, theme, Flex } from 'antd';
import useSearchParamState from '../../../../hook/useSearchParamState';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import { getNextMonday } from '../../utils/dateUtils';
import { useTransfersDashboardData } from '../../hooks/useTransfersDashboardData';
import SavedNextWeekFilters from '../transfersDashboard/SavedNextWeekFilters';
import ScheduleCardList from '../transfersDashboard/ScheduleCardList';
import CreateWeekInvoicesButton from '../transfersDashboard/CreateWeekInvoicesButton';

const OrdersTab = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(getNextMonday());
  const [month] = useSearchParamState('month', getThisMonth(), getShortMonthFormat);
  const { token } = theme.useToken();

  const { visibleSchedules, isLoading, hasError } = useTransfersDashboardData({
    data,
    month,
    activeTab: 'saved-nextWeek',
    selectedDate,
    selectedSchedule: 'all',
    sortOrder: 'desc',
  });

  if (!data || data.length === 0) {
    return <Empty description="Нет данных о раскладках" style={{ marginTop: '50px' }} />;
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
      <Flex vertical gap={16}>
        <Flex vertical>
          <SavedNextWeekFilters
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <CreateWeekInvoicesButton visibleSchedules={visibleSchedules} />
        </Flex>
        <ScheduleCardList
          visibleSchedules={visibleSchedules}
          isLoading={isLoading}
          hasError={hasError}
          activeTab="saved-nextWeek"
        />
      </Flex>
    </ConfigProvider>
  );
};

OrdersTab.propTypes = {
  data: PropTypes.array.isRequired,
};

export default OrdersTab;
