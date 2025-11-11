import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Tag,
  Badge,
  Row,
  Col,
  Grid,
} from 'antd';
import {
  DeleteOutlined,
  SaveOutlined,
  MinusOutlined,
  PlusOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import ItemFilterMultiSelect from '../../../../components/select/MultiSelect';
import { mockOrderProductList } from '../orderProcessingPage/mockData';

const { Text } = Typography;
const { useBreakpoint } = Grid;

/**
 * Enhanced OrderEditDrawer - Supports both Client and Supplier modes
 *
 * Features:
 * 1. Client mode: Simple item editing with counts
 * 2. Supplier mode: Shows order count, client demand, and reserve calculation
 * 3. MultiSelect filter for working with specific items
 * 4. Add items from mockOrderProductList via modal
 * 5. Add/edit/delete functionality
 * 6. Reserve alerts for suppliers (negative = shortage, positive = surplus)
 * 7. Responsive grid layout: mobile (1 column), tablet (2 columns), desktop (3 columns)
 */
const EnhancedOrderEditDrawer = ({
  visible,
  onClose,
  client,
  onSave,
  readOnly = false,
  mode = 'client', // 'client' or 'supplier'
  productSummary = [], // For supplier mode: total client demand per product
}) => {
  const [allItems, setAllItems] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [filterMode, setFilterMode] = useState('all');
  const [hasChanges, setHasChanges] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const isSupplierMode = mode === 'supplier';

  // Determine if we should use grid layout (desktop) or list layout (mobile)
  const useGridLayout = screens.md || screens.lg || screens.xl || screens.xxl;

  // Initialize with all items from client
  useEffect(() => {
    if (client?.listOrderedItems && visible) {
      setAllItems([...client.listOrderedItems]);
      setSelectedItemIds([]);
      setFilterMode('all');
      setHasChanges(false);
    }
  }, [client, visible]);

  // Calculate reserve data for supplier mode
  const itemsWithReserve = useMemo(() => {
    if (!isSupplierMode) return allItems;

    return allItems.map((item) => {
      const itemId = item.value || item.id;
      const productDemand = productSummary.find((p) => p.key === itemId);
      const clientsTotal = productDemand?.totalCount || 0;
      const reserve = item.count - clientsTotal;

      return {
        ...item,
        clientsTotal,
        reserve,
      };
    });
  }, [allItems, productSummary, isSupplierMode]);

  // Get items to display based on filter mode
  const displayedItems = useMemo(() => {
    const items = isSupplierMode ? itemsWithReserve : allItems;

    if (filterMode === 'all') {
      return items;
    } else {
      return items.filter((item) =>
        selectedItemIds.includes(item.value || item.id)
      );
    }
  }, [allItems, itemsWithReserve, selectedItemIds, filterMode, isSupplierMode]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalOrder = displayedItems.reduce(
      (sum, item) => sum + (item.count || 0),
      0
    );

    if (!isSupplierMode) {
      return { totalOrder };
    }

    const totalClients = displayedItems.reduce(
      (sum, item) => sum + (item.clientsTotal || 0),
      0
    );
    const totalReserve = totalOrder - totalClients;
    const shortageCount = displayedItems.filter(
      (item) => item.reserve < 0
    ).length;

    return { totalOrder, totalClients, totalReserve, shortageCount };
  }, [displayedItems, isSupplierMode]);

  // Handle selection change
  const handleSelectionChange = useCallback(
    (newSelectedIds) => {
      setSelectedItemIds(newSelectedIds);

      if (newSelectedIds.length > 0 && filterMode === 'all') {
        setFilterMode('selected');
      }
    },
    [filterMode]
  );

  // Update item count
  const updateItemCount = useCallback(
    (itemValue, newCount) => {
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
    },
    [readOnly]
  );

  // Delete item
  const handleDelete = useCallback(
    (itemValue) => {
      if (readOnly) return;

      setAllItems((prev) =>
        prev.filter((item) => (item.value || item.id) !== itemValue)
      );
      setSelectedItemIds((prev) => prev.filter((id) => id !== itemValue));
      setHasChanges(true);
      messageApi.success('Товар удален');
    },
    [readOnly, messageApi]
  );

  // Add new item manually
  const handleAddNewItem = useCallback(
    (itemName) => {
      const newItem = {
        value: `new-${Date.now()}`,
        label: itemName,
        count: 1,
      };

      setAllItems((prev) => [...prev, newItem]);
      setSelectedItemIds((prev) => [...prev, newItem.value]);
      setHasChanges(true);
      messageApi.success(`Добавлен: ${itemName}`);
    },
    [messageApi]
  );

  // Add items from product list
  const handleAddFromProductList = useCallback(
    (selectedProducts) => {
      const newItems = selectedProducts.map((product) => ({
        value: product.value,
        label: product.label,
        count: 1,
        scedule: product.scedule,
        weekly: product.weekly,
        datesList: product.datesList,
      }));

      setAllItems((prev) => [...prev, ...newItems]);
      setSelectedItemIds((prev) => [
        ...prev,
        ...newItems.map((item) => item.value),
      ]);
      setHasChanges(true);
      messageApi.success(`Добавлено товаров: ${newItems.length}`);
    },
    [messageApi]
  );

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

  // Get reserve color for supplier mode
  const getReserveColor = (reserve) => {
    if (reserve < 0) return token.colorError;
    if (reserve === 0) return token.colorWarning;
    return token.colorSuccess;
  };

  // Render item card based on mode
  const renderItemCard = (item) => {
    const itemId = item.value || item.id;
    const isSelected = selectedItemIds.includes(itemId);

    if (isSupplierMode) {
      // Supplier mode: Show order, clients, reserve
      return (
        <Card
          size="small"
          style={{
            marginBottom: 12,
            height: '100%',
            border: isSelected ? `2px solid ${token.colorPrimary}` : undefined,
            boxShadow: isSelected
              ? `0 4px 12px ${token.colorPrimary}20`
              : undefined,
            backgroundColor:
              item.reserve < 0 ? `${token.colorErrorBg}` : undefined,
          }}
        >
          <Flex vertical gap={8}>
            {/* Item name */}
            <Flex justify="space-between" align="center">
              <Text strong ellipsis style={{ flex: 1 }}>
                {item.label || item.name}
              </Text>
              {item.reserve < 0 && (
                <Badge
                  count={
                    <WarningOutlined style={{ color: token.colorError }} />
                  }
                />
              )}
            </Flex>

            {/* Order count control */}
            <Flex justify="space-between" align="center">
              <Text type="secondary">Заказ:</Text>
              {readOnly ? (
                <Text strong style={{ fontSize: 16 }}>
                  {item.count}
                </Text>
              ) : (
                <Space.Compact>
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => updateItemCount(itemId, item.count - 1)}
                    disabled={item.count === 0}
                    size="small"
                  />
                  <InputNumber
                    min={0}
                    max={9999}
                    value={item.count}
                    onChange={(value) => updateItemCount(itemId, value)}
                    style={{ width: 70, textAlign: 'center' }}
                    precision={0}
                    size="small"
                  />
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => updateItemCount(itemId, item.count + 1)}
                    size="small"
                  />
                </Space.Compact>
              )}
            </Flex>

            {/* Client demand and reserve */}
            <Flex justify="space-between" align="center">
              <Space>
                <Text type="secondary">Клиенты:</Text>
                <Tag color={token.colorSuccess}>{item.clientsTotal || 0}</Tag>
              </Space>
              <Space>
                <Text type="secondary">Резерв:</Text>
                <Text
                  strong
                  style={{
                    color: getReserveColor(item.reserve),
                    fontSize: '16px',
                  }}
                >
                  {item.reserve > 0 ? `+${item.reserve}` : item.reserve}
                </Text>
              </Space>
            </Flex>

            {/* Delete button */}
            {!readOnly && (
              <Flex justify="flex-end">
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
                  >
                    Удалить
                  </Button>
                </Popconfirm>
              </Flex>
            )}
          </Flex>
        </Card>
      );
    } else {
      // Client mode: Simple count editing
      return (
        <Card
          size="small"
          style={{
            marginBottom: 12,
            height: '100%',
            border: isSelected ? `2px solid ${token.colorPrimary}` : undefined,
            boxShadow: isSelected
              ? `0 4px 12px ${token.colorPrimary}20`
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
                  onClick={() => updateItemCount(itemId, item.count - 1)}
                  disabled={item.count === 0}
                />
                <InputNumber
                  min={0}
                  max={9999}
                  value={item.count}
                  onChange={(value) => updateItemCount(itemId, value)}
                  style={{ width: 80, textAlign: 'center' }}
                  precision={0}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => updateItemCount(itemId, item.count + 1)}
                />
              </Space.Compact>
            )}
            {!readOnly && (
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
            )}
          </Flex>
        </Card>
      );
    }
  };

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: isSupplierMode
                ? token.purchaseInvoiceBg
                : token.saleInvoiceBg,
              colorBorderSecondary: token.colorSecondaryBtn,
            },
          },
        }}
      >
        <Drawer
          title={
            <Flex vertical gap={8}>
              <Text strong>
                {isSupplierMode ? 'Заказ поставщику' : 'Редактирование заказа'}
              </Text>
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
                {/* Statistics */}
                <Flex justify="space-between" style={{ padding: '0 4px' }}>
                  <Text type="secondary">
                    Показано: {displayedItems.length} из {allItems.length}
                  </Text>
                  {isSupplierMode ? (
                    <Flex gap={16}>
                      <Space size="small">
                        <Text type="secondary">Заказ:</Text>
                        <Tag color={token.purchaseInvoiceAccent}>
                          {statistics.totalOrder}
                        </Tag>
                      </Space>
                      <Space size="small">
                        <Text type="secondary">Клиенты:</Text>
                        <Tag color={token.colorSuccess}>
                          {statistics.totalClients}
                        </Tag>
                      </Space>
                      <Space size="small">
                        <Text type="secondary">Резерв:</Text>
                        <Text
                          strong
                          style={{
                            color: getReserveColor(statistics.totalReserve),
                          }}
                        >
                          {statistics.totalReserve > 0
                            ? `+${statistics.totalReserve}`
                            : statistics.totalReserve}
                        </Text>
                      </Space>
                    </Flex>
                  ) : (
                    <Text type="secondary">
                      Всего единиц: {statistics.totalOrder}
                    </Text>
                  )}
                </Flex>

                {/* Shortage warning */}
                {isSupplierMode && statistics.shortageCount > 0 && (
                  <Flex
                    justify="center"
                    style={{
                      backgroundColor: token.colorErrorBg,
                      padding: '4px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Space size="small">
                      <WarningOutlined style={{ color: token.colorError }} />
                      <Text type="danger">
                        Нехватка по {statistics.shortageCount} позициям
                      </Text>
                    </Space>
                  </Flex>
                )}

                {/* Action buttons */}
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
            {/* Filter Section */}
            <Flex vertical gap={12}>
              {/* Enhanced MultiSelect with product list */}
              <ItemFilterMultiSelect
                allItems={allItems}
                selectedItemIds={selectedItemIds}
                onSelectionChange={handleSelectionChange}
                onAddNewItem={handleAddNewItem}
                onAddFromProductList={handleAddFromProductList}
                mockOrderProductList={mockOrderProductList}
                allowAddNew={!readOnly}
                allowAddFromList={!readOnly}
                placeholder="Выберите товары для работы..."
              />

              {/* Filter mode toggle */}
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

            {/* Items List - Responsive Grid or List */}
            {displayedItems.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  filterMode === 'selected'
                    ? 'Выберите товары из списка выше'
                    : 'Нет товаров в заказе'
                }
              />
            ) : useGridLayout ? (
              // Desktop: Grid layout with 2-3 columns
              <Row gutter={[12, 12]}>
                {displayedItems.map((item) => (
                  <Col
                    key={item.value || item.id}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={8}
                  >
                    {renderItemCard(item)}
                  </Col>
                ))}
              </Row>
            ) : (
              // Mobile: List layout (1 column)
              <List dataSource={displayedItems} renderItem={renderItemCard} />
            )}
          </Flex>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

EnhancedOrderEditDrawer.propTypes = {
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
  mode: PropTypes.oneOf(['client', 'supplier']),
  productSummary: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      totalCount: PropTypes.number,
    })
  ),
};

EnhancedOrderEditDrawer.defaultProps = {
  readOnly: false,
  mode: 'client',
  productSummary: [],
};

export default EnhancedOrderEditDrawer;
