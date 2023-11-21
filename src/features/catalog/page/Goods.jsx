import React from 'react';
//import PropTypes from 'prop-types'
import { Table, theme } from 'antd';
import HeaderGoods from '../components/headerGoods/HeaderGoods';
import { goodsColumns } from '../utils/goods/columns';
import { testArr } from '../utils/goods/emptyGoodsForm';

//const { useToken } = theme;

const Goods = () => {
  const columns = goodsColumns();
  return (
    <>
      <HeaderGoods />
      <Table columns={columns} dataSource={testArr} />
    </>
  );
};

//Goods.propTypes = {}

export default Goods;
