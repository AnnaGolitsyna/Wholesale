import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin, Flex, Typography } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { ReactComponent as Logo } from '../../styles/logo/LogoInfinite.svg';
import UserProfile from '../../features/authentication/components/UserProfile';
import useDeviceType from '../../hook/useDeviceType';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const ClientPortalLayout = () => {
  const { isMobile } = useDeviceType();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 16px' : '0 24px',
          background: '#001529',
        }}
      >
        <Logo />
        <UserProfile />
      </Header>

      <Content
        style={{
          padding: isMobile ? 12 : 20,
          minHeight: 'calc(100vh - 64px - 64px)',
        }}
      >
        <Suspense
          fallback={
            <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
          }
        >
          <Outlet />
        </Suspense>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          background: '#001529',
          padding: isMobile ? '12px 16px' : '16px 48px',
        }}
      >
        <Flex justify="center" gap={isMobile ? 16 : 32} wrap="wrap">
          <Text style={{ color: '#d1e8e2' }}>
            <PhoneOutlined /> +38 (050) 698-14-70
          </Text>
          <Text style={{ color: '#d1e8e2' }}>
            <MailOutlined /> balanutsa.nv@gmail.com
          </Text>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default ClientPortalLayout;
