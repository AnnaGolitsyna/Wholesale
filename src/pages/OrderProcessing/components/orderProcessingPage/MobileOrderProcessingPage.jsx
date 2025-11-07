import React, { useState } from 'react';
import { Tabs, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import ClientsTab from '../tabs/ClientsTab';
import ProductsTab from '../tabs/ProductsTab';
import SuppliersTab from '../tabs/SuppliersTab';
import EnhancedOrderEditDrawer from '../drawer/EnhancedOrderEditDrawer';
import { useOrderData } from '../../hooks/useOrderData';
import { useProductSummary } from '../../hooks/useProductSummary';

const { Title } = Typography;

/**
 * MobileOrderProcessingPage - Main Component
 *
 * Orchestrates the order processing interface with three main tabs:
 * 1. Clients - View and edit client orders
 * 2. Products - Aggregate view of product demand
 * 3. Suppliers - Manage supplier orders with demand analysis
 *
 * Features:
 * - Modular tab structure
 * - Centralized state management via custom hooks
 * - Reusable drawer for editing both client and supplier orders
 * - Search functionality across all tabs
 */
const MobileOrderProcessingPage = () => {
  // Custom hooks for data management
  const {
    orderData,
    handleSaveItems,
    searchTerm,
    handleSearch,
    clientsData,
    suppliersData,
  } = useOrderData();

  const productSummary = useProductSummary(orderData);

  // Drawer state management
  const [drawerState, setDrawerState] = useState({
    visible: false,
    client: null,
    mode: 'client',
  });

  // Open drawer with specific client/supplier and mode
  const handleOpenDrawer = (client, mode = 'client') => {
    setDrawerState({ visible: true, client, mode });
  };

  // Close drawer and reset state
  const handleCloseDrawer = () => {
    setDrawerState({ visible: false, client: null, mode: 'client' });
  };

  // Tab configuration
  const tabItems = [
    {
      key: '1',
      label: 'Клиенты',
      icon: <ShoppingCartOutlined />,
      children: (
        <ClientsTab
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
        <ProductsTab
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
        <SuppliersTab
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

export default MobileOrderProcessingPage;
