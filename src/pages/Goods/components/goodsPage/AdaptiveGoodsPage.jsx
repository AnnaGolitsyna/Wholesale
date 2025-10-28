import React, { useState } from 'react';
import { useGetGoodsListQuery } from '../../index';
import { getGoodsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';
import CatalogContentWithBoundary from '../../../../modules/catalog';
import MobileGoodsPage from './MobileGoodsPage';
import useDeviceType from '../../../../hook/useDeviceType';

/**
 * Adaptive Goods Page
 * Automatically switches between mobile and desktop views based on device type
 */
const AdaptiveGoodsPage = () => {
  const { isMobile } = useDeviceType();
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

  // Mobile View
  if (isMobile) {
    return (
      <MobileGoodsPage
        data={goodsList}
        isLoading={isLoading}
        onStatusChange={handleCheckboxChange}
        activeStatus={activeStatus}
      />
    );
  }

  // Desktop View (existing implementation)
  const columnsObject = getGoodsColumns(goodsList);
  const addToolBarItems = getToolBarItems(handleCheckboxChange, goodsList);

  return (
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
  );
};

export { AdaptiveGoodsPage };
