import { useState, useMemo } from 'react';
import { Button, Form, Input, message, Table, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { createClientAccount } from './createClientAccount';
import { useFirebaseContractorsList } from '../../../Contractors/api/firebase/operations';

const ClientAccountTab = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: contractors, isLoading: contractorsLoading } = useFirebaseContractorsList(true);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await createClientAccount(values.contractorId, values.password);
      message.success(`Аккаунт user${values.contractorId} успешно создан`);
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
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      filters: categoryFilters,
      onFilter: (value, record) => record.category === value,
    },
  ];

  return (
    <Row gutter={24}>
      <Col span={10}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name="contractorId"
            label="ID контрагента"
            rules={[{ required: true, message: 'Введите ID контрагента' }]}
          >
            <Input placeholder="userName_ID (user_10)" />
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Создать аккаунт
            </Button>
          </Form.Item>
          <p style={{ color: '#888' }}>Логин будет: user[ID]@client.local</p>
        </Form>
      </Col>
      <Col span={14}>
        <h4>Список контрагентов</h4>
        <Table
          dataSource={filteredContractors}
          columns={columns}
          rowKey="id"
          loading={contractorsLoading}
          size="small"
          pagination={{ pageSize: 10 }}
          scroll={{ y: 400 }}
        />
      </Col>
    </Row>
  );
};

export default ClientAccountTab;
