import { useState } from 'react';
import { getNextMonday } from '../utils/dateUtils';

export const useTransfersDashboardState = () => {
  const [activeTab, setActiveTab] = useState('saved-nextWeek');
  const [selectedDate, setSelectedDate] = useState(getNextMonday());
  const [selectedSchedule, setSelectedSchedule] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSelectedSchedule('all');
    setSortOrder('desc');
    setSelectedDate(newTab === 'saved-nextWeek' ? getNextMonday() : null);
  };

  return {
    activeTab,
    selectedDate,
    setSelectedDate,
    selectedSchedule,
    setSelectedSchedule,
    sortOrder,
    setSortOrder,
    handleTabChange,
  };
};
