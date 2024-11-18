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

const getDefaultNumber = (number, defaultValue = 0) => {
  const parsed = Number(number);
  return isNaN(parsed) ? defaultValue : parsed;
};

const formattedPrice = (number) => Number(number?.toFixed(2));

const formattedPriceToString = (number) => {
  const value = getDefaultNumber(number);
  return (Math.round(value * 100) / 100).toFixed(2);
};


const formatWithDots = (number) => {
  const value = getDefaultNumber(number);
  return value.toFixed(2).replace(',', '.');
};


const parseWithDots = (number) => {
  if (typeof number !== 'string') {
    return getDefaultNumber(number);
  }
  const parsedValue = parseFloat(number.replace(/,/g, '.'));
  return getDefaultNumber(parsedValue);
};


const formattedPriceToExcel = (number) => {
  const value = getDefaultNumber(number);
  return value
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
