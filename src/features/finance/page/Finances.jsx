import React from 'react';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import FinancesTable from '../components/table/FinancesTable';
import { Divider } from 'antd';
import { Tag } from 'antd';

const Finances = () => {
  const columns = [
    {
      title: 'Контрагент',
      dataIndex: 'name',
      key: 'name',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Сумма',
      dataIndex: 'sum',
      key: 'sum',
    },
    {
      title: 'Тип оплаты',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        let color = 'error';
        if (text === 'credit') {
          color = 'success';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Andrienko',
      date: '2023-12-01',
      sum: '100.00',
      type: 'credit',
    },
    {
      key: '2',
      name: 'Mostovoy',
      date: '2023-12-01',
      sum: '100.00',
      type: 'debet',
    },
  ];

  return (
    <>
      <HeaderFinance />
      <Divider />
      <FinancesTable data={data} columns={columns} />
    </>
  );
};

export default Finances;
