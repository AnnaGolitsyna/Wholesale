import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProductSelector } from '../../api/selectors';
import { openModalGoods } from '../../api/goodsSlice';
import { formattedDateObj } from '../../../../utils/dateUtils';
import { formattedPrice } from '../../../../utils/priceUtils';
import { CatalogContent } from '../../../../modules/catalog';
import { getGoodsColumns } from '../../utils/getColumns';
import { getToolBarItems } from '../../utils/getToolBarItems';

import { useGetGoodsListQuery } from '../../api/goodsApi';

export const GoodsPage = () => {
  const [searchProductsList, setSearchProductsList] = useState([]);
  const [activeStatus, setActiveStatus] = useState(true);
  const [actionType, setActionType] = useState(null);
  const { isGoodsModalOpen, selectedGoods } = useSelector((state) =>
    selectedProductSelector(state)
  );
  const dispatch = useDispatch();

  const {
    data: goodsList = [],
    isLoading,
    isError,
    error,
  } = useGetGoodsListQuery(activeStatus);

  useEffect(() => {
    setSearchProductsList(goodsList);
  }, [goodsList]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value === 'true' ? true : false;
    setActiveStatus(value);
  };
  const handleModifyProduct = (product, actionType) => {
    const formattedProduct = product && {
      ...product,
      dateStart: product.dateStart ? formattedDateObj(product.dateStart) : null,
      dateEnd: product.dateEnd ? formattedDateObj(product.dateEnd) : null,
      cost: formattedPrice(product.cost),
    };

    setActionType(actionType);
    dispatch(openModalGoods(formattedProduct));
  };

  const handleSearchChange = (searchValue) => {
    console.log('searchValue', searchValue);
    const foundItems = goodsList.filter((el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchProductsList(foundItems);
  };

  // const functionProps = {
  //   handleCheckboxChange,
  //   handleModifyProduct,
  // };

  const toolBarItems = getToolBarItems(
    handleCheckboxChange,
    handleModifyProduct,
    handleSearchChange
  );

  //const { columns, nestedColumns } = getGoodsColumns(data);
  const columnsObject = getGoodsColumns(handleModifyProduct, goodsList);



  return (
    <>
      <CatalogContent
        typeData="Goods"
        toolBarItems={toolBarItems}
        isLoading={isLoading}
        errors={{
          isError,
          error,
        }}
        data={searchProductsList}
        columnsObject={columnsObject}
        actionType={actionType}
        itemData={selectedGoods}
        isModalOpen={isGoodsModalOpen}
        // getColumns={() => getGoodsColumns(handleModifyProduct)()}
        // getToolBarItems={getToolBarItems}
        // itemsStatus={activeStatus}
        // isModalOpen={isGoodsModalOpen}
        // itemData={selectedGoods}
        // actionType={actionType}
        // {...functionProps}
      />
    </>
  );
};
