const formatData = (contractors, receivables) => {
  if (!contractors || !receivables) return [];

  const getReceivable = (id) =>
    receivables.find((receivable) => id === receivable.name.value);

  const formatReceivable = (item, receivable, category) => ({
    ...receivable,
    ...item,
    receivable: receivable ? receivable.debet - receivable.credit : null,
    category,
    key: item.id,
  });

  return contractors.flatMap((contractor) => {
    if (contractor.relatedCompanies.length) {
      return contractor.relatedCompanies.map((company) => {
        const receivable = getReceivable(company.id);
        return formatReceivable(company, receivable, contractor.category);
      });
    } else {
      const receivable = getReceivable(contractor.id);
      return formatReceivable(contractor, receivable, contractor.category);
    }
  });
};

export { formatData };
