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
} from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import OrderEditDrawer from '../drawer/OrderEditDrawer';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const mockData = [
  {
    name: 'Дибенко',
    fullName: 'ФОП Дибенко',
    category: 'buyer',
    categoryPrice: 'bulk',
    taxNumber: null,
    contractNumber: null,
    date: null,
    email: null,
    phone: null,
    adress: null,
    active: true,
    relatedCompanies: [],
    listOrderedItems: [
      { value: 1, label: 'Большие цифры', count: 8 },
      { value: 2, label: 'Большие буквы', count: 12 },
      { value: 3, label: 'Веселый дачник', count: 15 },
      { value: 4, label: 'Гигант сканворд', count: 20 },
      { value: 5, label: 'Дарья', count: 25 },
      { value: 6, label: 'Дарья Сканворд', count: 18 },
      { value: 7, label: 'Дача и дачники', count: 10 },
      { value: 8, label: 'Дачные советы', count: 14 },
      { value: 9, label: 'Дачный сканворд', count: 22 },
      { value: 10, label: 'Ежик', count: 30 },
      { value: 11, label: 'Загадки истории', count: 16 },
      { value: 12, label: 'Ключворд', count: 19 },
      { value: 13, label: 'Крупный шрифт', count: 11 },
      { value: 14, label: 'Мир судоку', count: 24 },
      { value: 15, label: 'Страна сканвордов', count: 17 },
      { value: 16, label: 'Тайны и загадки', count: 13 },
      { value: 17, label: 'Тайны ХХ века', count: 21 },
      { value: 18, label: 'Тещин компот', count: 9 },
      { value: 19, label: 'Тещин компот.Судоку', count: 26 },
      { value: 20, label: 'Титан-кроссворд', count: 15 },
      { value: 21, label: 'Филворд Дарья', count: 12 },
      { value: 22, label: '1000 Секретов', count: 10 },
      { value: 23, label: 'ЗОЖ', count: 5 },
      { value: 24, label: 'Бабушкин пирог', count: 15 },
      { value: 25, label: 'Кулинарный альбом', count: 20 },
    ],
    id: '10',
  },
  {
    name: 'Автовокзал',
    fullName: 'ТТ Автовокзал',
    category: 'buyer',
    categoryPrice: 'retail',
    taxNumber: null,
    contractNumber: null,
    date: null,
    email: null,
    phone: null,
    adress: null,
    active: true,
    relatedCompanies: [],
    listOrderedItems: [
      { value: 1, label: 'Большие цифры', count: 5 },
      { value: 2, label: 'Большие буквы', count: 10 },
      { value: 3, label: 'Веселый дачник', count: 6 },
      { value: 4, label: 'Гигант сканворд', count: 2 },
      { value: 5, label: 'Дарья', count: 7 },
      { value: 6, label: 'Дарья Сканворд', count: 8 },
      { value: 7, label: 'Дача и дачники', count: 1 },
      { value: 8, label: 'Дачные советы', count: 4 },
      { value: 9, label: 'Дачный сканворд', count: 2 },
      { value: 10, label: 'Ежик', count: 30 },
      { value: 11, label: 'Загадки истории', count: 6 },
      { value: 12, label: 'Ключворд', count: 9 },
      { value: 13, label: 'Крупный шрифт', count: 11 },
      { value: 14, label: 'Мир судоку', count: 4 },
      { value: 15, label: 'Страна сканвордов', count: 1 },
      { value: 16, label: 'Тайны и загадки', count: 3 },
      { value: 17, label: 'Тайны ХХ века', count: 21 },
      { value: 18, label: 'Тещин компот', count: 9 },
      { value: 19, label: 'Тещин компот.Судоку', count: 6 },
      { value: 20, label: 'Титан-кроссворд', count: 5 },
      { value: 21, label: 'Филворд Дарья', count: 2 },
      { value: 22, label: '1000 Секретов', count: 10 },
      { value: 23, label: 'ЗОЖ', count: 5 },
      { value: 24, label: 'Бабушкин пирог', count: 5 },
    ],
    id: '11',
  },
];

const MobileOrderProcessingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderData, setOrderData] = useState(mockData);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

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
            <Card
              style={{ marginBottom: '12px', borderRadius: '8px' }}
              hoverable
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
              <Space
                direction="vertical"
                style={{ width: '100%' }}
                size="small"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Space>
                    <UserOutlined style={{ fontSize: '18px' }} />
                    <div>
                      <Text strong style={{ display: 'block' }}>
                        {client.name}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {client.fullName}
                      </Text>
                    </div>
                  </Space>
                  <Tag color={categoryPricesObj[client.categoryPrice]?.color}>
                    {categoryPricesObj[client.categoryPrice]?.label ||
                      client.categoryPrice}
                  </Tag>
                </div>

                <Row gutter={16} style={{ marginTop: '8px' }}>
                  <Col span={12}>
                    <Statistic
                      title="Позиций"
                      value={client.listOrderedItems.length}
                      valueStyle={{ fontSize: '18px' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Всего шт."
                      value={totalCount}
                      valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                    />
                  </Col>
                </Row>

                <Collapse
                  ghost
                  style={{ marginTop: '8px' }}
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
                              <Badge
                                count={item.count}
                                showZero
                                style={{ backgroundColor: '#52c41a' }}
                              />
                            </List.Item>
                          )}
                        />
                      ),
                    },
                  ]}
                />
              </Space>
            </Card>
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
          <Card style={{ marginBottom: '12px', borderRadius: '8px' }} hoverable>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <Badge
                    count={index + 1}
                    style={{
                      backgroundColor: '#1890ff',
                      marginRight: '8px',
                    }}
                  />
                  <Text strong>{product.productName}</Text>
                </div>
              </div>

              <Row gutter={16} style={{ marginTop: '8px' }}>
                <Col span={12}>
                  <Statistic
                    title="Всего заказано"
                    value={product.totalCount}
                    valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Клиентов"
                    value={product.clients.length}
                    valueStyle={{ fontSize: '18px' }}
                  />
                </Col>
              </Row>

              <Collapse
                ghost
                style={{ marginTop: '8px' }}
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
                            <Badge
                              count={client.count}
                              showZero
                              style={{ backgroundColor: '#52c41a' }}
                            />
                          </List.Item>
                        )}
                      />
                    ),
                  },
                ]}
              />
            </Space>
          </Card>
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
