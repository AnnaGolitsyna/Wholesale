import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Flex, Statistic } from 'antd';
import dayjs from 'dayjs';
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
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(dayjs),
    PropTypes.string, 
  ]).isRequired,
  value: PropTypes.string.isRequired,
};

export default BalancedTitle;
