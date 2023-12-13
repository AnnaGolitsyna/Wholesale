const categoryPricesObj = {
  superBulk: {
    label: 'Крупный опт',
    value: 'superBulk',
    surcharge: 1.08,
    color: '#ff4d4f',
  },
  bulk: { label: 'Опт', value: 'bulk', surcharge: 1.13, color: '#a5400c' },
  retail: {
    label: 'Розница',
    value: 'retail',
    surcharge: 1.6,
    color: '#5baf37',
  },
  cost: { label: 'Закупка', value: 'cost', surcharge: 1 },
};

const formattedPrice = (number) => Number(number.toFixed(2));

const formattedPriceToString = (number) => number.toFixed(2);

const extractDecimalSurcharge = (priceType) =>
  `наценка ${Math.round((categoryPricesObj[priceType].surcharge % 1) * 100)} %`;

export {
  categoryPricesObj,
  formattedPrice,
  extractDecimalSurcharge,
  formattedPriceToString,
};
