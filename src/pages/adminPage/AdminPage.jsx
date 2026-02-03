import MigrationButton from './components/migrationButton/MigrationButton';
import ClientAccountTab from './components/clientAccount/ClientAccountTab';
import { Result, Button, Tabs } from 'antd';
import {
  LockOutlined,
  UserAddOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../features/authentication/hook/useAuth';

const AdminPage = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Доступ закрыт. Только для администратора 110576gav@gmail.com"
        icon={<LockOutlined style={{ fontSize: 72, color: '#ff4d4f' }} />}
        extra={
          <Button type="primary" href="/">
            На главную
          </Button>
        }
      />
    );
  }

  const tabItems = [
    {
      key: 'clientAccount',
      label: 'Аккаунты клиентов',
      icon: <UserAddOutlined />,
      children: <ClientAccountTab />,
    },
    {
      key: 'migration',
      label: 'Миграция',
      icon: <DatabaseOutlined />,
      children: <MigrationButton />,
    },
  ];

  return (
    <div>
      <h1>Admin Panel</h1>
      <Tabs
        items={tabItems.map((item) => ({
          ...item,
          label: <span>{item.label}</span>,
        }))}
      />
    </div>
  );
};

export default AdminPage;
