import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, theme, ConfigProvider } from 'antd';
import { columns, productColumns } from './columns';
import BalancedTitle from './BalancedTitle';
import SummaryRow from './SummaryRow';

const TransactionsTable = ({ data, balanceStart, balanceEnd, period }) => {
const [startDate, endDate] = period;
const [expandedRowKeys, setExpandedRowKeys] = useState([]);
const { token } = theme.useToken();

const expandedRowRender = (record) => {
  if (!record.productList || record.productList.length === 0) {
    return null;
  }

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        components: {
          Table: {
            colorFillAlter: token.colorInfo,
          },
        },
      }}
    >
      <Table
        columns={productColumns}
        dataSource={record.productList}
        pagination={false}
        rowKey={(item) => item.name}
        style={{ color: 'red' }}
      />
    </ConfigProvider>
  );
};

return (
  <Table
    dataSource={data}
    columns={columns}
    pagination={false}
    rowKey={(record) => record.id}
    title={() => <BalancedTitle date={startDate} value={balanceStart} />}
    footer={() => <BalancedTitle date={endDate} value={balanceEnd} />}
    summary={(pageData) => (
      <SummaryRow data={pageData} balanceEnd={balanceEnd} />
    )}
    expandable={{
      expandedRowRender,
      expandedRowKeys,
      onExpand: (expanded, record) => {
        setExpandedRowKeys(expanded ? [record.id] : []);
      },
      rowExpandable: (record) =>
        record.productList && record.productList.length > 0,
    }}
  />
);
};

TransactionsTable.propTypes = {
  data: PropTypes.array.isRequired,
  balanceEnd: PropTypes.string.isRequired,
  balanceStart: PropTypes.string.isRequired,
  period: PropTypes.array.isRequired,
};

export default TransactionsTable;

// const [startDate, endDate] = period;

// return (
//   <Table
//     dataSource={data}
//     columns={columns}
//     pagination={false}
//     rowKey={(record) => record.id}
//     title={() => <BalancedTitle date={startDate} value={balanceStart} />}
//     footer={() => <BalancedTitle date={endDate} value={balanceEnd} />}
//     summary={(pageData) => (
//       <SummaryRow data={pageData} balanceEnd={balanceEnd} />
//     )}
//   />
// );
