import React, { useState, useEffect } from 'react';
//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { selectedProductSelector } from '../catalog.selectors';
import { useGetGoodsListQuery } from '../catalogApi';
import { openModalGoods } from '../goodsSlice';
import { Spin, Alert } from 'antd';
import HeaderGoods from '../components/headerGoods/HeaderGoods';
import CatalogTable from '../components/table/CatalogTable';
import ModalCatalogItems from '../components/modalItem/ModalCatalogItems';

import { getGoodsColumns, nestedColumns } from '../utils/goods/columns';
import { formattedDateObj } from '../../../utils/dateUtils';
import { formattedPrice } from '../../../utils/priceUtils';
import useContractorsListSelect from '../../../hook/useContractorsListSelect';
import PriceListPrint from '../components/priceList/PriceListPrint';

const Goods = () => {
  const [searchProductsList, setSearchProductsList] = useState([]);
  const [activeStatus, setActiveStatus] = useState(true);
  const [actionType, setActionType] = useState(null);
  const { isGoodsModalOpen, selectedGoods } = useSelector((state) =>
    selectedProductSelector(state)
  );

  const {
    data: goodsList = [],
    isLoading,
    isError,
    error,
  } = useGetGoodsListQuery(activeStatus);

  const contractorslist = useContractorsListSelect();

  useEffect(() => {
    setSearchProductsList(goodsList);
  }, [goodsList]);

  const handleSearchChange = (searchValue) => {
    const foundGoods = goodsList.filter((el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchProductsList(foundGoods);
  };

  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
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

  const columns = getGoodsColumns(handleModifyProduct, contractorslist);

  return (
    <>
      <>
        <HeaderGoods
          handleCheckboxChange={handleCheckboxChange}
          handleModifyContractor={handleModifyProduct}
          handleSearchChange={handleSearchChange}
          productsList={searchProductsList}
          contractorslist={contractorslist}
        />
        {isError ? (
          <Alert
            message="Error"
            description={error.error}
            type="error"
            showIcon
            closable
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

        <ModalCatalogItems
          isModalOpen={isGoodsModalOpen}
          data={selectedGoods}
          typeData="Goods"
          actionType={actionType}
        />
      </>
    </>
  );
};

//Goods.propTypes = {}

export default Goods;


