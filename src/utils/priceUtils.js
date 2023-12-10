const categoryPricesObj = {
  superBulk: { label: 'Крупный опт', value: 'superBulk', surcharge: 1.08 },
  bulk: { label: 'Опт', value: 'bulk', surcharge: 1.13 },
  retail: { label: 'Розница', value: 'retail', surcharge: 1.6 },
  cost: { label: 'Закупка', value: 'cost', surcharge: 1 },
};

const formattedPrice = (number) => Number(number.toFixed(2));

const extractDecimalSurcharge = (priceType) =>
  `наценка ${Math.round((categoryPricesObj[priceType].surcharge % 1) * 100)} %`;

export { categoryPricesObj, formattedPrice, extractDecimalSurcharge };
