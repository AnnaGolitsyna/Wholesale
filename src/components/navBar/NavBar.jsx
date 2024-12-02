import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { items } from './menuItems.js';

const NavBar = () => {
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
      defaultOpenKeys={['sub2']}
      mode="inline"
      items={items}
    />
  );
};

export default NavBar;
