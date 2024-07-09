import dayjs from 'dayjs';

import 'dayjs/locale/ru';
dayjs.locale('ru');


const shortDateFormat = 'YYYY-MM-DD';

const monthFormat = 'YYYY-MM';

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

const getThisMonth = () => dayjs();

const currenTimestamp = dayjs().valueOf();

const getCurrentYearString = () => {
  const currentYear = dayjs().format('YYYY');
  return `${currentYear}/`;
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
  getShortDateFormat,
  getLocalShortDateFormat,
  getToday,
  getTodayFullFormattedDate,
  getThisMonth,
  currenTimestamp,
  getCurrentYearString,
  formattedDateObj,
  getThreeMonthsInterval,
  getShortMonthFormat,
  shortDateFormat,
  monthFormat,
  validateModifyingDate,
};
