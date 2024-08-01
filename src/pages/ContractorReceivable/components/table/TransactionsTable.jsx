import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Space, Typography, Flex, Statistic } from 'antd';
import { columns } from './columns';

const { Text } = Typography;

const TransactionsTable = ({ data, balanceEnd }) => {
  const BalancedTitle = () => {
    return (
      <Flex justify="space-between">
        <Space>
          <Typography.Text
            italic
          >{`Сальдо на ${data[0].date}: `}</Typography.Text>
          <Statistic
            value={data[0].balance}
            precision={2}
            suffix="грн"
            valueStyle={{
              fontSize: 18,
              textShadow: 'rgba(0, 0, 0, 0.3) 2px 4px 6px',
            }}
          />
        </Space>
        <Space>
          <Typography.Text italic>{`Сальдо на ${
            data[data.length - 1].date
          }: `}</Typography.Text>
          <Statistic
            value={balanceEnd}
            precision={2}
            suffix="грн"
            valueStyle={{
              fontSize: 18,
              textShadow: 'rgba(0, 0, 0, 0.3) 2px 4px 6px',
            }}
          />
        </Space>
      </Flex>
    );
  };

  return (
    <Space style={{ width: '100%' }}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.id}
        footer={() => <BalancedTitle />}
        summary={(pageData) => {
          let totalDebet = 0;
          let totalCredit = 0;
          pageData.forEach(({ type, sum }) => {
            if (type === 'debet') {
              totalDebet += sum;
            } else if (type === 'credit') {
              totalCredit += sum;
            }
          });
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell />
                <Table.Summary.Cell />
                <Table.Summary.Cell index={3}>
                  Обороты за период:
                </Table.Summary.Cell>
                <Table.Summary.Cell />
                <Table.Summary.Cell index={4} align="center">
                  <Text strong>{totalDebet}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="center">
                  <Text strong>{totalCredit}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </Space>
  );
};

TransactionsTable.propTypes = {};

export default TransactionsTable;
