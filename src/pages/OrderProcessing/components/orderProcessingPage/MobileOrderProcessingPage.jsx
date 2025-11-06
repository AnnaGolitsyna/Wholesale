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
  Row,
  Col,
  Badge,
  Button,
  Flex,
  ConfigProvider,
  theme,
  Divider,
  Table,
} from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  UserOutlined,
  EditOutlined,
  CaretRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import { categoryStock } from '../../../../constants/categoryContractor';
import OrderEditDrawer from '../drawer/OrderEditDrawer';

import { mockData, mockOrderProductList } from './mockData';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const MobileOrderProcessingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderData, setOrderData] = useState(mockData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

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

  const handleOpenDrawer = useCallback((client) => {
    setSelectedClient(client);
    setDrawerVisible(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerVisible(false);
    setSelectedClient(null);
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

    // Sort by productName ascending (already sorted in productSummary)
    return filtered;
  }, [searchTerm, productSummary]);

  // Tab 1: Orders by Clients - Memoized to prevent recreation
  // Shows only clients (category !== 'supplier')
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
                      onClick={() => handleOpenDrawer(client)}
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
                    ghostx
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

  // Tab 2: Summary by Products with enhanced information - Memoized
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
          renderItem={(product, index) => {
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

                  {/* Dates Collapse - Show if there are any dates */}
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
                                // Find the date closest to today
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

  // Tab 3: Suppliers Tab (category === 'supplier') - Memoized
  // Uses the same layout as ClientsTab but for suppliers
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
                      headerBg: token.purchaseInvoiceBg,
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
                      onClick={() => handleOpenDrawer(client)}
                    >
                      Изменить
                    </Button>
                  }
                >
                  <Flex justify="space-between">
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
                    <Flex vertical justify="space-between">
                      <Text type="secondary">Обновлено: </Text>
                      <Text>{client.dateOfLastOrderChange}</Text>
                    </Flex>
                  </Flex>

                  <ConfigProvider
                    theme={{
                      components: {
                        Table: {
                          headerBg: token.purchaseInvoiceAccent,
                          headerColor: token.colorTextLightSolid,
                          rowHoverBg: token.purchaseInvoiceBg,
                        },
                      },
                    }}
                  >
                    <Table
                      dataSource={sortedItems.map((item) => {
                        // Find matching product from productSummary to get client demand
                        const productDemand = productSummary.find(
                          (p) => p.key === item.value
                        );
                        const clientTotalCount = productDemand?.totalCount || 0;
                        const reserve = item.count - clientTotalCount;

                        return {
                          key: item.value,
                          product: item.label,
                          order: item.count,
                          clients: clientTotalCount,
                          reserve: reserve,
                        };
                      })}
                      columns={[
                        {
                          title: 'Товар',
                          dataIndex: 'product',
                          key: 'product',
                          ellipsis: true,
                        },
                        {
                          title: 'Заказ',
                          dataIndex: 'order',
                          key: 'order',
                          width: 70,
                          align: 'center',
                          render: (value) => (
                            <Tag color={token.purchaseInvoiceAccent}>
                              {value}
                            </Tag>
                          ),
                        },
                        {
                          title: 'Клиенты',
                          dataIndex: 'clients',
                          key: 'clients',
                          width: 80,
                          align: 'center',
                          render: (value) => (
                            <Tag color={token.colorSuccess}>{value}</Tag>
                          ),
                        },
                        {
                          title: 'Резерв',
                          dataIndex: 'reserve',
                          key: 'reserve',
                          width: 70,
                          align: 'center',
                          render: (value) => {
                            const color =
                              value < 0
                                ? token.colorError
                                : value === 0
                                ? token.colorWarning
                                : token.colorSuccess;
                            return (
                              <Text
                                strong
                                style={{
                                  color: color,
                                  fontSize: '14px',
                                }}
                              >
                                {value > 0 ? `+${value}` : value}
                              </Text>
                            );
                          },
                        },
                      ]}
                      pagination={false}
                      size="small"
                    />
                  </ConfigProvider>

                  {/* <Collapse
                    ghost
                    bordered={false}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    style={{
                      background: token.purchaseInvoiceBg,
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
                          <ConfigProvider
                            theme={{
                              components: {
                                Table: {
                                  headerBg: token.purchaseInvoiceAccent,
                                  headerColor: token.colorTextLightSolid,
                                  rowHoverBg: token.purchaseInvoiceBg,
                                },
                              },
                            }}
                          >
                            <Table
                              dataSource={sortedItems.map((item) => {
                                // Find matching product from productSummary to get client demand
                                const productDemand = productSummary.find(
                                  (p) => p.key === item.value
                                );
                                const clientTotalCount =
                                  productDemand?.totalCount || 0;
                                const reserve = item.count - clientTotalCount;

                                return {
                                  key: item.value,
                                  product: item.label,
                                  order: item.count,
                                  clients: clientTotalCount,
                                  reserve: reserve,
                                };
                              })}
                              columns={[
                                {
                                  title: 'Товар',
                                  dataIndex: 'product',
                                  key: 'product',
                                  ellipsis: true,
                                },
                                {
                                  title: 'Заказ',
                                  dataIndex: 'order',
                                  key: 'order',
                                  width: 70,
                                  align: 'center',
                                  render: (value) => (
                                    <Tag color={token.purchaseInvoiceAccent}>
                                      {value}
                                    </Tag>
                                  ),
                                },
                                {
                                  title: 'Клиенты',
                                  dataIndex: 'clients',
                                  key: 'clients',
                                  width: 80,
                                  align: 'center',
                                  render: (value) => (
                                    <Tag color={token.colorSuccess}>
                                      {value}
                                    </Tag>
                                  ),
                                },
                                {
                                  title: 'Резерв',
                                  dataIndex: 'reserve',
                                  key: 'reserve',
                                  width: 70,
                                  align: 'center',
                                  render: (value) => {
                                    const color =
                                      value < 0
                                        ? token.colorError
                                        : value === 0
                                        ? token.colorWarning
                                        : token.colorSuccess;
                                    return (
                                      <Text
                                        strong
                                        style={{
                                          color: color,
                                          fontSize: '14px',
                                        }}
                                      >
                                        {value > 0 ? `+${value}` : value}
                                      </Text>
                                    );
                                  },
                                },
                              ]}
                              pagination={false}
                              size="small"
                            />
                          </ConfigProvider>
                        ),
                      },
                    ]}
                  /> */}
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

      <OrderEditDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        client={selectedClient}
        onSave={handleSaveItems}
      />
    </div>
  );
};

MobileOrderProcessingPage.propTypes = {};

export default MobileOrderProcessingPage;
