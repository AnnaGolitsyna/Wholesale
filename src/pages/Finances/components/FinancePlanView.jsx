import React, { useState, useMemo } from 'react';
import {
  Table, Tag, InputNumber, Button, Popconfirm,
  Modal, Form, Input, Select, DatePicker,
  Typography, Alert, Spin, Empty, theme, Flex,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import useFinancePlan from '../hooks/useFinancePlan';

const { Text, Title } = Typography;

const PAYMENT_TYPE_OPTIONS = ['За товар', 'Налоги'];

const TYPE_COLORS = {
  'За товар': 'green',
  'Налоги': 'red',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return dayjs(dateStr).format('DD.MM.YYYY');
};

const EditableNumber = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    setEditing(false);
    if (localValue !== value) onSave(localValue ?? 0);
  };

  if (editing) {
    return (
      <InputNumber
        autoFocus
        value={localValue}
        onChange={setLocalValue}
        onBlur={handleSave}
        onPressEnter={handleSave}
        style={{ width: 110 }}
        min={0}
        precision={2}
      />
    );
  }

  return (
    <Text
      onClick={() => setEditing(true)}
      style={{
        cursor: 'pointer',
        padding: '2px 6px',
        borderRadius: 4,
        color: value ? 'inherit' : '#ff4d4f',
        fontWeight: value ? 'normal' : 'bold',
      }}
    >
      {value ? value.toLocaleString('ru-RU') : '0'}
    </Text>
  );
};

const EditableDate = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <DatePicker
        autoFocus
        defaultValue={value ? dayjs(value) : undefined}
        format="DD.MM.YYYY"
        onBlur={() => setEditing(false)}
        onChange={(date) => {
          if (date) onSave(date.format('YYYY-MM-DD'));
          setEditing(false);
        }}
        style={{ width: 130 }}
        open
      />
    );
  }

  return (
    <Text
      onClick={() => setEditing(true)}
      style={{ cursor: 'pointer', padding: '2px 6px', borderRadius: 4 }}
    >
      {formatDate(value)}
    </Text>
  );
};

const AddManualRowModal = ({ open, onClose, onAdd, defaultDate }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onAdd({
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : defaultDate,
        amount: values.amount || 0,
      });
      form.resetFields();
      onClose();
    } catch (_) {}
  };

  return (
    <Modal
      title="Добавить платёж"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Добавить"
      cancelText="Отмена"
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item name="name" label="Поставщик" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="fop" label="ФОП" rules={[{ required: true }]}>
          <Input defaultValue="Наташа" />
        </Form.Item>
        <Form.Item name="date" label="Дата">
          <DatePicker
            format="DD.MM.YYYY"
            defaultValue={defaultDate ? dayjs(defaultDate) : undefined}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="amount" label="Сумма">
          <InputNumber style={{ width: '100%' }} min={0} precision={2} />
        </Form.Item>
        <Form.Item name="payment_type" label="Тип платежа">
          <Select options={PAYMENT_TYPE_OPTIONS.map((o) => ({ value: o, label: o }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FinancePlanView = ({ year, month }) => {
  const { token } = theme.useToken();
  const {
    groupedByDate,
    loading,
    error,
    saving,
    generating,
    isEmpty,
    updateRow,
    addRow,
    deleteRow,
    generatePlan,
  } = useFinancePlan(year, month);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);

  const columns = useMemo(() => [
    {
      title: 'Поставщик',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date, record) => (
        <EditableDate
          value={date}
          onSave={(val) => updateRow(record.id, { date: val })}
        />
      ),
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <EditableNumber
          value={amount}
          onSave={(val) => updateRow(record.id, { amount: val })}
        />
      ),
    },
    {
      title: 'Тип платежа',
      dataIndex: 'payment_type',
      key: 'payment_type',
      render: (type) => type ? (
        <Tag color={TYPE_COLORS[type] || 'default'}>{type}</Tag>
      ) : null,
    },
    {
      title: '',
      key: 'actions',
      width: 40,
      render: (_, record) => record.is_manual ? (
        <Popconfirm
          title="Удалить эту строку?"
          onConfirm={() => deleteRow(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ) : null,
    },
  ], [updateRow, deleteRow]);

  if (error) return <Alert type="error" message={error} style={{ margin: 16 }} />;

  if (loading || generating) {
    return (
      <Flex vertical align="center" style={{ padding: 48 }}>
        <Spin size="large" />
        {generating && <p style={{ marginTop: 12 }}>Генерируем план...</p>}
      </Flex>
    );
  }

  if (isEmpty) {
    return (
      <Flex vertical align="center" style={{ padding: 48 }}>
        <Empty description="План на этот месяц ещё не создан" />
        <Button type="primary" onClick={generatePlan} style={{ marginTop: 16 }}>
          Сгенерировать из шаблона
        </Button>
      </Flex>
    );
  }

  return (
    <Spin spinning={saving}>
      <div>
        {Object.entries(groupedByDate)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, rows]) => {
            const total = rows.reduce((sum, r) => sum + (r.amount || 0), 0);
            return (
              <div key={date} style={{ marginBottom: 24 }}>
                <Flex
                  justify="space-between"
                  align="center"
                  style={{
                    marginBottom: 8,
                    padding: '6px 12px',
                    background: token.colorBgBaseDark,
                    borderRadius: 6,
                  }}
                >
                  <Title level={5} style={{ margin: 0 }}>
                    {formatDate(date)}
                  </Title>
                  <Flex align="center" gap={12}>
                    <Text strong>
                      Банк: {total.toLocaleString('ru-RU')} грн
                    </Text>
                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => { setModalDate(date); setModalOpen(true); }}
                    >
                      Добавить
                    </Button>
                  </Flex>
                </Flex>
                <Table
                  dataSource={rows}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                  size="small"
                  rowClassName={(record) => record.amount === 0 ? 'finance-row-zero' : ''}
                />
              </div>
            );
          })}
        <AddManualRowModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={addRow}
          defaultDate={modalDate}
        />
      </div>
    </Spin>
  );
};

export default FinancePlanView;
