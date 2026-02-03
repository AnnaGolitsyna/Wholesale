import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { items } from './menuItems.js';
import { useAuth } from '../../features/authentication/hook/useAuth';

const NavBar = ({ collapsed }) => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const menuItems = useMemo(() => {
    if (userRole === 'admin') {
      return [...items, { key: 'admin', icon: <SettingOutlined />, label: 'Админ' }];
    }
    return items;
  }, [userRole]);

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
      items={menuItems}
    />
  );
};

export default NavBar;
