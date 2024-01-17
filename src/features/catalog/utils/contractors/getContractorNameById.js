const getContractorNameById = (itemId, list) =>
  list.find(({ id }) => id === itemId).name;
  

const getContractorLabelById = (itemId, list) => {
  if (!itemId || !list) return;

  const contractor = list.find(({ value }) => value === itemId);

  if (!contractor) {
    console.warn(`No contractor found for id ${itemId}`);
    return;
  }

  return contractor.label;
};

export { getContractorNameById, getContractorLabelById };
