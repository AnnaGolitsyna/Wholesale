import React, { useState } from 'react';
import { Table, Tag, InputNumber, Select, Spin, Alert, Typography, Button, Modal, Form, Input, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useFinanceTemplate from '../hooks/';

const { Text } = Typography;

const PERIOD_OPTIONS = ['Еженедельно', 'Ежемесячно', 'По требованию'];
const PAYMENT_TYPE_OPTIONS = ['За товар', 'Налоги'];

const PERIOD_COLORS = {
  'Еженедельно': 'gold',
  'Ежемесячно': 'purple',
  'По требованию': 'green',
};

const TYPE_COLORS = {
  'За товар': 'green',
  'Налоги': 'red',
};

const EditableAmount = ({ value, recordId, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    setEditing(false);
    if (localValue !== value) {
      onSave(recordId, localValue ?? 0);
    }
  };

  if (editing) {
    return (
      <InputNumber
        autoFocus
        value={localValue}
        onChange={setLocalValue}
        onBlur={handleSave}
        onPressEnter={handleSave}
        style={{ width: 100 }}
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
        display: 'inline-block',
        minWidth: 60,
        color: value ? 'inherit' : '#bfbfbf',
      }}
    >
      {value ? value.toLocaleString('ru-RU') : '—'}
    </Text>
  );
};

const EditableSelect = ({ value, options, colors, onSave }) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <Select
        autoFocus
        defaultOpen
        defaultValue={value}
        style={{ minWidth: 140 }}
        onSelect={(val) => {
          setEditing(false);
          if (val !== value) onSave(val);
        }}
        onBlur={() => setEditing(false)}
        options={options.map((o) => ({ value: o, label: o }))}
      />
    );
  }

  return (
    <Tag
      color={colors?.[value] || 'default'}
      onClick={() => setEditing(true)}
      style={{ cursor: 'pointer' }}
    >
      {value || '—'}
    </Tag>
  );
};

const EditableWeek = ({ value, recordId, onSave }) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <Select
        autoFocus
        defaultOpen
        defaultValue={value}
        style={{ width: 70 }}
        onSelect={(val) => {
          setEditing(false);
          if (val !== value) onSave(recordId, { week_of_month: val });
        }}
        onBlur={() => setEditing(false)}
        options={[0, 1, 2, 3, 4].map((n) => ({ value: n, label: n }))}
      />
    );
  }

  return (
    <Text
      onClick={() => setEditing(true)}
      style={{ cursor: 'pointer', padding: '2px 6px', borderRadius: 4 }}
    >
      {value ?? '—'}
    </Text>
  );
};

const AddTemplateRowModal = ({ open, onClose, onAdd }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await onAdd({ ...values, amount: values.amount || 0 });
      form.resetFields();
      onClose();
    } catch (_) {}
  };

  return (
    <Modal
      title="Новая запись шаблона"
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
          <Input />
        </Form.Item>
        <Form.Item name="period" label="Период" rules={[{ required: true }]}>
          <Select options={PERIOD_OPTIONS.map((o) => ({ value: o, label: o }))} />
        </Form.Item>
        <Form.Item name="payment_type" label="Тип платежа">
          <Select options={PAYMENT_TYPE_OPTIONS.map((o) => ({ value: o, label: o }))} />
        </Form.Item>
        <Form.Item name="amount" label="Сумма">
          <InputNumber style={{ width: '100%' }} min={0} precision={2} />
        </Form.Item>
        <Form.Item name="week_of_month" label="Неделя месяца">
          <Select options={[0, 1, 2, 3, 4].map((n) => ({ value: n, label: n }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FinanceTemplateTable = () => {
  const { template, loading, error, saving, updateAmount, updateRow, createRow, deleteRow } = useFinanceTemplate();
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    {
      title: 'Поставщик',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name?.localeCompare(b.name),
    },
    {
      title: 'Период',
      dataIndex: 'period',
      key: 'period',
      filters: PERIOD_OPTIONS.map((p) => ({ text: p, value: p })),
      onFilter: (value, record) => record.period === value,
      render: (period, record) => (
        <EditableSelect
          value={period}
          options={PERIOD_OPTIONS}
          colors={PERIOD_COLORS}
          onSave={(val) => updateRow(record.id, { period: val })}
        />
      ),
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <EditableAmount
          value={amount}
          recordId={record.id}
          onSave={updateAmount}
        />
      ),
    },
    {
      title: 'Тип платежа',
      dataIndex: 'payment_type',
      key: 'payment_type',
      filters: PAYMENT_TYPE_OPTIONS.map((p) => ({ text: p, value: p })),
      onFilter: (value, record) => record.payment_type === value,
      render: (type, record) => (
        <EditableSelect
          value={type}
          options={PAYMENT_TYPE_OPTIONS}
          colors={TYPE_COLORS}
          onSave={(val) => updateRow(record.id, { payment_type: val })}
        />
      ),
    },
    {
      title: 'Неделя месяца',
      dataIndex: 'week_of_month',
      key: 'week_of_month',
      render: (week, record) => (
        <EditableWeek
          value={week}
          recordId={record.id}
          onSave={updateRow}
        />
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 40,
      render: (_, record) => (
        <Popconfirm
          title="Удалить эту запись?"
          onConfirm={() => deleteRow(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  if (error) {
    return <Alert type="error" message={error} style={{ margin: 16 }} />;
  }

  return (
    <Spin spinning={loading || saving}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
        style={{ marginBottom: 12 }}
      >
        Добавить
      </Button>
      <Table
        dataSource={template}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="middle"
      />
      <AddTemplateRowModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={createRow}
      />
    </Spin>
  );
};

export default FinanceTemplateTable;
