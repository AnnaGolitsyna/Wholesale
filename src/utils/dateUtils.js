import dayjs from 'dayjs';


const formattedDate = (date) => {
  const dateFormat = 'YYYY/MM/DD';
  return dayjs(date, dateFormat);
};

export { formattedDate };
