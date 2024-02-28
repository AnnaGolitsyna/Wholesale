import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Alert } from 'antd';
import CatalogTable from '../table/CatalogTable';
import useGetCatalogData from '../../hook/useGetCatalogData';
import ModalCatalogItems from '../modal/ModalCatalogItems';
import CatalogToolBar from '../toolBar/components/CatalogToolBar';

export const CatalogContent = ({
  typeData,
  getColumns,
  getToolBarItems,
  itemsStatus,
  isModalOpen,
  itemData,
  actionType,
}) => {
  const { data, isLoading, isError, error } = useGetCatalogData(itemsStatus);
  const { columns, nestedColumns } = getColumns();
  const toolBarItems = getToolBarItems();

  return (
    <>
      <CatalogToolBar itemsList={toolBarItems} />
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


