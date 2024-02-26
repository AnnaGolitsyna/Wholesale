import React from 'react'
import PropTypes from 'prop-types'
import CatalogTable from './components/table/CatalogTable';
//import ModalCatalogItems from './components/modalItem/ModalCatalogItems';

const CatalogContent = props => {
    const {contractorsList, columns, nestedColumns } = props;
  return (
    <>
      <CatalogTable
        data={contractorsList}
        columns={columns}
        nestedColumns={nestedColumns}
      />
      {/* <ModalCatalogItems
        isModalOpen={isContractorModalOpen}
        data={selectedContractor}
        typeData={typeData}
        actionType={actionType}
      /> */}
    </>
  );
}

CatalogContent.propTypes = {}

export default CatalogContent