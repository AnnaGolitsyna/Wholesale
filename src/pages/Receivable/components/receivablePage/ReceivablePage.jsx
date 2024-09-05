import React from 'react';
import { Result } from 'antd';
import ReceivableDashboard from '../dashboard/ReceivableDashboard';
import { useGetReceivableData } from '../../hook/useGetReceivableData';

const ReceivablePage = () => {
  const { formattedData, isLoading, isError } = useGetReceivableData();

  if (isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  return <ReceivableDashboard data={formattedData} isLoading={isLoading} />;
};

export { ReceivablePage };
