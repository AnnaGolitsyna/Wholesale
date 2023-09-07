import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Space } from 'antd';
import Header from '../header/Header';
import NavBar from '../navBar/NavBar';

const LayoutWrapper = () => {
  return (
    <Space direction="vertical" style={{ width: '100vw', minWidth: '900px' }}>
      <Layout>
        <NavBar />

        <Layout>
          <Header />

          <Layout.Content>
            <Outlet />
          </Layout.Content>
          
        </Layout>

      </Layout>
    </Space>
  );
};

export default LayoutWrapper;
