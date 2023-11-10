import React, { useState } from 'react';
import { Form, Spin, Alert } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import ContractorTable from '../components/tableContractor/ContractorTable';
import { emptyContractorObject } from '../utils/emptyContractorForm';
import {
  useGetContractorsListQuery,
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../catalogApi';

import dayjs from 'dayjs';

const Contractors = () => {
  const [activeStatus, setActiveStatus] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const {
    data: contractorsList = [],
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(activeStatus);
  const [createContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();

  const [form] = Form.useForm();

  const handleOk = (newValue) => {
    console.log('newValue', newValue);
    console.log('newValue', newValue.id);
    if (newValue.id) {
      updateContractor(newValue);
    } else {
      createContractor(newValue);
    }

    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleModifyContractor = (contractor) => {
    const initialValues = contractor ?? emptyContractorObject;
    console.log('selectContr', initialValues);
    setIsModalOpen(true);
    setSelectedContractor(initialValues);
  };


  // console.log(contractorsList);

  return (
    <>
      <HeaderContractor
        handleCheckboxChange={handleCheckboxChange}
        handleModifyContractor={handleModifyContractor}
      />

      {isError ? (
        <Alert
          message="Error"
          description={error.error}
          type="error"
          showIcon
          closable
        />
      ) : (
        <Spin spinning={isLoading} size="large">
          <ContractorTable
            data={contractorsList}
            handleChange={handleModifyContractor}
          />
        </Spin>
      )}

      <Form form={form}>
        <ModalItem
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          data={selectedContractor}
          form={form}
        />
      </Form>
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
