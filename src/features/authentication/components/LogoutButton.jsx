import React, { useState } from 'react';
import { Typography, message, Tooltip, Modal, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../authOperations';

const { Link } = Typography;

const LogoutButton = ({ tooltipPlacement = 'bottom', style = {} }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = async () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout?',
      onOk: async () => {
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
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Sign out from your account" placement={tooltipPlacement}>
        <Link
          onClick={handleLogout}
          style={{ cursor: 'pointer', ...style }}
          className={loading ? 'ant-typography-disabled' : ''}
        >
          <Space>
            <LogoutOutlined />
            Logout
          </Space>
        </Link>
      </Tooltip>
    </>
  );
};

export default LogoutButton;
