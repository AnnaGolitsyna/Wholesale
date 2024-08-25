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
   if (!accountData || !transactionsData) {
     return {
       openingBalance: '0',
       closingBalance: '0',
       reconciledTransactions: [],
       accountName: name,
     };
   }

   const filteredTransactions = transactionsData
     .flat()
     .filter((transaction) => isDateInPeriod(transaction.date, datesPeriod))
     .sort(
       (a, b) =>
         a.date.localeCompare(b.date) || a.docNumber.localeCompare(b.docNumber)
     );

   const { reconciledTransactions, balance } = filteredTransactions.reduceRight(
     (acc, item) => {
       const balanceBefore = acc.balance;
       let newBalance = acc.balance;

       if (item.type === OPERATION_TYPES.DEBET) {
         newBalance -= item.sum;
       } else if (item.type === OPERATION_TYPES.CREDIT) {
         newBalance += item.sum;
       }

       acc.reconciledTransactions.unshift({
         ...item,
         key: item.id,
         balanceBefore: formattedPriceToString(balanceBefore),
         balanceAfter: formattedPriceToString(newBalance),
       });

       acc.balance = newBalance;
       return acc;
     },
     { reconciledTransactions: [], balance: accountData.receivable }
   );

   return {
     openingBalance: formattedPriceToString(balance),
     closingBalance: formattedPriceToString(accountData.receivable),
     reconciledTransactions,
     accountName: accountData.name,
   };
 }, [accountData, transactionsData, datesPeriod, name]);
};

export { useReconciliationFormatter };


