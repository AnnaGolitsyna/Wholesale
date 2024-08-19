import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { shortDateFormat } from '../../../../utils/dateUtils';

const { RangePicker } = DatePicker;

const DateRangePickerComponent = ({ period, handleChange }) => {
  const onChange = (date, dateString) => {
    handleChange(date);
  };

  return (
    <Flex align="center">
      <Typography.Text style={{ marginRight: '10px' }}>Период:</Typography.Text>

      <RangePicker
        value={period}
        format={shortDateFormat}
        allowClear={false}
        onChange={onChange}
      />
    </Flex>
  );
};

DateRangePickerComponent.propTypes = {
  period: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.instanceOf(dayjs), PropTypes.string])
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DateRangePickerComponent;
