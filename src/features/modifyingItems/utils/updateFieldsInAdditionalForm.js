import { v4 as uuidv4 } from 'uuid';

/**
 * Updates the related companies in the form data based on the values provided.
 *
 * @param {object} values - The values to update the related companies with
 * @param {object} formData - The original form data
 * @param {object} form - The form instance to update the fields with the new data
 * @return {void}
 */
const updateRelatedCompaniesInForm = (values, formData, form) => {
  console.log('updateRelatedCompaniesInForm', values, formData, form);
  const updatedRelatedCompanies = formData?.relatedCompanies?.map((company) =>
    company.id === values.id ? { ...company, ...values } : company
  );

  const newRelatedCompanies = values.id
    ? updatedRelatedCompanies || []
    : [
        ...formData.relatedCompanies,
        {
          ...values,
          id: `${formData.id}-${values.fullName}`,
          key: `${formData.id}-${values.fullName}`,
          active: true,
        },
      ];

  form.setFieldsValue({ ...formData, relatedCompanies: newRelatedCompanies });
};

const updateProductListInForm = (values, formData, form) => {
  const priceType = form.getFieldValue('priceType').value || 'retail';
  const prevProdList = formData?.productList || [];
  const newProductList = values?.productList.map((product) => ({
    ...product,
    selectedPrice: product[priceType],
    key: uuidv4(),
  }));

  localStorage.setItem('productList', JSON.stringify(newProductList));

  form.setFieldsValue({
    productList: [...prevProdList, ...newProductList],
  });
};

const updateCustomValueInForm = (values, formData, form) => {
  const prevProdList = formData?.productList || [];

  const newValue = {
    ...values,
    key: uuidv4(),
    id: `customField:${uuidv4()}`,
    fullName: values.name,
    retail: values.selectedPrice,
    bulk: values.selectedPrice,
    superBulk: values.selectedPrice,
    cost: values.selectedPrice,
  };

  form.setFieldsValue({
    productList: [...prevProdList, newValue],
  });
};

export {
  updateRelatedCompaniesInForm,
  updateProductListInForm,
  updateCustomValueInForm,
};
