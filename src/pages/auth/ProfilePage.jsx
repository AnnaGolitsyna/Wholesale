// src/pages/auth/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Divider,
  message,
  Layout,
  Avatar,
  Row,
  Col,
  Space,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/authentication/hook/useAuth';

import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import LogoutButton from '../../features/authentication/components/LogoutButton';

const { Title, Text } = Typography;
const { Content } = Layout;

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser, form]);

  const onFinish = async (values) => {
    if (!currentUser) return;

    try {
      setLoading(true);

      // Update profile information
      const updates = {};
      let hasChanged = false;

      if (values.displayName !== currentUser.displayName) {
        updates.displayName = values.displayName;
        hasChanged = true;
      }

      if (hasChanged) {
        await updateProfile(currentUser, updates);
      }

      // Update email if changed
      if (values.email !== currentUser.email) {
        try {
          await updateEmail(currentUser, values.email);
        } catch (error) {
          if (error.code === 'auth/requires-recent-login') {
            messageApi.warning(
              'Please log out and log in again to change your email'
            );
          } else {
            throw error;
          }
        }
      }

      messageApi.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      messageApi.error(`Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values) => {
    if (!currentUser) return;

    try {
      setPasswordLoading(true);

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        values.currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, values.newPassword);

      messageApi.success('Password updated successfully!');
      passwordForm.resetFields();
    } catch (error) {
      console.error('Error updating password:', error);

      if (error.code === 'auth/wrong-password') {
        messageApi.error('Current password is incorrect');
      } else {
        messageApi.error(`Failed to update password: ${error.message}`);
      }
    } finally {
      setPasswordLoading(false);
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Content
        style={{
          padding: '24px',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Account Settings
        </Title>
        <Text type="secondary">
          Manage your account information and security settings
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col xs={24} md={8}>
            <Card>
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <Avatar
                  size={96}
                  src={currentUser?.photoURL}
                  style={{
                    backgroundColor: currentUser?.photoURL
                      ? 'transparent'
                      : '#1890ff',
                  }}
                >
                  {!currentUser?.photoURL && avatarText}
                </Avatar>
                <Title
                  level={4}
                  style={{ marginTop: '16px', marginBottom: '8px' }}
                >
                  {currentUser?.displayName || 'User'}
                </Title>
                <Text type="secondary">{currentUser?.email}</Text>

                <Divider />

                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="default" block onClick={() => navigate('/')}>
                    Back to Dashboard
                  </Button>
                  <LogoutButton
                    style={{ display: 'flex', justifyContent: 'center' }}
                  />
                </Space>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Card title="Profile Information" style={{ marginBottom: '24px' }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  displayName: currentUser?.displayName || '',
                  email: currentUser?.email || '',
                }}
              >
                <Form.Item
                  name="displayName"
                  label="Display Name"
                  rules={[
                    { required: true, message: 'Please enter your name' },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Display Name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<SaveOutlined />}
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Card title="Change Password">
              <Form
                form={passwordForm}
                layout="vertical"
                onFinish={handlePasswordChange}
              >
                <Form.Item
                  name="currentPassword"
                  label="Current Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your current password',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Current Password"
                  />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your new password',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="New Password"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm New Password"
                  dependencies={['newPassword']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your new password',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('The two passwords do not match')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm New Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={passwordLoading}
                  >
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
