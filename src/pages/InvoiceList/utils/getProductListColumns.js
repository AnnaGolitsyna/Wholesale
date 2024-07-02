import { Input, Statistic } from 'antd';
import { DeleteRowOutlined, QuestionOutlined } from '@ant-design/icons';
import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';

export const getProductListColumns = (form, handleDelete) => {
  return [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      editable: true,
      width: '15%',
      render: (_, record) => <Input value={record.number} />,
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
      width: '15%',
      render: (_, record) => {
        return (
          <Input
            value={record.count}
            status={record.count === 0 && 'warning'}
            prefix={record.count === 0 && <QuestionOutlined />}
          />
        );
      },
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
      editable: true,
      width: '15%',
      render: (_, record) => <Input value={record.selectedPrice} />,
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
      render: (_, record) => (
        <ConfirmDeletionIcon handleClick={() => handleDelete(record.key)} />
      ),
      width: '5%',
    },
  ];
};
