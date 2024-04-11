const categoryPricesObj = {
  superBulk: {
    label: 'Крупный опт',
    value: 'superBulk',
    surcharge: 1.08,
    color: '#5a5959',
  },
  bulk: { label: 'Опт', value: 'bulk', surcharge: 1.13, color: '#108ee9' },
  retail: {
    label: 'Розница',
    value: 'retail',
    surcharge: 1.6,
    color: '#5baf37',
  },
  cost: { label: 'Закупка', value: 'cost', surcharge: 1 },
};

const formattedPrice = (number) => Number(number.toFixed(2));

const formattedPriceToString = (number) => {
  if (!number) return 0.0;

  return number.toFixed(2);
};

const formatWithDots = (number) => {
  if (!number) return 0.0;
  const formattedNumber = parseFloat(number).toFixed(2);
  return formattedNumber.replace(',', '.');
};

const parseWithDots = (number) => {
  if (!number) return 0.0;
  const parsedValue = parseFloat(number.replace(/,/g, '.'));
  return isNaN(parsedValue) ? undefined : parsedValue;
};

const formattedPriceToExcel = (number) => {
  if (!number) return 0.0;
  return number
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace('.', ',');
};

const extractDecimalSurcharge = (priceType) =>
  `наценка ${Math.round((categoryPricesObj[priceType].surcharge % 1) * 100)} %`;

export {
  categoryPricesObj,
  formattedPrice,
  formatWithDots,
  parseWithDots,
  extractDecimalSurcharge,
  formattedPriceToString,
  formattedPriceToExcel,
};
