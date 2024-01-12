const getContractorNameById = (id, list) => {
  if (!id || !list) return;

  const contractor = list.find(({ value }) => value === id);

  if (!contractor) {
    // Handle the case where no matching contractor is found
    console.warn(`No contractor found for id ${id}`);
    return;
  }

  return contractor.label;
};

export { getContractorNameById };
