import React from 'react';
import { Space, Input } from 'antd';
import PropTypes from 'prop-types';
import SearchIcon from '../../styles/icons/SearchIcon';

const SearchInput = ({ onChange, placeholder }) => {
  return (
    <Space>
      <SearchIcon />
      <Input placeholder={placeholder} onChange={onChange} allowClear />
    </Space>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
