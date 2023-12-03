import React, { useState } from 'react';
import { Spin, Alert } from 'antd';
import ModalCatalogItems from '../components/modalItem/ModalCatalogItems';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import CatalogTable from '../components/table/CatalogTable';
import { formattedDateObj } from '../../../utils/dateUtils';
import {
  getContractorsColumns,
  nestedColumns,
} from '../utils/contractors/columns';
import { getFieldsForContractorsFormList } from '../utils/contractors/FormLists';

import { useGetContractorsListQuery } from '../catalogApi';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../contractorsSlice';

const Contractors = () => {
  const dispatch = useDispatch();
  const { isContractorModalOpen, selectedContractor } = useSelector(
    (state) => state.modal
  );

  const [activeStatus, setActiveStatus] = useState(true);

  const {
    data: contractorsList = [],
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(activeStatus);

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleModifyContractor = (contractor) => {
    if (contractor) {
      // const formattedContractor = {
      //   ...contractor,
      //   date: contractor?.date ? formattedDateObj(contractor.date) : null,
      // };
      dispatch(openModal(contractor));
    } else {
      dispatch(openModal());
    }
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

      <ModalCatalogItems
        isModalOpen={isContractorModalOpen}
        data={selectedContractor}
        getFormList={getFieldsForContractorsFormList}
        typeData="Contractor"
      />
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;

//  const dispatch = useDispatch();
//  const { isContractorModalOpen, selectedContractor } = useSelector(
//    (state) => state.modal
//  );

//  const [activeStatus, setActiveStatus] = useState(true);
//  //const [isModalOpen, setIsModalOpen] = useState(false);
//  //const [selectedContractor, setSelectedContractor] = useState(null);

//  const {
//    data: contractorsList = [],
//    isLoading,
//    isError,
//    error,
//  } = useGetContractorsListQuery(activeStatus);
//  const [createContractor] = useAddContractorMutation();
//  const [updateContractor] = useUpdateContractorMutation();

//  const [form] = Form.useForm();

//  const handleOk = (newValue) => {
//    // console.log('newValue', newValue);
//    // console.log('newValue', newValue.id);
//    if (newValue.id) {
//      updateContractor(newValue);
//    } else {
//      createContractor(newValue);
//    }

//    // setSelectedContractor(null);
//    // setIsModalOpen(false);
//  };

//  const handleCancel = () => {
//    // setSelectedContractor(null);
//    // setIsModalOpen(false);
//    dispatch(closeModal());
//  };

//  const handleCheckboxChange = (e) => {
//    setActiveStatus(e.target.value);
//  };

//  const handleModifyContractor = (contractor) => {
//    //setIsModalOpen(true);

//    if (!contractor) {
//      //setSelectedContractor(emptyContractorObject);
//    } else {
//      const formattedContractor = {
//        ...contractor,
//        date: contractor?.date ? formattedDateObj(contractor.date) : null,
//      };
//      //setSelectedContractor(formattedContractor);
//    }

//    dispatch(openModal());
//  };

//  const handleCategoryChange = (value) => {
//    console.log('Contractor', value);
//    form.setFieldsValue({ categoryPrice: undefined });
//  };

//  const columns = getContractorsColumns(handleModifyContractor);
