import { Space } from 'antd';
import SupportIcon from '../../../styles/icons/SupportIcon';
import TagTypeOperation from '../../../components/tags/TagTypeOperation';
import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { name } from 'dayjs/locale/ru';

export const getInvoiceListColumns = () => {
  const columns = [
    {
      title: 'Контрагент',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      render: (name) => <>{name.label}</>,
    },
    {
      title: 'Тип оплаты',
      dataIndex: 'type',
      key: 'type',
      width: '15%',
      render: (type) => {
        return <TagTypeOperation type={type} />;
      },
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
      title: <SupportIcon />,
      dataIndex: 'action',
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space size="middle">
            {/* <ModalModifyItems
                data={record}
                typeData="Payment"
                actionType="edit"
              />

              <ConfirmDeletionIcon handleClick={() => onDelete(record)} /> */}
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
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
    },
    //    {
    //      title: 'Полное имя',
    //      dataIndex: 'fullName',
    //      key: 'fullName',
    //    },

    //    {
    //      title: 'Налоговый код',
    //      dataIndex: 'taxNumber',
    //      key: 'taxNumber',
    //    },
    //    {
    //      title: 'Договор №',
    //      dataIndex: 'contractNumber',
    //      key: 'contractNumber',
    //    },
    //    {
    //      title: 'от',
    //      dataIndex: 'date',
    //      key: 'date',
    //      render: (text) => text && getShortDateFormat(text),
    //    },
    //    {
    //      title: 'Статус',
    //      dataIndex: 'active',
    //      key: 'active',
    //      render: (status) => (status ? <CheckOutlined /> : <StopOutlined />),
    //    },
  ];
  return { columns, nestedColumns };
};
