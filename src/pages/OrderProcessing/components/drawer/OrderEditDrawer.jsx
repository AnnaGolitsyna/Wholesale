import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  Button,
  InputNumber,
  Space,
  Typography,
  Popconfirm,
  message,
  Divider,
  Card,
  Empty,
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

/**
 * Mobile Drawer component for editing client orders
 * Provides a full-screen editing experience optimized for touch devices
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.visible - Controls drawer visibility
 * @param {Function} props.onClose - Callback when drawer is closed
 * @param {Object} props.client - Client object with order details
 * @param {string} props.client.id - Client unique identifier
 * @param {string} props.client.name - Client name
 * @param {string} props.client.fullName - Client full name
 * @param {Array} props.client.listOrderedItems - Array of ordered items
 * @param {Function} props.onSave - Callback when order is saved: (clientId, updatedItems) => void
 * @param {boolean} props.readOnly - If true, disables all editing capabilities
 */
const OrderEditDrawer = ({
  visible,
  onClose,
  client,
  onSave,
  readOnly = false,
}) => {
  const [items, setItems] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Initialize items when client or drawer visibility changes
  useEffect(() => {
    if (client && client.listOrderedItems && visible) {
      setItems([...client.listOrderedItems]);
      setHasChanges(false);
    }
  }, [client, visible]);

  /**
   * Handle quantity change via direct input
   */
  const handleCountChange = (value, itemValue) => {
    if (readOnly) return;

    const newCount = value === null || value === undefined ? 0 : value;
    const newItems = items.map((item) =>
      item.value === itemValue ? { ...item, count: newCount } : item
    );
    setItems(newItems);
    setHasChanges(true);
  };

  /**
   * Increment item quantity by 1
   */
  const handleIncrement = (itemValue) => {
    if (readOnly) return;

    const newItems = items.map((item) =>
      item.value === itemValue ? { ...item, count: item.count + 1 } : item
    );
    setItems(newItems);
    setHasChanges(true);
  };

  /**
   * Decrement item quantity by 1 (minimum 0)
   */
  const handleDecrement = (itemValue) => {
    if (readOnly) return;

    const newItems = items.map((item) =>
      item.value === itemValue && item.count > 0
        ? { ...item, count: item.count - 1 }
        : item
    );
    setItems(newItems);
    setHasChanges(true);
  };

  /**
   * Delete an item from the order
   */
  const handleDelete = (itemValue) => {
    if (readOnly) return;

    const newItems = items.filter((item) => item.value !== itemValue);
    setItems(newItems);
    setHasChanges(true);
    messageApi.success('Товар удален');
  };

  /**
   * Save changes and close drawer
   */
  const handleSave = () => {
    if (onSave && client) {
      onSave(client.id, items);
      messageApi.success('Заказ успешно обновлен');
      setHasChanges(false);
      onClose();
    }
  };

  /**
   * Cancel changes and close drawer
   * Resets items to original state if changes were made
   */
  const handleCancel = () => {
    if (hasChanges) {
      // Reset to original items
      if (client && client.listOrderedItems) {
        setItems([...client.listOrderedItems]);
      }
      setHasChanges(false);
    }
    onClose();
  };

  /**
   * Handle add new item
   * This will be implemented with product selection
   */
  const handleAddItem = () => {
    messageApi.info('Функция добавления товара будет реализована');
    // TODO: Open modal/drawer with product selection
  };

  /**
   * Calculate total quantity of all items
   */
  const getTotalCount = () => {
    return items.reduce((sum, item) => sum + (item.count || 0), 0);
  };

  /**
   * Get drawer title with client information
   */
  const getDrawerTitle = () => {
    if (!client) return 'Редактирование заказа';

    return (
      <Space direction="vertical" size={0}>
        <Text strong>Редактирование заказа</Text>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          {client.name}
        </Text>
      </Space>
    );
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title={getDrawerTitle()}
        placement="bottom"
        onClose={handleCancel}
        open={visible}
        height="90%"
        destroyOnClose
        footer={
          !readOnly && (
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button onClick={handleCancel} block>
                Отмена
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                disabled={!hasChanges}
                block
              >
                Сохранить
              </Button>
            </Space>
          )
        }
      >
        {/* Summary Card */}
        <Card size="small" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Всего позиций:</Text>
              <Text strong>{items.length}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Общее количество:</Text>
              <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                {getTotalCount()}
              </Text>
            </div>
          </Space>
        </Card>

        <Divider orientation="left">Товары в заказе</Divider>

        {/* Items List */}
        {items.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Нет товаров в заказе"
          >
            {!readOnly && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddItem}
              >
                Добавить товар
              </Button>
            )}
          </Empty>
        ) : (
          <List
            dataSource={items}
            renderItem={(item) => (
              <Card
                size="small"
                style={{ marginBottom: '12px' }}
                title={
                  <Text strong ellipsis>
                    {item.label}
                  </Text>
                }
                extra={
                  !readOnly && (
                    <Popconfirm
                      title="Удалить товар?"
                      description="Вы уверены?"
                      onConfirm={() => handleDelete(item.value)}
                      okText="Да"
                      cancelText="Нет"
                      okType="danger"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                      />
                    </Popconfirm>
                  )
                }
              >
                <Space
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text type="secondary">Количество:</Text>
                  {readOnly ? (
                    <Text strong style={{ fontSize: '16px' }}>
                      {item.count}
                    </Text>
                  ) : (
                    <Space.Compact>
                      <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleDecrement(item.value)}
                        disabled={item.count === 0}
                      />
                      <InputNumber
                        min={0}
                        max={9999}
                        value={item.count}
                        onChange={(value) =>
                          handleCountChange(value, item.value)
                        }
                        style={{ width: '80px', textAlign: 'center' }}
                        precision={0}
                      />
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleIncrement(item.value)}
                      />
                    </Space.Compact>
                  )}
                </Space>
              </Card>
            )}
          />
        )}

        {/* Add Item Button */}
        {!readOnly && items.length > 0 && (
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            block
            size="large"
            style={{ marginTop: '16px' }}
            onClick={handleAddItem}
          >
            Добавить товар
          </Button>
        )}
      </Drawer>
    </>
  );
};

OrderEditDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    listOrderedItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ),
  }),
  onSave: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

OrderEditDrawer.defaultProps = {
  readOnly: false,
};

export default OrderEditDrawer;
