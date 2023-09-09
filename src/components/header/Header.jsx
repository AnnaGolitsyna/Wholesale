import React from 'react';
import { Layout, Typography, Image, Space } from 'antd';


const Header = () => {
  return (
    <Layout.Header>
      <Space
        size={24}
        align="center"
        style={{ justifyContent: 'right', width: '100%' }}
      >
        <Space>
          <Typography.Title level={3} style={{ margin: '0' }}>
            Wholesale
          </Typography.Title>
          <Image src="/logoNBGold.png" width={50} alt="Logo" preview={false} />
        </Space>
      </Space>
    </Layout.Header>
  );
};

// Header.propTypes = {}

export default Header;
