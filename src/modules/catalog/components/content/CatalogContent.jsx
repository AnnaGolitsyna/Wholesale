import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Result } from 'antd';
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
  const {
    data,
    isLoading,
    isError,
    error,
    toolBarItems,
    columns,
    nestedColumns,
  } = useGetCatalogData(typeData, itemsStatus, getColumns, getToolBarItems);


  return (
    <>
      <CatalogToolBar itemsList={toolBarItems} />
      {isError ? (
        <Result
          status={error.status}
          title={error.data}
          subTitle={error.data && <p>Данных не найдено</p>}
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

CatalogContent.propTypes = {
  typeData: PropTypes.string.isRequired,
  getColumns: PropTypes.func.isRequired,
  getToolBarItems: PropTypes.func.isRequired,
  itemsStatus: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  itemData: PropTypes.object,
  actionType: PropTypes.string,
};
