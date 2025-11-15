const scheduleType = {
  week: { value: 'week', label: 'Неделя', color: '#250944' },
  month: { value: 'month', label: 'Месяц', color: '#3e116e' },
  pk: { value: 'pk', label: 'Пресс-курьер', color: '#7021c4 ' },
  zenit: { value: 'zenit', label: 'Зенит', color: '#571999' },
  burda: { value: 'burda', label: 'Бурда', color: '#893ade' },
  lvov: { value: 'lvov', label: 'Львов', color: '#a365e6' },
  yarmarka: { value: 'yarmarka', label: 'Ярмарка', color: '#be91ee' },
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
