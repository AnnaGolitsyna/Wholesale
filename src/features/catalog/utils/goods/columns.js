import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip, theme } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import EditIcon from '../../../../styles/icons/EditIcon';
import { getShortDateFormat } from '../../../../utils/dateUtils';

const getGoodsColumns = (onClick) => {
  return [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
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
          <Tooltip title="Изменить">
            <EditOutlined onClick={() => onClick(record)} />
          </Tooltip>
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
