import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useGetGoodsListQuery } from '../../api/goodsApi';
import { getGoodsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import { getGoodsListRef } from '../../api/firebase/firebaseRefs';

const GoodsPage = () => {
  const [activeStatus, setActiveStatus] = useState(true);

  const {
    data: goodsList = [],
    isLoading,
    isError,
    error,
  } = useGetGoodsListQuery(activeStatus);

  const [data, loading] = useCollectionData(getGoodsListRef());

  console.log('goods', data, loading);

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
