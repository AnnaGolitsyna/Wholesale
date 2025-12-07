import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { items } from './menuItems.js';

const NavBar = ({ collapsed }) => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        backgroundColor: 'transparent',
      }}
      defaultSelectedKeys={['home']}
      defaultOpenKeys={collapsed ? [] : ['sub2']}
      mode="inline"
      items={items}
      inlineCollapsed={collapsed}
    />
  );
};

export default NavBar;
