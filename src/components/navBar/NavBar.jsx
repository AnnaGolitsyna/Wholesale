import React from 'react';
import { Layout } from 'antd';
import { brandTheme } from '../../styles/brandTheme';



const NavBar = () => {


  return (
    <Layout.Sider
      style={{
        height: '100vh',
        backgroundColor: brandTheme.token.colorBgBaseDark,
        color: brandTheme.token.colorInfo,
      }}
    >
     Sider
    </Layout.Sider>
  );
};

export default NavBar;
