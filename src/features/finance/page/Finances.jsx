import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import FinancesTable from '../components/table/FinancesTable';
import HeaderFinance from '../components/headerFinance/HeaderFinance';
import ModalPayment from '../components/modal/ModalPayment';
import { getColumns } from '../utils/getColumns';
import { fetchPaymentsList, deletePayment } from '../gateway.finance';
import useContractorsListSelect from '../../../hook/useContractorsListSelect';
import { formattedDateObj } from '../../../utils/dateUtils';
import ErrorPage from '../../../pages/results/ErrorPage';

const Finances = () => {
  const [paymentsList, setPaymentsList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const navigate = useNavigate();

  const contractorslist = useContractorsListSelect();

  const getPaymentsList = async () => {
    const payList = await fetchPaymentsList();
    setPaymentsList(payList);
    setIsLoading(false);
  };

  useEffect(() => {
    getPaymentsList();
  }, []);

  const handleModifyPayment = async (payment, actionType) => {
    try {
      if (actionType === 'delete-row') {
        console.log('hmp', payment);
        await deletePayment(payment.key);
        getPaymentsList();
      } else {
        setIsModalOpen(true);
        console.log('hmFunc', payment, actionType);
        setActionType(actionType);
        const formattedPayment = payment && {
          ...payment,
          date: formattedDateObj(payment.date),
        };
        console.log('hmFunc format', formattedPayment);
        setSelectedPayment(formattedPayment);
      }
    } catch (error) {
      console.error('Error deleting payment HMF:', error);
      
      navigate('/errorPage', { state: { errorData: error } });
    }
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
        updatePayList={getPaymentsList}
        typeData="Payment"
        actionType={actionType}
        data={selectedPayment}
      />
    </>
  );
};

export default Finances;
