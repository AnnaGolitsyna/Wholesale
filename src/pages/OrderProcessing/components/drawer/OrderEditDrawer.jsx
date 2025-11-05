import React, { useState, useEffect, useMemo } from 'react';
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
  Flex,
  Card,
  Empty,
  ConfigProvider,
  theme,
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';

const { Text } = Typography;

/**
 * Mobile Drawer component for editing client orders
 * Provides a full-screen editing experience optimized for touch devices
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
  const [searchTerm, setSearchTerm] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();

  // Initialize items when drawer opens
  useEffect(() => {
    if (client?.listOrderedItems && visible) {
      setItems([...client.listOrderedItems]);
      setHasChanges(false);
      setSearchTerm('');
    }
  }, [client, visible]);

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    const lowercaseSearch = searchTerm.toLowerCase().trim();
    return items.filter((item) =>
      item.label.toLowerCase().includes(lowercaseSearch)
    );
  }, [items, searchTerm]);

  // Update item quantity
  const updateItemCount = (itemValue, newCount) => {
    if (readOnly) return;

    const validCount = Math.max(0, newCount ?? 0);
    setItems((prev) =>
      prev.map((item) =>
        item.value === itemValue ? { ...item, count: validCount } : item
      )
    );
    setHasChanges(true);
  };

  // Delete item from order
  const handleDelete = (itemValue) => {
    if (readOnly) return;

    setItems((prev) => prev.filter((item) => item.value !== itemValue));
    setHasChanges(true);
    messageApi.success('Товар удален');
  };

  // Save changes
  const handleSave = () => {
    if (onSave && client) {
      onSave(client.id, items);
      messageApi.success('Заказ успешно обновлен');
      setHasChanges(false);
      onClose();
    }
  };

  // Cancel and reset
  const handleCancel = () => {
    if (hasChanges && client?.listOrderedItems) {
      setItems([...client.listOrderedItems]);
      setHasChanges(false);
    }
    setSearchTerm('');
    onClose();
  };

  // Add new item placeholder
  const handleAddItem = () => {
    messageApi.info('Функция добавления товара будет реализована');
  };

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: token.saleInvoiceBg,
              colorBorderSecondary: token.colorSecondaryBtn,
              boxShadowCard: '0 2px 8px rgba(7, 29, 102, 0.55)',
            },
          },
        }}
      >
        <Drawer
          title={
            <Flex vertical gap={8}>
              <Flex align="center" justify="space-around">
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  Редактирование заказа
                </Text>
                <Text strong>{client?.name}</Text>
              </Flex>
              <SearchInput
                onChange={setSearchTerm}
                placeholder="Поиск товара"
                allowClear
              />
            </Flex>
          }
          placement="bottom"
          onClose={handleCancel}
          open={visible}
          height="90%"
          destroyOnClose
          footer={
            !readOnly && (
              <Space style={{ width: '100%' }}>
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
          {filteredItems.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                searchTerm
                  ? `Товары по запросу "${searchTerm}" не найдены`
                  : 'Нет товаров в заказе'
              }
            >
              {!readOnly && !searchTerm && (
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
            <>
              <List
                dataSource={filteredItems}
                renderItem={(item) => (
                  <Card
                    size="small"
                    style={{ marginBottom: 12 }}
                    hoverable
                    title={
                      <Text strong ellipsis>
                        {item.label}
                      </Text>
                    }
                  >
                    <Flex align="center" justify="space-between">
                      <Text type="secondary">Кол-во:</Text>
                      {readOnly ? (
                        <Text strong style={{ fontSize: 16 }}>
                          {item.count}
                        </Text>
                      ) : (
                        <Space.Compact>
                          <Button
                            icon={<MinusOutlined />}
                            onClick={() =>
                              updateItemCount(item.value, item.count - 1)
                            }
                            disabled={item.count === 0}
                          />
                          <InputNumber
                            min={0}
                            max={9999}
                            value={item.count}
                            onChange={(value) =>
                              updateItemCount(item.value, value)
                            }
                            style={{ width: 80, textAlign: 'center' }}
                            precision={0}
                          />
                          <Button
                            icon={<PlusOutlined />}
                            onClick={() =>
                              updateItemCount(item.value, item.count + 1)
                            }
                          />
                        </Space.Compact>
                      )}
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
                    </Flex>
                  </Card>
                )}
              />
              {!readOnly && (
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  block
                  size="large"
                  style={{ marginTop: 16 }}
                  onClick={handleAddItem}
                >
                  Добавить товар
                </Button>
              )}
            </>
          )}
        </Drawer>
      </ConfigProvider>
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
