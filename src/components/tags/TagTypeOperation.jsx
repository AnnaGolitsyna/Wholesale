import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { paymentTypes } from '../../constants/paymentTypes';

const TagTypeOperation = ({ type }) => {
  const color = paymentTypes[type].color;
  const text = paymentTypes[type].text;

  return <Tag color={color}>{text}</Tag>;
};

TagTypeOperation.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TagTypeOperation;
