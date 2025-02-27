import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { Avatar, Dropdown, Space, Typography, message } from 'antd';
import {
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { logOut } from '../authOperations';
import { useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logOut();
      messageApi.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      messageApi.error('Failed to logout');
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const avatarText = currentUser?.displayName
    ? getInitials(currentUser.displayName)
    : currentUser?.email?.charAt(0).toUpperCase() || 'U';

  const items = [
    {
      key: '1',
      label: (
        <div style={{ padding: '8px 0' }}>
          <Space direction="vertical" size={0} style={{ width: '100%' }}>
            <Text strong>{currentUser?.displayName || 'User'}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {currentUser?.email}
            </Text>
          </Space>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <Link onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              style={{
                backgroundColor: currentUser?.photoURL
                  ? 'transparent'
                  : '#1890ff',
                cursor: 'pointer',
              }}
              src={currentUser?.photoURL}
            >
              {!currentUser?.photoURL && avatarText}
            </Avatar>
            <Space>
              <span
                style={{
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentUser?.displayName || 'User'}
              </span>
              <DownOutlined />
            </Space>
          </Space>
        </Link>
      </Dropdown>
    </>
  );
};

export default UserProfile;
