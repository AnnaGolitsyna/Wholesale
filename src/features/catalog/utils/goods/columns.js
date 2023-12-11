import React from 'react';
import PropTypes from 'prop-types';
import { Space, Tag, Tooltip, theme } from 'antd';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';
import TagSupplier from '../../components/tagSupplier/TagSupplier';
import EditIcon from '../../../../styles/icons/EditIcon';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import { extractDecimalSurcharge } from '../../../../utils/priceUtils';


const getGoodsColumns = (onClick) => {
  return [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier) => {
        return <TagSupplier supplier={supplier} />;
      },
    },
    {
      title: 'Закупка',
      dataIndex: 'cost',
      key: 'cost',
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('superBulk')}>
          <span>Кр.опт</span>
        </Tooltip>
      ),
      dataIndex: 'superBulk',
      key: 'superBulk',
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('bulk')}>
          <span>Опт</span>
        </Tooltip>
      ),
      dataIndex: 'bulk',
      key: 'bulk',
    },
    {
      title: (
        <Tooltip title={extractDecimalSurcharge('retail')}>
          <span>Розница</span>
        </Tooltip>
      ),
      dataIndex: 'retail',
      key: 'retail',
    },
    {
      title: (
        <EditIcon
          style={{
            fontSize: 50,
          }}
        />
      ),
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Изменить">
              <EditOutlined onClick={() => onClick(record)} />
            </Tooltip>
            <Tooltip title="Копировать">
              <CopyOutlined />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
};

const nestedColumns = [
  {
    title: 'Полное наименование',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Дата старта продаж',
    dataIndex: 'dateStart',
    key: 'dateStart',
    render: (text) => text && getShortDateFormat(text),
  },
  {
    title: 'Дата снятия с продажи',
    dataIndex: 'dateStart',
    key: 'dateStart',
    render: (text) => text && getShortDateFormat(text),
  },
];

getGoodsColumns.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { getGoodsColumns, nestedColumns };
