import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Typography } from 'antd';
import DateRangePickerComponent from '../datePicker/DateRangePickerComponent ';
import ReceivableStatistic from '../statistic/ReceivableStatistic';

const ClientInfoGroup = ({ name, receivable }) => {
  return (
    <Flex
      vertical
      justify="space-between"
      gap="middle"
      style={{ height: '100%' }}
    >
      {/* <Flex align="center">
        <Typography.Text style={{ marginRight: '10px' }}>
          Контрагент:
        </Typography.Text>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {name}
        </Typography.Title>
      </Flex> */}

      <ReceivableStatistic receivable={receivable} />
      <Flex align="center">
        <Typography.Text style={{ marginRight: '10px' }}>
          Период:
        </Typography.Text>

        <DateRangePickerComponent />
      </Flex>
    </Flex>
  );
};

ClientInfoGroup.propTypes = {
  name: PropTypes.string.isRequired,
  receivable: PropTypes.string.isRequired,
};

export default ClientInfoGroup;
