
import { Input, Statistic } from 'antd';
import { DeleteRowOutlined } from '@ant-design/icons';

export const getProductListColumns = (form) => {
  return [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      editable: true,
      width: '15%',
      render: (_, record) => <Input defaultValue={record.number} />,
    },
    {
      title: 'В реализации',
      dataIndex: 'dateStart',
      key: 'dateStart',
      width: '15%',
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
      editable: true,
      width: '15%',
      render: (_, record) => <Input defaultValue={record.selectedPrice} />,
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      editable: true,
      width: '15%',
      render: (_, record) => <Input defaultValue={record.count} />,
    },
    {
      title: 'Сумма',
      dataIndex: 'sumRow',
      key: 'sumRow',
      width: '15%',
      render: (_, record) => (
        <Statistic
          value={record.count * record.selectedPrice}
          precision={2}
          valueStyle={{
            fontSize: 16,
          }}
        />
      ),
    },
    {
      title: 'Удалить',
      dataIndex: 'action',
      render: (_, record) => <DeleteRowOutlined />,
      width: '5%',
    },
  ];
};
