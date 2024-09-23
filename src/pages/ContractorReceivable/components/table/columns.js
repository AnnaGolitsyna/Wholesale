import {Statistic} from 'antd';
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

const productColumns = [
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
    dataIndex: 'selectedPrice',
    key: 'selectedPrice',
    render: (text) => formattedPriceToString(text),
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
];

export { columns, productColumns };
