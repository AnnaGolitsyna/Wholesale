import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Flex, Statistic } from 'antd';
import { getLocalShortDateFormat } from '../../../../utils/dateUtils';
import { shadowStyle } from './shadowStyle';

const BalancedTitle = ({ date, value }) => {
  return (
    <Flex justify="end">
      <Space>
        <Typography.Text italic>{`Сальдо на ${getLocalShortDateFormat(
          date
        )}: `}</Typography.Text>
        <Statistic
          value={value}
          precision={2}
          suffix="грн"
          valueStyle={{
            fontSize: 18,
            marginLeft: 10,
            ...shadowStyle,
          }}
        />
      </Space>
    </Flex>
  );
};

BalancedTitle.propTypes = {
  date: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default BalancedTitle;
