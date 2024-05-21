
import { InputNumber, Input, Tag, Statistic } from 'antd';
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
      render: (_, record) => <Input defaultValue={record.number} />,
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
      render: (_, record) => <Input defaultValue={record.selectedPrice} />
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      editable: true,
      render: (_, record) => <Input defaultValue={record.count} />,
    },
    {
      title: 'Сумма',
      dataIndex: 'sumRow',
      key: 'sumRow',
      render: (_, record) => <Statistic value={record.count * record.selectedPrice} />,
    },
  ];
};
