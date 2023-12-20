import dayjs from 'dayjs';

const getShortDateFormat = (dateString) => {
  const shortDateFormat = 'YYYY-MM-DD';
  return dayjs(dateString).format(shortDateFormat);
};

const getToday = () => getShortDateFormat(dayjs());

const formattedDateObj = (date) => {
  const dateFormat = 'YYYY/MM/DD';
  return dayjs(date, dateFormat);
};

export { getShortDateFormat, getToday, formattedDateObj };
