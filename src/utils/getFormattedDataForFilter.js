const getFormattedDataForFilter = (data) => {
  if (!data) return;

  return data?.reduce((acc, item) => {
    // Check if item has supplier property with label and value
    if (item?.supplier?.label && item?.supplier?.value) {
      const { label, value } = item.supplier;

      // Check if this supplier is already in our accumulator
      if (!acc.some((accItem) => accItem.value === value)) {
        acc.push({
          text: label,
          value,
        });
      }
    }
    return acc;
  }, []);
};

export { getFormattedDataForFilter };
