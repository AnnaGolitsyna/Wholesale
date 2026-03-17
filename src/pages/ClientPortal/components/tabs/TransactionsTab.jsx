import React, { useState } from 'react';
import { Spin, Card, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import DateRangePickerComponent from '../../../ContractorReceivable/components/datePicker/DateRangePickerComponent ';
import TransactionsList from '../collapses/TransactionsList';
import { useAccountReconciliation } from '../../../ContractorReceivable/hook/useAccountReconciliation';

const { Text } = Typography;
const DEFAULT_PERIOD = [dayjs().subtract(2, 'weeks'), dayjs().add(1, 'week')];

const TransactionsTab = ({ contractorId }) => {
  const [datesPeriod, setDatesPeriod] = useState(DEFAULT_PERIOD);

  const { loading, accountData, reconciledTransactions } =
    useAccountReconciliation(contractorId, datesPeriod);

  console.log(accountData, reconciledTransactions);

  const handleDateChange = (dates) => {
    if (dates) setDatesPeriod(dates);
  };

  const today = dayjs().format('YYYY-MM-DD');
  const latestTx = reconciledTransactions?.filter((tx) => tx.date <= today).at(-1);
  const currentBalance = latestTx?.balanceAfter;
  const isDefaultPeriod = datesPeriod[1].isAfter(dayjs(), 'day');
  const balanceDate = isDefaultPeriod ? today : latestTx?.date;

  if (loading)
    return (
      <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
    );

  return (
    <Flex vertical gap={16}>
      
    
        
          <Card
            size="small"
            style={{
              background: '#174179',
              borderColor: '#667eea',
              cursor: 'help',
              padding: '0 4px',
            }}
            styles={{ body: { padding: '6px 12px' } }}
          >
            <Flex align="center" gap={8}>
              <Text style={{ color: '#a8c4e0', fontSize: 12 }}>Задолженность ({balanceDate}):</Text>
              <Text style={{ color: '#d1e8e2', fontWeight: 'bold', fontSize: 14 }}>
                {currentBalance ?? '—'}
              </Text>
            </Flex>
          </Card>
       
     

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
