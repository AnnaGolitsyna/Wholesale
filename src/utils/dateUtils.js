import dayjs from 'dayjs';

const shortDateFormat = 'YYYY-MM-DD';

const getShortDateFormat = (dateString) => {
  return dayjs(dateString).format(shortDateFormat);
};

const getToday = () => getShortDateFormat(dayjs());

const formattedDateObj = (date) => {
  const dateFormat = 'YYYY/MM/DD';
  return dayjs(date, dateFormat);
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
