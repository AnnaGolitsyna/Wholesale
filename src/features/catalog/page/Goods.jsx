import React, { useState } from 'react';
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

const Goods = () => {
  const [activeStatus, setActiveStatus] = useState(true);
  const { isGoodsModalOpen, selectedGoods } = useSelector((state) =>
    selectedProductSelector(state)
  );

  const {
    data: goodsList = [],
    isLoading,
    isError,
    error,
  } = useGetGoodsListQuery(activeStatus);

  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleModifyProduct = (product) => {
    const formattedProduct = product && {
      ...product,
      dateStart: product.dateStart ? formattedDateObj(product.dateStart) : null,
      dateEnd: product.dateEnd ? formattedDateObj(product.dateEnd) : null,
      cost: formattedPrice(product.cost),
    };

    dispatch(openModalGoods(formattedProduct));
  };

  const columns = getGoodsColumns(handleModifyProduct);

  return (
    <>
      <HeaderGoods
        handleCheckboxChange={handleCheckboxChange}
        handleModifyContractor={handleModifyProduct}
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
            data={goodsList}
            columns={columns}
            nestedColumns={nestedColumns}
          />
        </Spin>
      )}
      <ModalCatalogItems
        isModalOpen={isGoodsModalOpen}
        data={selectedGoods}
        typeData="Goods"
      />
    </>
  );
};

//Goods.propTypes = {}

export default Goods;


