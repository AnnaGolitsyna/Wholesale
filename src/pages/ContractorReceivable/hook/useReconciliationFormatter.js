import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { formattedPriceToString } from '../../../utils/priceUtils';
import { isDateInPeriod } from '../../../utils/dateUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';

const useReconciliationFormatter = (
  accountData,
  transactionsData,
  datesPeriod
) => {
  const { name } = useParams();
  const reconciliationData = useMemo(() => {
    if (!accountData || !transactionsData) {
      return {
        openingBalance: '0',
        closingBalance: '0',
        reconciledTransactions: [],
        accountName: name,
      };
    }

    let balance = accountData.receivable;
    const reconciledTransactions = transactionsData
      .flat()
      .filter((transaction) => isDateInPeriod(transaction.date, datesPeriod))
      .sort(
        (a, b) =>
          a.date.localeCompare(b.date) || a.docNumber.localeCompare(b.docNumber)
      )
      .reduceRight((acc, item) => {
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
