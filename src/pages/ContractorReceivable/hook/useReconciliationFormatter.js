import { useMemo } from 'react';
import { formattedPriceToString } from '../../../utils/priceUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';

const useReconciliationFormatter = (accountData, transactionsData) => {
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

  return reconciliationData;
};

export { useReconciliationFormatter };
