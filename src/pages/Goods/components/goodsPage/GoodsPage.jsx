import React, { useState } from 'react';
import { useGetGoodsListQuery } from '../../index';
import { getGoodsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import CatalogContentWithBoundary from '../../../../modules/catalog';


const GoodsPage = () => {
  const [activeStatus, setActiveStatus] = useState(true);

  const {
    data: goodsList = [],
    isLoading,
    isError,
    error,
  } = useGetGoodsListQuery(activeStatus);


  console.log('goods', goodsList, isLoading, isError, error);

  const handleCheckboxChange = (e) => {
    const value = e.target.value === 'true' ? true : false;
    setActiveStatus(value);
  };

  const columnsObject = getGoodsColumns(goodsList);

  const addToolBarItems = getToolBarItems(handleCheckboxChange, goodsList);

  return (
    <>
      <CatalogContentWithBoundary
        data={goodsList}
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

export { GoodsPage };
