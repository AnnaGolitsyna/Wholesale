import React from 'react';
import { Flex } from 'antd';
import UserProfile from '../../features/authentication/components/UserProfile';
import { ReactComponent as Logo } from '../../styles/logo/LogoInfinite.svg';

const Header = () => {
  return (
    <Flex align="center" justify="right">
      <UserProfile />

      <Logo />
    </Flex>
  );
};

export default Header;
