import React, { useState } from 'react';
import { Table, Tag, InputNumber, Select, Spin, Alert, Typography } from 'antd';
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
      {value ? value.toLocaleString('uk-UA') : '—'}
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

const FinanceTemplateTable = () => {
  const { template, loading, error, saving, updateAmount, updateRow } = useFinanceTemplate();

  const columns = [
    {
      title: 'Постачальник',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name?.localeCompare(b.name),
    },
    {
      title: 'Період',
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
      title: 'Сума',
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
      title: 'Тип платежу',
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
      title: 'Тиждень місяця',
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
  ];

  if (error) {
    return <Alert type="error" message={error} style={{ margin: 16 }} />;
  }

  return (
    <Spin spinning={loading || saving}>
      <Table
        dataSource={template}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="middle"
        style={{ marginTop: 8 }}
      />
    </Spin>
  );
};

export default FinanceTemplateTable;
