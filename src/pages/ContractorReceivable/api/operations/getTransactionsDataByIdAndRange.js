import { getMonthsFromStartToPresent } from '../../../../utils/dateUtils';
import { getTransactionsDataByIdAndMonth } from './getTransactionsDataByIdAndMonth';

const getTransactionsDataByIdAndRange = async (period, id) => {
  const months = getMonthsFromStartToPresent(period);

  try {
    const transactionResults = await Promise.allSettled(
      months.map((month) => getTransactionsDataByIdAndMonth(id, month))
    );

    const successfulTransactions = transactionResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value);

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
