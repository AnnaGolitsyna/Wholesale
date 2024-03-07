import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedContractorSelector } from '../../api/selectors';
import { openModalContractor } from '../../api/contractorsSlice';
import { formattedDateObj } from '../../../../utils/dateUtils';
import { getContractorsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { CatalogContent } from '../../../../modules/catalog';
import { useGetContractorsListQuery } from '../../api/contractorsApi';

export const ContractorsPage = () => {
  const [activeStatus, setActiveStatus] = useState(true);
  // const [actionType, setActionType] = useState(null);
  // const { isContractorModalOpen, selectedContractor } = useSelector((state) =>
  //   selectedContractorSelector(state)
  // );
  // const dispatch = useDispatch();

  const {
    data: contractorsList = [],
    isLoading,
    isError,
    error,
  } = useGetContractorsListQuery(activeStatus);

  const handleCheckboxChange = (e) => {
    const value = e.target.value === 'true' ? true : false;
    setActiveStatus(value);
  };

  // const handleModifyContractor = (contractor, actionType) => {
  //   const formattedContractor = contractor && {
  //     ...contractor,
  //     date: contractor.date ? formattedDateObj(contractor.date) : null,
  //   };

  //   setActionType(actionType);
  //   dispatch(openModalContractor(formattedContractor));
  // };

  // const toolBarItems = getToolBarItems(
  //   handleCheckboxChange,
  //   handleModifyContractor
  // );

  const columnsObject = getContractorsColumns(contractorsList);

  const addToolBarItems = getToolBarItems(handleCheckboxChange);

  return (
    <>
      <CatalogContent
        data={contractorsList}
        isLoading={isLoading}
        errors={{
          isError,
          error,
        }}
        columnsObject={columnsObject}
        addToolBarItems={addToolBarItems}
      
      />
    </>
  );
};
