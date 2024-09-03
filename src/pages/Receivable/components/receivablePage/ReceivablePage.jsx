import React, { useMemo } from 'react';
import { Result } from 'antd';
import ReceivableLayout from '../layout/ReceivableLayout';
import { getRenderList } from '../../utils/getRenderList';
import {useGetReceivableData} from '../../hook/useGetReceivableData';

const ReceivablePage = () => {

  const { formattedData, isLoading, isError } = useGetReceivableData();

  // const renderList = useMemo(
  //   () => getRenderList(formattedData, isLoading),
  //   [formattedData, isLoading]
  // );


  if (isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  return <ReceivableLayout data={formattedData} isLoading={isLoading} />;
};

export { ReceivablePage };
