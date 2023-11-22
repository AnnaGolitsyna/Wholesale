import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { Form, Spin, Alert } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderGoods from '../components/headerGoods/HeaderGoods';
import CatalogTable from '../components/table/CatalogTable';
import { useGetGoodsListQuery, useAddGoodsMutation } from '../catalogApi';
import { getGoodsColumns, nestedColumns } from '../utils/goods/columns';
import { emptyGoodsObject } from '../utils/goods/emptyGoodsForm';
// import { testArr } from '../utils/goods/emptyGoodsForm';

//const { useToken } = theme;

const Goods = () => {
  const [activeStatus, setActiveStatus] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoods, setSelectedGoods] = useState(null);

  const {
    data: goodsList = [],
    isLoading,
    isError,
    error,
  } = useGetGoodsListQuery(activeStatus);
  const [createGoods] = useAddGoodsMutation();

  const [form] = Form.useForm();

  const handleOk = (newValue) => {
    if (newValue.id) {
      console.log('update', newValue);
    } else {
      createGoods(newValue);
    }

    setSelectedGoods(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedGoods(null);
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (e) => {
    setActiveStatus(e.target.value);
  };

  const handleModifyContractor = (goods) => {
    const initialValues = goods ?? emptyGoodsObject;

    setIsModalOpen(true);
    setSelectedGoods(initialValues);
  };

  const columns = getGoodsColumns(handleModifyContractor)

  return (
    <>
      <HeaderGoods
        handleCheckboxChange={handleCheckboxChange}
        handleModifyContractor={handleModifyContractor}
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
    </>
  );
};

//Goods.propTypes = {}

export default Goods;
