import React, { useEffect } from 'react';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import FinancesTable from '../components/table/FinancesTable';
import { Divider } from 'antd';
import TagPayment from '../../../components/tags/TagPayment';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firestore';

const Finances = () => {
  const getPaimentsList = async () => {
    const querySnapshot = await getDocs(collection(db, 'payments'));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      console.log(
        'test1',
        `${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`
      );
      console.log('test2', doc, doc.data());
    });
  };

  useEffect(() => {
    getPaimentsList();
  }, []);

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
      render: (type) => {
        return <TagPayment type={type} />;
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
