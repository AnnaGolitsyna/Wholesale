import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Spin, Result } from 'antd';
import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../../components/errors/ErrorFallback';
import CatalogTable from '../table/CatalogTable';
import CatalogToolBar from '../toolBar/components/CatalogToolBar';

export const CatalogContent = ({
  data,
  isLoading,
  errors,
  columnsObject,
  addToolBarItems,
}) => {
  const [searchList, setSearchList] = useState(data);

  useEffect(() => {
    setSearchList(data);
  }, [data]);

 
  const handleSearchChange = (searchValue) => {
    const foundItems = data?.filter(({ name }) =>
      (name.label || name).toLowerCase().includes(searchValue.toLowerCase())
    );

    setSearchList(foundItems);
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
            data={searchList}
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

CatalogContent.defaultProps = {
  data: [],
};

const CatalogContentWithBoundary = withErrorBoundary(CatalogContent, {
  FallbackComponent: ErrorFallback,
  onError(error, errorInfo) {
    console.error('Error caught by Error Boundary:', error);
    console.error('Error details:', errorInfo.componentStack);
  },
});

export { CatalogContentWithBoundary };
