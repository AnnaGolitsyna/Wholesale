import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin, Result } from 'antd';
import CatalogTable from '../table/CatalogTable';
import CatalogToolBar from '../toolBar/components/CatalogToolBar';

export const CatalogContent = ({
  data,
  isLoading,
  errors,
  columnsObject,
  addToolBarItems,
}) => {
  const [searchProductsList, setSearchProductsList] = useState(data);

  useEffect(() => {
    if (data.length) {
      setSearchProductsList(data);
    }
  }, [data]);


  const handleSearchChange = (searchValue) => {
    const foundItems = data.filter((el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchProductsList(foundItems);
  };

  const { isError, error } = errors;
  const { columns, nestedColumns = [] } = columnsObject;

  const toolBarItems = addToolBarItems(handleSearchChange);

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
            data={searchProductsList}
            columns={columns}
            nestedColumns={nestedColumns}
          />
        </Spin>
      )}
    </>
  );
};

CatalogContent.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  columnsObject: PropTypes.object.isRequired,
  addToolBarItems: PropTypes.func.isRequired,
};
