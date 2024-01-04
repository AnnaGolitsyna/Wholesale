import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import FinancesTable from '../components/table/FinancesTable';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import ModalPayment from '../components/modal/ModalPayment';
import { getColumns } from '../utils/getColumns';
import { fetchPaimentsList } from '../gateway.finance';

const Finances = () => {
  const [paymentsList, setPaymentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPaimentsList = async () => {
    const payList = await fetchPaimentsList();
    setPaymentsList(payList);
    setIsLoading(false);
  };

  useEffect(() => {
    getPaimentsList();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      <HeaderFinance showModal={showModal} />
      <Divider />
      <FinancesTable
        data={paymentsList}
        columns={columns}
        isLoading={isLoading}
      />
      <ModalPayment isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Finances;
