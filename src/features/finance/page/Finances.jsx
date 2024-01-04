import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firestore';
import FinancesTable from '../components/table/FinancesTable';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import { getColumns } from '../utils/getColumns';

const Finances = () => {
  const [paymentsList, setPaymentsList] = useState([]);
  const getPaimentsList = async () => {
    const querySnapshot = await getDocs(collection(db, 'payments'));
    const payList = querySnapshot.docs.map((el) => ({
      ...el.data(),
      key: el.id,
    }));

    setPaymentsList(payList);
  };

  useEffect(() => {
    getPaimentsList();
  }, []);

  const columns = getColumns();

  // const data = [
  //   {
  //     key: '1',
  //     name: 'Andrienko',
  //     date: '2023-12-01',
  //     sum: '100.00',
  //     type: 'credit',
  //   },

  // ];

  return (
    <>
      <HeaderFinance />
      <Divider />
      <FinancesTable data={paymentsList} columns={columns} />
    </>
  );
};

export default Finances;
