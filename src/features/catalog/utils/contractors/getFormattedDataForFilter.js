const getFormattedDataForFilter = (data) => {
  return data?.reduce((acc, { supplier: { label, value } }) => {
    if (!acc.some((item) => item.value === value)) {
      acc.push({
        text: label,
        value,
      });
    }
    return acc;
  }, []);
};

export { getFormattedDataForFilter }