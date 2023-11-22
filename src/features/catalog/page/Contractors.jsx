import React, { useState } from 'react';
import { Form, Spin, Alert } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import CatalogTable from '../components/table/CatalogTable';
import {
  getContractorsColumns,
  nestedColumns,
} from '../utils/contractors/columns';
import { emptyContractorObject } from '../utils/contractors/emptyContractorForm';
import {
  useGetContractorsListQuery,
  useAddContractorMutation,
  useUpdateContractorMutation,
} from '../catalogApi';

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
    // console.log('newValue', newValue);
    // console.log('newValue', newValue.id);
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
    // console.log('selectContr', initialValues);
    setIsModalOpen(true);
    setSelectedContractor(initialValues);
  };

  const columns = getContractorsColumns(handleModifyContractor);

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
          <CatalogTable
            data={contractorsList}
            columns={columns}
            nestedColumns={nestedColumns}

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
          //resetValue="categoryPrice"
        />
      </Form>
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
