import { useState, useEffect, useCallback } from 'react';
import { getContractorReceivableData } from './operations/getContractorReceivableData';
import { getTransactionsDataByIdAndRange } from './operations/getTransactionsDataByIdAndRange';

const useAccountData = (id, datesPeriod) => {
  const [accountData, setAccountData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [contractorData, transactions] = await Promise.all([
        getContractorReceivableData(id),
        getTransactionsDataByIdAndRange(datesPeriod, id),
      ]);

      setAccountData(contractorData);
      setTransactionsData(transactions);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id, datesPeriod]);

  useEffect(() => {
    fetchData();
  }, [id, datesPeriod, fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { accountData, transactionsData, loading, error, refetch };
};

export { useAccountData };
