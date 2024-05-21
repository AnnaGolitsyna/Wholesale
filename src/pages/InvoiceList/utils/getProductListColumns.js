export const getProductListColumns = (form) => {
  return [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      editable: true,
    },
    {
      title: 'В реализации',
      dataIndex: 'dateStart',
      key: 'dateStart',
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
      editable: true,
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      editable: true,
    },
    {
      title: 'Сумма',
      dataIndex: 'sumRow',
      key: 'sumRow',
    },
  ];
};
