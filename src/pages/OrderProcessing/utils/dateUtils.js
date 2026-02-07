import dayjs from 'dayjs';

/**
 * Get next Monday (start of next week, Mon-Sun)
 * For example, if today is Saturday 07/02/26, returns Monday 09/02/26
 * @returns {dayjs.Dayjs} Next Monday date
 */
export const getNextMonday = () => {
  const today = dayjs();
  const currentDay = today.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // If today is Monday (1), get next Monday (7 days)
  // If today is Sunday (0), next Monday is tomorrow (1 day)
  // Otherwise, calculate days until next Monday
  const daysToAdd = currentDay === 0 ? 1 : currentDay === 1 ? 7 : 8 - currentDay;

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
 * Get the Monday of the week containing the given date (Mon-Sun week)
 * For example, if date is 11/02/26 (Wednesday), returns 09/02/26 (Monday)
 * @param {dayjs.Dayjs} date - Any date
 * @returns {dayjs.Dayjs} Monday of that week
 */
export const getMondayOfWeek = (date) => {
  if (!date) return null;
  const currentDay = date.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // If already Monday, return as is
  if (currentDay === 1) return date;

  // Sunday (0) is the last day of the week, so Monday was 6 days ago
  if (currentDay === 0) return date.subtract(6, 'day');

  // Otherwise, subtract (currentDay - 1) days to get to Monday
  return date.subtract(currentDay - 1, 'day');
};
