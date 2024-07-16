import React, { useMemo } from 'react';
import { Result } from 'antd';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useGetContractorsListQuery } from '../../../Contractors';
import ReceivablesChart from '../chart/ReceivablesChart';
import { getReceivableListRef } from '../..';
import { getRenderList } from '../../utils/getRenderList';
import { formatData } from '../../utils/formatData';

const ReceivableChartPage = () => {
  const {
    data: contractorsData,
    isLoading: contractorsLoading,
    isError: contractorsError,
  } = useGetContractorsListQuery(true);

  const [receivablesData, receivablesLoading, receivablesError] =
    useCollectionData(getReceivableListRef());

  const formattedData = React.useMemo(
    () => formatData(contractorsData, receivablesData),
    [receivablesData, contractorsData]
  );

  //const isLoading = contractorsLoading || receivablesLoading;
  // const renderList = useMemo(
  //   () => getRenderList(formattedData, isLoading),
  //   [formattedData, isLoading]
  // );

  const isError = contractorsError || receivablesError;
  if (isError) {
    return <Result status="500" subTitle="Sorry, something went wrong." />;
  }

  return (
    <>
      <div>HOME</div>
      <ReceivablesChart formattedData={formattedData} />
    </>
  );
};

export { ReceivableChartPage };
