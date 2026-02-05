import { Space, Statistic } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import SupportIcon from '../../../styles/icons/SupportIcon';
import TagTypeOperation from '../../../components/tags/TagTypeOperation';
import ConfirmDeletionIcon from '../../../components/popConfirm/ConfirmDeletionIcon';
import { ModalModifyItems } from '../../../features/modifyingItems';
import { ModalToPrint } from '../../../features/printingDocs';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';
import { formattedPriceToString } from '../../../utils/priceUtils';

const printDirectly = (record) => {
  const productRows = record.productList
    ?.slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(
      (item, index) =>
        `<tr>
          <td style="border: 1px solid #000; padding: 3px;">${index + 1}</td>
          <td style="border: 1px solid #000; padding: 3px;">${item.name}</td>
          <td style="border: 1px solid #000; padding: 3px; text-align:center">${item.count}</td>
          <td style="border: 1px solid #000; padding: 3px; text-align:right">${item.price?.toFixed(2) ?? '0.00'}</td>
          <td style="border: 1px solid #000; padding: 3px; text-align:right">${((item.count || 0) * (item.price || 0)).toFixed(2)}</td>
        </tr>`
    )
    .join('') || '';

  const invoiceHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 12px; padding: 10px;">
      <h3 style="margin: 0 0 10px 0; font-size: 14px;">Накладна № ${record.docNumber} від ${record.date}</h3>
      <p style="margin: 0 0 5px 0;"><strong>Контрагент:</strong> ${record.name?.label || ''}</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <thead>
          <tr style="background: #f0f0f0;">
            <th style="border: 1px solid #000; padding: 3px; width: 30px;">№</th>
            <th style="border: 1px solid #000; padding: 3px;">Товар</th>
            <th style="border: 1px solid #000; padding: 3px; width: 50px;">Кіл.</th>
            <th style="border: 1px solid #000; padding: 3px; width: 60px;">Ціна</th>
            <th style="border: 1px solid #000; padding: 3px; width: 70px;">Сума</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>
      <p style="margin: 10px 0 0 0; text-align: right;"><strong>Всього: ${record.sum?.toFixed(2) ?? '0.00'}</strong></p>
    </div>
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head><title>Накладна ${record.docNumber}</title></head>
      <body style="margin: 0; padding: 0;">
        <div style="display: flex; flex-direction: row; height: 100vh;">
          <div style="flex: 1; border-right: 1px dashed #000;">${invoiceHtml}</div>
          <div style="flex: 1;">${invoiceHtml}</div>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.onafterprint = () => printWindow.close();
  printWindow.print();
};

const getInvoiceListColumns = (onDelete, data = []) => {
  const dateFilters = [...new Set(data.map((item) => item.date))]
    .sort((a, b) => b.localeCompare(a))
    .map((date) => ({ text: date, value: date }));

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
      sorter: (a, b) =>
        a.date.localeCompare(b.date) || a.docNumber.localeCompare(b.docNumber),
      filters: dateFilters,
      filterSearch: true,
      onFilter: (value, record) => record.date === value,
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
      render: (price) => formattedPriceToString(price),
    },
    {
      title: 'Прибыль',
      dataIndex: 'profit',
      key: 'profit',
      render: (price) => formattedPriceToString(price),
    },

    {
      title: <SupportIcon />,
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space size="middle">
            {record.fromOrders ? (
              <PrinterOutlined
                style={{ cursor: 'pointer' }}
                onClick={() => printDirectly(record)}
              />
            ) : (
              <ModalToPrint
                data={record}
                type={FORM_TYPES.PRINT_INVOICE}
                iconSize="min"
              />
            )}
            <ModalModifyItems
              data={record}
              typeData={FORM_TYPES.INVOICE}
              actionType={FORM_ACTIONS.EDIT}
              modalWidth="80%"
              fromOrders={record.fromOrders}
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
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'В реализации',
      dataIndex: 'dateStart',
      key: 'dateStart',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: '15%',
    },
    {
      title: 'Цена',
      key: 'price',
      width: '15%',
      render: (_, record) =>
        formattedPriceToString(record.price ?? record.selectedPrice),
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
      width: '15%',
      render: (_, record) => (
        <Statistic
          value={record.count * (record.price ?? record.selectedPrice)}
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
