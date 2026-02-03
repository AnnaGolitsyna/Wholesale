import React from 'react';
import { Tabs } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../components/errors/ErrorFallback';
import TransactionsTab from './tabs/TransactionsTab';
import OrdersOfClientTab from './tabs/OrdersOfClientTab';
import GoodsTab from './tabs/GoodsTab';
import ReturnsTab from './tabs/ReturnsTab';

const CONTRACTOR_ID = '20';

const ClientPortalPage = () => {
  return (
    <Tabs
      defaultActiveKey="transactions"
      items={[
        {
          key: 'transactions',
          label: 'Транзакции',
          children: <TransactionsTab contractorId={CONTRACTOR_ID} />,
        },
        {
          key: 'orders',
          label: 'Заказы',
          children: <OrdersOfClientTab contractorId={CONTRACTOR_ID} />,
        },
        {
          key: 'prices',
          label: 'Прайс',
          children: <GoodsTab contractorId={CONTRACTOR_ID} />,
        },
        {
          key: 'refunds',
          label: 'Возвраты',
          children: <ReturnsTab />,
        },
      ]}
    />
  );
};

export default withErrorBoundary(ClientPortalPage, {
  FallbackComponent: ErrorFallback,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});
