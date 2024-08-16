import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ru';

dayjs.extend(isSameOrBefore);
dayjs.locale('ru');

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

const getDefaultPeriodForRangePicker = () => {
  // 6 month period
  //  const today = dayjs();
  //  const startOfCurrentMonth = today.startOf('month');
  //  const startDate = startOfCurrentMonth.subtract(5, 'month').startOf('month');
  const today = dayjs();
  const startDate = today.startOf('month');
  return [startDate, today];
  // return [getShortDateFormat(startDate), getShortDateFormat(today)];
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
  getMonthsInRange,
  formattedDateObj,
  getShortMonthFormat,
  getThreeMonthsInterval,
  validateModifyingDate,
};
