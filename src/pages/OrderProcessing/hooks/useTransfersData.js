import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getTransfersListRef } from '../api/transfers_firebaseRefs';
import { getShortMonthFormat } from '../../../utils/dateUtils';

/**
 * Custom hook to fetch transfers data, handling weeks spanning two months
 * @param {string} month - Current month in short format
 * @param {dayjs.Dayjs|null} selectedDate - Selected date for week filtering
 * @returns {Object} { transfersData, isLoading, error }
 */
export const useTransfersData = (month, selectedDate) => {
  // Build refs for fetching - handle weeks spanning two months
  const transfersRefs = useMemo(() => {
    const refs = [getTransfersListRef(month)];

    // If a week is selected and it spans two months, fetch from both
    if (selectedDate) {
      const weekStart = selectedDate.startOf('week');
      const weekEnd = selectedDate.endOf('week');

      if (weekStart.month() !== weekEnd.month()) {
        const secondMonth = getShortMonthFormat(weekEnd.toDate());
        if (secondMonth !== month) {
          refs.push(getTransfersListRef(secondMonth));
        }
      }
    }

    return refs;
  }, [month, selectedDate]);

  // Fetch from first month (converter handles adding ID)
  const [transfersData1, isLoadingTransfers1, transfersError1] =
    useCollectionData(transfersRefs[0]);

  // Fetch from second month if needed (converter handles adding ID)
  const [transfersData2, isLoadingTransfers2, transfersError2] =
    useCollectionData(transfersRefs.length > 1 ? transfersRefs[1] : null);

  // Combine transfers from both months
  const transfersData = useMemo(() => {
    const combined = [...(transfersData1 || [])];
    if (transfersData2 && transfersRefs.length > 1) {
      combined.push(...transfersData2);
    }
    return combined;
  }, [transfersData1, transfersData2, transfersRefs.length]);

  const isLoading = isLoadingTransfers1 || isLoadingTransfers2;
  const error = transfersError1 || transfersError2;

  return { transfersData, isLoading, error };
};
