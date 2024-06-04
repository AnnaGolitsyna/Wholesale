import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const RadioGroupForGoodsTable = ({ onFilterChange }) => {
  return (
    <Radio.Group
      buttonStyle="solid"
      onChange={({ target: { value } }) => onFilterChange(value)}
      defaultValue={'full'}
    >
      <Radio value="full">Показать весь список</Radio>
      <Radio value="selected">Показать выбранные товары</Radio>
    </Radio.Group>
  );
};

RadioGroupForGoodsTable.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default RadioGroupForGoodsTable;
