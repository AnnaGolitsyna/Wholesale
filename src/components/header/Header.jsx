import React from 'react';
import { Layout, Typography, Image, Space } from 'antd';
import { brandTheme } from '../../styles/brandTheme';

const Header = () => {
  return (
    <Layout.Header>
      <Space
        size={24}
        align="center"
        style={{ justifyContent: 'end', width: '100%' }}
      >
        <Typography.Title
          level={3}
          style={{ margin: '0', color: brandTheme.token.colorPrimary }}
        >
          Wholesale
        </Typography.Title>
        <Image src="/logoNBGold.png" width={50} alt="Logo" preview={false} />
      </Space>
    </Layout.Header>
  );
};

// Header.propTypes = {}

export default Header;
