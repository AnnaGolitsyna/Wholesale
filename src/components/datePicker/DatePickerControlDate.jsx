import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { DatePicker, Form } from 'antd';
import { getDisabledDateForDatePicker } from '../../utils/dateUtils';

const DatePickerControlDate = ({ name, periodInMonths = 1 }) => {
  const form = Form.useFormInstance();
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
       
      />
    </Form.Item>
  );
};

DatePickerControlDate.propTypes = {};

export default DatePickerControlDate;
