import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useGetContractorsListQuery } from '../../Contractors';
import { getReceivableListRef } from '../../Receivable';
import { formatData } from '../utils/formatData';

const useGetReceivableData = () => {
  const {
    data: contractorsData,
    isLoading: contractorsLoading,
    isError: contractorsError,
  } = useGetContractorsListQuery(true);

  const [receivablesData, receivablesLoading, receivablesError] =
    useCollectionData(getReceivableListRef());

  const formattedData = useMemo(
    () => formatData(contractorsData, receivablesData),
    [receivablesData, contractorsData]
  );

  const isLoading = contractorsLoading || receivablesLoading;
  const isError = contractorsError || receivablesError;

  return {
    formattedData,
    isLoading,
    isError,
  };
};

export { useGetReceivableData };
