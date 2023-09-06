import React from 'react';
import { Layout } from 'antd';
import { brandTheme } from '../../styles/brandTheme';

const NavBar = () => {
  const { Sider } = Layout;

  return (
    <Sider
      style={{
        height: '100vh',
        backgroundColor: brandTheme.token.colorBgBase,
      }}
    >
      Sider
    </Sider>
  );
};

export default NavBar;
