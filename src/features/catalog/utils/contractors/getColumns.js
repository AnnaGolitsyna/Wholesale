import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip } from 'antd';
import { EditOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import { categoryContractor } from '../../../../constants/categoryContractor';
import { categoryPricesObj } from '../../../../utils/priceUtils';
import { getShortDateFormat } from '../../../../utils/dateUtils';
import SupportIcon from '../../../../styles/icons/SupportIcon';
import AddOnModal from '../../components/modalItem/AddOnModal';

const getContractorsColumns = (onClick) => {
  return [
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
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
      title: <SupportIcon />,
      dataIndex: 'action',
      key: 'action',
      width: 80,
      fixed: 'right',
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
    title: 'Наименование',
    dataIndex: 'nameRC',
    key: 'nameRC',
  },
  {
    title: 'Полное имя',
    dataIndex: 'fullNameRC',
    key: 'fullNameRC',
  },

  {
    title: 'Налоговый код',
    dataIndex: 'taxNumberRC',
    key: 'taxNumberRC',
  },
  {
    title: 'Договор №',
    dataIndex: 'contractNumberRC',
    key: 'contractNumberRC',
  },
  {
    title: 'от',
    dataIndex: 'dateRC',
    key: 'dateRC',
    render: (text) => text && getShortDateFormat(text),
  },
  {
    title: 'Статус',
    dataIndex: 'activeRC',
    key: 'activeRC',
    render: (status) => (status ? <CheckOutlined /> : <StopOutlined />),
  },
];

const relatedCompaniesColumns = [
  {
    title: 'Полное наименование',
    dataIndex: 'fullNameRC',
    key: 'fullNameRC',
  },
  {
    title: 'Статус',
    dataIndex: 'activeRC',
    key: 'activeRC',
    render: (status) => (status ? <CheckOutlined /> : <StopOutlined />),
  },
  {
    title: <SupportIcon />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    fixed: 'right',
    render: (_, record) => <AddOnModal actionType="edite" data={record} />,
  },
];

getContractorsColumns.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { getContractorsColumns, nestedColumns, relatedCompaniesColumns };
