import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import {
  OPERATION_TYPES,
  operationTypes,
} from '../../constants/operationTypes';
import { useParams } from 'react-router-dom';
const TagTypeOperation = ({ type }) => {
  const { docType: paramDocType } = useParams();
  const docType = paramDocType || OPERATION_TYPES.PAYMENTS;

  const color = operationTypes[docType][type]?.color;
  const text = operationTypes[docType][type]?.text;

  return <Tag color={color}>{text}</Tag>;
};

TagTypeOperation.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TagTypeOperation;
