import React from 'react';
import PropTypes from 'prop-types';
import { Space } from 'antd';
import { renderItems } from '../utils/renderItems';

const CatalogToolBar = ({ itemsList }) => {
  if (!itemsList) {
    return null;
  }
  return (
    <>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '10px',
        }}
      >
        {renderItems(itemsList)}
      </Space>
    </>
  );
};

CatalogToolBar.propTypes = {
  itemsList: PropTypes.array,
};

export default CatalogToolBar;
