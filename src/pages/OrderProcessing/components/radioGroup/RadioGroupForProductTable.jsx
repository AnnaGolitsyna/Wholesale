import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Space } from 'antd';

const RadioGroupForProductTable = ({ onFilterChange }) => {
  return (
    <Space style={{ marginTop: 16 }}>
      <Radio.Group
        defaultValue="all"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <Radio value="all">Все товары</Radio>
        <Radio value="selected">Выбранные</Radio>
      </Radio.Group>
    </Space>
  );
};

RadioGroupForProductTable.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default RadioGroupForProductTable;
