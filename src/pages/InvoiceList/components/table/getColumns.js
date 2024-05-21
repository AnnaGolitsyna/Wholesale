import { Typography } from 'antd';
import TagForNewDate from '../../../../components/tags/TagForNewDate';
import { getFormattedDataForFilter } from '../../../../utils/getFormattedDataForFilter';

export const getColumns = (data, token) => [
  {
    title: 'Товар',
    dataIndex: 'name',
    key: 'name',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (name) => <Typography.Text strong>{name}</Typography.Text>,
  },

  {
    title: 'В продаже',
    dataIndex: 'dateStart',
    key: 'dateStart',
    render: (text) => <TagForNewDate date={text} color={token.tableAccent} />,
  },
  {
    title: 'Номер',
    dataIndex: 'number',
    key: 'number',
    editable: true,
  },
  {
    title: 'Количество',
    dataIndex: 'count',
    key: 'count',
    editable: true,
  },
  {
    title: 'Закупка',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Кр.опт',
    dataIndex: 'superBulk',
    key: 'superBulk',
  },
  {
    title: 'Опт',
    dataIndex: 'bulk',
    key: 'bulk',
  },
  {
    title: 'Розница',
    dataIndex: 'retail',
    key: 'retail',
  },
  {
    title: 'Контрагент',
    dataIndex: 'supplier',
    key: 'supplier',
    // defaultSortOrder: 'ascend',
    render: (supplier) => <>{supplier.label}</>,
    filters: getFormattedDataForFilter(data),
    onFilter: (value, record) => record.supplier.value === value,
  },
];
