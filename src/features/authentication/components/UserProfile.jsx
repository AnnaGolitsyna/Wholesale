import React, { useState } from 'react';
import { useAuth } from '../hook/useAuth';
import {
  Avatar,
  Dropdown,
  Space,
  Typography,
  message,
  Drawer,
  List,
  Button,
  theme,
} from 'antd';
import {
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  UserOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { logOut } from '../authOperations';
import { useNavigate } from 'react-router-dom';
import useDeviceType from '../../../hook/useDeviceType';

const { Text, Link } = Typography;

const UserProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logOut();
      messageApi.success('Successfully logged out');
      setDrawerVisible(false);
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

  // Desktop dropdown items
  const desktopItems = [
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

  // Mobile menu items for drawer
  const mobileMenuItems = [
    {
      key: 'profile',
      icon: <SettingOutlined style={{ fontSize: '20px' }} />,
      title: 'Profile Settings',
      description: 'Manage your account',
      onClick: () => {
        navigate('/profile');
        setDrawerVisible(false);
      },
    },
    {
      key: 'logout',
      icon: (
        <LogoutOutlined
          style={{ fontSize: '20px', color: token.textStatisticNegative }}
        />
      ),
      title: 'Logout',
      description: 'Sign out from your account',
      onClick: handleLogout,
      danger: true,
    },
  ];

  // Mobile View - Touch-optimized drawer
  if (isMobile) {
    return (
      <>
        {contextHolder}

        {/* Mobile Avatar Button */}
        <Avatar
          style={{
            backgroundColor: currentUser?.photoURL
              ? 'transparent'
              : token.colorSecondaryBtn,
            cursor: 'pointer',
          }}
          src={currentUser?.photoURL}
          onClick={() => setDrawerVisible(true)}
          size="large"
        >
          {!currentUser?.photoURL && avatarText}
        </Avatar>

        {/* Mobile Bottom Drawer */}
        <Drawer
          title={null}
          placement="bottom"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          height="auto"
          styles={{
            body: { padding: 0 },
          }}
          closeIcon={<CloseOutlined style={{ fontSize: '20px' }} />}
        >
          {/* User Info Header */}
          <div
            style={{
              padding: '24px 16px',
              borderBottom: `1px solid ${token.colorPrimary}`,
              background: token.colorBgAccent,
            }}
          >
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space size="middle">
                <Avatar
                  size={64}
                  style={{
                    backgroundColor: currentUser?.photoURL
                      ? 'transparent'
                      : token.colorSecondaryBtn,
                  }}
                  src={currentUser?.photoURL}
                  icon={!currentUser?.photoURL && <UserOutlined />}
                >
                  {!currentUser?.photoURL && avatarText}
                </Avatar>
                <div>
                  <Text strong style={{ fontSize: '18px', display: 'block' }}>
                    {currentUser?.displayName || 'User'}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {currentUser?.email}
                  </Text>
                </div>
              </Space>
            </Space>
          </div>

          {/* Menu Items */}
          <List
            dataSource={mobileMenuItems}
            renderItem={(item) => (
              <List.Item
                onClick={item.onClick}
                style={{
                  padding: '16px 24px',
                  cursor: 'pointer',
                  minHeight: '72px',
                  borderBottom: `1px solid ${token.colorPrimary}`,
                }}
              >
                <List.Item.Meta
                  avatar={item.icon}
                  title={
                    <Text
                      strong
                      style={{
                        fontSize: '16px',
                        color: item.danger
                          ? token.textStatisticNegative
                          : 'inherit',
                      }}
                    >
                      {item.title}
                    </Text>
                  }
                  description={
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {item.description}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />

          {/* Cancel Button */}
          <div style={{ padding: '16px' }}>
            <Button
              block
              size="large"
              onClick={() => setDrawerVisible(false)}
              style={{ height: '48px' }}
            >
              Cancel
            </Button>
          </div>
        </Drawer>
      </>
    );
  }

  // Desktop View - Original dropdown
  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{ items: desktopItems }}
        trigger={['click']}
        placement="bottomRight"
      >
        <Link onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              style={{
                backgroundColor: currentUser?.photoURL
                  ? 'transparent'
                  : token.colorSecondaryBtn,
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
