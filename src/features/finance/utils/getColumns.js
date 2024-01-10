import { Tooltip, Space } from 'antd';
import TagPayment from '../../../components/tags/TagPayment';
import { EditOutlined, DeleteRowOutlined } from '@ant-design/icons';
import SupportIcon from '../../../styles/icons/SupportIcon';
import { getContractorNameById } from '../../catalog/utils/contractors/getContractorNameById';
import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';
import { Popconfirm, Button, message } from 'antd';

export const getColumns = (onClick, contractorslist) => {
  return [
    {
      title: 'Контрагент',
      dataIndex: 'supplier',
      key: 'supplier',
      defaultSortOrder: 'ascend',
      //  sorter: (a, b) => a.supplier.localeCompare(b.supplier),
      render: (name) => <>{getContractorNameById(name, contractorslist)}</>,
    },

    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'des',
      sorter: (a, b) => a.date.localeCompare(b.date),
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
                  onClick(record, actionType);
                }}
              />
            </Tooltip>

            <ConfirmDeletionIcon
              handleClick={() => onClick(record, 'delete-row')}
            />
          </Space>
        );
      },
    },
  ];
};
