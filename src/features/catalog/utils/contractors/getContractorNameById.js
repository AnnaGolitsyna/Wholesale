const getContractorNameById = (id, list) => {
  if (!id) return;

  const contractorName = list?.find(({ label, value }) => value === id).label;
  return contractorName;
};

export { getContractorNameById };
