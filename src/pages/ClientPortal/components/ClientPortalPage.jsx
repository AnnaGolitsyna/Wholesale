import React, { useState } from 'react';
import { Typography, Spin, Card, Flex, Statistic } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../components/errors/ErrorFallback';
import dayjs from 'dayjs';
import { useAccountReconciliation } from '../../ContractorReceivable/hook/useAccountReconciliation';
import DateRangePickerComponent from '../../ContractorReceivable/components/datePicker/DateRangePickerComponent ';
import TransactionsList from './TransactionsList';

const { Title } = Typography;

const CONTRACTOR_ID = '10';
const DEFAULT_PERIOD = [dayjs().subtract(3, 'weeks'), dayjs()];

const ClientPortalPage = () => {
  const [datesPeriod, setDatesPeriod] = useState(DEFAULT_PERIOD);

  const {
    loading,
    accountData,
    reconciledTransactions,
  } = useAccountReconciliation(CONTRACTOR_ID, datesPeriod);

  const handleDateChange = (dates) => {
    if (dates) setDatesPeriod(dates);
  };

  if (loading)
    return (
      <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
    );

  return (
    <Flex vertical gap={16}>
      <Flex gap={16} wrap="wrap">
        <Card size="small" title="Контрагент">
          <Title level={4} style={{ margin: 0 }}>
            {accountData?.name || `Contractor ID: ${CONTRACTOR_ID}`}
          </Title>
        </Card>
        <Card size="small" title="Задолженность">
          <Statistic
            value={accountData?.receivable || '0'}
            precision={2}
            suffix="грн"
          />
        </Card>
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

export default withErrorBoundary(ClientPortalPage, {
  FallbackComponent: ErrorFallback,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});
