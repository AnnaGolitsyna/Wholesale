import React from 'react';
import PropTypes from 'prop-types';
import { Statistic, Table, Tag } from 'antd';
import { columns } from './columns';

const ReceaivableTable = ({ data }) => {
  console.log('table', data);
  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      scroll={{ y: 500 }}
      virtual
      rowKey={data.id}
    />
  );
};

ReceaivableTable.propTypes = {};

export default ReceaivableTable;
