import dayjs from 'dayjs';

const shortDateFormat = 'YYYY-MM-DD';

const monthFormat = 'YYYY-MM';

const getShortDateFormat = (dateString) => {
  if (!dateString) return null;
  return dayjs(dateString).format(shortDateFormat);
};

const getToday = () => getShortDateFormat(dayjs());

const getThisMonth = () => dayjs();

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

export {
  getShortDateFormat,
  getToday,
  getThisMonth,
  formattedDateObj,
  getThreeMonthsInterval,
  getShortMonthFormat,
  shortDateFormat,
  monthFormat,
};
