import dayjs from 'dayjs';


const getShortDateFormat = (dateString) => {
  const shortDateFormat = 'YYYY-MM-DD';
  return dayjs(dateString).format(shortDateFormat);

}

const formattedDateObj = (date) => {
  const dateFormat = 'YYYY/MM/DD';
  return dayjs(date, dateFormat);
};

export { getShortDateFormat, formattedDateObj };
