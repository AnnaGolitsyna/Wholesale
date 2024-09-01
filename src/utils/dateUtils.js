import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.locale('ru');
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const shortDateFormat = 'YYYY-MM-DD';

const monthFormat = 'YYYY-MM';

const currenTimestamp = dayjs().valueOf();

const getShortDateFormat = (dateString) => {
  if (!dateString) return null;
  return dayjs(dateString).format(shortDateFormat);
};

const getLocalShortDateFormat = (dateString) => {
  if (!dateString) return null;
  return dayjs(dateString).format('DD.MM.YYYY');
};

const getToday = () => getShortDateFormat(dayjs());

function getTodayFullFormattedDate() {
  return dayjs().format('DD MMMM YYYY');
}

const getFullFormattedDate = (date) => {
  return dayjs(date).format('MMMM YYYY');
};

const getThisMonth = () => dayjs();

const getCurrentYearString = () => {
  const currentYear = dayjs().format('YYYY');
  return `${currentYear}/`;
};


const getDefaultPeriodForRangePicker = (numOfMonths) => {
  try {
    const today = dayjs();

    if (
      typeof numOfMonths === 'number' &&
      Number.isFinite(numOfMonths) &&
      numOfMonths > 0
    ) {
      const startOfCurrentMonth = today.startOf('month');
      const startDate = startOfCurrentMonth
        .subtract(numOfMonths - 1, 'month')
        .startOf('month');

      // Ensure we're returning dayjs objects
      return [startDate, today];
    }

    const startDate = today.startOf('month');

    // Ensure we're returning dayjs objects
    return [startDate, today];
  } catch (error) {
    console.error('Error in getDefaultPeriodForRangePicker:', error);
    // Return a fallback value
    return [dayjs().startOf('month'), dayjs()];
  }
};

const getDisabledDateForDatePicker = (
  periodInMonths = 12,
  monthFromUrl = null
) => {
  return (current) => {
    // Use the month from URL if provided, otherwise use the current date
    const referenceDate = monthFromUrl ? dayjs(monthFromUrl) : dayjs();

    // The rest of the function remains largely the same
    if (periodInMonths === 1) {
      // Special case for 1 month period
      const startDate = referenceDate.startOf('month');
      const endDate = startDate.endOf('month');
      return current && (current < startDate || current > endDate);
    } else {
      // For periods longer than 1 month
      const endDate = referenceDate.endOf('month');
      const startDate = endDate
        .subtract(periodInMonths, 'month')
        .startOf('month');
      return current && (current < startDate || current > endDate);
    }
  };
};

const isDateInPeriod = (date, period) => {
  return dayjs(date).isBetween(period[0], period[1], null, '[]');
};

const getMonthsInRange = (period) => {
  if (!period || period.length !== 2) {
    console.error('Invalid period provided');
    return [];
  }

  const [startDate, endDate] = period.map((date) => dayjs(date));

  if (!startDate.isValid() || !endDate.isValid()) {
    console.error('Invalid date provided');
    return [];
  }

  const months = [];
  let current = startDate.startOf('month');

  while (current.isSameOrBefore(endDate, 'month')) {
    months.push(current.format('YYYY-MM'));
    current = current.add(1, 'month');
  }

  return months;
};

const formattedDateObj = (date) => {
  return dayjs(date, shortDateFormat);
};

const getShortMonthFormat = (date) => {
  return dayjs(date).format(monthFormat);
};

const getThreeMonthsInterval = () => {
  const lastDate = dayjs();
  const firstDate = dayjs().subtract(3, 'months');

  return [firstDate, lastDate];
};

const validateModifyingDate = (data, value) => {
  const dataDate = dayjs(data?.date);
  const valueDate = dayjs(value);

  if (!data?.date) {
    return Promise.resolve();
  }

  if (
    dataDate.month() === valueDate.month() &&
    dataDate.year() === valueDate.year()
  ) {
    return Promise.resolve();
  }

  return Promise.reject(
    `Дата может быть изменена только на ${dataDate.format('MMMM')}`
  );
};

export {
  shortDateFormat,
  monthFormat,
  currenTimestamp,
  getShortDateFormat,
  getLocalShortDateFormat,
  getToday,
  getTodayFullFormattedDate,
  getFullFormattedDate,
  getThisMonth,
  getCurrentYearString,
  getDefaultPeriodForRangePicker,
  getDisabledDateForDatePicker,
  isDateInPeriod,
  getMonthsInRange,
  formattedDateObj,
  getShortMonthFormat,
  getThreeMonthsInterval,
  validateModifyingDate,
};
