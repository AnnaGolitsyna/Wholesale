import React, { Suspense, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Spin, Menu, Drawer } from 'antd';
import {
  ProjectOutlined,
  BarcodeOutlined,
  MenuOutlined,
  SolutionOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import UserProfile from '../../features/authentication/components/UserProfile';
import { ReactComponent as Logo } from '../../styles/logo/LogoInfinite.svg';

const { Header, Content, Footer } = Layout;

const MobileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Bottom navigation items
  const bottomNavItems = [
    {
      key: '/receivables',
      icon: <ProjectOutlined />,
      label: 'Деньги',
    },
    {
      key: '/goods',
      icon: <BarcodeOutlined />,
      label: 'Прайс',
    },
    {
      key: '/orders',
      icon: <SolutionOutlined />,
      label: 'Заказы',
    },
  ];

  // Drawer menu items (full navigation)
  const drawerMenuItems = [
    {
      key: '/receivables',
      icon: <ProjectOutlined />,
      label: 'Дебиторка',
    },
    {
      key: '/goods',
      icon: <BarcodeOutlined />,
      label: 'Прайс',
    },
    {
      key: '/orders',
      icon: <SolutionOutlined />,
      label: 'Заказы',
    },
    {
      key: '/invoices-to-print',
      icon: <PrinterOutlined />,
      label: 'Накладные',
    },
  ];

  const handleNavClick = (e) => {
    if (e.key === '/menu') return; // Don't navigate for menu button
    navigate(e.key);
  };

  const handleDrawerNavClick = (e) => {
    navigate(e.key);
    setDrawerVisible(false);
  };

  const getCurrentKey = () => {
    // Find the matching bottom nav item
    const currentPath = location.pathname;
    const matchingItem = bottomNavItems.find(
      (item) =>
        item.key === currentPath || currentPath.startsWith(item.key + '/')
    );
    return matchingItem ? matchingItem.key : '/';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Mobile Header */}
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          background: '#001529',
        }}
      >
        <MenuOutlined onClick={() => setDrawerVisible(true)} />
        <Logo />
        <UserProfile />
      </Header>

      {/* Content Area */}
      <Content
        style={{
          padding: '16px',
          paddingBottom: '70px', // Space for bottom navigation
          minHeight: 'calc(100vh - 64px - 56px)',
          overflow: 'auto',
        }}
      >
        <Suspense
          fallback={
            <Spin
              size="large"
              style={{ display: 'block', margin: '40px auto' }}
            />
          }
        >
          <Outlet />
        </Suspense>
      </Content>

      <Footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: 0,
          background: '#001529',
          borderTop: '1px solid #f0f0f0',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[getCurrentKey()]}
          onClick={handleNavClick}
          items={bottomNavItems}
          style={{
            background: 'transparent',
          }}
        />
      </Footer>

      {/* Drawer for full menu */}
      <Drawer
        title="Навигация"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width="80%"
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleDrawerNavClick}
          items={drawerMenuItems}
          style={{ border: 'none' }}
        />
      </Drawer>
    </Layout>
  );
};

export default MobileLayout;
