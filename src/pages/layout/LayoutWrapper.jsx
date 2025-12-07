import React, { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';

const LayoutWrapper = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg" // Auto-collapse below 992px
        collapsedWidth={80}
      >
        <NavBar collapsed={collapsed} />
      </Layout.Sider>

      <Layout style={{ position: 'relative', minHeight: '100vh' }}>
        <Layout.Header style={{ position: 'sticky', top: 0, zIndex: 1 }}>
          <Header />
        </Layout.Header>

        <Layout.Content style={{ position: 'relative', padding: '20px' }}>
          <Suspense fallback={<Spin size="large" />}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
