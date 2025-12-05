import React, { useState } from 'react';
import { Flex, Tabs, Typography, Spin, Alert, Divider } from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import ClientsTable from '../table/ClientsTable';
import ProductsTable from '../table/ProductsTable';
import SuppliersTable from '../table/SuppliersTable';
import EnhancedOrderEditDrawer from '../drawer/EnhancedOrderEditDrawer';
import { useOrderData } from '../../hooks/useOrderData';
import { useProductSummary } from '../../hooks/useProductSummary';
import { ReactComponent as OrderKeepingMan } from '../../../../styles/images/OrderKeepingMan.svg';
import TransfersDashboard from '../transfersDashboard/TransfersDashboard';

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
 * - Firebase integration for real-time data
 */
const OrderProcessingPage = () => {
  // Get data from Firebase via custom hook
  const {
    searchTerm,
    setSearchTerm,
    contractors,
    clientsData,
    suppliersData,
    handleSaveItems,
    isLoading,
    isError,
    error,
  } = useOrderData();

  // Calculate product summary from contractors data
  const productSummary = useProductSummary(contractors);

  
  // Track active tab
  const [activeTabKey, setActiveTabKey] = useState('1');

  // Drawer state for editing
  const [drawerState, setDrawerState] = useState({
    visible: false,
    client: null,
    mode: 'client',
  });

  // Handle search input changes
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Handle opening the edit drawer
  const handleOpenDrawer = (client, mode = 'client') => {
    setDrawerState({ visible: true, client, mode });
  };

  // Handle closing the edit drawer
  const handleCloseDrawer = () => {
    setDrawerState({ visible: false, client: null, mode: 'client' });
  };

  // Tab items configuration
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
      icon: <AuditOutlined />,
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
    {
      key: '4',
      label: 'Раскладки',
      icon: <FileTextOutlined />,
      children: (
        <TransfersDashboard
          data={productSummary}
          isActive={activeTabKey === '4'}
        />
      ),
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Spin size="large" tip="Загрузка данных из Firebase..." />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Ошибка загрузки данных"
          description={
            error?.message || 'Не удалось загрузить данные из Firebase'
          }
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '0' }}>
      {/* Compact Header with Statistics */}
      <Flex
        justify="space-around"
        align="center"
        style={{
          marginBottom: '16px',
          padding: '12px 0',
          width: '70%',
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Обработка заказов
        </Title>

        {/* Compact Statistics with Labels */}
        <Flex
          gap={16}
          style={{
            background: 'rgba(102, 126, 234, 0.08)',
            borderRadius: '8px',
            padding: '8px 20px',
            border: '1px solid rgba(102, 126, 234, 0.2)',
          }}
        >
          <Flex vertical align="center" gap={2}>
            <Flex align="center" gap={4}>
              <ShoppingCartOutlined
                style={{ fontSize: '16px', color: '#667eea' }}
              />
              <span style={{ fontSize: '18px', fontWeight: 600 }}>
                {clientsData.length}
              </span>
            </Flex>
            <span style={{ fontSize: '12px', color: '#666' }}>Клиенты</span>
          </Flex>

          <Divider type="vertical" style={{ margin: 0, height: 'auto' }} />

          <Flex vertical align="center" gap={2}>
            <Flex align="center" gap={4}>
              <AppstoreOutlined
                style={{ fontSize: '16px', color: '#667eea' }}
              />
              <span style={{ fontSize: '18px', fontWeight: 600 }}>
                {productSummary.length}
              </span>
            </Flex>
            <span style={{ fontSize: '12px', color: '#666' }}>Товары</span>
          </Flex>

          <Divider type="vertical" style={{ margin: 0, height: 'auto' }} />

          <Flex vertical align="center" gap={2}>
            <Flex align="center" gap={4}>
              <AuditOutlined style={{ fontSize: '16px', color: '#667eea' }} />
              <span style={{ fontSize: '18px', fontWeight: 600 }}>
                {suppliersData.length}
              </span>
            </Flex>
            <span style={{ fontSize: '12px', color: '#666' }}>Поставщики</span>
          </Flex>
        </Flex>
      </Flex>

      {/* Tabs with Icon on the Right */}
      <div style={{ position: 'relative' }}>
        <Tabs
          activeKey={activeTabKey}
          onChange={setActiveTabKey}
          type="card"
          items={tabItems}
          tabBarStyle={{ marginBottom: '12px' }}
        />

        {/* Illustration positioned in the empty right space */}
        <OrderKeepingMan
          style={{
            width: 140,
            height: 140,
            position: 'absolute',
            right: 0,
            top: -110,
            pointerEvents: 'none', // Make it non-interactive
          }}
        />
      </div>

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
