import PropTypes from 'prop-types';
import { ConfigProvider, Empty, Tabs, theme } from 'antd';
import useSearchParamState from '../../../../hook/useSearchParamState';
import { getThisMonth, getShortMonthFormat } from '../../../../utils/dateUtils';
import { useTransfersDashboardState } from '../../hooks/useTransfersDashboardState';
import { useTransfersDashboardData } from '../../hooks/useTransfersDashboardData';
import SavedNextWeekFilters from './SavedNextWeekFilters';
import SavedAllFilters from './SavedAllFilters';
import ScheduleCardList from './ScheduleCardList';

const TransfersDashboard = ({ data, isActive }) => {
  const { token } = theme.useToken();
  const [month] = useSearchParamState('month', getThisMonth(), getShortMonthFormat);

  const {
    activeTab,
    selectedDate,
    setSelectedDate,
    selectedSchedule,
    setSelectedSchedule,
    sortOrder,
    setSortOrder,
    handleTabChange,
  } = useTransfersDashboardState();

  const { visibleSchedules, scheduleSegmentOptions, isLoading, hasError } =
    useTransfersDashboardData({
      data,
      month,
      activeTab,
      selectedDate,
      selectedSchedule,
      sortOrder,
    });

  if (!data || data.length === 0) {
    return (
      <Empty description="Нет данных о раскладках" style={{ marginTop: '50px' }} />
    );
  }

  const tabContent = (
    <ScheduleCardList
      visibleSchedules={visibleSchedules}
      isLoading={isLoading}
      hasError={hasError}
      activeTab={activeTab}
    />
  );

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
        {activeTab === 'saved-nextWeek' && (
          <SavedNextWeekFilters
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        )}

        {activeTab === 'saved-all' && (
          <SavedAllFilters
            scheduleSegmentOptions={scheduleSegmentOptions}
            selectedSchedule={selectedSchedule}
            onScheduleChange={setSelectedSchedule}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        )}

        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabPosition="right"
          items={[
            { key: 'saved-nextWeek', label: 'Следующая неделя', children: tabContent },
            { key: 'orders-request', label: 'По требованию', children: tabContent },
            { key: 'saved-all', label: 'Сохраненные', children: tabContent },
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
