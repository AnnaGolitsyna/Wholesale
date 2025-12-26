import { useMemo } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getTransfersListRef } from '../api/transfers_firebaseRefs';
import { getShortMonthFormat } from '../../../utils/dateUtils';
import dayjs from 'dayjs';

/**
 * Custom hook to fetch transfers data, handling weeks spanning two months
 * @param {string} month - Current month in short format
 * @param {dayjs.Dayjs|null} selectedDate - Selected date for week filtering (null = fetch multiple months)
 * @returns {Object} { transfersData, isLoading, error }
 */
export const useTransfersData = (month, selectedDate) => {
  // Build refs for fetching - handle weeks spanning two months
  const transfersRefs = useMemo(() => {
    // If no date selected (null), fetch from current month and next 2 months
    // This ensures we get all recent and upcoming transfers for 'saved-all' tab
    if (selectedDate === null) {
      const refs = [];
      const currentMonth = dayjs(month);

      // Fetch current month and next 2 months
      for (let i = 0; i < 3; i++) {
        const targetMonth = currentMonth.add(i, 'month');
        const monthStr = getShortMonthFormat(targetMonth.toDate());
        refs.push(getTransfersListRef(monthStr));
      }

      return refs;
    }

    // If a week is selected, fetch from the month(s) that the week belongs to
    if (selectedDate) {
      const refs = [];
      const weekStart = selectedDate.startOf('week');
      const weekEnd = selectedDate.endOf('week');

      // Get the month(s) for this week
      const startMonth = getShortMonthFormat(weekStart.toDate());
      const endMonth = getShortMonthFormat(weekEnd.toDate());

      // Always fetch from the start month
      refs.push(getTransfersListRef(startMonth));

      // If week spans two months, fetch from end month too
      if (startMonth !== endMonth) {
        refs.push(getTransfersListRef(endMonth));
      }

      return refs;
    }

    // Fallback: fetch from current month only
    return [getTransfersListRef(month)];
  }, [month, selectedDate]);

  // Fetch from first month (converter handles adding ID)
  const [transfersData1, isLoadingTransfers1, transfersError1] =
    useCollectionData(transfersRefs[0]);

  // Fetch from second month if needed (converter handles adding ID)
  const [transfersData2, isLoadingTransfers2, transfersError2] =
    useCollectionData(transfersRefs.length > 1 ? transfersRefs[1] : null);

  // Fetch from third month if needed (for saved-all with no date filter)
  const [transfersData3, isLoadingTransfers3, transfersError3] =
    useCollectionData(transfersRefs.length > 2 ? transfersRefs[2] : null);

  // Combine transfers from all months
  const transfersData = useMemo(() => {
    const combined = [...(transfersData1 || [])];
    if (transfersData2 && transfersRefs.length > 1) {
      combined.push(...transfersData2);
    }
    if (transfersData3 && transfersRefs.length > 2) {
      combined.push(...transfersData3);
    }
    return combined;
  }, [transfersData1, transfersData2, transfersData3, transfersRefs.length]);

  const isLoading = isLoadingTransfers1 || isLoadingTransfers2 || isLoadingTransfers3;
  const error = transfersError1 || transfersError2 || transfersError3;

  return { transfersData, isLoading, error };
};
