import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Result } from 'antd';
import CatalogTable from '../table/CatalogTable';
import ModalCatalogItems from '../modal/ModalCatalogItems';
import CatalogToolBar from '../toolBar/components/CatalogToolBar';

export const CatalogContent = ({
  typeData,
  toolBarItems,
  isLoading,
  errors,
  data,
  columnsObject,
  actionType,
  selectedItem,
  isModalOpen,
}) => {
  const { isError, error } = errors;
  const { columns, nestedColumns = [] } = columnsObject;

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
        data={selectedItem}
        typeData={typeData}
        actionType={actionType}
      />
    </>
  );
};

CatalogContent.propTypes = {
  typeData: PropTypes.string.isRequired,
  toolBarItems: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columnsObject: PropTypes.object.isRequired,
  actionType: PropTypes.string,
  selectedItem: PropTypes.object,
  isModalOpen: PropTypes.bool.isRequired,
};
