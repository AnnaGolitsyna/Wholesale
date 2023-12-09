import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';
import ModalCatalogItems from '../components/modalItem/ModalCatalogItems';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import CatalogTable from '../components/table/CatalogTable';
import {
  getContractorsColumns,
  nestedColumns,
} from '../utils/contractors/columns';
import { formattedDateObj } from '../../../utils/dateUtils';

import {
  useGetContractorsListQuery,
  useGetContractorByIdQuery,
} from '../catalogApi';
import { openModalContractor } from '../contractorsSlice';

const Contractors = () => {
  const [activeStatus, setActiveStatus] = useState(true);
  const { isContractorModalOpen, selectedContractor } = useSelector(
    (state) => state.modalContractor
  );
  const {
    data: contractorsList = [],
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(activeStatus);

  const { data: contractorNew } = useGetContractorByIdQuery();

  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleModifyContractor = (contractor) => {
    console.log('hMC', contractor);
   // const { data: contractorNew } = useGetContractorByIdQuery();
    const formattedContractor = contractor
      ? { ...contractor, date: formattedDateObj(contractor.date) || null }
      : null;

    dispatch(openModalContractor(formattedContractor));
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
        typeData="Contractor"
      />
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
