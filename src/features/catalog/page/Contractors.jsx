import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedContractorSelector } from '../catalog.selectors';
import { useGetContractorsListQuery } from '../../../pages/Contractors/api/contractorsApi';
import { openModalContractor } from '../contractorsSlice';
import { Spin, Alert } from 'antd';
import ModalCatalogItems from '../components/modalItem/ModalCatalogItems';
import HeaderContractor from '../components/headerContractor/HeaderContractor';
import CatalogTable from '../components/table/CatalogTable';
import {
  getContractorsColumns,
  nestedColumns,
} from '../utils/contractors/getColumns';
import { formattedDateObj } from '../../../utils/dateUtils';

const Contractors = () => {
  const [activeStatus, setActiveStatus] = useState(true);
  const [actionType, setActionType] = useState(null);
  const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
    selectedContractorSelector(state)
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

  const handleModifyContractor = (contractor, actionType) => {
    const formattedContractor = contractor && {
      ...contractor,
      date: contractor.date ? formattedDateObj(contractor.date) : null,
    };

    setActionType(actionType);
    dispatch(openModalContractor(formattedContractor));
  };

  const columns = getContractorsColumns(handleModifyContractor);

  return (
    <>
      <HeaderContractor
        handleCheckboxChange={handleCheckboxChange}
        showModal={handleModifyContractor}
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
        actionType={actionType}
      />
    </>
  );
};

// Contractors.propTypes = {}

export default Contractors;
