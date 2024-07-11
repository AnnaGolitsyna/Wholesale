import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table } from 'antd';
import { columns } from './columns';

const ReceaivableTable = ({ data, isLoading }) => {

  return (
    <Spin spinning={isLoading}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        scroll={{ y: 500 }}
        virtual
        rowKey={data.id}
      />
    </Spin>
  );
};

ReceaivableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

export default ReceaivableTable;
