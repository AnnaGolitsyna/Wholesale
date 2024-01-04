import { Tooltip, Space } from 'antd';
import TagPayment from '../../../components/tags/TagPayment';
import { EditOutlined, DeleteRowOutlined } from '@ant-design/icons';
import SupportIcon from '../../../styles/icons/SupportIcon';

export const getColumns = () => {
  return [
    {
      title: 'Контрагент',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
    },
    {
      title: 'Тип оплаты',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        return <TagPayment type={type} />;
      },
    },
    {
      title: <SupportIcon />,
      dataIndex: 'action',
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Изменить">
              <EditOutlined
                onClick={(e) => {
                  const actionType = e.currentTarget.getAttribute('aria-label');
                  // onClick(record, actionType);
                }}
              />
            </Tooltip>
            <Tooltip title="Удалить">
              <DeleteRowOutlined
                onClick={(e) => {
                  const actionType = e.currentTarget.getAttribute('aria-label');
                  // onClick(record, actionType);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
};
