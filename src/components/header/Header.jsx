import React from 'react';
import { Layout, Typography, Image, Space, Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { brandTheme } from '../../styles/brandTheme';

const Header = () => {
  return (
    <Layout.Header>
      <Space
        size={24}
        align="center"
        style={{ justifyContent: 'space-between', width: '100%' }}
      >
        <Link to="/">
          <HomeFilled style={{ marginRight: '10px' }} />
          <span to="/">На главную</span>
        </Link>

        <Space>
          <Typography.Title
            level={3}
            style={{ margin: '0', color: brandTheme.token.colorPrimary }}
          >
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
