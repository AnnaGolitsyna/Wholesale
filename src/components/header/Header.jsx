import React from 'react';
import { Typography, Flex } from 'antd';
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



export default Header;


