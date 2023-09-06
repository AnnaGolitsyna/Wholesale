import React from 'react';
import { Layout } from 'antd';
import { brandTheme } from '../../styles/brandTheme';
// import PropTypes from 'prop-types'

const HeaderWholesale = () => {
    const { Header } = Layout;
  return (
    <Header
      style={{
        backgroundColor: brandTheme.token.colorBgBase,
      }}
    >
      Header
    </Header>
  );
}

// HeaderWholesale.propTypes = {}

export default HeaderWholesale