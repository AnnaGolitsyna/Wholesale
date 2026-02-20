import { useMemo } from 'react';
import { useTransfersData } from './useTransfersData';
import { transformTransfersData, filterByWeek } from '../utils/transfersDataUtils';
import { groupBySchedule, groupByDateAndDocNumber } from '../utils/scheduleGrouping';

const TAB_CONFIG = {
  'saved-nextWeek': { dataSource: 'saved', filter: 'nextWeek' },
  'saved-all':      { dataSource: 'saved', filter: 'all' },
  'orders-request': { dataSource: 'orders', filter: 'request' },
};

const SCHEDULE_FILTER = {
  request: ['month', 'burda'],
};

export const useTransfersDashboardData = ({
  data,
  month,
  activeTab,
  selectedDate,
  selectedSchedule,
  sortOrder,
}) => {
  const { dataSource, filter } = TAB_CONFIG[activeTab] ?? { dataSource: 'saved', filter: 'all' };

  const { transfersData, isLoading: isLoadingTransfers, error: transfersError } =
    useTransfersData(month, selectedDate);

  const filteredTransformedData = useMemo(
    () => transformTransfersData(transfersData, data, dataSource === 'saved'),
    [transfersData, data, dataSource]
  );

  const datePickerFilteredData = useMemo(
    () => filterByWeek(filteredTransformedData, selectedDate),
    [filteredTransformedData, selectedDate]
  );

  const sourceData = useMemo(() => {
    if (dataSource === 'orders') {
      const monthBurdaWeekData = (data || []).filter((item) =>
        ['month', 'burda', 'week'].includes(item.scedule)
      );
      const otherScheduleData = filteredTransformedData.filter(
        (item) => !['month', 'burda', 'week'].includes(item.scedule)
      );
      return [...monthBurdaWeekData, ...otherScheduleData];
    }

    if (filter === 'nextWeek') {
      const weekScheduleData = (data || []).filter((item) => item.scedule === 'week');
      return [...weekScheduleData, ...(datePickerFilteredData || [])];
    }

    return datePickerFilteredData || [];
  }, [dataSource, data, filteredTransformedData, datePickerFilteredData, filter]);

  const scheduleGroups = useMemo(() => {
    if (activeTab === 'saved-all') return groupByDateAndDocNumber(sourceData);
    return groupBySchedule(sourceData);
  }, [sourceData, activeTab]);

  const filteredSchedules = useMemo(() => {
    if (dataSource === 'saved') return scheduleGroups;
    if (filter === 'request') {
      return scheduleGroups.filter((s) =>
        SCHEDULE_FILTER.request.includes(s.scheduleName)
      );
    }
    return scheduleGroups;
  }, [scheduleGroups, dataSource, filter]);

  const scheduleSegmentOptions = useMemo(() => {
    if (activeTab !== 'saved-all') return [];
    const names = [
      ...new Set(filteredSchedules.map((s) => s.scheduleName).filter(Boolean)),
    ];
    return [
      { label: 'Все', value: 'all' },
      ...names.map((name) => ({ label: name, value: name })),
    ];
  }, [filteredSchedules, activeTab]);

  const visibleSchedules = useMemo(() => {
    let result =
      activeTab === 'saved-all' && selectedSchedule !== 'all'
        ? filteredSchedules.filter((s) => s.scheduleName === selectedSchedule)
        : filteredSchedules;

    if (activeTab === 'saved-all') {
      result = [...result].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
    }

    return result;
  }, [filteredSchedules, activeTab, selectedSchedule, sortOrder]);

  const isLoading = dataSource === 'saved' ? isLoadingTransfers : false;
  const hasError = dataSource === 'saved' ? !!transfersError : false;

  return { visibleSchedules, scheduleSegmentOptions, isLoading, hasError };
};
