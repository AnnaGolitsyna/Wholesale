const columns = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Номер',
    dataIndex: 'docNumber',
    key: 'docNumber',
  },
  {
    title: 'Транзакция',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Дебет (мы)',
    dataIndex: 'debet',
    key: 'debet',
    align: 'center',
    render: (text, record) => (record.type === 'debet' ? record.sum : null),
  },
  {
    title: 'Кредит (нам)',
    dataIndex: 'credit',
    key: 'credit',
    align: 'center',
    render: (text, record) => (record.type === 'credit' ? record.sum : null),
  },
  { title: 'Остаток', dataIndex: 'balance', key: 'balance', align: 'center' },
  //  render: (text, record) => (record.debet - record.credit),
];

export { columns };
