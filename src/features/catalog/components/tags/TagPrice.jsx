import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import {
  formattedPriceToString,
  categoryPricesObj,
} from '../../../../utils/priceUtils';

const TagPrice = ({ typePrice, number }) => {
  return (
    <Tag color={categoryPricesObj[typePrice].color}>
      {formattedPriceToString(number)}
    </Tag>
  );
};

TagPrice.propTypes = {};

export default TagPrice;
