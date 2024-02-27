import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import PropTypes from 'prop-types';
import CatalogContent from '../../modules/catalog/CatalogContent';
import { selectedContractorSelector } from './api/selectors';
import { getContractorsColumns } from './utils/getColumns';
import { formattedDateObj } from '../../utils/dateUtils';
import { openModalContractor } from '../../features/catalog/contractorsSlice';
import ToolBar from './components/toolBar/ToolBar';

const ContractorsPage = () => {
  const [activeStatus, setActiveStatus] = useState(true);
  const [actionType, setActionType] = useState(null);
  const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
    selectedContractorSelector(state)
  );
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

  return (
    <>
      <ToolBar
        onStatusChange={handleCheckboxChange}
        getItemData={handleModifyContractor}
      />
      <CatalogContent
        typeData="Contractor"
        getColumns={() => getContractorsColumns(handleModifyContractor)}
        itemsStatus={activeStatus}
        isModalOpen={isContractorModalOpen}
        itemData={selectedContractor}
        actionType={actionType}
      />
    </>
  );
};

//ContractorsPage.propTypes = {};

export default ContractorsPage;
