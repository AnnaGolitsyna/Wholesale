import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Space } from 'antd';
import Header from '../header/Header';
import NavBar from '../navBar/NavBar';


const LayoutWrapper = () => {
  return (
    <Space
      direction="vertical"
      style={{ width: '100%', minHeight: '100vh' }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />

        <Layout>
          <Header />

          <Layout.Content style={{ padding: '20px' }}>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default LayoutWrapper;
