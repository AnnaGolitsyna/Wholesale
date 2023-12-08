import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import PropTypes from 'prop-types'
import { Spin, Alert } from 'antd';
//import ModalItem from '../components/modalItem/ModalItem';
import HeaderGoods from '../components/headerGoods/HeaderGoods';
import CatalogTable from '../components/table/CatalogTable';
import { getGoodsColumns, nestedColumns } from '../utils/goods/columns';
import { formattedDateObj } from '../../../utils/dateUtils';
//import { emptyGoodsObject } from '../utils/goods/emptyGoodsForm';
//import { getFieldsForGoodsFormList } from '../utils/goods/FormList';
import { categoryPricesObj, formattedPrice } from '../../../utils/priceUtils';

import { useGetGoodsListQuery, useAddGoodsMutation } from '../catalogApi';
import { openModalGoods } from '../goodsSlice';
import { selectedProductSelector } from '../catalog.selectors';
import ModalCatalogItems from '../components/modalItem/ModalCatalogItems';

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
  //const [createGoods] = useAddGoodsMutation();

  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleModifyProduct = (product) => {
    const formattedProduct = product
      ? {
          ...product,
          dateStart: product.dateStart
            ? formattedDateObj(product.dateStart)
            : null,
          dateEnd: product.dateEnd ? formattedDateObj(product.dateEnd) : null,
          cost: formattedPrice(product.cost),
        }
      : null;

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

// const [activeStatus, setActiveStatus] = useState(true);
// const [isModalOpen, setIsModalOpen] = useState(false);
// const [selectedGoods, setSelectedGoods] = useState(null);

// const {
//   data: goodsList = [],
//   isLoading,
//   isError,
//   error,
// } = useGetGoodsListQuery(activeStatus);
// const [createGoods] = useAddGoodsMutation();

// const [form] = Form.useForm();

// const handleOk = (newValue) => {
//   if (newValue.id) {
//     console.log('update', newValue);
//   } else {
//     createGoods(newValue);
//   }

//   setSelectedGoods(null);
//   setIsModalOpen(false);
// };

// const handleCancel = () => {
//   setSelectedGoods(null);
//   setIsModalOpen(false);
// };

// const handleCheckboxChange = (e) => {
//   setActiveStatus(e.target.value);
// };

// const handleModifyContractor = (goods) => {
//   setIsModalOpen(true);

//   if (!goods) {
//     setSelectedGoods(emptyGoodsObject);
//   } else {
//     const formattedGoods = {
//       ...goods,
//       dateStart: goods?.dateStart ? formattedDateObj(goods.dateStart) : null,
//       dateEnd: goods?.dateEnd ? formattedDateObj(goods.dateEnd) : null,
//       cost: formattedPrice(goods?.cost),
//     };
//     setSelectedGoods(formattedGoods);
//   }
// };

// const handleCategoryChange = (value) => {
//   console.log('goods', value);
//   const price = form.getFieldValue('cost');
//   const superBulk = formattedPrice(
//     price * categoryPricesObj.superBulk.surcharge
//   );
//   const bulk = formattedPrice(price * categoryPricesObj.bulk.surcharge);
//   const retail = formattedPrice(price * categoryPricesObj.retail.surcharge);

//   // console.log('Goods', price, superBulkPrice, bulkPrice, retailPrice);
//   form.setFieldsValue({
//     superBulk,
//     bulk,
//     retail,
//   });
// };

// const columns = getGoodsColumns(handleModifyContractor);
