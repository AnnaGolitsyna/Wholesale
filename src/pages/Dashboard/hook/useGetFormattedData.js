import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getReceivableListRef } from '../../Receivable';

const useGetFormattedData = () => {
  const [receivablesData, loading, isError] = useCollectionData(
    getReceivableListRef()
  );

  const isLoading = receivablesData?.length === 0 || loading;

  const formattedData = useMemo(() => {
    return (
      receivablesData?.map((item) => ({
        ...item,
        receivable: Number((item.debet - item.credit).toFixed(2)),
        name: item.name.label,
        id: item.name.value,
      })) || []
    );
  }, [receivablesData]);


  const debetData = useMemo(() => {
    return formattedData
      .filter((item) => item.receivable > 0)
      .sort((a, b) => b.count - a.count);
  }, [formattedData]);

  const creditData = useMemo(() => {
    return formattedData
      .filter((item) => item.receivable < 0)
      .sort((a, b) => b.count - a.count);
  }, [formattedData]);

  return {
    debetData,
    creditData,
    isLoading,
    isError,
  };
};

export { useGetFormattedData };
