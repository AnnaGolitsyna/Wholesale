
import TagForNewDate from '../../../components/tags/TagForNewDate';
import { formattedPriceToString } from '../../../utils/priceUtils';
import { getShortDateFormat } from '../../../utils/dateUtils';
import { getFormattedDataForFilter } from '../../../utils/getFormattedDataForFilter';
import { findIsDateInRange } from '../../../utils/findIsDateInRange';

export const getPriceListColumns = (data) => [
  {
    title: 'Найменування',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'В продажу з',
    dataIndex: 'dateStart',
    key: 'dateStart',
    render: (text) => <TagForNewDate date={text}  />,

    filters: [
      {
        text: 'Новые цены',
        value: '',
      },
    ],
    onFilter: (value, record) =>
      findIsDateInRange(getShortDateFormat(record.dateStart), 14),
  },

  {
    title: 'Закупівля',
    dataIndex: 'cost',
    key: 'cost',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },
  {
    title: 'Вел.опт',
    dataIndex: 'superBulk',
    key: 'superBulk',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },
  {
    title: 'Оптова',
    dataIndex: 'bulk',
    key: 'bulk',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },
  {
    title: 'Роздрібна',
    dataIndex: 'retail',
    key: 'retail',
    render: (number) => formattedPriceToString(number),
    align: 'center',
  },

  {
    title: 'Постачальник',
    dataIndex: 'supplier',
    key: 'supplier',
    render: (supplier) => <>{supplier.label}</>,
    filters: data.length && getFormattedDataForFilter(data),
    onFilter: (value, record) => record.supplier.value === value,
    filterSearch: true,
  },
];
