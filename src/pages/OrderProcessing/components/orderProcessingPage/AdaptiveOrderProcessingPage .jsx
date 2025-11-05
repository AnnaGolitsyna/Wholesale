import React from 'react';
import useDeviceType from '../../../../hook/useDeviceType';
import  OrderProcessingPage  from './OrderProcessingPage';
import MobileOrderProcessingPage from './MobileOrderProcessingPage';
import { Spin } from 'antd';

/**
 * Adaptive Order Processing Page Component
 * Automatically switches between desktop and mobile layouts based on screen size
 */
const AdaptiveOrderProcessingPage = () => {
  const { isMobile, isLoading } = useDeviceType();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isMobile) {
    return <MobileOrderProcessingPage />;
  }

  return <OrderProcessingPage />;
};

export { AdaptiveOrderProcessingPage };

