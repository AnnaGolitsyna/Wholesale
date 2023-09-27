const categoryContractor = [
  {
    label: 'Покупатель',
    value: 'buyer',
    color: '#87d068',
    children: [
      { label: 'Крупный опт', value: 'superBulk' },
      { label: 'Опт', value: 'bulk' },
      { label: 'Розница', value: 'retail' },
    ],
  },
  { label: 'Поставщик', value: 'supplier', color: '#108ee9' },
  {
    label: 'Универсальный',
    value: 'all-purpose',
    color: '#2db7f5',
    children: [
      { label: 'Крупный опт', value: 'superBulk' },
      { label: 'Опт', value: 'bulk' },
    ],
  },
];

const categoryPrices = [
  { label: 'Крупный опт', value: 'superBulk' },
  { label: 'Опт', value: 'bulk' },
  { label: 'Розница', value: 'retail' },
];

export { categoryContractor, categoryPrices };
