import React, { useState } from 'react';
import { getContractorsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { CatalogContent } from '../../../../modules/catalog';
import { useGetContractorsListQuery } from '../../api/contractorsApi';

export const ContractorsPage = () => {
  const [activeStatus, setActiveStatus] = useState(true);

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
