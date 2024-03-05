import React from 'react';
import { Space, Input } from 'antd';
import PropTypes from 'prop-types';
import SearchIcon from '../../styles/icons/SearchIcon';

const SearchInput = ({ onChange, placeholder }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <Space>
      <SearchIcon />
      <Input placeholder={placeholder} onChange={handleChange} allowClear />
    </Space>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
