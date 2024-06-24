import { Statistic } from 'antd';

export const getPrintProductListColumns = () => {
  return [
    { title: '№', dataIndex: 'index', key: 'index', width: '5%' },
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
    },
    {
      title: 'В реализации',
      dataIndex: 'dateStart',
      key: 'dateStart',
      width: '15%',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      editable: true,
      width: '10%',
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
      editable: true,
      width: '15%',
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
  ];
};
