import React, { useState } from 'react';
import { Flex, Tabs, Typography, Col, Statistic, Row, Spin, Alert } from 'antd';
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
import { useUpdateContractorMutation } from '../../../Contractors';
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
    isLoading,
    isError,
    error,
  } = useOrderData();

  // Get mutation for saving contractor updates to Firebase
  const [updateContractor, { isLoading: isSaving }] =
    useUpdateContractorMutation();

  // Calculate product summary from contractors data
  const productSummary = useProductSummary(contractors);

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

  // Handle saving items to Firebase
  const handleSaveItems = async (clientId, updatedItems) => {
    const contractor = contractors.find((c) => c.id === clientId);

    if (!contractor) {
      console.error('Contractor not found:', clientId);
      return;
    }

    try {
      await updateContractor({
        key: clientId,
        ...contractor,
        listOrderedItems: updatedItems,
      });

      console.log('✅ Orders saved successfully for:', contractor.name);
      // Optional: Add success notification here
      // message.success('Orders saved successfully!');
    } catch (err) {
      console.error('❌ Error saving orders:', err);
      // Optional: Add error notification here
      // message.error('Failed to save orders');
    }
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
