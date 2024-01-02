import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { paymentTypes } from '../../constants/paymentTypes';

const TagPayment = ({ type }) => {
  const color = paymentTypes[type].color;
  const text = paymentTypes[type].text;
  
  return <Tag color={color}>{text}</Tag>;
};

TagPayment.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TagPayment;
