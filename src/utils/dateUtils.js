import dayjs from 'dayjs';

const shortDateFormat = 'YYYY-MM-DD';

const getShortDateFormat = (dateString) => {
  return dayjs(dateString).format(shortDateFormat);
};

const getToday = () => getShortDateFormat(dayjs());

const formattedDateObj = (date) => {
  return dayjs(date, shortDateFormat);
};

const getThreeMonthsInterval = () => {
  const lastDate = dayjs();
  const firstDate = dayjs().subtract(3, 'months');

  return [firstDate, lastDate];
};

export {
  getShortDateFormat,
  getToday,
  formattedDateObj,
  getThreeMonthsInterval,
  shortDateFormat,
};
