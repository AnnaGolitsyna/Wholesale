
const calculateValue = (prefix, product) => {
  const { selectedPrice, price, count, cost } = product;
  const effectivePrice = selectedPrice ?? price ?? 0;
  const totalPrice = effectivePrice * count;

  if (prefix === 'sum') {
    return totalPrice;
  }

  if (prefix === 'profit') {
    return totalPrice - cost * count;
  }

  return 0;
};

export { calculateValue };
