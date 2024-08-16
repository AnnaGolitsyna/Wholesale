import { useState, useEffect, useMemo } from 'react';
import { getTransactionsDataByIdAndRange } from '../api/operations/getTransactionsDataByIdAndRange';
import { getContractorReceivableData } from '../api/operations/getContractorReceivableData';
import { formattedPriceToString } from '../../../utils/priceUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';

const useAccountReconciliation = (id, datesPeriod) => {
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
        setTransactionsData(
          transactions.sort(
            (a, b) =>
              a.date.localeCompare(b.date) ||
              a.docNumber.localeCompare(b.docNumber)
          )
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, datesPeriod]);

  const reconciliationData = useMemo(() => {
    if (!accountData || !transactionsData) {
      return {
        openingBalance: '',
        closingBalance: '',
        reconciledTransactions: [],
        accountName: '',
      };
    }

    let balance = accountData.receivable;
    const reconciledTransactions = transactionsData.reduceRight((acc, item) => {
      const newItem = {
        ...item,
        key: item.id,
        balanceBefore: formattedPriceToString(balance),
      };

      if (item.type === OPERATION_TYPES.DEBET) {
        newItem.balanceAfter = formattedPriceToString(balance - item.sum);
        balance -= item.sum;
      } else if (item.type === OPERATION_TYPES.CREDIT) {
        newItem.balanceAfter = formattedPriceToString(balance + item.sum);
        balance += item.sum;
      }

      return [newItem, ...acc];
    }, []);

    const closingBalance = formattedPriceToString(accountData.receivable);
    const openingBalance = formattedPriceToString(balance);
    const accountName = accountData.name;

    return {
      openingBalance,
      closingBalance,
      reconciledTransactions,
      accountName,
    };
  }, [accountData, transactionsData]);

  return {
    loading,
    error,
    ...reconciliationData,
  };
};

export { useAccountReconciliation };
