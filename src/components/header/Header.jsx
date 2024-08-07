import React from 'react';
import { Layout, Typography, Space, Flex } from 'antd';
import { ReactComponent as Logo } from '../../styles/logo/LogoInfinite.svg';

const Header = () => {
  return (
    <Flex align="center" justify="right">
      <Typography.Title level={3} style={{ margin: '0' }}>
        User Name
      </Typography.Title>
      <Logo />
    </Flex>
  );
};

// Header.propTypes = {}

export default Header;

// {/* <Layout.Header>
//   <Space
//     size={24}
//     align="center"
//     style={{ justifyContent: 'right', width: '100%' }}
//   >
//     <Space>
//       <Typography.Title level={3} style={{ margin: '0' }}>
//         User Name
//       </Typography.Title>
//       <Logo />
//     </Space>
//   </Space>
// </Layout.Header>; */}
