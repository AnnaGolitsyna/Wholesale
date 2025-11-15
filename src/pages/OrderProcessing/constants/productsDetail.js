const scheduleType = {
  week: { value: 'week', label: 'Неделя', color: '#001204' },
  month: { value: 'month', label: 'Месяц', color: '#1c2e20' },
  pk: { value: 'pk', label: 'Пресс-курьер', color: '#48694f ' },
  zenit: { value: 'zenit', label: 'Зенит', color: '#324b38' },
  burda: { value: 'burda', label: 'Бурда', color: '#5e8767' },
  lvov: { value: 'lvov', label: 'Львов', color: '#78a181' },
  yarmarka: { value: 'yarmarka', label: 'Ярмарка', color: '#95b69c' },
};

const refundsType = {
  unlimited: { value: 'unlimited', label: 'Безлимитный', color: '#87d068' },
  limit5: { value: 'limit5', label: '5%', color: '#b30002' },
  limit10: { value: 'limit10', label: '10%', color: '#9b4a4a' },
  limit15: { value: 'limit15', label: '15%', color: '#d9b08c' },
  limit20: { value: 'limit20', label: '20%', color: '#d9b08c' },
  limit25: { value: 'limit25', label: '25%', color: '#d9b08c' },
  'non-refund': {
    value: 'non-refund',
    label: 'Невозвратный',
    color: '#b30002',
  },
};

const stockType = {
  stock: { value: 'stock', label: 'Склад', color: '#b37feb' },
  shop: { value: 'shop', label: 'Магазин', color: '#85a50e' },
};

const refundsTypeArray = [
  { value: 'unlimited', label: 'Безлимитный>' },
  { value: 'limit5', label: '5%' },
  { value: 'limit10', label: '10%' },
  { value: 'limit15', label: '15%' },
  { value: 'limit20', label: '20%' },
  { value: 'limit25', label: '25%' },
  { value: 'non-refund', label: 'Невозвратный' },
];

export { scheduleType, refundsType, stockType };
