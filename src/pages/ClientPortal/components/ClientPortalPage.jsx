import React from 'react';
import { Tabs, Typography, Spin, Alert, Card, Divider } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../components/errors/ErrorFallback';
import TransactionsTab from './tabs/TransactionsTab';
import OrdersOfClientTab from './tabs/OrdersOfClientTab';
import GoodsTab from './tabs/GoodsTab';
import ReturnsTab from './tabs/ReturnsTab';
import useClientAuth from '../../../features/authentication/hook/useClientAuth';

const { Text } = Typography;

const ClientPortalPage = () => {
  const { contractorId, contractorName, loading, error } = useClientAuth();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        type="error"
        message="Помилка завантаження даних"
        description={error.message}
      />
    );
  }

  if (!contractorId) {
    return (
      <Alert
        type="warning"
        message="Не вдалося визначити контрагента"
        description="Зверніться до адміністратора"
      />
    );
  }

  return (
    <div>
      {contractorName && (
   
            <Card
          size="small"
          style={{
            background: '#174179',
            borderColor: '#667eea',
          }}
        >
      <Text>Контрагент: <Divider type="vertical" /> {contractorName}</Text>
        </Card>
      )}
      <Tabs
        defaultActiveKey="transactions"
        items={[
          {
            key: 'transactions',
            label: 'Транзакції',
            children: <TransactionsTab contractorId={contractorId} />,
          },
          {
            key: 'orders',
            label: 'Замовлення',
            children: <OrdersOfClientTab contractorId={contractorId} />,
          },
          {
            key: 'prices',
            label: 'Прайс',
            children: <GoodsTab contractorId={contractorId} />,
          },
          {
            key: 'refunds',
            label: 'Повернення',
            children: <ReturnsTab />,
          },
        ]}
      />
    </div>
  );
};

export default withErrorBoundary(ClientPortalPage, {
  FallbackComponent: ErrorFallback,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});
