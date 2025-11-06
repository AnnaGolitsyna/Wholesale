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
  Divider,
  Radio,
} from 'antd';
import {
  DeleteOutlined,
  SaveOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ItemFilterMultiSelect from '../../../../components/select/MultiSelect';

const { Text } = Typography;

/**
 * OrderEditDrawer - Enhanced with MultiSelect Filter
 *
 * New Features Added:
 * 1. MultiSelect shows ALL listOrderedItems
 * 2. User selects which items they want to work with
 * 3. List below shows ONLY selected items (or all with toggle)
 * 4. User can edit 'count' field for displayed items
 * 5. Can add new items via + button in dropdown
 * 6. Search works inside dropdown for large lists
 */
const OrderEditDrawer = ({
  visible,
  onClose,
  client,
  onSave,
  readOnly = false,
}) => {
  // All items from order
  const [allItems, setAllItems] = useState([]);

  // NEW: Which items are selected (to show/edit)
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // NEW: Filter mode: 'selected' or 'all'
  const [filterMode, setFilterMode] = useState('all');

  const [hasChanges, setHasChanges] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();

  // Initialize with all items from client
  useEffect(() => {
    if (client?.listOrderedItems && visible) {
      setAllItems([...client.listOrderedItems]);
      setSelectedItemIds([]); // Start with nothing selected
      setFilterMode('all'); // Show all by default
      setHasChanges(false);
    }
  }, [client, visible]);

  // NEW: Get items to display based on filter mode
  const displayedItems = useMemo(() => {
    if (filterMode === 'all') {
      return allItems; // Show everything
    } else {
      // Show only selected items
      return allItems.filter((item) =>
        selectedItemIds.includes(item.value || item.id)
      );
    }
  }, [allItems, selectedItemIds, filterMode]);

  // NEW: Handle selection change
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedItemIds(newSelectedIds);

    // Auto-switch to 'selected' mode if items are selected
    if (newSelectedIds.length > 0 && filterMode === 'all') {
      setFilterMode('selected');
    }
  };

  // Update item count
  const updateItemCount = (itemValue, newCount) => {
    if (readOnly) return;

    const validCount = Math.max(0, newCount ?? 0);
    setAllItems((prev) =>
      prev.map((item) =>
        (item.value || item.id) === itemValue
          ? { ...item, count: validCount }
          : item
      )
    );
    setHasChanges(true);
  };

  // Delete item
  const handleDelete = (itemValue) => {
    if (readOnly) return;

    setAllItems((prev) =>
      prev.filter((item) => (item.value || item.id) !== itemValue)
    );
    // Also remove from selection
    setSelectedItemIds((prev) => prev.filter((id) => id !== itemValue));
    setHasChanges(true);
    messageApi.success('Товар удален');
  };

  // NEW: Add new item
  const handleAddNewItem = (itemName) => {
    const newItem = {
      value: `new-${Date.now()}`,
      label: itemName,
      count: 1,
    };

    setAllItems((prev) => [...prev, newItem]);
    // Auto-select the new item
    setSelectedItemIds((prev) => [...prev, newItem.value]);
    setHasChanges(true);
    messageApi.success(`Добавлен: ${itemName}`);
  };

  // Save changes
  const handleSave = () => {
    if (onSave && client) {
      onSave(client.id, allItems);
      messageApi.success('Заказ успешно обновлен');
      setHasChanges(false);
      onClose();
    }
  };

  // Cancel and reset
  const handleCancel = () => {
    if (hasChanges && client?.listOrderedItems) {
      setAllItems([...client.listOrderedItems]);
      setHasChanges(false);
    }
    setSelectedItemIds([]);
    setFilterMode('all');
    onClose();
  };

  const totalQuantity = displayedItems.reduce(
    (sum, item) => sum + (item.count || 0),
    0
  );

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: token.saleInvoiceBg,
              colorBorderSecondary: token.colorSecondaryBtn,
            },
          },
        }}
      >
        <Drawer
          title={
            <Flex vertical gap={8}>
              <Text strong>Редактирование заказа</Text>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                {client?.name}
              </Text>
            </Flex>
          }
          style={{ background: token.colorBgAccent }}
          placement="bottom"
          onClose={handleCancel}
          open={visible}
          height="90%"
          destroyOnClose
          footer={
            !readOnly && (
              <Flex vertical gap={8}>
                <Flex justify="space-between" style={{ padding: '0 4px' }}>
                  <Text type="secondary">
                    Показано: {displayedItems.length} из {allItems.length}
                  </Text>
                  <Text type="secondary">Всего единиц: {totalQuantity}</Text>
                </Flex>
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
              </Flex>
            )
          }
        >
          <Flex vertical gap={12}>
            {/* NEW: Filter Section */}

            <Flex vertical gap={12}>
              {/* NEW: MultiSelect - shows ALL items, user selects which to work with */}
              <ItemFilterMultiSelect
                allItems={allItems}
                selectedItemIds={selectedItemIds}
                onSelectionChange={handleSelectionChange}
                onAddNewItem={handleAddNewItem}
                allowAddNew={!readOnly}
                placeholder="Выберите товары для работы..."
              />

              {/* NEW: Filter mode toggle */}
              <Radio.Group
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                buttonStyle="solid"
                size="small"
              >
                <Radio.Button value="all">
                  Все товары ({allItems.length})
                </Radio.Button>
                <Radio.Button
                  value="selected"
                  disabled={selectedItemIds.length === 0}
                >
                  Выбранные ({selectedItemIds.length})
                </Radio.Button>
              </Radio.Group>
            </Flex>

            <Divider style={{ margin: 0 }} />

            {/* Items List - now filtered by displayedItems */}
            {displayedItems.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  filterMode === 'selected'
                    ? 'Выберите товары из списка выше'
                    : 'Нет товаров в заказе'
                }
              />
            ) : (
              <List
                dataSource={displayedItems}
                renderItem={(item) => {
                  const itemId = item.value || item.id;
                  const isSelected = selectedItemIds.includes(itemId);

                  return (
                    <Card
                      size="small"
                      style={{
                        marginBottom: 12,
                        // NEW: Highlight selected items with blue border
                        border: isSelected
                          ? `2px solid ${token.colorPrimary}`
                          : undefined,
                        boxShadow: isSelected
                          ? `0 4px 12px ${token.colorPrimary}`
                          : undefined,
                      }}
                      title={
                        <Text strong ellipsis>
                          {item.label || item.name}
                        </Text>
                      }
                    >
                      <Flex justify="space-between" align="center">
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
                                updateItemCount(itemId, item.count - 1)
                              }
                              disabled={item.count === 0}
                            />
                            <InputNumber
                              min={0}
                              max={9999}
                              value={item.count}
                              onChange={(value) =>
                                updateItemCount(itemId, value)
                              }
                              style={{ width: 80, textAlign: 'center' }}
                              precision={0}
                            />
                            <Button
                              icon={<PlusOutlined />}
                              onClick={() =>
                                updateItemCount(itemId, item.count + 1)
                              }
                            />
                          </Space.Compact>
                        )}
                        <Popconfirm
                          title="Удалить товар?"
                          description="Вы уверены?"
                          onConfirm={() => handleDelete(itemId)}
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
                  );
                }}
              />
            )}
          </Flex>
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
    listOrderedItems: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        name: PropTypes.string,
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
