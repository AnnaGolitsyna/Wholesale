import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Space } from 'antd';

const RadioGroupForProductTable = ({ onFilterChange }) => {
  return (
    <Space style={{ marginTop: 16 }}>
      <Radio.Group defaultValue="all" onChange={(e) => onFilterChange(e.target.value)}>
        <Radio.Button value="all">Все товары</Radio.Button>
        <Radio.Button value="selected">Выбранные</Radio.Button>
      </Radio.Group>
    </Space>
  );
};

RadioGroupForProductTable.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default RadioGroupForProductTable;
