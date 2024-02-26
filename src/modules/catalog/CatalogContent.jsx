import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Alert } from 'antd';
import CatalogTable from './components/table/CatalogTable';
import  useGetCatalogData  from './hook/useGetCatalogData';
//import ModalCatalogItems from './components/modalItem/ModalCatalogItems';

const CatalogContent = props => {
   // const {data, columns, nestedColumns } = props;
     const { data, isLoading, isError, error } = useGetCatalogData();
     console.log('content', data);
  return (
    <>
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
            data={data}
            // columns={columns}
            // nestedColumns={nestedColumns}
          />
        </Spin>
      )}

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