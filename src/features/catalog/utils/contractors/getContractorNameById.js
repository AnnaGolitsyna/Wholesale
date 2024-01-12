const getContractorNameById = (id, list) => {
  if (!id) return;

  console.log('func', id, list);

  const contractorName = list?.find(({ label, value }) => value === id).label;
  return contractorName;
};

export { getContractorNameById };
