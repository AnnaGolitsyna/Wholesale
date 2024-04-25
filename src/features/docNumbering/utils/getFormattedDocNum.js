export const getFormattedDocNum = (docCode, value) => {
  return `${docCode[0].toUpperCase()}-${value.toString().padStart(3, '0')}`;
};
