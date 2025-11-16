import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Space,
  Tag,
  List,
  Collapse,
  Statistic,
  Flex,
  ConfigProvider,
  theme,
  Segmented,
  Row,
  Col,
} from 'antd';
import {
  CaretRightOutlined,
  CalendarOutlined,
  ShopOutlined,
  SortAscendingOutlined,
  ShopFilled,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import {
  scheduleType,
  refundsType,
  stockType,
} from '../../constants/productsDetail';

const { Text } = Typography;

/**
 * ProductsTab Component - Mobile Version
 *
 * Displays all product information from ProductsTable in mobile-friendly card format
 * Features:
 * - All 9 main product fields
 * - All 5 client detail fields
 * - Mobile-optimized layout
 * - Touch-friendly interactions
 * - Complete data from desktop ProductsTable
 * - Schedule type filtering with Segmented control in rows
 * - Client sorting within each product card
 */
const ProductsTab = ({ data, searchTerm, onSearch }) => {
  const { token } = theme.useToken();
  const [selectedSchedule, setSelectedSchedule] = useState('all');
  // Store sort preference per product - using product key as identifier
  const [clientSortByProduct, setClientSortByProduct] = useState({});

  // Build segmented options from scheduleType - split into two rows
  const { firstRowOptions, secondRowOptions } = useMemo(() => {
    // Create "All" option
    const allOption = { label: 'Все', value: 'all' };

    // Create options from scheduleType
    const typeOptions = Object.values(scheduleType).map((item) => ({
      label: item.label,
      value: item.value,
    }));

    const allOptions = [allOption, ...typeOptions];

    // Split into two rows: 4 items in first row, 4 items in second row
    return {
      firstRowOptions: allOptions.slice(0, 4),
      secondRowOptions: allOptions.slice(4),
    };
  }, []);

  // Filter data by selected schedule type
  const filteredData = useMemo(() => {
    if (selectedSchedule === 'all') {
      return data;
    }
    return data.filter((product) => product.scedule === selectedSchedule);
  }, [data, selectedSchedule]);

  // Calculate stats for filtered data
  const stats = useMemo(() => {
    return {
      totalProducts: filteredData.length,
      totalUnits: filteredData.reduce((sum, p) => sum + p.totalCount, 0),
    };
  }, [filteredData]);

  // Handle sort change for a specific product
  const handleSortChange = (productKey, sortValue) => {
    setClientSortByProduct((prev) => ({
      ...prev,
      [productKey]: sortValue,
    }));
  };

  // Sort options for client list
  const clientSortOptions = [
    {
      label: (
        <Space size="small">
          <SortAscendingOutlined />
          <span>А-Я</span>
        </Space>
      ),
      value: 'name',
    },
    {
      label: (
        <Space size="small">
          <ShopFilled />
          <span>Склад</span>
        </Space>
      ),
      value: 'stock',
    },
  ];

  // Helper function to sort clients
  const getSortedClients = (clients, sortBy) => {
    const clientsCopy = [...clients];

    if (sortBy === 'name') {
      // Sort by name alphabetically
      return clientsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'stock') {
      // Sort by stockType first, then by stockNumber
      return clientsCopy.sort((a, b) => {
        const typeA = a.stockType || '';
        const typeB = b.stockType || '';
        const typeCompare = typeB.localeCompare(typeA);

        if (typeCompare !== 0) return typeCompare;

        // If same stockType, sort by stockNumber
        const numA = a.stockNumber || 0;
        const numB = b.stockNumber || 0;
        return numA - numB;
      });
    }

    return clientsCopy;
  };

  const renderProductCard = (product) => {
    // Calculate difference for supplier order
    const difference = product.amountOdered - product.totalCount;

    // Get sort preference for this product (default to 'name')
    const sortBy = clientSortByProduct[product.key] || 'name';

    // Sort clients based on selected method
    const sortedClients = getSortedClients(product.clients, sortBy);

    return (
      <ConfigProvider
        key={product.key}
        theme={{
          components: {
            Card: {
              headerBg: token.cardBgAccent,
              colorBorderSecondary: token.colorSecondaryBtn,
              boxShadowCard: '0 2px 8px rgba(0, 0, 0, 0.15)',
            },
          },
        }}
      >
        <Card
          title={
            <Flex justify="space-between">
              <Text strong style={{ fontSize: '16px' }}>
                {product.productName}
              </Text>

              {product.weekly && (
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  (Еженедельно)
                </Text>
              )}
            </Flex>
          }
          style={{ marginBottom: '12px', borderRadius: '8px' }}
          hoverable
        >
          {/* Main Product Info */}
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* Schedule and Weekly */}
            <Flex justify="space-between" align="center">
              <Space>
                {product.scedule ? (
                  <Tag
                    icon={<CalendarOutlined />}
                    color={scheduleType[product.scedule]?.color}
                  >
                    {scheduleType[product.scedule]?.label}
                  </Tag>
                ) : (
                  <Tag icon={<CalendarOutlined />}>-</Tag>
                )}
              </Space>
              <Space>
                <Tag color={refundsType[product.refundsType]?.color}>
                  {refundsType[product.refundsType]?.label || '-'}
                </Tag>
              </Space>
            </Flex>

            {/* Order Statistics */}
            <div>
              <Text>Заказано:</Text>
              <Row gutter={[8, 8]} style={{ marginTop: '8px' }}>
                <Col span={12}>
                  <Card
                    size="small"
                    style={{
                      background: token.cardBgColor,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
                    }}
                  >
                    <Statistic
                      title="Клиентами"
                      value={product.totalCount}
                      valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    size="small"
                    style={{
                      background: token.cardBgColor,
                      borderRadius: 10,
                      boxShadow:
                        difference > 0
                          ? '0 0 6px rgba(82, 196, 26, 0.35)' // green glow
                          : difference < 0
                          ? '0 0 6px rgba(250, 173, 20, 0.35)' // orange glow
                          : '0 1px 4px rgba(0,0,0,0.08)',
                    }}
                  >
                    <Statistic
                      title="Поставщику"
                      value={product.amountOdered}
                      valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                      suffix={
                        difference !== 0 && (
                          <Tag
                            color={difference > 0 ? 'success' : 'warning'}
                            style={{ marginLeft: '4px', fontSize: '11px' }}
                          >
                            {difference > 0 ? `+${difference}` : difference}
                          </Tag>
                        )
                      }
                    />
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Clients Collapse */}
            <Collapse
              ghost
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{
                background: token.cardBgAccent,
                marginTop: '8px',
              }}
              items={[
                {
                  key: 'clients',
                  label: (
                    <Text strong>
                      Показать клиентов ({product.clients.length})
                    </Text>
                  ),
                  children: (
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: '100%' }}
                    >
                      {/* Sort Control */}
                      <Segmented
                        block
                        size="small"
                        value={sortBy}
                        onChange={(value) =>
                          handleSortChange(product.key, value)
                        }
                        options={clientSortOptions}
                      />

                      {/* Clients List */}
                      <List
                        dataSource={sortedClients}
                        renderItem={(client, index) => (
                          <Card
                            key={`${product.key}-${client.name}-${index}`}
                            size="small"
                            style={{
                              marginBottom: '8px',
                              background: token.colorBgContainer,
                            }}
                          >
                            <Space
                              direction="vertical"
                              size="small"
                              style={{ width: '100%' }}
                            >
                              {/* Client Header */}
                              <Flex justify="space-between" align="center">
                                <Text strong>{client.name}</Text>
                                <Tag color={token.cardBgColor}>
                                  {client.count} шт
                                </Tag>
                              </Flex>

                              {/* Stock Info */}
                              <Flex justify="space-between" align="center">
                                <Space>
                                  <ShopOutlined />
                                  <Text type="secondary">
                                    {stockType[client.stockType]?.label || '-'}
                                  </Text>
                                </Space>
                                <Tag color="cyan">
                                  Поз. {client.stockNumber || '-'}
                                </Tag>
                              </Flex>
                            </Space>
                          </Card>
                        )}
                      />
                    </Space>
                  ),
                },
              ]}
            />
          </Space>
        </Card>
      </ConfigProvider>
    );
  };

  return (
    <div>
      <SearchInput
        onChange={onSearch}
        placeholder="Поиск по товарам"
        style={{ marginBottom: '16px' }}
      />

      {/* Schedule Filter with Segmented - Two Rows */}
      <Space
        direction="vertical"
        size="small"
        style={{ width: '100%', marginBottom: '12px' }}
      >
        {/* First Row */}
        <Segmented
          block
          value={selectedSchedule}
          onChange={setSelectedSchedule}
          options={firstRowOptions}
        />
        {/* Second Row */}
        <Segmented
          block
          value={selectedSchedule}
          onChange={setSelectedSchedule}
          options={secondRowOptions}
        />
      </Space>

      {/* Compact Stats - inline display */}
      <Flex
        justify="center"
        align="center"
        gap="middle"
        style={{
          marginBottom: '16px',
          padding: '8px',
          background: token.colorBgLayout,
          borderRadius: '8px',
        }}
      >
        <Text type="secondary">
          <Text strong style={{ color: token.colorText }}>
            {stats.totalProducts}
          </Text>{' '}
          товаров
        </Text>
        <Text type="secondary">•</Text>
        <Text type="secondary">
          <Text strong style={{ color: token.colorText }}>
            {stats.totalUnits}
          </Text>{' '}
          единиц
        </Text>
      </Flex>

      <List
        dataSource={filteredData}
        renderItem={renderProductCard}
        locale={{ emptyText: 'Товары не найдены' }}
      />
    </div>
  );
};

ProductsTab.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      productName: PropTypes.string.isRequired,
      scedule: PropTypes.string, // Key for scheduleType lookup
      inBox: PropTypes.number,
      totalCount: PropTypes.number.isRequired,
      amountOdered: PropTypes.number.isRequired,
      createdAt: PropTypes.string,
      weekly: PropTypes.bool,
      refundsType: PropTypes.string, // Key for refundsType lookup
      clients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
          stockType: PropTypes.string, // Key for stockType lookup
          stockNumber: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
        })
      ).isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ProductsTab;
