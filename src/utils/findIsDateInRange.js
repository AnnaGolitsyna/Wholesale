import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export const findIsDateInRange = (dateString, range) => {
  const today = dayjs();
  const startDate = today.subtract(range, 'day');
  const endDate = today.add(360, 'day');

  const dateToCheck = dayjs(dateString);

  return dateToCheck.isBetween(startDate, endDate, null, '[]');
};
