const getContractorNameById = (itemId, list) =>
  list.find(({ id }) => id === itemId).name;

const getContractorLabelById = (itemId, list) =>
  list?.find(({ value }) => value === itemId).label;

export { getContractorNameById, getContractorLabelById };
