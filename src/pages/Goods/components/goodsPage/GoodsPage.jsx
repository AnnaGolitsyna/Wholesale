import React, { useState } from 'react';
import { useGetGoodsListQuery } from '../../api/goodsApi';
import { getGoodsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import { CatalogContent } from '../../../../modules/catalog';

export const GoodsPage = () => {
  const [activeStatus, setActiveStatus] = useState(true);

  const {
    data: goodsList = [],
    isLoading,
    isError,
    error,
  } = useGetGoodsListQuery(activeStatus);

  const handleCheckboxChange = (e) => {
    const value = e.target.value === 'true' ? true : false;
    setActiveStatus(value);
  };


  const columnsObject = getGoodsColumns(goodsList);

  const addToolBarItems = getToolBarItems(handleCheckboxChange, goodsList);

  return (
    <>
      <CatalogContent
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
