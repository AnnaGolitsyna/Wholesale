import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';

const LayoutWrapper = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider>
        <NavBar />
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


