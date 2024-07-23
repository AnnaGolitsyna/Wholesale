import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Table, Space } from 'antd';
import { columns } from './columns';

const TransactionsTable = ({data}) => {
  return (
    <Space style={{ width: '100%' }}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        //   virtual
        //   scroll={{
        //     scrollToFirstRowOnChange: true,
        //     y: scrollY,
        //   }}
        rowKey={data.id}
      />
    </Space>
  );
}

TransactionsTable.propTypes = {}

export default TransactionsTable