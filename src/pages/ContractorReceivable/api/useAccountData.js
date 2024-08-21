import { useState, useEffect } from 'react';
import { getContractorReceivableData } from './operations/getContractorReceivableData';
import { getTransactionsDataByIdAndRange } from './operations/getTransactionsDataByIdAndRange';

const useAccountData = (id, datesPeriod) => {
  const [accountData, setAccountData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contractorData, transactions] = await Promise.all([
          getContractorReceivableData(id),
          getTransactionsDataByIdAndRange(datesPeriod, id),
        ]);

        setAccountData(contractorData);
        setTransactionsData(transactions);
        // setTransactionsData(
        //   transactions.sort(
        //     (a, b) =>
        //       a.date.localeCompare(b.date) ||
        //       a.docNumber.localeCompare(b.docNumber)
        //   )
        // );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, datesPeriod]);
  console.log('transactionsData', transactionsData);

  return { accountData, transactionsData, loading, error };
};

export { useAccountData };
