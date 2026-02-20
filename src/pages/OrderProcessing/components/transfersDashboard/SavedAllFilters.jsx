import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Space, Typography, DatePicker, Segmented } from 'antd';
import { getMondayOfWeek } from '../../utils/dateUtils';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const SavedAllFilters = ({
  scheduleSegmentOptions,
  selectedSchedule,
  onScheduleChange,
  sortOrder,
  onSortChange,
  selectedDate,
  onDateChange,
}) => (
  <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '16px' }}>
    <Flex justify="space-between" align="center">
      {scheduleSegmentOptions.length > 1 && (
        <Segmented
          options={scheduleSegmentOptions}
          value={selectedSchedule}
          onChange={onScheduleChange}
        />
      )}
      <Segmented
        options={[
          { label: 'Новые', value: 'desc' },
          { label: 'Старые', value: 'asc' },
        ]}
        value={sortOrder}
        onChange={onSortChange}
      />
    </Flex>
    <Flex justify="space-between" align="center">
      <Text strong>Фильтр по неделе:</Text>
      <RangePicker
        value={selectedDate ? [selectedDate, selectedDate.add(6, 'day')] : null}
        onChange={(dates) => {
          if (!dates || !dates[0]) {
            onDateChange(null);
            return;
          }
          onDateChange(getMondayOfWeek(dates[0]));
        }}
        format="DD.MM.YYYY"
        placeholder={['Начало недели', 'Конец недели']}
        allowClear
        style={{ width: 300 }}
        picker="week"
      />
    </Flex>
  </Space>
);

SavedAllFilters.propTypes = {
  scheduleSegmentOptions: PropTypes.array.isRequired,
  selectedSchedule: PropTypes.string.isRequired,
  onScheduleChange: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
};

export default SavedAllFilters;
