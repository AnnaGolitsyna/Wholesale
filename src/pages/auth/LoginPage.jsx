import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Typography,
  message,
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
  const { isAuthenticated, userRole } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isAuthenticated && userRole) {
      // Redirect based on role
      if (userRole === 'client') {
        navigate('/client-portal');
      } else if (userRole === 'admin' || userRole === 'operator') {
        navigate('/');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

 const onFinish = async (values) => {
  try {
    setLoading(true);

    // Build email based on input
    let email;
    if (values.username.includes('@')) {
      // Admin/operator typed full email
      email = values.username;
    } else {
      // Client typed just username (e.g., "vitrina")
      email = `${values.username}@balanutsa.client`;
    }

    await signIn(email, values.password);
    messageApi.success('Успішний вхід!');

    // Navigation will happen via useEffect based on role
  } catch (error) {
    let errorMessage = 'Помилка входу';

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Невірний формат логіну';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Цей обліковий запис заблоковано';
        break;
      case 'auth/user-not-found':
        errorMessage = 'Користувача не знайдено';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Невірний пароль';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Невірний логін або пароль';
        break;
      default:
        // Check for access denied error from useAuth
        if (error.message && error.message.includes('заборонено')) {
          errorMessage = 'Доступ заборонено. Зверніться до адміністратора';
        } else {
          errorMessage = error.message;
        }
    }

    messageApi.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {contextHolder}
      <Content
        style={{
          padding: '50px 20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: 400,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Вхід до системи
            </Title>
            <Text type="secondary">Введіть ваші дані для входу</Text>
          </div>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
           <Form.Item
  name="username"
  label="Логін"
  rules={[{ required: true, message: 'Будь ласка, введіть логін' }]}
  tooltip="Для клієнтів: vitrina, для адміністраторів: email"
>
  <Input
    prefix={<UserOutlined />}
    placeholder="vitrina або email"
    autoComplete="username"
  />
</Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: 'Будь ласка, введіть пароль' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Пароль"
                autoComplete="current-password"
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
                  <Checkbox>Запам'ятати мене</Checkbox>
                </Form.Item>
                <Link to="/forgot-password">Забули пароль?</Link>
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
                Увійти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
