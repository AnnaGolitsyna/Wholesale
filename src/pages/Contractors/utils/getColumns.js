import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { categoryContractor } from '../../../constants/categoryContractor';
import { categoryPricesObj } from '../../../utils/priceUtils';
import { getShortDateFormat } from '../../../utils/dateUtils';
import { AddOnModal } from '../../../features/modifyingItems';
import SupportIcon from '../../../styles/icons/SupportIcon';
import { formattedDateObj } from '../../../utils/dateUtils';
import { ModalModifyItems } from '../../../features/modifyingItems';

const getContractorsColumns = () => {
  const getFormattedContractor = (contractor) => {
    const formattedContractor = contractor && {
      ...contractor,
      date: contractor.date ? formattedDateObj(contractor.date) : null,
    };

    return formattedContractor;
  };
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
          <ModalModifyItems
            data={getFormattedContractor(record)}
            typeData="Contractor"
            actionType="edit"
          />
        );
      },
    },
  ];
  const nestedColumns = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Полное имя',
      dataIndex: 'fullName',
      key: 'fullName',
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
    {
      title: 'Статус',
      dataIndex: 'active',
      key: 'active',
      render: (status) => (status ? <CheckOutlined /> : <StopOutlined />),
    },
  ];
  return { columns, nestedColumns };
};

const relatedCompaniesColumns = [
  {
    title: 'Полное наименование',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Статус',
    dataIndex: 'active',
    key: 'active',
    render: (status) => (status ? <CheckOutlined /> : <StopOutlined />),
  },
  {
    title: <SupportIcon />,
    dataIndex: 'action',
    key: 'action',
    width: 80,
    fixed: 'right',
    render: (_, record) => (
      <AddOnModal data={record} typeData="Contractor" actionType="edit" />
    ),
  },
];

getContractorsColumns.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export { getContractorsColumns, relatedCompaniesColumns };
