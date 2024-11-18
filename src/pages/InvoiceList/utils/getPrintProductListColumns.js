import { Statistic } from 'antd';

export const getPrintProductListColumns = () => {
  return [
    { title: '№', dataIndex: 'index', key: 'index', width: '5%' },
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Товар',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      editable: true,
      align: 'center',
    },
    {
      title: 'В реализації з',
      dataIndex: 'dateStart',
      key: 'dateStart',
      align: 'center',
    },
    {
      title: 'Кількість',
      dataIndex: 'count',
      key: 'count',
      editable: true,
      align: 'center',
      width: '10%',
    },
    {
      title: 'Ціна',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
      editable: true,
      align: 'center',
      width: '15%',
      render: (selectedPrice) => (
        <Statistic
          value={selectedPrice}
          precision={2}
          valueStyle={{
            fontSize: 13,
          }}
        />
      ),
    },
    {
      title: 'Сума',
      dataIndex: 'sumRow',
      key: 'sumRow',
      align: 'center',
      width: '15%',
      render: (_, record) => (
        <Statistic
          value={record.selectedPrice}
          precision={2}
          valueStyle={{
            fontSize: 13,
          }}
        />
      ),
    },
  ];
};
