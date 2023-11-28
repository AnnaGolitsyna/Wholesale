
const categoryPrices = {
  superBulk: { label: 'Крупный опт', value: 'superBulk', surcharge: 1.08 },
  bulk: { label: 'Опт', value: 'bulk', surcharge: 1.13 },
  retail: { label: 'Розница', value: 'retail', surcharge: 1.6 },
  cost: { label: 'Закупка', value: 'cost', surcharge: 1 },
};

const formattedPrice = number => number.toFixed(2)

const extractDecimalSurcharge = (number) =>
  `наценка ${Math.round((number % 1) * 100)} %`;

export { categoryPrices, formattedPrice, extractDecimalSurcharge };