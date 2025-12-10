import dayjs from 'dayjs';

/**
 * Get next Sunday (start of next week)
 * For example, if today is 14/12/25 (Saturday), returns 15/12/25 (Sunday)
 * @returns {dayjs.Dayjs} Next Sunday date
 */
export const getNextSunday = () => {
  const today = dayjs();
  const currentDay = today.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // If today is Sunday (0), get next Sunday (7 days)
  // Otherwise, calculate days until next Sunday
  const daysToAdd = currentDay === 0 ? 7 : 7 - currentDay;

  return today.add(daysToAdd, 'day');
};
