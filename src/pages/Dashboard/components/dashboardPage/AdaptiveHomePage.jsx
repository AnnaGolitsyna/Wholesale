import React from 'react';
import { Result, Spin } from 'antd';
import useDeviceType from '../../../../hook/useDeviceType';
import { DashboardPage } from './DashboardPage';
import MobileReceivableDashboard from '../../../Receivable/components/receivablePage/MobileReceivableDashboard';
import { useGetReceivableData } from '../../../Receivable/hook/useGetReceivableData';

/**
 * Adaptive Home Page Component
 * Automatically switches between desktop dashboard and mobile receivables based on screen size
 * - Mobile: Shows MobileReceivableDashboard with receivables data
 * - Desktop: Shows DashboardPage with charts and analytics
 */
const AdaptiveHomePage = () => {
  const { isMobile } = useDeviceType();
  const { formattedData, isLoading, isError } = useGetReceivableData();

  // Show loading state for mobile
  if (isMobile && isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Show error state for mobile
  if (isMobile && isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  // Render mobile version with receivables
  if (isMobile) {
    return (
      <MobileReceivableDashboard
        data={formattedData || []}
        isLoading={isLoading}
      />
    );
  }

  // Render desktop version with dashboard charts
  return <DashboardPage />;
};

export { AdaptiveHomePage };
