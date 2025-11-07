import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Card,
  Typography,
  Space,
  Tag,
  List,
  Collapse,
  Statistic,
  Badge,
  Button,
  Flex,
  ConfigProvider,
  theme,
  Divider,
} from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  EditOutlined,
  CaretRightOutlined,
  CalendarOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import { categoryStock } from '../../../../constants/categoryContractor';
import EnhancedOrderEditDrawer from '../drawer/OrderEditDrawer';

import { mockData, mockOrderProductList } from './mockData';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const MobileOrderProcessingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderData, setOrderData] = useState(mockData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [drawerMode, setDrawerMode] = useState('client'); // 'client' or 'supplier'

  const { token } = theme.useToken();

  // Memoize handleSearch to prevent recreation on every render
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // Handle save of edited items
  const handleSaveItems = useCallback((clientId, updatedItems) => {
    setOrderData((prevData) =>
      prevData.map((client) =>
        client.id === clientId
          ? { ...client, listOrderedItems: updatedItems }
          : client
      )
    );
  }, []);

  const handleOpenDrawer = useCallback((client, mode = 'client') => {
    setSelectedClient(client);
    setDrawerMode(mode);
    setDrawerVisible(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
    setSelectedClient(null);
    setDrawerMode('client');
  }, []);

  // Calculate summary by products with additional info from mockOrderProductList
  // Only for clients (category !== 'supplier')
  const productSummary = useMemo(() => {
    const summary = {};

    // Filter to only include clients, not suppliers
    const clientsOnly = orderData.filter(
      (client) => client.category !== 'supplier'
    );

    clientsOnly.forEach((client) => {
      client.listOrderedItems.forEach((item) => {
        if (!summary[item.value]) {
          // Find matching product info from mockOrderProductList
          const productInfo = mockOrderProductList.find(
            (p) => p.value === item.value
          );

          summary[item.value] = {
            key: item.value,
            productName: item.label,
            totalCount: 0,
            clients: [],
            schedule: productInfo?.scedule || null,
            weekly: productInfo?.weekly || false,
            lastDate:
              productInfo?.datesList?.[productInfo.datesList.length - 1] ||
              null,
          };
        }
        summary[item.value].totalCount += item.count;
        summary[item.value].clients.push({
          name: client.name,
          count: item.count,
        });
      });
    });

    // Sort by productName ascending
    return Object.values(summary).sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
  }, [orderData]);

  // Filter clients based on search - search only in name, not fullName
  const filteredClients = useMemo(() => {
    const filtered = !searchTerm
      ? orderData
      : orderData.filter((client) => {
          const lowercased = searchTerm.toLowerCase();
          return client.name.toLowerCase().includes(lowercased);
        });

    // Sort by name ascending
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchTerm, orderData]);

  // Filter clients for ClientsTab and ProductsTab (category !== 'supplier')
  const clientsData = useMemo(() => {
    return filteredClients.filter((client) => client.category !== 'supplier');
  }, [filteredClients]);

  // Filter suppliers for ReportsTab (category === 'supplier')
  const suppliersData = useMemo(() => {
    return filteredClients.filter((client) => client.category === 'supplier');
  }, [filteredClients]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    const filtered = !searchTerm
      ? productSummary
      : productSummary.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return filtered;
  }, [searchTerm, productSummary]);

  // Tab 1: Orders by Clients - Memoized to prevent recreation
  const ClientsTab = useMemo(
    () => (
      <div>
        <SearchInput
          onChange={handleSearch}
          placeholder="Поиск по клиентам"
          style={{ marginBottom: '16px' }}
        />

        <List
          dataSource={clientsData}
          renderItem={(client) => {
            const totalCount = client.listOrderedItems.reduce(
              (sum, item) => sum + item.count,
              0
            );

            // Sort items by label ascending
            const sortedItems = [...client.listOrderedItems].sort((a, b) =>
              a.label.localeCompare(b.label)
            );

            return (
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      headerBg: token.saleInvoiceBg,
                      colorBorderSecondary: token.colorSecondaryBtn,
                      boxShadowCard: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    },
                  },
                }}
              >
                <Card
                  style={{ marginBottom: '12px', borderRadius: '8px' }}
                  hoverable
                  title={client.name}
                  extra={
                    <Button
                      type="primary"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleOpenDrawer(client, 'client')}
                    >
                      Изменить
                    </Button>
                  }
                >
                  <Flex justify="space-between">
                    <Space>
                      <Tag
                        color={categoryPricesObj[client.categoryPrice]?.color}
                      >
                        {categoryPricesObj[client.categoryPrice]?.label ||
                          client.categoryPrice}
                      </Tag>
                    </Space>
                    <Statistic
                      title="Позиций"
                      value={client.listOrderedItems.length}
                      valueStyle={{ fontSize: '18px' }}
                    />
                    <Statistic
                      title="Всего шт."
                      value={totalCount}
                      valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                    />
                  </Flex>
                  <Flex justify="space-between">
                    {client.stockType && (
                      <Tag color={token.saleInvoiceAccent}>{`${
                        categoryStock[client.stockType]?.label
                      }: ${client.stockNumber}`}</Tag>
                    )}
                    <Text type="secondary">Обновлено: </Text>
                    <Text>{client.dateOfLastOrderChange}</Text>
                  </Flex>

                  <Collapse
                    ghost
                    bordered={false}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    style={{
                      background: token.saleInvoiceBg,
                      marginTop: '4px',
                    }}
                    items={[
                      {
                        key: '1',
                        label: (
                          <Text type="secondary">
                            Показать товары ({client.listOrderedItems.length})
                          </Text>
                        ),
                        children: (
                          <List
                            dataSource={sortedItems}
                            renderItem={(item) => (
                              <List.Item
                                style={{
                                  padding: '8px 0',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Text>{item.label}</Text>
                                <Tag color={token.saleInvoiceAccent}>
                                  {item.count}
                                </Tag>
                              </List.Item>
                            )}
                          />
                        ),
                      },
                    ]}
                  />
                </Card>
              </ConfigProvider>
            );
          }}
        />
      </div>
    ),
    [clientsData, handleSearch, handleOpenDrawer, token]
  );

  // Tab 2: Summary by Products with enhanced information
  const ProductsTab = useMemo(
    () => (
      <div>
        <SearchInput
          onChange={handleSearch}
          placeholder="Поиск по товарам"
          style={{ marginBottom: '16px' }}
        />
        <List
          dataSource={filteredProducts}
          renderItem={(product) => {
            // Get all dates for this product, sort descending, then take first 6
            const productInfo = mockOrderProductList.find(
              (p) => p.value === product.key
            );
            const allDates = (productInfo?.datesList || [])
              .sort((a, b) => new Date(b) - new Date(a))
              .slice(0, 6);

            // Sort clients by name ascending
            const sortedClients = [...product.clients].sort((a, b) =>
              a.name.localeCompare(b.name)
            );

            return (
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      headerBg: token.saleOrderAccent,
                      colorBorderSecondary: token.colorSecondaryBtn,
                      boxShadowCard: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    },
                  },
                }}
              >
                <Card
                  title={product.productName}
                  style={{ marginBottom: '12px', borderRadius: '8px' }}
                  hoverable
                  extra={
                    product.weekly && (
                      <Badge
                        status="processing"
                        text={<Text type="secondary">Еженедельно</Text>}
                      />
                    )
                  }
                >
                  <Flex justify="space-around">
                    <Space>
                      {product.schedule && (
                        <Tag
                          icon={<CalendarOutlined />}
                          color={token.clolrNotificationBg}
                        >
                          {product.schedule.label}
                        </Tag>
                      )}
                    </Space>
                    <Statistic
                      title="Клиентов"
                      value={product.clients.length}
                      valueStyle={{ fontSize: '18px' }}
                    />
                    <Divider type="vertical" />
                    <Statistic
                      title="Штук"
                      value={product.totalCount}
                      valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                    />
                  </Flex>

                  {/* Dates Collapse */}
                  {allDates.length > 0 && (
                    <Collapse
                      ghost
                      bordered={false}
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      style={{
                        background: token.saleOrderAccent,
                        marginTop: '8px',
                      }}
                      items={[
                        {
                          key: 'dates',
                          label: (
                            <Space>
                              <CalendarOutlined />
                              <Text type="secondary">
                                Все даты ({allDates.length})
                              </Text>
                            </Space>
                          ),
                          children: (
                            <Space
                              size={[8, 8]}
                              wrap
                              style={{ padding: '8px 0' }}
                            >
                              {(() => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);

                                let closestDate = allDates[0];
                                let minDiff = Math.abs(
                                  new Date(allDates[0]) - today
                                );

                                allDates.forEach((date) => {
                                  const diff = Math.abs(new Date(date) - today);
                                  if (diff < minDiff) {
                                    minDiff = diff;
                                    closestDate = date;
                                  }
                                });

                                return allDates.map((date, idx) => (
                                  <Tag
                                    key={idx}
                                    color={
                                      date === closestDate ? 'green' : 'default'
                                    }
                                  >
                                    {date}
                                  </Tag>
                                ));
                              })()}
                            </Space>
                          ),
                        },
                      ]}
                    />
                  )}

                  {/* Clients Collapse */}
                  <Collapse
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    style={{
                      background: token.saleOrderAccent,
                      marginTop: '12px',
                      borderBlockColor: token.saleOrderAccent,
                    }}
                    items={[
                      {
                        key: '1',
                        label: (
                          <Text type="secondary">
                            Показать клиентов ({product.clients.length})
                          </Text>
                        ),
                        children: (
                          <List
                            dataSource={sortedClients}
                            renderItem={(client) => (
                              <List.Item
                                style={{
                                  padding: '8px 0',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Text>{client.name}</Text>
                                <Tag color={token.saleOrderAccent}>
                                  {client.count}
                                </Tag>
                              </List.Item>
                            )}
                          />
                        ),
                      },
                    ]}
                  />
                </Card>
              </ConfigProvider>
            );
          }}
        />
      </div>
    ),
    [filteredProducts, handleSearch, token]
  );

  // Tab 3: Suppliers Tab - Simplified with drawer for details
  const ReportsTab = useMemo(
    () => (
      <div>
        <SearchInput
          onChange={handleSearch}
          placeholder="Поиск по поставщикам"
          style={{ marginBottom: '16px' }}
        />

        <List
          dataSource={suppliersData}
          renderItem={(supplier) => {
            // Calculate total order and client demand
            const totalOrder = supplier.listOrderedItems.reduce(
              (sum, item) => sum + item.count,
              0
            );

            // Calculate total client demand
            const totalClientDemand = supplier.listOrderedItems.reduce(
              (sum, item) => {
                const productDemand = productSummary.find(
                  (p) => p.key === item.value
                );
                return sum + (productDemand?.totalCount || 0);
              },
              0
            );

            // Calculate total reserve
            const totalReserve = totalOrder - totalClientDemand;

            // Count shortage items
            const shortageCount = supplier.listOrderedItems.filter((item) => {
              const productDemand = productSummary.find(
                (p) => p.key === item.value
              );
              const clientTotal = productDemand?.totalCount || 0;
              return item.count < clientTotal;
            }).length;

            return (
              <ConfigProvider
                theme={{
                  components: {
                    Card: {
                      headerBg: token.purchaseInvoiceBg,
                      colorBorderSecondary: token.colorSecondaryBtn,
                      boxShadowCard: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    },
                  },
                }}
              >
                <Card
                  style={{
                    marginBottom: '12px',
                    borderRadius: '8px',
                    backgroundColor:
                      shortageCount > 0 ? `${token.colorErrorBg}` : undefined,
                  }}
                  hoverable
                  title={
                    <Flex justify="space-between" align="center">
                      <Text strong>{supplier.name}</Text>
                      {shortageCount > 0 && (
                        <Badge
                          count={
                            <WarningOutlined
                              style={{ color: token.colorError }}
                            />
                          }
                        />
                      )}
                    </Flex>
                  }
                  extra={
                    <Button
                      type="primary"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleOpenDrawer(supplier, 'supplier')}
                    >
                      Детали
                    </Button>
                  }
                >
                  <Flex vertical gap={12}>
                    {/* Summary statistics */}
                    <Flex justify="space-around">
                      <Statistic
                        title="Позиций"
                        value={supplier.listOrderedItems.length}
                        valueStyle={{ fontSize: '16px' }}
                      />
                      <Statistic
                        title="Заказ"
                        value={totalOrder}
                        valueStyle={{ fontSize: '16px' }}
                        suffix={
                          <Tag
                            color={token.purchaseInvoiceAccent}
                            style={{ marginLeft: 4 }}
                          >
                            шт
                          </Tag>
                        }
                      />
                      <Statistic
                        title="Клиенты"
                        value={totalClientDemand}
                        valueStyle={{ fontSize: '16px' }}
                        suffix={
                          <Tag
                            color={token.colorSuccess}
                            style={{ marginLeft: 4 }}
                          >
                            шт
                          </Tag>
                        }
                      />
                      <Statistic
                        title="Резерв"
                        value={totalReserve}
                        valueStyle={{
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color:
                            totalReserve < 0
                              ? token.colorError
                              : totalReserve === 0
                              ? token.colorWarning
                              : token.colorSuccess,
                        }}
                        prefix={totalReserve > 0 ? '+' : ''}
                        suffix={<Text type="secondary">шт</Text>}
                      />
                    </Flex>

                    {/* Warning message if shortage exists */}
                    {shortageCount > 0 && (
                      <Flex
                        justify="center"
                        style={{
                          backgroundColor: token.colorErrorBg,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: `1px solid ${token.colorErrorBorder}`,
                        }}
                      >
                        <Space size="small">
                          <WarningOutlined
                            style={{ color: token.colorError }}
                          />
                          <Text type="danger">
                            Нехватка по {shortageCount} позициям
                          </Text>
                        </Space>
                      </Flex>
                    )}

                    {/* Date */}
                    <Flex justify="space-between">
                      <Text type="secondary">Обновлено:</Text>
                      <Text>{supplier.dateOfLastOrderChange}</Text>
                    </Flex>
                  </Flex>
                </Card>
              </ConfigProvider>
            );
          }}
        />
      </div>
    ),
    [suppliersData, handleSearch, handleOpenDrawer, token, productSummary]
  );

  const tabItems = useMemo(
    () => [
      {
        key: '1',
        label: 'Клиенты',
        icon: <ShoppingCartOutlined />,
        children: ClientsTab,
      },
      {
        key: '2',
        label: 'Товары',
        icon: <AppstoreOutlined />,
        children: ProductsTab,
      },
      {
        key: '3',
        label: 'Поставщики',
        icon: <FileTextOutlined />,
        children: ReportsTab,
      },
    ],
    [ClientsTab, ProductsTab, ReportsTab]
  );

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>
        Обработка заказов
      </Title>

      <Tabs
        defaultActiveKey="1"
        type="card"
        items={tabItems}
        tabBarStyle={{ marginBottom: '16px' }}
      />

      <EnhancedOrderEditDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        client={selectedClient}
        onSave={handleSaveItems}
        mode={drawerMode}
        productSummary={productSummary}
      />
    </div>
  );
};

MobileOrderProcessingPage.propTypes = {};

export default MobileOrderProcessingPage;
