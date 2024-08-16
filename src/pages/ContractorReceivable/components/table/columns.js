import { formattedPriceToString } from '../../../../utils/priceUtils';

const columns = [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Номер',
    dataIndex: 'docNumber',
    key: 'docNumber',
  },
  {
    title: 'Транзакция',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Дебет (мы)',
    dataIndex: 'debet',
    key: 'debet',
    align: 'center',
    render: (text, record) =>
      record.type === 'debet' ? formattedPriceToString(record.sum) : null,
  },
  {
    title: 'Кредит (нам)',
    dataIndex: 'credit',
    key: 'credit',
    align: 'center',
    render: (text, record) =>
      record.type === 'credit' ? formattedPriceToString(record.sum) : null,
  },

  {
    title: 'Сальдо',
    dataIndex: 'balanceBefore',
    key: 'balanceBefore',
    align: 'center',
  },
];

export { columns };
