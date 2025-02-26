
import React, { useState } from 'react';
import { Button, message, Tooltip, Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../authOperations';

const LogoutButton = ({ type = 'default', tooltipPlacement = 'bottom' }) => {
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
      <Tooltip title="Logout" placement={tooltipPlacement}>
        <Button
          type={type}
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          loading={loading}
        >
          Logout
        </Button>
      </Tooltip>
    </>
  );
};

export default LogoutButton;
