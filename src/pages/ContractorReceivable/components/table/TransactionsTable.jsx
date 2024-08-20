import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'antd';
import { columns } from './columns';
import AlertEmptyData from '../alert/AlertEmptyData';
import BalancedTitle from './BalancedTitle';
import SummaryRow from './SummaryRow';

const TransactionsTable = ({ data, balanceStart, balanceEnd, period }) => {
  const [startDate, endDate] = period;
  console.log('table', data, balanceStart, balanceEnd, period);

  const isEmptyData = data.length === 0;

  if (isEmptyData) return <AlertEmptyData />;

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
