import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { DatePicker, Form } from 'antd';
import {
  getDisabledDateForDatePicker,
  formattedDateObj,
} from '../../utils/dateUtils';

const DatePickerControlDate = ({ name, periodInMonths }) => {
  const [searchParams] = useSearchParams();
  const monthFromUrl = searchParams.get('month');

  const disabledDate = useMemo(
    () => getDisabledDateForDatePicker(periodInMonths, monthFromUrl),
    [periodInMonths, monthFromUrl]
  );

  return (
    <Form.Item name={name} noStyle>
      <DatePicker
        placeholder="дата"
        format="YYYY-MM-DD"
        disabledDate={disabledDate}
        pickerValue={formattedDateObj(`${monthFromUrl}-01`)}
      />
    </Form.Item>
  );
};

DatePickerControlDate.propTypes = {
  name: PropTypes.string.isRequired,
  periodInMonths: PropTypes.number,
};

DatePickerControlDate.defaultProps = {
  periodInMonths: 1,
};

export default DatePickerControlDate;
