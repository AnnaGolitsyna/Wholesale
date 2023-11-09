import dayjs from 'dayjs';

const shortDateFormat = 'YYYY-MM-DD';

const formattedDateObj = (date) => {
  const dateFormat = 'YYYY/MM/DD';
  return dayjs(date, dateFormat);
};

export { shortDateFormat, formattedDateObj };
