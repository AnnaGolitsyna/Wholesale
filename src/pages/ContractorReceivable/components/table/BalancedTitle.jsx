import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Flex, Statistic } from 'antd';

const BalancedTitle = ({ date, value }) => {
  return (
    <Flex justify="end">
      <Space>
        <Typography.Text italic>{`Сальдо на ${date}: `}</Typography.Text>
        <Statistic
          value={value}
          precision={2}
          suffix="грн"
          valueStyle={{
            fontSize: 18,
            textShadow: 'rgba(0, 0, 0, 0.3) 2px 4px 6px',
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
