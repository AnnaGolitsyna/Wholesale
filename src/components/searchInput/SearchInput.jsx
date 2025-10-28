import React from 'react';
import { Space, Input } from 'antd';
import PropTypes from 'prop-types';
import { ReactComponent as SearchingIcon } from '../../styles/icons/search/SearchingIcon.svg';
import useDeviceType from '../../hook/useDeviceType';

/**
 * Adaptive Search Input Component
 * Automatically adjusts size and spacing for mobile/desktop devices
 */
const SearchInput = ({ onChange, placeholder }) => {
  const { isMobile } = useDeviceType();

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  // Mobile-optimized styles
  const mobileStyles = {
    input: {
      height: '48px', // Larger touch target
      fontSize: '16px', // Prevents zoom on iOS
      borderRadius: '8px',
    },
    space: {
      width: '100%',
    },
  };

  // Desktop styles
  const desktopStyles = {
    input: {
      height: '32px',
      fontSize: '14px',
    },
    space: {},
  };

  const styles = isMobile ? mobileStyles : desktopStyles;

  return (
    <Space style={styles.space} size={isMobile ? 'middle' : 'small'}>
      <SearchingIcon style={{ fontSize: isMobile ? '20px' : '16px' }} />
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        allowClear
        size={isMobile ? 'large' : 'middle'}
        style={styles.input}
        // Mobile-specific attributes
        autoComplete="off"
        enterKeyHint="search"
        inputMode="search"
      />
    </Space>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: 'Search...',
};

export default SearchInput;
