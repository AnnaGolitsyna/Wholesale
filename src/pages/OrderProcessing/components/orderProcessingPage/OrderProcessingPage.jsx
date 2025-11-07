import React, { useState } from 'react';
import { Flex, Tabs, Typography, Col, Statistic, Row } from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import ClientsTable from '../table/ClientsTable';
import ProductsTable from '../table/ProductsTable';
import SuppliersTable from '../table/SuppliersTable';
import EnhancedOrderEditDrawer from '../drawer/EnhancedOrderEditDrawer';
import { useOrderData } from '../../hooks/useOrderData';
import { useProductSummary } from '../../hooks/useProductSummary';
import { ReactComponent as OrderKeepingMan } from '../../../../styles/images/OrderKeepingMan.svg';

const { Title } = Typography;

/**
 * OrderProcessingPage - Desktop Version
 *
 * Desktop-optimized order processing interface with nested tables
 * Features:
 * - Nested tables for better data visualization
 * - Expandable rows to show detailed items
 * - Drawer for editing (both clients and suppliers)
 * - Search functionality
 */
const OrderProcessingPage = () => {
  const {
    orderData,
    handleSaveItems,
    searchTerm,
    handleSearch,
    clientsData,
    suppliersData,
  } = useOrderData();

  const productSummary = useProductSummary(orderData);

  const [drawerState, setDrawerState] = useState({
    visible: false,
    client: null,
    mode: 'client',
  });

  const handleOpenDrawer = (client, mode = 'client') => {
    setDrawerState({ visible: true, client, mode });
  };

  const handleCloseDrawer = () => {
    setDrawerState({ visible: false, client: null, mode: 'client' });
  };

  const tabItems = [
    {
      key: '1',
      label: 'Клиенты',
      icon: <ShoppingCartOutlined />,
      children: (
        <ClientsTable
          data={clientsData}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onOpenDrawer={handleOpenDrawer}
        />
      ),
    },
    {
      key: '2',
      label: 'Товары',
      icon: <AppstoreOutlined />,
      children: (
        <ProductsTable
          data={productSummary}
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
      ),
    },
    {
      key: '3',
      label: 'Поставщики',
      icon: <FileTextOutlined />,
      children: (
        <SuppliersTable
          data={suppliersData}
          productSummary={productSummary}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onOpenDrawer={handleOpenDrawer}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '5px' }}>
      <Flex
        justify="space-between"
        align="center"
        style={{
          background: 'rgba(102, 126, 234, 0.08)',
          borderRadius: '12px',
          padding: '0px 20px',
          marginBottom: '24px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
        }}
      >
        <Flex vertical gap={16} flex={1}>
          <Title level={2} style={{ margin: 0 }}>
            Обработка заказов
          </Title>

          {/* Quick Stats */}
          <Row gutter={24}>
            <Col>
              <Statistic
                title="Клиенты"
                value={clientsData.length}
                prefix={<ShoppingCartOutlined />}
              />
            </Col>
            <Col>
              <Statistic
                title="Товары"
                value={productSummary.length}
                prefix={<AppstoreOutlined />}
              />
            </Col>
            <Col>
              <Statistic
                title="Поставщики"
                value={suppliersData.length}
                prefix={<FileTextOutlined />}
              />
            </Col>
          </Row>
        </Flex>

        <OrderKeepingMan
          style={{
            width: 150,
            height: 150,
            marginLeft: '32px',
          }}
        />
      </Flex>

      <Tabs
        defaultActiveKey="1"
        type="card"
        items={tabItems}
        tabBarStyle={{ marginBottom: '20px' }}
      />

      <EnhancedOrderEditDrawer
        visible={drawerState.visible}
        onClose={handleCloseDrawer}
        client={drawerState.client}
        onSave={handleSaveItems}
        mode={drawerState.mode}
        productSummary={productSummary}
      />
    </div>
  );
};

export default OrderProcessingPage;
