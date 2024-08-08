import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Card, theme } from 'antd';
import { getTodayFullFormattedDate } from '../../../../utils/dateUtils';
import { getStyle } from './getStyle';

const ReceivableStatistic = ({ receivable }) => {
  const { token } = theme.useToken();
  const { valueStyle, prefix } = getStyle(receivable, token);
  return (
    <Statistic
      //title={`Задолженность на ${getTodayFullFormattedDate()}`}
      value={receivable}
      precision={2}
      valueStyle={valueStyle}
      prefix={prefix}
    />
  );
};

ReceivableStatistic.propTypes = {
  receivable: PropTypes.string.isRequired,
};

export default ReceivableStatistic;

{
  /* <Card>
  <Statistic
    //title={`Задолженность на ${getTodayFullFormattedDate()}`}
    value={receivable}
    precision={2}
    valueStyle={valueStyle}
    prefix={prefix}
  />
</Card>; */
}
