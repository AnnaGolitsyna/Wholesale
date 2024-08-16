import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography, Flex, Statistic } from 'antd';
import dayjs from 'dayjs';
import { getLocalShortDateFormat } from '../../../../utils/dateUtils';
import { shadowStyle } from './shadowStyle';
import {getShortDateFormat} from "../../../../utils/dateUtils";

const BalancedTitle = ({ date, value }) => {
 // const formattedDate = getShortDateFormat;
// console.log('date', date);

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

BalancedTitle.propTypes = { date: PropTypes.oneOfType([
    PropTypes.instanceOf(dayjs), // to validate a dayjs object
    PropTypes.string // to validate a string
  ]).isRequired,
  value: PropTypes.number.isRequired,
};

export default BalancedTitle;
