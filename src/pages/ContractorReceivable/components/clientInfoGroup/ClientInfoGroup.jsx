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
import { getTodayFullFormattedDate } from '../../../../utils/dateUtils';

const ClientInfoGroup = ({ name, receivable }) => {
  return (
    <Flex vertical justify="space-between" gap="middle">
      <Flex align="flex-end">
        <Typography.Text style={{ marginRight: '10px' }}>
          Контрагент:
        </Typography.Text>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {name}
        </Typography.Title>
      </Flex>

      <Card >
        <Statistic
          title={`Задолженность на ${getTodayFullFormattedDate()}`}
          value={receivable}
          precision={2}
          valueStyle={{
            color: '#cf1322',
            margin: 0,
          }}
        />{' '}
      </Card>
      <Flex align="flex-end">
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
