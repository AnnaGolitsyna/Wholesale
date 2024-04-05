import { formattedDateObj } from '../../../utils/dateUtils';
/**
 * Formats dates found in the input object by replacing them with formatted dates.
 *
 * @param {Object} data - The input object to format dates in.
 * @return {Object} The new object with dates formatted.
 */

const formatDatesInObject = (data) => {
  const newDataObj = { ...data };
  const regex = /\b\d{4}-\d{2}-\d{2}\b/;

  for (const el in data) {
    if (regex.test(data[el])) {
      const newDate = formattedDateObj(data[el]);
      newDataObj[el] = newDate;
    }
  }
  return newDataObj;
};

export { formatDatesInObject };
