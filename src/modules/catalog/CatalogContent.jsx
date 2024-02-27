import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import CatalogTable from './components/table/CatalogTable';
import useGetCatalogData from './hook/useGetCatalogData';
import ModalCatalogItems from './components/modal/ModalCatalogItems';

const CatalogContent = ({
  typeData,
  getColumns,
  itemsStatus,
  isModalOpen,
  itemData,
  actionType,
}) => {
  const { data, isLoading, isError, error } = useGetCatalogData(itemsStatus);
  const { columns, nestedColumns } = getColumns();
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
            columns={columns}
            nestedColumns={nestedColumns}
          />
        </Spin>
      )}

      <ModalCatalogItems
        isModalOpen={isModalOpen}
        data={itemData}
        typeData={typeData}
        actionType={actionType}
      />
    </>
  );
};

CatalogContent.propTypes = {};

export default CatalogContent;
