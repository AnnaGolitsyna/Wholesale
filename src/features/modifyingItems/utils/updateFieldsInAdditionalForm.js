import { v4 as uuidv4 } from 'uuid';
import { getShortDateFormat } from '../../../utils/dateUtils';
import { OPERATION_TYPES } from '../../../constants/operationTypes';

/**
 * Updates the related companies in the form data based on the values provided.
 *
 * @param {object} values - The values to update the related companies with
 * @param {object} formData - The original form data
 * @param {object} form - The form instance to update the fields with the new data
 * @return {void}
 */
const updateRelatedCompaniesInForm = (values, formData, form) => {
  const updatedRelatedCompanies = formData?.relatedCompanies?.map((company) =>
    company.id === values.id
      ? {
          ...company,
          ...values,
          date: getShortDateFormat(values.date),
        }
      : company
  );

  const newRelatedCompanies = values.id
    ? updatedRelatedCompanies || []
    : [
        ...formData.relatedCompanies,
        {
          ...values,
          id: `${formData.id}-${uuidv4()}`,
          key: `${formData.id}-${uuidv4()}`,
          active: true,
          date: getShortDateFormat(values.date),
        },
      ];

  form.setFieldsValue({ relatedCompanies: newRelatedCompanies });
};

const updateProductListInForm = (values, formData, form, docType) => {
  const priceType = form.getFieldValue('priceType').value || 'retail';
  const prevProdList = formData?.productList || [];
  const newProductList = values?.productList.map((product) => ({
    ...product,
    selectedPrice:
      docType === OPERATION_TYPES.PURCHASE ? product.cost : product[priceType],
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
    dateStart: values.dateStart || null,
    number: values.number || '',
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
