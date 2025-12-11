import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Space,
  Tag,
  List,
  Statistic,
  Flex,
  ConfigProvider,
  theme,
  Segmented,
} from 'antd';
import {
  CaretRightOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import { stockType } from '../../../../constants/productsDetail';
import ProductsByClient from '../drawer/ProductsByClient';

const { Text } = Typography;

/**
 * ClientsTab Component
 *
 * Displays list of clients with their orders
 * Features:
 * - Search functionality
 * - Client order summary cards
 * - Expandable/collapsible client cards
 * - Drawer for viewing ordered products
 */
const ClientsTab = ({ data, searchTerm, onSearch }) => {
  const { token } = theme.useToken();
  // Store expanded state per client - using client id as identifier
  const [expandedClients, setExpandedClients] = useState({});
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  // Filter states
  const [selectedStockType, setSelectedStockType] = useState('all');

  // Build stock type filter options
  const stockTypeOptions = useMemo(() => {
    const allOption = { label: 'Все', value: 'all' };
    const types = Object.entries(stockType).map(([key, value]) => ({
      label: value.label,
      value: key,
    }));
    return [allOption, ...types];
  }, []);

  // Filter data by selected stock type and category price
  const filteredData = useMemo(() => {
    return data.filter((client) => {
      const matchesStockType =
        selectedStockType === 'all' || client.stockType === selectedStockType;

      return matchesStockType;
    });
  }, [data, selectedStockType]);

  // Toggle expanded state for a client
  const toggleClientExpanded = (clientId) => {
    setExpandedClients((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };

  // Open drawer with selected client
  const handleOpenDrawer = (client) => {
    setSelectedClient(client);
    setDrawerOpen(true);
  };

  // Close drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedClient(null);
  };

  const renderClientCard = (client) => {
    const totalCount = client.listOrderedItems.reduce(
      (sum, item) => sum + item.count,
      0
    );

    // Check if client is expanded
    const isExpanded = expandedClients[client.id];

    // Render short card
    if (!isExpanded) {
      return (
        <div
          key={client.id}
          style={{
            background: token.saleInvoiceBg,
            border: `1px solid ${token.colorSecondaryBtn}`,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Flex vertical>
            <Flex justify="space-between" align="center">
              <Text strong style={{ fontSize: '16px' }}>
                {client.name}
              </Text>
              {client.stockType && (
                <Tag color={token.saleInvoiceAccent}>{`${
                  stockType[client.stockType]?.label
                }: ${client.stockNumber}`}</Tag>
              )}
              <DownOutlined
                onClick={() => toggleClientExpanded(client.id)}
                style={{ cursor: 'pointer', fontSize: '14px' }}
              />
            </Flex>
          </Flex>
        </div>
      );
    }

    // Render full expanded card
    return (
      <ConfigProvider
        key={client.id}
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
          title={
            <Flex justify="space-between" align="center">
              <Text strong style={{ fontSize: '16px' }}>
                {client.name}
              </Text>
              <Flex align="center" gap="small">
                {client.stockType && (
                  <Tag color={token.saleInvoiceAccent}>{`${
                    stockType[client.stockType]?.label
                  }: ${client.stockNumber}`}</Tag>
                )}
                <UpOutlined
                  onClick={() => toggleClientExpanded(client.id)}
                  style={{ cursor: 'pointer', fontSize: '14px' }}
                />
              </Flex>
            </Flex>
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

          {/* Products Card - Click to open drawer */}
          <Card
            size="small"
            hoverable
            onClick={() => handleOpenDrawer(client)}
            style={{
              background: token.saleInvoiceBg,
              marginTop: '8px',
              cursor: 'pointer',
            }}
          >
            <Flex justify="space-between" align="center">
              <Text strong>
                Показать товары ({client.listOrderedItems.length})
              </Text>
              <CaretRightOutlined />
            </Flex>
          </Card>
        </Card>
      </ConfigProvider>
    );
  };

  return (
    <div>
      <SearchInput
        value={searchTerm}
        onChange={onSearch}
        placeholder="Поиск по клиентам"
        style={{ marginBottom: '16px' }}
      />

      {/* Filter Controls */}
      <Space
        direction="vertical"
        size="small"
        style={{ width: '100%', marginBottom: '12px' }}
      >
        {/* Stock Type Filter */}
        <div>
          <Text
            type="secondary"
            style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}
          >
            Склад:
          </Text>
          <Segmented
            block
            value={selectedStockType}
            onChange={setSelectedStockType}
            options={stockTypeOptions}
          />
        </div>
      </Space>

      <List dataSource={filteredData} renderItem={renderClientCard} />

      {/* Products Drawer */}
      <ProductsByClient
        open={drawerOpen}
        onClose={handleCloseDrawer}
        client={selectedClient}
        products={selectedClient?.listOrderedItems || []}
      />
    </div>
  );
};

ClientsTab.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      categoryPrice: PropTypes.string,
      stockType: PropTypes.string,
      stockNumber: PropTypes.number,
      dateOfLastOrderChange: PropTypes.string,
      listOrderedItems: PropTypes.array.isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  
};

export default ClientsTab;
