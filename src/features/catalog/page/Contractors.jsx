import React, { useState } from 'react';
import { Spin, Alert } from 'antd';
import ModalCatalogItems from '../components/modalItem/ModalCatalogItems';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import CatalogTable from '../components/table/CatalogTable';
import {
  getContractorsColumns,
  nestedColumns,
} from '../utils/contractors/columns';
import { getFieldsForContractorsFormList } from '../utils/contractors/FormLists';

import { useGetContractorsListQuery } from '../catalogApi';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../contractorsSlice';

const Contractors = () => {
  
  const [activeStatus, setActiveStatus] = useState(true);
  const { isContractorModalOpen, selectedContractor } = useSelector(
    (state) => state.modal
  );
  const {
    data: contractorsList = [],
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(activeStatus);

  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleModifyContractor = (contractor) =>
    contractor ? dispatch(openModal(contractor)) : dispatch(openModal());

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
