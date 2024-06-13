import { Space, Statistic } from 'antd';
import SupportIcon from '../../../styles/icons/SupportIcon';
import TagTypeOperation from '../../../components/tags/TagTypeOperation';
import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';
import { ModalModifyItems } from '../../../features/modifyingItems';


const getInvoiceListColumns = (onDelete) => {
  const columns = [
    {
      title: 'Контрагент',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      render: (name) => <>{name?.label}</>,
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      render: (type) => {
        return <TagTypeOperation type={type} />;
      },
    },
    {
      title: 'Номер',
      dataIndex: 'docNumber',
      key: 'docNumber',
      width: '15%',
    },

    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'des',
      // sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
    },
    {
      title: 'Прибыль',
      dataIndex: 'profit',
      key: 'profit',
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
              typeData="Invoice"
              actionType="edit"
            />

            <ConfirmDeletionIcon handleClick={() => onDelete(record)} />
          </Space>
        );
      },
    },
  ];
  const nestedColumns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: '15%',
    },
    {
      title: 'Цена',
      dataIndex: 'selectedPrice',
      key: 'selectedPrice',
      width: '15%',
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
      width: '15%',
      render: (_, record) => (
        <Statistic
          value={record.count * record.selectedPrice}
          precision={2}
          valueStyle={{
            fontSize: 14,
          }}
        />
      ),
    },
  ];
  return { columns, nestedColumns };
};


export { getInvoiceListColumns };
