const getContractorNameById = (id, list) => {
  const contractorName = list?.find(({ label, value }) => value === id).label;
  return contractorName;
};


export { getContractorNameById };
