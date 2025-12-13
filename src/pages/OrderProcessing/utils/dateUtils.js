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

export const getNextWednesday = () => {
  const today = dayjs();
  const currentDay = today.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Wednesday is day 3
  // If today is Wednesday (3), get next Wednesday (7 days)
  // Otherwise, calculate days until next Wednesday
  const daysToAdd = currentDay === 3 ? 7 : (3 - currentDay + 7) % 7;

  return today.add(daysToAdd, 'day');
};

/**
 * Get the Sunday of the week containing the given date
 * For example, if date is 23/12/25 (Tuesday), returns 21/12/25 (Sunday)
 * @param {dayjs.Dayjs} date - Any date
 * @returns {dayjs.Dayjs} Sunday of that week
 */
export const getSundayOfWeek = (date) => {
  if (!date) return null;
  const currentDay = date.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // If already Sunday, return as is
  if (currentDay === 0) return date;

  // Otherwise, subtract days to get to Sunday
  return date.subtract(currentDay, 'day');
};
