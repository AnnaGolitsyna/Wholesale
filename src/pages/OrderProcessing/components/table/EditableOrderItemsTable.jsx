import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  InputNumber,
  Button,
  Space,
  Popconfirm,
  message,
  Typography,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * Editable nested table component for managing client's ordered items
 * Provides inline editing with auto-save functionality
 *
 * @component
 * @param {Object} props
 * @param {Array} props.items - Array of ordered items with structure: { value, label, count }
 * @param {Function} props.onSave - Callback function when items are updated: (clientId, updatedItems) => void
 * @param {string} props.clientId - Unique identifier for the client
 * @param {boolean} props.readOnly - If true, disables all editing capabilities
 */
const EditableOrderItemsTable = ({
  items = [],
  onSave,
  clientId,
  readOnly = false,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  // Initialize dataSource when items prop changes
  useEffect(() => {
    if (items && Array.isArray(items)) {
      setDataSource([...items]);
    }
  }, [items]);

  /**
   * Handle quantity change for an item
   * Auto-saves the changes
   */
  const handleCountChange = (value, record) => {
    // Ensure value is a valid number
    const newCount = value === null || value === undefined ? 0 : value;

    const newData = dataSource.map((item) =>
      item.value === record.value ? { ...item, count: newCount } : item
    );

    setDataSource(newData);

    // Auto-save on change
    if (onSave) {
      onSave(clientId, newData);
      messageApi.success('Количество обновлено');
    }
  };

  /**
   * Handle item deletion
   * Shows confirmation and auto-saves
   */
  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.value !== record.value);
    setDataSource(newData);

    if (onSave) {
      onSave(clientId, newData);
      messageApi.success('Товар удален из заказа');
    }
  };

  /**
   * Handle add new item
   * This will be implemented with a modal/drawer for product selection
   */
  const handleAddItem = () => {
    messageApi.info('Функция добавления товара будет реализована');
    // TODO: Open modal/drawer with product selection
    // onAddItemClick?.();
  };

  /**
   * Calculate total quantity of all items
   */
  const getTotalCount = () => {
    return dataSource.reduce((sum, item) => sum + (item.count || 0), 0);
  };

  const columns = [
    {
      title: '№',
      key: 'index',
      width: 50,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Товар',
      dataIndex: 'label',
      key: 'label',
      ellipsis: true,
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: 150,
      align: 'center',
      render: (count, record) => (
        <InputNumber
          min={0}
          max={9999}
          value={count}
          onChange={(value) => handleCountChange(value, record)}
          style={{ width: '100%' }}
          disabled={readOnly}
          precision={0}
        />
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 100,
      align: 'center',
      render: (_, record) =>
        !readOnly && (
          <Popconfirm
            title="Удалить этот товар?"
            description="Вы уверены, что хотите удалить этот товар из заказа?"
            onConfirm={() => handleDelete(record)}
            okText="Да"
            cancelText="Нет"
            okType="danger"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        ),
    },
  ];

  // Filter out the actions column if readOnly
  const displayColumns = readOnly
    ? columns.filter((col) => col.key !== 'actions')
    : columns;

  return (
    <>
      {contextHolder}
      <div style={{ marginBottom: '8px' }}>
        <Space>
          <Text type="secondary">
            Всего позиций: <Text strong>{dataSource.length}</Text>
          </Text>
          <Text type="secondary">
            Общее количество: <Text strong>{getTotalCount()}</Text>
          </Text>
        </Space>
      </div>
      <Table
        columns={displayColumns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        rowKey="value"
        bordered
        locale={{
          emptyText: 'Нет товаров в заказе',
        }}
        footer={
          !readOnly
            ? () => (
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  block
                  onClick={handleAddItem}
                >
                  Добавить товар
                </Button>
              )
            : undefined
        }
      />
    </>
  );
};

EditableOrderItemsTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func,
  clientId: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
};

EditableOrderItemsTable.defaultProps = {
  items: [],
  readOnly: false,
};

export default EditableOrderItemsTable;
