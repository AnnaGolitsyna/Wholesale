import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { shortDateFormat } from '../../../../utils/dateUtils';

const { RangePicker } = DatePicker;

const DateRangePickerComponent = ({ period, handleChange, showAnalytics }) => {
  const onChange = (date, dateString) => {
    handleChange(date);
  };

  const disabledDate = (current) => {
    // Allow dates between now and 12 months ago
    const endDate = dayjs();
    const startDate = endDate.subtract(12, 'month');
    return current && (current < startDate || current > endDate);
  };

  return (
    <Flex align="center">
      <Typography.Text style={{ marginRight: '10px' }}>Период:</Typography.Text>

      <RangePicker
        picker={showAnalytics ? 'month' : 'date'}
        value={period}
        format={showAnalytics ? 'YYYY-MM' : shortDateFormat}
        allowClear={false}
        onChange={onChange}
        disabledDate={disabledDate}
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
// import React from 'react';
// import PropTypes from 'prop-types';
// import { DatePicker, Flex, Typography } from 'antd';
// import dayjs from 'dayjs';
// import { shortDateFormat } from '../../../../utils/dateUtils';

// const { RangePicker } = DatePicker;

// const DateRangePickerComponent = ({ period, handleChange, showAnalytics }) => {
//   const onChange = (date, dateString) => {
//     handleChange(date);
//   };

//   return (
//     <Flex align="center">
//       <Typography.Text style={{ marginRight: '10px' }}>Период:</Typography.Text>

//       <RangePicker
//         picker={showAnalytics ? 'month' : 'date'}
//         value={period}
//         format={shortDateFormat}
//         allowClear={false}
//         onChange={onChange}
//       />
//     </Flex>
//   );
// };

// DateRangePickerComponent.propTypes = {
//   period: PropTypes.arrayOf(
//     PropTypes.oneOfType([PropTypes.instanceOf(dayjs), PropTypes.string])
//   ).isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

// export default DateRangePickerComponent;
