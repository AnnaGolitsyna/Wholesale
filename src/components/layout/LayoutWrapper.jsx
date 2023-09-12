import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Header from '../header/Header';
import NavBar from '../navBar/NavBar';

const LayoutWrapper = () => {
  return (

      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />

        <Layout>
          <Header />

          <Layout.Content style={{ padding: '20px' }}>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>

  );
};

export default LayoutWrapper;

