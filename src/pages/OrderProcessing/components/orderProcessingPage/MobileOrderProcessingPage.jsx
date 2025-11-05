import React, { useState, useMemo } from 'react';
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
} from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  UserOutlined,
  EditOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import OrderEditDrawer from '../drawer/OrderEditDrawer';

import { mockData } from './mockData';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const MobileOrderProcessingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderData, setOrderData] = useState(mockData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const { token } = theme.useToken();

  // Handle save of edited items
  const handleSaveItems = (clientId, updatedItems) => {
    const newOrderData = orderData.map((client) => {
      if (client.id === clientId) {
        return { ...client, listOrderedItems: updatedItems };
      }
      return client;
    });
    setOrderData(newOrderData);
    // Here you would typically call an API to save the data
  };

  const handleOpenDrawer = (client) => {
    setSelectedClient(client);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedClient(null);
  };

  // Calculate summary by products
  const productSummary = useMemo(() => {
    const summary = {};

    orderData.forEach((client) => {
      client.listOrderedItems.forEach((item) => {
        if (!summary[item.value]) {
          summary[item.value] = {
            key: item.value,
            productName: item.label,
            totalCount: 0,
            clients: [],
          };
        }
        summary[item.value].totalCount += item.count;
        summary[item.value].clients.push({
          name: client.name,
          count: item.count,
        });
      });
    });

    return Object.values(summary).sort((a, b) => b.totalCount - a.totalCount);
  }, [orderData]);

  // Filter clients based on search
  const filteredClients = useMemo(() => {
    if (!searchTerm) return orderData;
    const lowercased = searchTerm.toLowerCase();
    return orderData.filter(
      (client) =>
        client.name.toLowerCase().includes(lowercased) ||
        client.fullName.toLowerCase().includes(lowercased)
    );
  }, [searchTerm, orderData]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return productSummary;
    const lowercased = searchTerm.toLowerCase();
    return productSummary.filter((product) =>
      product.productName.toLowerCase().includes(lowercased)
    );
  }, [searchTerm, productSummary]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Tab 1: Orders by Clients
  const ClientsTab = () => (
    <div>
      <SearchInput
        onChange={handleSearch}
        placeholder="Поиск по клиентам"
        style={{ marginBottom: '16px' }}
      />
      <List
        dataSource={filteredClients}
        renderItem={(client) => {
          const totalCount = client.listOrderedItems.reduce(
            (sum, item) => sum + item.count,
            0
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
                    <Tag color={categoryPricesObj[client.categoryPrice]?.color}>
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
                <Flex>
                  <Text type="secondary">Дата последнего обновления: </Text>

                  <Text>{client.dateOfLastOrderChange}</Text>
                </Flex>

                <Collapse
                  ghostx
                  bordered={false}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{ background: token.saleInvoiceBg, marginTop: '4px' }}
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
                          dataSource={client.listOrderedItems}
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
  );

  // Tab 2: Summary by Products
  const ProductsTab = () => (
    <div>
      <SearchInput
        onChange={handleSearch}
        placeholder="Поиск по товарам"
        style={{ marginBottom: '16px' }}
      />
      <List
        dataSource={filteredProducts}
        renderItem={(product, index) => (
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
            >
              <Flex justify="space-around">
                <Statistic
                  title="Всего заказано"
                  value={product.totalCount}
                  valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                />
                <Statistic
                  title="Клиентов"
                  value={product.clients.length}
                  valueStyle={{ fontSize: '18px' }}
                />
              </Flex>
              <Collapse
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{
                  background: token.saleOrderAccent,
                  marginTop: '4px',
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
                        dataSource={product.clients}
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
        )}
      />
    </div>
  );

  // Tab 3: Reports (Empty)
  const ReportsTab = () => (
    <Card>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <FileTextOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
        <Text type="secondary" style={{ display: 'block', marginTop: '16px' }}>
          Эта вкладка пока не реализована
        </Text>
      </div>
    </Card>
  );

  const tabItems = [
    {
      key: '1',
      label: 'Клиенты',
      icon: <ShoppingCartOutlined />,
      children: <ClientsTab />,
    },
    {
      key: '2',
      label: 'Товары',
      icon: <AppstoreOutlined />,
      children: <ProductsTab />,
    },
    {
      key: '3',
      label: 'Отчеты',
      icon: <FileTextOutlined />,
      children: <ReportsTab />,
    },
  ];

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Title level={4} style={{ marginBottom: '16px' }}>
        Обработка заказов
      </Title>
      <Tabs
        defaultActiveKey="1"
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
