import { formattedPrice } from '../../../../utils/priceUtils';

const calculateValue = (prefix, product) => {
  const { selectedPrice, count, cost } = product;
  const totalPrice = selectedPrice * count;

  if (prefix === 'sum') {
    return formattedPrice(totalPrice);
  }

  if (prefix === 'profit') {
    return formattedPrice(totalPrice - cost * count);
  }

  return 0;
};

export { calculateValue };
