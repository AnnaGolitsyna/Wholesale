import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu, Typography, Space } from 'antd';
import { ReactComponent as TemplateBox } from '../../../../styles/icons/template/TemplateBox.svg';

const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: 'Option 1',
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: 'Option 2',
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: 'Option 3',
  },
];

const CollapsedMenu = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Space style={{ cursor: 'pointer' }}>
        <TemplateBox onClick={toggleCollapsed} />
        <Typography.Text>Шаблон</Typography.Text>
      </Space>

      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      {collapsed && (
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="horizontal"
          theme="dark"
          items={items}
        />
      )}
    </div>
  );
};

CollapsedMenu.propTypes = {};

export default CollapsedMenu;
