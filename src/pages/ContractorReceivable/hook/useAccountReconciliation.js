import { useAccountData } from '../api/useAccountData';
import { useReconciliationFormatter } from './useReconciliationFormatter';

const useAccountReconciliation = (id, datesPeriod) => {
  const { accountData, transactionsData, loading, error, refetch } = useAccountData(
    id,
    datesPeriod
  );
  const reconciliationData = useReconciliationFormatter(
    accountData,
    transactionsData,
    datesPeriod
  );

  if (error) {
    throw error;
  }

  return {
    loading,
    accountData,
    refetch,
    ...reconciliationData,
  };
};

export { useAccountReconciliation };
