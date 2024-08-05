import React from 'react';
import PropTypes from 'prop-types';
import { Table, Space } from 'antd';
import { columns } from './columns';
import BalancedTitle from './BalancedTitle';
import SummaryRow from './SummaryRow';

const TransactionsTable = ({ data, balanceEnd }) => {
  return (

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.id}
        title={() => (
          <BalancedTitle date={data[0].date} value={data[0].balance} />
        )}
        footer={() => (
          <BalancedTitle date={data[data.length - 1].date} value={balanceEnd} />
        )}
        summary={(pageData) => (
          <SummaryRow data={pageData} balanceEnd={balanceEnd} />
        )}
      />
 
  );
};

TransactionsTable.propTypes = {
  data: PropTypes.array.isRequired,
  balanceEnd: PropTypes.string.isRequired,
};

export default TransactionsTable;
