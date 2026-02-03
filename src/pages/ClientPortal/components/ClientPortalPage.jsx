import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../components/errors/ErrorFallback';
import TransactionsTab from './tabs/TransactionsTab';
import OrdersOfClientTab from './tabs/OrdersOfClientTab';
import GoodsTab from './tabs/GoodsTab';
import ReturnsTab from './tabs/ReturnsTab';
import { useAuth } from '../../../features/authentication/hook/useAuth';

const ClientPortalPage = () => {
  const { currentUser } = useAuth();

  const contractorId = useMemo(() => {
    if (!currentUser?.email) return null;
    // Email format: userdybenko_10@client.local -> extract "10" after underscore
    const username = currentUser.email.split('@')[0]; // userdybenko_10
    const parts = username.split('_');
    return parts.length > 1 ? parts[parts.length - 1] : null;
  }, [currentUser]);

  if (!contractorId) {
    return <div>Не удалось определить ID контрагента</div>;
  }

  return (
    <Tabs
      defaultActiveKey="transactions"
      items={[
        {
          key: 'transactions',
          label: 'Транзакции',
          children: <TransactionsTab contractorId={contractorId} />,
        },
        {
          key: 'orders',
          label: 'Заказы',
          children: <OrdersOfClientTab contractorId={contractorId} />,
        },
        {
          key: 'prices',
          label: 'Прайс',
          children: <GoodsTab contractorId={contractorId} />,
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
