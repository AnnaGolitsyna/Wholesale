import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import {
  shortDateFormat,
  getDisabledDateForDatePicker,
} from '../../../../utils/dateUtils';

const { RangePicker } = DatePicker;

const DateRangePickerComponent = ({ period, handleChange, showAnalytics }) => {
  const getPickerProps = () => ({
    picker: showAnalytics ? 'month' : 'date',
    format: showAnalytics ? 'YYYY-MM' : shortDateFormat,
    disabledDate: showAnalytics ? getDisabledDateForDatePicker : undefined,
  });

  return (
    <Flex align="center">
      <Typography.Text style={{ marginRight: '10px' }}>Период:</Typography.Text>
      <RangePicker
        value={period}
        onChange={handleChange}
        allowClear={false}
        {...getPickerProps()}
      />
    </Flex>
  );
};

DateRangePickerComponent.propTypes = {
  period: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.instanceOf(dayjs), PropTypes.string])
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  showAnalytics: PropTypes.bool.isRequired,
};

export default DateRangePickerComponent;
