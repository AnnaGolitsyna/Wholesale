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

  return useMemo(() => {
    const defaultData = {
      openingBalance: '0',
      closingBalance: '0',
      reconciledTransactions: [],
      accountName: name,
    };

    if (!accountData || !transactionsData) {
      return defaultData;
    }

    const filteredTransactions = transactionsData
      .flat()

      .sort(
        (a, b) =>
          a.date.localeCompare(b.date) || a.docNumber.localeCompare(b.docNumber)
      );

    const { reconciledTransactions } =
      filteredTransactions.reduceRight(
        (acc, item) => {
          const balanceAfter = acc.balance;
          let newBalance = acc.balance;

          if (item.type === OPERATION_TYPES.DEBET) {
            newBalance -= item.sum;
          } else if (item.type === OPERATION_TYPES.CREDIT) {
            newBalance += item.sum;
          }

          acc.reconciledTransactions.unshift({
            ...item,
            key: item.id,
            balanceAfter: formattedPriceToString(balanceAfter),
            balanceBefore: formattedPriceToString(newBalance),
          });

          acc.balance = newBalance;
          return acc;
        },
        { reconciledTransactions: [], balance: accountData.receivable }
      );

    // console.log(
    //   'data',
    //   accountData,
    //   transactionsData,
    //   datesPeriod,
    //   reconciledTransactions,
    //   reconciledTransactions.filter((transaction) =>
    //     isDateInPeriod(transaction.date, datesPeriod)
    //   )
    // );

    const filteredTransactionsByPeriod = reconciledTransactions.filter(
      (transaction) => isDateInPeriod(transaction.date, datesPeriod)
    );
    // console.log(
    //   'openingBalance',
    //   filteredTransactionsByPeriod[0].balanceBefore,
    //   'closingBalance',
    //   filteredTransactionsByPeriod[filteredTransactionsByPeriod.length - 1]
    //     .balanceAfter
    // );
    if (filteredTransactionsByPeriod.length === 0) {
      return defaultData;
    }

    return {
      openingBalance: formattedPriceToString(
        filteredTransactionsByPeriod[0].balanceBefore
      ),
      closingBalance: formattedPriceToString(
        filteredTransactionsByPeriod[filteredTransactionsByPeriod.length - 1]
          .balanceAfter
      ),
      reconciledTransactions: filteredTransactionsByPeriod,
      accountName: accountData.name,
    };
  }, [accountData, transactionsData, datesPeriod, name]);
};

export { useReconciliationFormatter };
