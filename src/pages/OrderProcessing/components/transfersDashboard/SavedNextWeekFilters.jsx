import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Space, Typography, DatePicker } from 'antd';
import { getMondayOfWeek } from '../../utils/dateUtils';

const { Text } = Typography;

const SavedNextWeekFilters = ({ selectedDate, onDateChange, extra }) => (
  <Space direction="vertical" size="middle" style={{ width: '100%', marginBottom: '16px' }}>
    <Flex justify="space-between" align="center">
      <Flex align="center" gap="middle">
        <Text strong>Фильтр по неделе:</Text>
        <DatePicker
          value={selectedDate}
          onChange={(date) => onDateChange(getMondayOfWeek(date))}
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
      {extra}
    </Flex>
  </Space>
);

SavedNextWeekFilters.propTypes = {
  selectedDate: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  extra: PropTypes.node,
};

export default SavedNextWeekFilters;
