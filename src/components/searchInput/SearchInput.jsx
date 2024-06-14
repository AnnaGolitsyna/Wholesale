import React from 'react';
import { Space, Input } from 'antd';
import PropTypes from 'prop-types';
import { ReactComponent as SearchingIcon } from '../../styles/icons/search/SearchingIcon.svg';

const SearchInput = ({ onChange, placeholder }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <Space>

      <SearchingIcon />
      <Input placeholder={placeholder} onChange={handleChange} allowClear />
    </Space>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchInput;
