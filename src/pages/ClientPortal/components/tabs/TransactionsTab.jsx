import React, { useState } from 'react';
import { Spin, Card, Flex, Statistic, Tooltip } from 'antd';
import dayjs from 'dayjs';
import DateRangePickerComponent from '../../../ContractorReceivable/components/datePicker/DateRangePickerComponent ';
import TransactionsList from '../collapses/TransactionsList';
import { useAccountReconciliation } from '../../../ContractorReceivable/hook/useAccountReconciliation';

const DEFAULT_PERIOD = [dayjs().subtract(3, 'weeks'), dayjs()];

const TransactionsTab = ({ contractorId }) => {
  const [datesPeriod, setDatesPeriod] = useState(DEFAULT_PERIOD);

  const { loading, accountData, reconciledTransactions } =
    useAccountReconciliation(contractorId, datesPeriod);

  const handleDateChange = (dates) => {
    if (dates) setDatesPeriod(dates);
  };

  if (loading)
    return (
      <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
    );

  return (
    <Flex vertical gap={16}>
      <Flex justify="flex-end">
        <Tooltip title="Задолженность включает в себя все созданные документы, даже если Вы их еще не получили">
          <Card
            size="small"
            style={{
              background: '#174179',
              borderColor: '#667eea',
              cursor: 'help',
            }}
          >
            <Statistic
              title="Задолженность"
              value={accountData?.receivable || '0'}
              precision={2}
              suffix="грн"
              valueStyle={{ color: '#d1e8e2', fontWeight: 'bold' }}
            />
          </Card>
        </Tooltip>
      </Flex>

      <DateRangePickerComponent
        period={datesPeriod}
        handleChange={handleDateChange}
        showAnalytics={false}
      />
      <TransactionsList transactions={reconciledTransactions} />
    </Flex>
  );
};

export default TransactionsTab;
