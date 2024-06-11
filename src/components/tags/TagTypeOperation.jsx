import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { paymentTypes } from '../../constants/paymentTypes';
import { operationTypes } from '../../constants/operationTypes';
import { useParams } from 'react-router-dom';
const TagTypeOperation = ({ type }) => {
  const { docType: paramDocType } = useParams();
  const docType = paramDocType || 'payments';
  console.log('tag', docType, type);
  const color = operationTypes[docType][type]?.color;
  const text = operationTypes[docType][type]?.text;

  return <Tag color={color}>{text}</Tag>;
};

TagTypeOperation.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TagTypeOperation;
