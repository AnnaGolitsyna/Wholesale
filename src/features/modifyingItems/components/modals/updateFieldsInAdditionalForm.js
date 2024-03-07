/**
 * Updates the related companies in the form data based on the values provided.
 *
 * @param {object} values - The values to update the related companies with
 * @param {object} data - The original form data
 * @param {object} form - The form instance to update the fields with the new data
 * @return {void}
 */
const updateRelatedCompaniesInForm = (values, data, form) => {
  const updatedRelatedCompanies = data.relatedCompanies.map((company) =>
    company.id === values.id ? { ...company, ...values } : company
  );

  const newRelatedCompanies = values.id
    ? updatedRelatedCompanies || []
    : [
        ...data.relatedCompanies,
        {
          ...values,
          id: `${data.id}-${values.fullName}`,
          key: `${data.id}-${values.fullName}`,
          active: true,
        },
      ];

  form.setFieldsValue({ ...data, relatedCompanies: newRelatedCompanies });
};

export { updateRelatedCompaniesInForm };
