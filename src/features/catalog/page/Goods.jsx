import React, { useState } from 'react';
//import PropTypes from 'prop-types'
import { Form, Spin, Alert } from 'antd';
import ModalItem from '../components/modalItem/ModalItem';
import HeaderGoods from '../components/headerGoods/HeaderGoods';
import CatalogTable from '../components/table/CatalogTable';
import { useGetGoodsListQuery, useAddGoodsMutation } from '../catalogApi';
import { getGoodsColumns } from '../utils/goods/columns';
import { testArr } from '../utils/goods/emptyGoodsForm';

//const { useToken } = theme;

const Goods = () => {
  
  return (
    <>
      <HeaderGoods />
      {/* <Table columns={columns} dataSource={testArr} /> */}
    </>
  );
};

//Goods.propTypes = {}

export default Goods;
