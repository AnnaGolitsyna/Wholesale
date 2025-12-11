import React from 'react';
import { Tabs, Typography, Flex } from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import ClientsTab from '../tabs/ClientsTab';
import ProductsTab from '../tabs/ProductsTab';
import OrdersTab from '../tabs/OrdersTab';
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
  const { orderData, searchTerm, handleSearch, clientsData } = useOrderData();

  const productSummary = useProductSummary(orderData);

  // Tab configuration
  const tabItems = [
    {
      key: '1',
      label: 'Раскладки',
      icon: <FileTextOutlined />,
      children: <OrdersTab data={productSummary} />,
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
      label: 'Клиенты',
      icon: <ShoppingCartOutlined />,
      children: (
        <ClientsTab
          data={clientsData}
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
      ),
    },
  ];

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Flex justify="center">
        <Title level={4} style={{ margin: 0 }}>
          Обработка заказов
        </Title>
      </Flex>

      <Tabs
        defaultActiveKey="1"
        type="card"
        items={tabItems}
        tabBarStyle={{ marginBottom: '16px' }}
      />
    </div>
  );
};

export default MobileOrderProcessingPage;
