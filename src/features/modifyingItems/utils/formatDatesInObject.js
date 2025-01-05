import { formattedDateObj } from '../../../utils/dateUtils';
/**
 * Formats dates found in the input object by replacing them with formatted dates.
 *
 * @param {Object} data - The input object to format dates in.
 * @return {Object} The new object with dates formatted.
 */

const formatDatesInObject = (data) => {
  if (!data) return null;

  const newDataObj = { ...data };
  const regex = /\b\d{4}-\d{2}-\d{2}\b/;

  for (const el in data) {
    if (Array.isArray(data[el])) {
      newDataObj[el] = data[el].map((item) => {
        if (typeof item === 'object' && item !== null) {
          const formattedItem = { ...item };
          // Check each property in the object for dates
          for (const key in item) {
            if (regex.test(item[key])) {
              formattedItem[key] = formattedDateObj(item[key]);
            }
          }
          return formattedItem;
        }
        return item;
      });
    } else if (regex.test(data[el])) {
      // Handle regular date string case
      newDataObj[el] = formattedDateObj(data[el]);
    }
  }

  return newDataObj;
};

export { formatDatesInObject };
