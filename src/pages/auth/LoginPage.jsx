import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  message,
  Space,
  Card,
  Layout,
  Checkbox,
} from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { signIn } from '../../features/authentication/authOperations';
import { useAuth } from '../../features/authentication/hook/useAuth';

const { Title, Text } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await signIn(values.email, values.password);
      messageApi.success('Login successful!');
      navigate('/');
    } catch (error) {
      let errorMessage = 'Failed to login';

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password';
          break;
        default:
          errorMessage = error.message;
      }

      messageApi.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Content
        style={{
          padding: '50px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            width: 400,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            borderRadius: '8px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2}>Sign In</Title>
            <Text type="secondary">
              Welcome back! Please enter your details
            </Text>
          </div>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<LoginOutlined />}
                style={{ width: '100%' }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>Or</Divider>

          <div style={{ textAlign: 'center' }}>
            <Space>
              <Text type="secondary">Don't have an account?</Text>
              <Link to="/signup">Sign up</Link>
            </Space>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
