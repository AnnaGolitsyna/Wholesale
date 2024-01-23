import { formattedPriceToString } from '../../../../utils/priceUtils';
import { getShortDateFormat } from '../../../../utils/dateUtils';


export const getPriceListColumns = (contractorslist) => [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'В продаже с',
    dataIndex: 'dateStart',
    key: 'dateStart',
    render: (text) => text && getShortDateFormat(text),
  },

  {
    title: 'Закупка',
    dataIndex: 'cost',
    key: 'cost',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },
  {
    title: 'Кр.опт',
    dataIndex: 'superBulk',
    key: 'superBulk',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },
  {
    title: 'Опт',
    dataIndex: 'bulk',
    key: 'bulk',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },
  {
    title: 'Розница',
    dataIndex: 'retail',
    key: 'retail',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },
  {
    title: 'Поставщик',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (supplier) => <>{supplier.label}</>,

    filters: contractorslist?.map(({ supplier: { label, value } }) => ({
      text: label,
      value,
    })),
    onFilter: (value, record) => record.supplier.value === value,
    filterSearch: true,
  },
];
