import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, theme } from 'antd';
import { getStyle } from './getStyle';

const ReceivableStatistic = ({ receivable }) => {

  const { token } = theme.useToken();
  const { valueStyle, prefix } = getStyle(receivable, token);

  return (
    <Statistic
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
