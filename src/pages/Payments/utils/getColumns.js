import { Space } from 'antd';
import SupportIcon from '../../../styles/icons/SupportIcon';
import TagPayment from '../../../components/tags/TagPayment';
import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';
import { ModalModifyItems } from '../../../features/modifyingItems';
export const getPaymentsColumns = () => {
 const columns = [
    {
      title: 'Контрагент',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      render: (name) => <>{name.label}</>,
   
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
            <ModalModifyItems
              data={record}
              typeData="Payment"
              actionType="edit"
            />

            <ConfirmDeletionIcon
            // handleClick={() => onClick(record, 'delete-row')}
            />
          </Space>
        );
      },
    },
  ];
  return { columns };
};
