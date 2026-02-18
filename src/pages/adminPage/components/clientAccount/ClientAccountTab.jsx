import { useState, useMemo } from 'react';
import { Button, Card, Form, Input, message, Table, Row, Col, Tag, Space } from 'antd';
import { SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { createClientAccount } from './createClientAccount';
import { useFirebaseContractorsList } from '../../../Contractors/api/firebase/operations';

const ClientAccountTab = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: contractors, isLoading: contractorsLoading } = useFirebaseContractorsList(true);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Build full email from username
      const fullEmail = `${values.username}@balanutsa.client`;
      
      // Find contractor by email
      const contractor = contractors?.find(c => c.email === fullEmail);
      
      if (!contractor) {
        message.error(`Контрагент с email ${fullEmail} не найден. Сначала добавьте email в карточку контрагента.`);
        setLoading(false);
        return;
      }

      const result = await createClientAccount(contractor.id, values.password);
      message.success({
        content: (
          <div>
            <div><strong>Аккаунт успешно создан!</strong></div>
            <div style={{ marginTop: 8, fontSize: '12px', opacity: 0.8 }}>
              Контрагент: <strong>{contractor.name}</strong><br/>
              Логин: <strong>{result.username}</strong><br/>
              Email: {result.email}<br/>
              Пароль: {values.password}
            </div>
          </div>
        ),
        duration: 10,
      });
      form.resetFields();
    } catch (error) {
      message.error(`Ошибка: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredContractors = useMemo(() => {
    return contractors?.filter((c) => c.category !== 'supplier') || [];
  }, [contractors]);

  const categoryFilters = useMemo(() => {
    const categories = [...new Set(filteredContractors?.map((c) => c.category).filter(Boolean))];
    return categories.map((cat) => ({ text: cat, value: cat }));
  }, [filteredContractors]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 40,
      ellipsis: true,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
      defaultSortOrder: 'ascend',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Поиск по названию"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Поиск
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Сброс
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        (record.name || '').toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      //width: 200,
      render: (email) => {
        if (!email) {
          return <Tag color="red">-</Tag>;
        }
        return (
          <Space size={4}>
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
            <span style={{ fontSize: '12px' }}>{email}</span>
          </Space>
        );
      },
    },
    {
      title: 'Логин',
      dataIndex: 'email',
      key: 'login',
      width: 120,
      render: (email) => {
        if (!email) return '-';
        return <Tag color="blue">{email.split('@')[0]}</Tag>;
      },
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      //width: 120,
      filters: categoryFilters,
      onFilter: (value, record) => record.category === value,
    },
   
  ];

  return (
    <Row gutter={24}>
      <Col span={10}>
        <h3>Создать аккаунт клиента</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name="username"
            label="Логин контрагента"
            rules={[
              { required: true, message: 'Введите логин контрагента' },
              { 
                pattern: /^[a-z0-9_-]+$/, 
                message: 'Только латиница, цифры, дефис и подчеркивание' 
              }
            ]}
            extra="Email будет: username@balanutsa.client"
          >
            <Input 
              placeholder="vitrina" 
              suffix={<span style={{ color: '#999' }}>@balanutsa.client</span>}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Введите пароль' },
              { min: 6, message: 'Минимум 6 символов' },
            ]}
          >
            <Input.Password placeholder="Минимум 6 символов" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Создать аккаунт
            </Button>
          </Form.Item>
          
          <Card size="small" title="Как это работает:" style={{ fontSize: '13px' }}>
            <ol style={{ marginTop: 0, paddingLeft: 20, marginBottom: 0 }}>
              <li>Введите логин (например: vitrina)</li>
              <li>Email автоматически: vitrina@balanutsa.client</li>
              <li>Контрагент должен иметь этот email в своей карточке</li>
              <li>Клиент вводит только "vitrina" в мобильном приложении</li>
            </ol>
          </Card>
        </Form>
      </Col>
      
      <Col span={14}>
        <h3>Список контрагентов</h3>
        <Table
          dataSource={filteredContractors}
          columns={columns}
          rowKey="id"
          loading={contractorsLoading}
          size="small"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Всего: ${total}`
          }}
          scroll={{ y: 400 }}
        />
      </Col>
    </Row>
  );
};

export default ClientAccountTab;
