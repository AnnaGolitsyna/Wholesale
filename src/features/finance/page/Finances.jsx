import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import FinancesTable from '../components/table/FinancesTable';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import { getColumns } from '../utils/getColumns';
import { fetchPaimentsList } from '../gateway.finance';

const Finances = () => {
  const [paymentsList, setPaymentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPaimentsList = async () => {
    const payList = await fetchPaimentsList();
    setPaymentsList(payList);
    setIsLoading(false);
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
      <FinancesTable
        data={paymentsList}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
};

export default Finances;
