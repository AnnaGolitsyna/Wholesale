import React, { useState } from 'react';
import { Table, theme, ConfigProvider } from 'antd';
import { columns, productColumns } from './columns';
import BalancedTitle from './BalancedTitle';
import SummaryRow from './SummaryRow';
import { useContractorReceivableContext } from '../contractorPage/ContractorReceivablePage';

const TransactionsTable = () => {
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



export {TransactionsTable};


