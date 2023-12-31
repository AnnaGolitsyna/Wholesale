import React from 'react';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import FinancesTable from '../components/table/FinancesTable';
import { Divider } from 'antd';

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
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Andrienko',
      date: '2023-12-01',
      sum: '100.00',
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
