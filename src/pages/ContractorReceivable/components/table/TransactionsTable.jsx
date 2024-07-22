import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Table } from 'antd';
import { columns } from './columns';

const TransactionsTable = ({data}) => {
  return (
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
  );
}

TransactionsTable.propTypes = {}

export default TransactionsTable