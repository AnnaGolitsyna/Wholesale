import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { Form, Spin, Alert } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderGoods from '../components/headerGoods/HeaderGoods';
import CatalogTable from '../components/table/CatalogTable';
import { useGetGoodsListQuery, useAddGoodsMutation } from '../catalogApi';
import { getGoodsColumns, nestedColumns } from '../utils/goods/columns';
import { formattedDateObj } from '../../../utils/dateUtils';
import { emptyGoodsObject } from '../utils/goods/emptyGoodsForm';
import { getFieldsForGoodsFormList } from '../utils/goods/FormList';
import { categoryPricesObj, formattedPrice } from '../../../utils/priceUtils';

import SelectContractor from '../components/selectContractor/SelectContractor'

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
    setIsModalOpen(true);

    if (!goods) {
      setSelectedGoods(emptyGoodsObject);
    } else {
      const formattedGoods = {
        ...goods,
        dateStart: goods?.dateStart ? formattedDateObj(goods.dateStart) : null,
        dateEnd: goods?.dateEnd ? formattedDateObj(goods.dateEnd) : null,
        cost: formattedPrice(goods?.cost),
      };
      setSelectedGoods(formattedGoods);
    }
  };

  const handleCategoryChange = (value) => {
    console.log('goods', value);
    const price = form.getFieldValue('cost');
    const superBulk = formattedPrice(
      price * categoryPricesObj.superBulk.surcharge
    );
    const bulk = formattedPrice(price * categoryPricesObj.bulk.surcharge);
    const retail = formattedPrice(price * categoryPricesObj.retail.surcharge);

    // console.log('Goods', price, superBulkPrice, bulkPrice, retailPrice);
    form.setFieldsValue({
      superBulk,
      bulk,
      retail,
    });
  };

  const columns = getGoodsColumns(handleModifyContractor);



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

      <Form form={form}>
        <ModalItem
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          data={selectedGoods}
          form={form}
          getFormList={getFieldsForGoodsFormList}
          onFieldChange={handleCategoryChange}
        />
      </Form>

      <SelectContractor />
    </>
  );
};

//Goods.propTypes = {}

export default Goods;
