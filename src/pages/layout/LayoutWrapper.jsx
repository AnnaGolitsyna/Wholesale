import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';

const LayoutWrapper = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar />

      <Layout>
        <Header />

        <Layout.Content style={{ padding: '20px' }}>
          <Suspense fallback={<Spin size="large" />}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
