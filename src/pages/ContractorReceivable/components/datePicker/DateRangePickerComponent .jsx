import React from 'react';
import { DatePicker } from 'antd';
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
    <RangePicker
      defaultValue={[startDate, today]}
      format={shortDateFormat}
      allowClear={false}
      onChange={onChange}
    />
  );
};

export default DateRangePickerComponent;
