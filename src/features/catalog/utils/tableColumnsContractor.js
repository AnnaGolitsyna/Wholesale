import { Tag, Tooltip } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { categoryContractor, categoryStatus } from './categoryContractor';

const contractorsColumns = (onClick) => {
  return [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Цена',
      dataIndex: 'categoryPrice',
      key: 'categoryPrice',
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const { label, color } = categoryContractor.find(
          ({ value }) => value === category
        );
        return (
          <>
            <Tag color={color}>{label}</Tag>
          </>
        );
      },

      filters: categoryContractor.map(({ label, value }) => ({
        text: label,
        value,
      })),

      onFilter: (value, record) => record.category === value,

    },
    {
      title: 'Статус',
      dataIndex: 'active',
      key: 'active',
      render: (status) => (status ? <CheckOutlined /> : <CloseOutlined />),
      filters: categoryStatus.map(({ label, value }) => ({
        text: label,
        value,
      })),

      onFilter: (value, record) => record.active === value,
      // filteredValue: [true],
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Tooltip title="Изменить">
            <EditOutlined onClick={() => onClick(record)} />
          </Tooltip>
        );
      },
    },
  ];
};

export { contractorsColumns };
