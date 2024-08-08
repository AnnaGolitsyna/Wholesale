import React from 'react';
import { DatePicker, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { shortDateFormat } from '../../../../utils/dateUtils';

const { RangePicker } = DatePicker;

const DateRangePickerComponent = () => {
  const today = dayjs();
  const startOfCurrentMonth = today.startOf('month');
  const startDate = startOfCurrentMonth.subtract(5, 'month').startOf('month');

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Flex align="center">
      <Typography.Text style={{ marginRight: '10px' }}>Период:</Typography.Text>

      <RangePicker
        defaultValue={[startDate, today]}
        format={shortDateFormat}
        allowClear={false}
        onChange={onChange}
      />
    </Flex>
  );
};

export default DateRangePickerComponent;
