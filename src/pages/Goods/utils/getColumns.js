import React from 'react';
import { Space, Tooltip, Tag } from 'antd';
import TagPrice from '../../../components/tags/TagPrice';
import TagForNewDate from '../../../components/tags/TagForNewDate';
import { ModalModifyItems } from '../../../features/modifyingItems';
import SupportIcon from '../../../styles/icons/SupportIcon';
import {
  extractDecimalSurcharge,
  formattedPriceToString,
} from '../../../utils/priceUtils';
import { getFormattedDataForFilter } from '../../../utils/getFormattedDataForFilter';
import { FORM_TYPES, FORM_ACTIONS } from '../../../constants/formTypes';

const getGoodsColumns = (data) => {
  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier) => <Tag>{supplier.label}</Tag>,
      filters: getFormattedDataForFilter(data),
      onFilter: (value, record) => record.supplier.value === value,
    },
    {
      title: 'Cтарт продаж',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (text) => <TagForNewDate date={text} color={'#4b0001'} />,
    },
    {
      title: 'Закупка',
      dataIndex: 'cost',
      key: 'cost',
      render: (number) => formattedPriceToString(number),
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('superBulk')}>
          <span>Кр.опт</span>
        </Tooltip>
      ),
      dataIndex: 'superBulk',
      key: 'superBulk',
      render: (number) => <TagPrice typePrice="superBulk" number={number} />,
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('bulk')}>
          <span>Опт</span>
        </Tooltip>
      ),
      dataIndex: 'bulk',
      key: 'bulk',
      render: (number) => <TagPrice typePrice="bulk" number={number} />,
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('retail')}>
          <span>Розница</span>
        </Tooltip>
      ),
      dataIndex: 'retail',
      key: 'retail',
      render: (number) => <TagPrice typePrice="retail" number={number} />,
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
              typeData={FORM_TYPES.GOODS}
              actionType={FORM_ACTIONS.EDIT}
            />

            <ModalModifyItems
              data={record}
              typeData={FORM_TYPES.GOODS}
              actionType={FORM_ACTIONS.COPY}
            />
          </Space>
        );
      },
    },
  ];
  return { columns };
};


export { getGoodsColumns };
