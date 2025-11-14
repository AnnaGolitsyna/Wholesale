const scheduleType = {
  week: { value: 'week', label: 'Неделя' },
  month: { value: 'month', label: 'Месяц' },
  pk: { value: 'pk', label: 'Пресс-курьер' },
  zenit: { value: 'zenit', label: 'Зенит' },
  burda: { value: 'burda', label: 'Бурда' },
  lvov: { value: 'lvov', label: 'Львов' },
  yarmarka: { value: 'yarmarka', label: 'Ярмарка' },
};

const refundsType = [
  { value: 'unlimited', label: 'Безлимитный>' },
  { value: 'limit5', label: '5%' },
  { value: 'limit10', label: '10%' },
  { value: 'limit15', label: '15%' },
  { value: 'limit20', label: '20%' },
  { value: 'limit25', label: '25%' },
  { value: 'non-refund', label: 'Невозвратный' },
];

export { scheduleType, refundsType };