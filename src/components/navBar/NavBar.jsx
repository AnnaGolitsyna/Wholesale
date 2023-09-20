import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { items } from './menuItems.js';

const NavBar = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log('click ', e.key);
    navigate(e.key);
  };
  
  return (
    <Layout.Sider>
      <Menu
        onClick={onClick}
        style={{
          backgroundColor: 'transparent',
        }}
        defaultSelectedKeys={['home']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      ></Menu>
    </Layout.Sider>
  );
};

export default NavBar;
