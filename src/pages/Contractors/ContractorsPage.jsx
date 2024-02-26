import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CatalogContent from '../../modules/catalog/CatalogContent';
import { useGetContractorsListQuery } from '../../features/catalog/catalogApi';
import { selectedContractorSelector } from '../../features/catalog/catalog.selectors';
import { getContractorsColumns, nestedColumns } from './utils/getColumns';
import { formattedDateObj } from '../../utils/dateUtils';
import {openModalContractor} from '../../features/catalog/contractorsSlice';


const ContractorsPage = (props) => {
  const [activeStatus, setActiveStatus] = useState(true);
    const [actionType, setActionType] = useState(null);
  //       const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
  //     selectedContractorSelector(state)
  //   );
  const dispatch = useDispatch();
  const {
    data: contractorsList = [],
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(activeStatus);
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
    <CatalogContent
      contractorsList={contractorsList}
      columns={columns}
      nestedColumns={nestedColumns}
    />
  );
};

ContractorsPage.propTypes = {};

export default ContractorsPage;
