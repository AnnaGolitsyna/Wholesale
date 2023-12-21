import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip, theme } from 'antd';
import { EditOutlined, CheckOutlined, StopTwoTone } from '@ant-design/icons';
import { categoryContractor } from '../../../../constants/categoryContractor';
import { categoryPricesObj } from '../../../../utils/priceUtils';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import SupportIcon from '../../../../styles/icons/SupportIcon';

const getContractorsColumns = (onClick) => {
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
        const { label } = categoryPricesObj[price];
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
      title: <SupportIcon />,
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Tooltip title="Изменить">
            <EditOutlined
              onClick={(e) => {
                const actionType = e.currentTarget.getAttribute('aria-label');
                onClick(record, actionType);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];
};

const nestedColumns = [
  {
    title: 'Полное имя',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Адрес',
    dataIndex: 'adress',
    key: 'adress',
  },

  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Налоговый код',
    dataIndex: 'taxNumber',
    key: 'taxNumber',
  },
  {
    title: 'Договор №',
    dataIndex: 'contractNumber',
    key: 'contractNumber',
  },
  {
    title: 'от',
    dataIndex: 'date',
    key: 'date',
    render: (text) => text && getShortDateFormat(text),
  },
];

getContractorsColumns.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { getContractorsColumns, nestedColumns };
