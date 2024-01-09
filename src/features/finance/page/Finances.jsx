import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import FinancesTable from '../components/table/FinancesTable';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import ModalPayment from '../components/modal/ModalPayment';
import { getColumns } from '../utils/getColumns';
import { fetchPaimentsList } from '../gateway.finance';
import  useContractorsListSelect  from '../../../hook/useContractorsListSelect';

const Finances = () => {
  const [paymentsList, setPaymentsList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const contractorslist = useContractorsListSelect();

  const getPaimentsList = async () => {
    const payList = await fetchPaimentsList();
    setPaymentsList(payList);
    setIsLoading(false);
  };

  useEffect(() => {
    getPaimentsList();
  }, []);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleModifyPayment = (payment, actionType) => {
    // const formattedContractor = contractor && {
    //   ...contractor,
    //   date: contractor.date ? formattedDateObj(contractor.date) : null,
    // };
    setIsModalOpen(true);
    console.log('hmFunc', payment, actionType);
    setActionType(actionType);
    setSelectedPayment(payment);
    // dispatch(openModalContractor(formattedContractor));
  };

  const columns = getColumns(handleModifyPayment, contractorslist);

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
      <HeaderFinance showModal={handleModifyPayment} />
      <Divider />
      <FinancesTable
        data={paymentsList}
        columns={columns}
        isLoading={isLoading}

      />
      <ModalPayment
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        typeData="Payment"
        actionType={actionType}
        data={selectedPayment}
      />
    </>
  );
};

export default Finances;
