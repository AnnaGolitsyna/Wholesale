import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, theme, ConfigProvider } from 'antd';
import { receivableTableColumns, productColumns as defaultProductColumns } from './columns';
import BalancedTitle from './BalancedTitle';
import SummaryRow from './SummaryRow';
import { useContractorReceivableContext } from '../contractorPage/ContractorReceivablePage';
import { v4 as uuidv4 } from 'uuid';

const TransactionsTable = ({ columns, nestedColumns }) => {
  const {
    reconciledTransactions: data,
    openingBalance: balanceStart,
    closingBalance: balanceEnd,
    datesPeriod: [startDate, endDate],
  } = useContractorReceivableContext();

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
              cellPaddingBlock: 1,
            },
          },
        }}
      >
        <Table
          columns={nestedColumns}
          dataSource={record.productList}
          pagination={false}
          rowKey={(item) => `${item.name}-${uuidv4()}`}
          bordered
        />
      </ConfigProvider>
    );
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      bodered
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
  columns: PropTypes.array,
};

TransactionsTable.defaultProps = {
  columns: receivableTableColumns,
  nestedColumns: defaultProductColumns,
};

export { TransactionsTable };
