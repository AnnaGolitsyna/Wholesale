import {
  categoryPricesObj,
  formattedPrice,
} from '../../../utils/priceUtils';

const updateProductPrices = (form) => {
  const price = form.getFieldValue('cost');
  const superBulk = formattedPrice(
    price * categoryPricesObj.superBulk.surcharge
  );
  const bulk = formattedPrice(price * categoryPricesObj.bulk.surcharge);
  const retail = formattedPrice(price * categoryPricesObj.retail.surcharge);

  form.setFieldsValue({
    superBulk,
    bulk,
    retail,
  });
};

export default updateProductPrices;
