
const summarizeExcludingFields = (arr, fieldsToExclude) => {
  const summary = arr.reduce((acc, obj) => {
    for (let key in obj) {
      if (!fieldsToExclude.includes(key)) {
        acc[key] = (acc[key] || 0) + obj[key];
      }
    }
    return acc;
  }, {});
  return Object.entries(summary).map(([name, value]) => ({ name, value }));
};

export { summarizeExcludingFields }