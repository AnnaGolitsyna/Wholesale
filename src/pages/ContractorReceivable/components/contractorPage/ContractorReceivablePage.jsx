import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import TransactionAreaChart from '../chart/TransactionAreaChart';
import TransactionsTable from '../table/TransactionsTable';
import ClientInfoGroup from '../clientInfoGroup/ClientInfoGroup';
import PageHeader from '../header/PageHeader';
import { getDefaultPeriodForRangePicker } from '../../../../utils/dateUtils';
import { boxStyle } from '../../../../styles/boxStyle';
import {useAccountReconciliation} from '../../hook/useAccountReconciliation';

import { data } from '../chart/areaChartData';

const ContractorReceivablePage = () => {
  const { id } = useParams();
  const [datesPeriod, setDatesPeriod] = useState(
    getDefaultPeriodForRangePicker()
  );

  const {
    loading,
    error,
    openingBalance,
    closingBalance,
    reconciledTransactions,
    accountName,
  } = useAccountReconciliation(id, datesPeriod);

  const handleDatesChange = (dates) => {
    setDatesPeriod(dates);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Flex vertical style={{ height: '100%', position: 'relative' }}>
      <PageHeader
        name={accountName}
        balanceStart={openingBalance}
        balanceEnd={closingBalance}
        period={datesPeriod}
        handleChange={handleDatesChange}
      />

      <TransactionsTable
        data={reconciledTransactions}
        balanceStart={openingBalance}
        balanceEnd={closingBalance}
        period={datesPeriod}
      />

      <Flex style={{ marginBottom: '10px' }}>
        <Flex flex={1} style={boxStyle} vertical>
          <ClientInfoGroup name={accountName} receivable={closingBalance} />
        </Flex>

        <Flex
          flex={1}
          style={{ ...boxStyle, height: '200px' }}
          vertical
          align="center"
        >
          <Typography.Text>
            Динамика продаж за последние 6 месяцев
          </Typography.Text>
          <TransactionAreaChart data={data} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export { ContractorReceivablePage };


