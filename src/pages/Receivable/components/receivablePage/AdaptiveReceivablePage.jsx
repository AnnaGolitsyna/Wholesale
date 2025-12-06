import React from 'react';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { getReceivableListRef } from '../../api/firebaseRefs';
import { useGetReceivableData } from '../../hook/useGetReceivableData';
import useDeviceType from '../../../../hook/useDeviceType';
import ReceivableDashboard from '../dashboard/ReceivableDashboard';
import MobileReceivableDashboard from './MobileReceivableDashboard';
import { Result } from 'antd';
import { Spin } from 'antd';

/**
 * Adaptive Receivable Page Component
 * Automatically switches between desktop and mobile layouts based on screen size
 */
const AdaptiveReceivablePage = () => {
  //   const receivableListRef = getReceivableListRef();
  //   const [data, loading, error] = useCollectionData(receivableListRef);
  const { formattedData, isLoading, isError } = useGetReceivableData();
  const { isMobile } = useDeviceType();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  if (isMobile) {
    return (
      <MobileReceivableDashboard
        data={formattedData || []}
        isLoading={isLoading}
      />
    );
  }

  return (
    <ReceivableDashboard data={formattedData || []} isLoading={isLoading} />
  );
};

export { AdaptiveReceivablePage };
