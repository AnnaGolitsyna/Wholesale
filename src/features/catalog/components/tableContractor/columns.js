import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip, theme } from 'antd';
import { EditOutlined, CheckOutlined, StopTwoTone } from '@ant-design/icons';
import {
  categoryContractor,
  categoryPrices,
} from '../../utils/categoryContractor';

const contractorsColumns = (onClick) => {
  const { token } = theme.useToken();
  return [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Категория цен',
      dataIndex: 'categoryPrice',
      key: 'categoryPrice',
      render: (price) => {
        const { label } = categoryPrices[price];
        return (
          <>
            <Tag>{label}</Tag>{' '}
          </>
        );
      },
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
        const { label, color } = categoryContractor.find(
          ({ value }) => value === category
        );
        return (
          <>
            <Tag color={color}>{label}</Tag>
          </>
        );
      },

      filters: categoryContractor.map(({ label, value }) => ({
        text: label,
        value,
      })),

      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Статус',
      dataIndex: 'active',
      key: 'active',
      render: (status) =>
        status ? (
          <CheckOutlined />
        ) : (
          <StopTwoTone twoToneColor={token.canceledColor} />
        ),
    },
    {
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

contractorsColumns.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { contractorsColumns };
