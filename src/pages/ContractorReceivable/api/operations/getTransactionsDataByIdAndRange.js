import { getMonthsInRange, isDateInPeriod } from '../../../../utils/dateUtils';
import { getTransactionsDataByIdAndMonth } from './getTransactionsDataByIdAndMonth';

const getTransactionsDataByIdAndRange = async (period, id) => {
  const months = getMonthsInRange(period);

  try {
    const transactionResults = await Promise.allSettled(
      months.map((month) => getTransactionsDataByIdAndMonth(id, month))
    );

    const successfulTransactions = transactionResults
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value)
      .filter((transaction) => isDateInPeriod(transaction.date, period));

    const errors = transactionResults
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);

    if (errors.length) {
      console.error('Some transactions failed to fetch:', errors);
    }

    return successfulTransactions;
  } catch (error) {
    console.error('Error in getTransactionsDataByIdAndRange:', error);
    throw error;
  }
};

export { getTransactionsDataByIdAndRange };
