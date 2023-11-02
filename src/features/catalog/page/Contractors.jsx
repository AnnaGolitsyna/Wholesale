import React, { useState } from 'react';
import { Table, Form, Spin } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import { contractorsColumns } from '../components/tableColumnsContractor/tableColumnsContractor';
import { emptyContractorObject } from '../utils/emptyContractorForm';
import {
  useGetContractorsListQuery,
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../catalogApi';

const Contractors = () => {
   const [activeStatus, setActiveStatus] = useState(true);

  const { data: contractorsList = [], isLoading } =
    useGetContractorsListQuery(activeStatus);
  const [createContractor] = useAddContractorMutation();
  const [updateContractor] = useUpdateContractorMutation();

  console.log(activeStatus, contractorsList);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(
    null
  );


  const [form] = Form.useForm();

  const handleOk = (newValue) => {
   
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
    console.log('contractor', contractor);
    const initialValues = contractor ?? emptyContractorObject;
    setIsModalOpen(true);
    setSelectedContractor(initialValues);
  };

  const columns = contractorsColumns(handleModifyContractor);

  return (
    <>
      <HeaderContractor
        handleCheckboxChange={handleCheckboxChange}
        handleModifyContractor={handleModifyContractor}
      />

      <Spin spinning={isLoading} size="large">
        <Table columns={columns} dataSource={contractorsList} />
      </Spin>

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
