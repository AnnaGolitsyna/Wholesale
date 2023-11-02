const categoryPrices = {
  superBulk: { label: 'Крупный опт', value: 'superBulk' },
  bulk: { label: 'Опт', value: 'bulk' },
  retail: { label: 'Розница', value: 'retail' },
  cost: { label: 'Закупка', value: 'cost' },
};

const { superBulk, bulk, retail, cost } = categoryPrices;

const categoryContractor = [
  {
    label: 'Покупатель',
    value: 'buyer',
    color: '#87d068',
    children: [superBulk, bulk, retail],
  },
  {
    label: 'Поставщик',
    value: 'supplier',
    color: '#108ee9',
    children: [cost],
  },
  {
    label: 'Универсальный',
    value: 'all-purpose',
    color: '#2db7f5',
    children: [superBulk, bulk],
  },
];


export { categoryContractor, categoryPrices };
