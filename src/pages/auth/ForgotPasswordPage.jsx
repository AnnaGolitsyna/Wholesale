// src/pages/auth/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Card,
  Layout,
  Result,
} from 'antd';
import { MailOutlined, SendOutlined } from '@ant-design/icons';
import { resetPassword } from '../../features/authentication/authOperations';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await resetPassword(values.email);
      setEmail(values.email);
      setSuccess(true);
    } catch (error) {
      let errorMessage = 'Failed to send password reset email';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else {
        errorMessage = error.message;
      }

      messageApi.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
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
            <Result
              status="success"
              title="Password Reset Email Sent"
              subTitle={
                <div>
                  <Paragraph>
                    We've sent a password reset link to:{' '}
                    <Text strong>{email}</Text>
                  </Paragraph>
                  <Paragraph>
                    Please check your email and follow the instructions to reset
                    your password.
                  </Paragraph>
                </div>
              }
              extra={[
                <Button type="primary" key="login">
                  <Link to="/login">Back to Login</Link>
                </Button>,
              ]}
            />
          </Card>
        </Content>
      </Layout>
    );
  }

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
            <Title level={2}>Forgot Password</Title>
            <Text type="secondary">
              Enter your email to receive a password reset link
            </Text>
          </div>

          <Form
            name="forgot_password_form"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
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
                icon={<SendOutlined />}
                style={{ width: '100%' }}
              >
                Send Reset Link
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Link to="/login">Back to Login</Link>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default ForgotPasswordPage;
