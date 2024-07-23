import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DatePicker,
  Flex,
  Space,
  Typography,
  Content,
  Row,
  Col,
  Statistic,
  Card,
} from 'antd';

import ReceivableStatistic from '../statistic/ReceivableStatistic';

const ClientInfoGroup = ({ name, receivable }) => {
  return (
    <Flex vertical justify="space-between" gap="middle">
      <Flex align="center">
        <Typography.Text style={{ marginRight: '10px' }}>
          Контрагент:
        </Typography.Text>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {name}
        </Typography.Title>
      </Flex>

      <ReceivableStatistic receivable={receivable} />
      <Flex align="center">
        <Typography.Text style={{ marginRight: '10px' }}>
          Период:
        </Typography.Text>
        <DatePicker.RangePicker />
      </Flex>
    </Flex>
  );
};

ClientInfoGroup.propTypes = {};

export default ClientInfoGroup;
