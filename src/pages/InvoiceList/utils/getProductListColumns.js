import { InputNumber, Input } from 'antd';

export const getProductListColumns = () => {
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

    },
    {
      title: 'В реализации',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',


    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
     // editable: true,

    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',

    },
  ];
};
