import React, { useState } from 'react';
import { Form, Spin, Alert } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import CatalogTable from '../components/table/CatalogTable';
import { formattedDateObj } from '../../../utils/dateUtils';
import {
  getContractorsColumns,
  nestedColumns,
} from '../utils/contractors/columns';
import { getContractorsFormItemsObj } from '../utils/contractors/formLists';
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
    setIsModalOpen(true);

    if (!contractor) {
      setSelectedContractor(emptyContractorObject);
    } else {
      const formattedContractor = {
        ...contractor,
        date: contractor?.date ? formattedDateObj(contractor.date) : null,
      };
      setSelectedContractor(formattedContractor);
    }
  };

  console.log('contractor', contractorsList);
  const handleCategoryChange = (value) => {
    console.log('Contractor', value);
    form.setFieldsValue({ categoryPrice: undefined });
  };

  const columns = getContractorsColumns(handleModifyContractor);

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
          getFormList={getContractorsFormItemsObj}
          onFieldChange={handleCategoryChange}
        />
      </Form>
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
