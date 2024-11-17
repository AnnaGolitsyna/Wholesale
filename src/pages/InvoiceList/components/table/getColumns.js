import { Typography } from 'antd';
import TagForNewDate from '../../../../components/tags/TagForNewDate';
import { getFormattedDataForFilter } from '../../../../utils/getFormattedDataForFilter';
import {splitAdditionalId} from '../../../../utils/splitAdditionalId';
import { formattedPriceToString } from '../../../../utils/priceUtils';

export const getColumns = (data, token, defaultSupplier) => {
  const filterList = defaultSupplier
    ? [splitAdditionalId(defaultSupplier)]
    : [];

  return [
    {
      title: 'Товар',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => <Typography.Text strong>{name}</Typography.Text>,
      width: '35%',
    },

    {
      title: 'В продаже',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text) => <TagForNewDate date={text} color={token.tableAccent} />,
      width: '10%',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      editable: true,
      width: '10%',
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      editable: true,
      width: '9%',
    },
    {
      title: 'Закупка',
      dataIndex: 'cost',
      key: 'cost',
      width: '9%',
      render: (price) => formattedPriceToString(price),
    },
    {
      title: 'Кр.опт',
      dataIndex: 'superBulk',
      key: 'superBulk',
      width: '9%',
      render: (price) => formattedPriceToString(price),
    },
    {
      title: 'Опт',
      dataIndex: 'bulk',
      key: 'bulk',
      width: '9%',
      render: (price) => formattedPriceToString(price),
    },
    {
      title: 'Розница',
      dataIndex: 'retail',
      key: 'retail',
      width: '9%',
      render: (price) => formattedPriceToString(price),
    },
    {
      title: 'Контрагент',
      dataIndex: 'supplier',
      key: 'supplier',
      // defaultSortOrder: 'ascend',
      width: '10%',
      render: (supplier) => <>{supplier.label}</>,
      defaultFilteredValue: filterList,
      filters: getFormattedDataForFilter(data),
      onFilter: (value, record) => record.supplier.value === value, //{ console.log('onFilter', value, record); return record.supplier.value === value},
    },
  ];
};
