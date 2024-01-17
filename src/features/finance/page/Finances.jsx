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
import { getContractorNameById } from '../../catalog/utils/contractors/getContractorNameById';

import { useGetContractorsListQuery } from '../../catalog/catalogApi';

const Finances = () => {
  const [paymentsList, setPaymentsList] = useState([]);
  const [searchPaymentsList, setSearchPaymentsList] = useState(paymentsList);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const navigate = useNavigate();

  const contractorslist = useContractorsListSelect() || [];

  const { data, isFetching, isSuccess } = useGetContractorsListQuery(true);

  console.log('main', data, isFetching, isSuccess);

  const getPaymentsList = async () => {
    const payList = await fetchPaymentsList();

    console.log('hook', payList, searchPaymentsList, contractorslist);

    const payListWithName = payList.map((el) => {
      const supplierName = getContractorNameById(el.supplier, contractorslist);

      return {
        ...el,
        name: supplierName,
      };
    });

    setPaymentsList(payListWithName);
    setSearchPaymentsList(payListWithName);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSuccess) {
      getPaymentsList();
    }
    // if (contractorslist.length) {
    //   getPaymentsList();
    // }
  }, [isSuccess]);

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

  const handleSearchChange = (searchValue) => {
    const newList = paymentsList.filter((el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchPaymentsList(newList);
  };

  const columns = getColumns(handleModifyPayment, contractorslist);

  return (
    <>
      <HeaderFinance
        showModal={handleModifyPayment}
        handleSearch={handleSearchChange}
      />
      <Divider />
      <FinancesTable
        data={searchPaymentsList}
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
