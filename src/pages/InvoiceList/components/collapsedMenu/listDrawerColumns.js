const listDrawerColumns = [
  {
    title: 'Товар',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend'],
  },
  {
    title: 'Закупка',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Кр.опт',
    dataIndex: 'superBulk',
    key: 'superBulk',
  },
  {
    title: 'Опт',
    dataIndex: 'bulk',
    key: 'bulk',
  },
  {
    title: 'Розница',
    dataIndex: 'retail',
    key: 'retail',
  },
  {
    title: 'Номер',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'В реализации',
    dataIndex: 'dateStart',
    key: 'dateStart',
  },
];

export { listDrawerColumns };
