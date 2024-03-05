import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spin, Result } from 'antd';
import CatalogTable from '../table/CatalogTable';
import useGetCatalogData from '../../hook/useGetCatalogData';
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
        itemData,
        isModalOpen,
}) => {

  const {isError, error} = errors;
  const {columns, nestedColumns} = columnsObject;

  
  // const {
  //   data,
  //   isLoading,
  //   isError,
  //   error,

  //   columns,
  //   nestedColumns,
  // } = useGetCatalogData(typeData, itemsStatus, getColumns);

  // const [searchList, setSearchList] = useState([]);

  // const handleSearchChange = (searchValue) => {
  //   console.log('searchValue', searchValue);
  //   const foundItems = data.filter((el) =>
  //     el.name.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setSearchList(foundItems);
  // };

  // const { handleCheckboxChange, handleModifyProduct } = functionProps;

  // const toolBarItems = getToolBarItems(
  //   handleCheckboxChange,
  //   handleModifyProduct,
  //   handleSearchChange
  // );


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
        itemData={itemData}
        typeData={typeData}
        actionType={actionType}
      />
    </>
  );
};

CatalogContent.propTypes = {
  // typeData: PropTypes.string.isRequired,
  // getColumns: PropTypes.func.isRequired,
  // getToolBarItems: PropTypes.func.isRequired,
  // itemsStatus: PropTypes.bool.isRequired,
  // isModalOpen: PropTypes.bool.isRequired,
  // itemData: PropTypes.object,
  // actionType: PropTypes.string,
};
