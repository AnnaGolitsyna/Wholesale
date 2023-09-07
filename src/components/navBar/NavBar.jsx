import React from 'react';
import { Layout } from 'antd';
import { brandTheme } from '../../styles/brandTheme';
import { Link } from 'react-router-dom';



const NavBar = () => {




  return (
    <Layout.Sider
      style={{
        height: '100vh',
        // backgroundColor: brandTheme.token.colorBgBaseDark,
        // color: brandTheme.token.colorInfo,
      }}
    >
     Sider
     <Link to='/' >Home</Link>
     <Link to='clients'>Clients</Link>
    </Layout.Sider>
  );
};

export default NavBar;
