import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../../components/errors/ErrorFallback';
import TransactionAreaChart from '../chart/TransactionAreaChart';
import TransactionsTable from '../table/TransactionsTable';
import PageSkeleton from '../pageSceleton/PageSceleton';
import PageHeader from '../header/PageHeader';
import AlertEmptyData from '../alert/AlertEmptyData';
import { getDefaultPeriodForRangePicker } from '../../../../utils/dateUtils';
import { boxStyle } from '../../../../styles/boxStyle';
import { useAccountReconciliation } from '../../hook/useAccountReconciliation';

import { data } from '../chart/areaChartData';

const ContractorReceivablePage = () => {
  const { id } = useParams();
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [datesPeriod, setDatesPeriod] = useState(
    getDefaultPeriodForRangePicker()
  );

  const {
    loading,
    openingBalance,
    closingBalance,
    reconciledTransactions,
    accountName,
  } = useAccountReconciliation(id, datesPeriod);

  console.log(reconciledTransactions);


  const handleDateChange = (dates) => {
    setDatesPeriod(dates);
  };

  const toggleView = () => {
    setShowAnalytics(!showAnalytics);
  };

  if (loading) return <PageSkeleton />;

  const isEmptyData = reconciledTransactions.length === 0;

  return (
    <Flex vertical style={{ height: '100%', position: 'relative' }}>
      <PageHeader
        name={accountName}
        balanceStart={openingBalance}
        balanceEnd={closingBalance}
        period={datesPeriod}
        handleChange={handleDateChange}
        toggleView={toggleView}
        showAnalytics={showAnalytics}
        disabled={isEmptyData}
      />

      {showAnalytics ? (
        <Flex style={{ marginBottom: '10px' }}>
          <Flex
            flex={1}
            style={{ ...boxStyle, height: '200px' }}
            vertical
            align="center"
          >
            <Typography.Text>
              Динамика продаж за последние 6 месяцев
            </Typography.Text>
            <TransactionAreaChart contractorId={id} datesPeriod={datesPeriod} data={data} />
          </Flex>
        </Flex>
      ) : isEmptyData ? (
        <AlertEmptyData name={accountName} />
      ) : (
        <TransactionsTable
          data={reconciledTransactions}
          balanceStart={openingBalance}
          balanceEnd={closingBalance}
          period={datesPeriod}
        />
      )}
    </Flex>
  );
};

const ContractorReceivablePageWithBoundary = withErrorBoundary(
  ContractorReceivablePage,
  {
    FallbackComponent: (props) => (
      <ErrorFallback {...props} path="/receivables" />
    ),
    onError(error, errorInfo) {
      console.error('Error caught by Error Boundary:', error);
      console.error('Error details:', errorInfo.componentStack);
    },
  }
);

export { ContractorReceivablePageWithBoundary };
