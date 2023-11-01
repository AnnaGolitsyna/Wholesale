import React, { useState } from 'react';
import { Table, Form } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import { contractorsColumns } from '../utils/tableColumnsContractor';
import { Spin } from 'antd';
import {
  useGetContractorsListQuery,
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../catalogApi';

const Contractors = () => {
  const { data, isLoading } = useGetContractorsListQuery();
  const [createdContractor] = useAddContractorMutation();
  const [updatedContractor] = useUpdateContractorMutation();

  const contractorsList = data?.map((contractor) => ({
    ...contractor,
    key: contractor.id,
  }));
  console.log(data, contractorsList);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  // const [activeStatus, setActiveStatus] = useState('active');

  const [form] = Form.useForm();

  const handleOk = (newValue) => {
    console.log('newV', newValue);

    if (newValue.id) {
      updatedContractor(newValue);
    } else {
      createdContractor(newValue);
    }

    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedContractor(null);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    // setActiveStatus(e.target.value);
  };

  const handleModifyContractor = (contractor) => {
    console.log('contractor', contractor);
    const initialValues = contractor ?? {
      // key: idLocal,
      active: true,
      name: '',
      fullName: '',
      category: '',
      categoryPrice: '',
      taxNumber: '',
      contractNumber: '',
      contractDate: '',
      email: '',
      phone: '',
      adress: '',
    };
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
