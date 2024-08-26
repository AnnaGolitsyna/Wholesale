import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { getDisabledDateForDatePicker } from '../../../../utils/dateUtils';

const DatePickerControlDate = (props) => {
  const disabledDate = useMemo(() => getDisabledDateForDatePicker(1), []);
  return (
    <DatePicker
      placeholder="дата"
      format="YYYY-MM-DD"
      disabledDate={disabledDate}
    />
  );
};

DatePickerControlDate.propTypes = {};

export default DatePickerControlDate;
