import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Space,
  Segmented,
  List,
  Card,
  Tag,
  Flex,
  Typography,
  theme,
  Collapse,
} from 'antd';
import {
  SortAscendingOutlined,
  AppstoreOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { scheduleType, stockType } from '../../../../constants/productsDetail';
import { ModalModifyItems } from '../../../../features/modifyingItems/components/modals/ModalModifyItems';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';

const { Text, Title } = Typography;

const getNextWednesday = () => {
  const today = dayjs();
  const wednesday = 3; // dayjs: 0=Sunday, 3=Wednesday
  const daysUntilWednesday = (wednesday - today.day() + 7) % 7 || 7;
  return today.add(daysUntilWednesday, 'day').format('YYYY-MM-DD');
};

/**
 * Get actual price from prices array based on date
 * @param {Array} prices - Array of { dateStart, price }
 * @param {string|undefined} scheduleDate - Schedule date (YYYY-MM-DD)
 * @returns {number|null} The actual price
 */
const getActualPrice = (prices, scheduleDate) => {
  if (!prices || prices.length === 0) return null;
  if (prices.length === 1) return prices[0]?.price || null;

  const targetDate = scheduleDate ? dayjs(scheduleDate) : dayjs().add(7, 'day');

  const deadline = targetDate.add(7, 'day');

  // Filter prices with dateStart <= deadline, then find the nearest to targetDate
  const validPrices = prices
    .filter(
      (p) =>
        p.dateStart &&
        (dayjs(p.dateStart).isBefore(deadline, 'day') ||
          dayjs(p.dateStart).isSame(deadline, 'day')),
    )
    .sort(
      (a, b) => dayjs(b.dateStart).valueOf() - dayjs(a.dateStart).valueOf(),
    );

  return validPrices[0]?.price || prices[0]?.price || null;
};

/**
 * SavedOrderByClients Drawer Component
 *
 * Displays products grouped by clients from a schedule
 * Features:
 * - Sortable client list (by name or product count)
 * - Shows all products ordered by each client
 * - Expandable product lists per client
 * - Mobile-optimized layout
 */
const SavedOrderByClients = ({ open, onClose, schedule }) => {
  const { token } = theme.useToken();
  const [sortBy, setSortBy] = useState('name');
  const [selectedStockType, setSelectedStockType] = useState('all');
  const [activeCollapseKeys, setActiveCollapseKeys] = useState([]);

  // Stock type filter options
  const stockTypeOptions = useMemo(() => {
    const allOption = { label: 'Все', value: 'all' };
    const types = Object.entries(stockType).map(([key, value]) => ({
      label: value.label,
      value: key,
    }));
    return [allOption, ...types];
  }, []);

  // Sort options for client list
  const clientSortOptions = [
    {
      label: (
        <Space size="small">
          <SortAscendingOutlined />
          <span>А-Я</span>
        </Space>
      ),
      value: 'name',
    },
    {
      label: (
        <Space size="small">
          <AppstoreOutlined />
          <span>Кол-во позиций</span>
        </Space>
      ),
      value: 'count',
    },
  ];

  // Group products by clients
  const clientsWithProducts = useMemo(() => {
    if (!schedule?.products) return [];

    // Create a map to store clients and their products
    const clientMap = new Map();

    // Iterate through each product
    schedule.products.forEach((product) => {
      if (!product.clients || product.clients.length === 0) return;

      // For each client in the product
      product.clients.forEach((client) => {
        const clientKey = client.name || client.clientName;

        if (!clientMap.has(clientKey)) {
          clientMap.set(clientKey, {
            name: {
              label: clientKey,
              value: client.value || client.id,
            },
            stockType: client.stockType,
            categoryPrice: client.categoryPrice,
            products: [],
            totalCount: 0,
            totalPositions: 0,
            totalSum: 0,
          });
        }

        const clientData = clientMap.get(clientKey);
        const price = getActualPrice(client.prices, schedule?.date);
        const sum = price ? client.count * price : null;

        clientData.products.push({
          key: `${product.value}-${clientData.products.length}`,
          name: product.productName || product.label,
          count: client.count,
          value: product.value,
          price,
          sum,
        });
        clientData.totalCount += client.count;
        clientData.totalPositions += 1;
        if (sum) {
          clientData.totalSum += sum;
        }
      });
    });

    return Array.from(clientMap.values());
  }, [schedule]);

  // Sort clients
  const getSortedClients = (clients, sortMethod) => {
    const clientsCopy = [...clients];

    if (sortMethod === 'name') {
      return clientsCopy.sort((a, b) =>
        a.name.label.localeCompare(b.name.label),
      );
    } else if (sortMethod === 'count') {
      return clientsCopy.sort((a, b) => b.totalPositions - a.totalPositions);
    }

    return clientsCopy;
  };

  // Filter clients by stock type
  const filteredClients = useMemo(() => {
    if (selectedStockType === 'all') return clientsWithProducts;
    return clientsWithProducts.filter(
      (client) => client.stockType === selectedStockType,
    );
  }, [clientsWithProducts, selectedStockType]);

  const sortedClients = getSortedClients(filteredClients, sortBy);

  return (
    <Drawer
      title={
        <Flex justify="space-between">
          <Text strong style={{ fontSize: '16px' }}>
            Клиенты ({sortedClients.length})
          </Text>
          {schedule?.scheduleName && (
            <Tag color={scheduleType[schedule.scheduleName]?.color}>
              {scheduleType[schedule.scheduleName]?.label}
            </Tag>
          )}
        </Flex>
      }
      placement="bottom"
      onClose={onClose}
      open={open}
      height="80vh"
      styles={{
        body: {
          background: token.cardBgColor,
          padding: '16px',
        },
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Stock Type Filter */}
        <Segmented
          block
          size="small"
          value={selectedStockType}
          onChange={setSelectedStockType}
          options={stockTypeOptions}
        />

        {/* Sort Control */}
        <Segmented
          block
          size="small"
          value={sortBy}
          onChange={setSortBy}
          options={clientSortOptions}
        />

        {/* Clients List */}
        <List
          dataSource={sortedClients}
          renderItem={(client, index) => (
            <Card
              key={`${client.name.value}-${index}`}
              size="small"
              style={{
                marginBottom: '12px',
                background: token.colorBgContainer,
              }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                {/* Client Header */}
                <Flex
                  justify="space-between"
                  align="center"
                  wrap="wrap"
                  gap="small"
                >
                  <Title level={5} style={{ margin: 0 }}>
                    {client.name.label}
                  </Title>

                  <ModalModifyItems
                    data={{
                      name: client.name,
                      productList: client.products,
                      date: schedule?.date || getNextWednesday(),
                      categoryPrice: client?.categoryPrice,
                      docType: 'sale',
                    }}
                    typeData={FORM_TYPES.INVOICE}
                    actionType={FORM_ACTIONS.CREATE}
                    modalWidth="100%"
                    fromOrders={true}
                  />

                  <Space>
                    <Text type="secondary">{client.totalCount} шт</Text>
                    {client.totalSum > 0 && (
                      <Text strong>{client.totalSum.toFixed(2)} грн</Text>
                    )}
                  </Space>
                </Flex>

                {/* Products List */}
                <Collapse
                  ghost
                  bordered={false}
                  activeKey={activeCollapseKeys}
                  onChange={setActiveCollapseKeys}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{
                    background: token.cardBgAccent,
                  }}
                  items={[
                    {
                      key: `client-${index}`,
                      label: (
                        <Text strong>
                          Показать товары ({client.products.length})
                        </Text>
                      ),
                      children: (
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: '100%' }}
                        >
                          <Flex
                            vertical
                            gap="small"
                            style={{
                              border: `1px solid ${token.saleInvoiceAccent}`,
                              borderRadius: '8px',
                            }}
                          >
                            {client.products.map((product, productIndex) => (
                              <Flex
                                key={product.id || productIndex}
                                wrap="wrap"
                                justify="space-between"
                                align="center"
                                gap="small"
                                style={{
                                  padding: '8px 16px',
                                  borderBottom:
                                    productIndex < client.products.length - 1
                                      ? `0.5px solid ${token.saleInvoiceAccent}`
                                      : 'none',
                                }}
                              >
                                <Text
                                  style={{
                                    flex: '1 1 auto',
                                    minWidth: '150px',
                                  }}
                                >
                                  {product.name}
                                </Text>
                                <Space style={{ flexShrink: 0 }}>
                                  <Text strong>{product.count} шт</Text>
                                  {product.price && (
                                    <Text type="secondary">
                                      × {product.price} грн
                                    </Text>
                                  )}
                                  {product.sum && (
                                    <Text strong>
                                      = {product.sum.toFixed(2)} грн
                                    </Text>
                                  )}
                                </Space>
                              </Flex>
                            ))}
                          </Flex>
                          {/* Close button at the end */}
                          <Flex justify="center" style={{ marginTop: '8px' }}>
                            <CaretUpOutlined
                              style={{
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: token.colorTextSecondary,
                              }}
                              onClick={() =>
                                setActiveCollapseKeys((prev) =>
                                  prev.filter(
                                    (key) => key !== `client-${index}`,
                                  ),
                                )
                              }
                            />
                          </Flex>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Space>
            </Card>
          )}
        />
      </Space>
    </Drawer>
  );
};

SavedOrderByClients.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  schedule: PropTypes.shape({
    scheduleName: PropTypes.string,
    date: PropTypes.string,
    docNumber: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productName: PropTypes.string,
        label: PropTypes.string,
        totalCount: PropTypes.number,
        clients: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            clientName: PropTypes.string,
            count: PropTypes.number,
          }),
        ),
      }),
    ),
  }),
  tableData: PropTypes.array,
};

export default SavedOrderByClients;
