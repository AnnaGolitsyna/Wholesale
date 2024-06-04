const calculateValue = (prefix, product) => {
  const { selectedPrice, count, cost } = product;
  const totalPrice = selectedPrice * count;

  if (prefix === 'sum') {
    return totalPrice;
  }

  if (prefix === 'profit') {
    return totalPrice - cost * count;
  }

  return 0;
};

export { calculateValue };