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
  Row,
  Col,
} from 'antd';
import {
  CaretRightOutlined,
  CalendarOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import {
  scheduleType,
  refundsType,
} from '../../../../constants/productsDetail';
import ClientsByProduct from '../drawer/ClientsByProduct';

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
  // Store expanded state per product - using product key as identifier
  const [expandedProducts, setExpandedProducts] = useState({});
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Toggle expanded state for a product
  const toggleProductExpanded = (productKey) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productKey]: !prev[productKey],
    }));
  };

  // Open drawer with selected product
  const handleOpenDrawer = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  // Close drawer
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProduct(null);
  };

  const renderProductCard = (product) => {
    // Calculate difference for supplier order
    const difference = product.amountOrdered - product.totalCount;

    // Check if product is expanded
    const isExpanded = expandedProducts[product.key];

    // Render short card
    if (!isExpanded) {
      return (
        <div
          style={{
            background: token.cardBgAccent,
            border: `1px solid ${token.colorSecondaryBtn}`,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Flex vertical>
            <Text strong style={{ fontSize: '16px' }}>
              {product.productName}
            </Text>
            <Flex justify="space-between" align="center">
              <Flex align="center" gap="small">
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  Поставщику:
                </Text>
                <Text strong style={{ fontSize: '18px' }}>
                  {product.amountOrdered}
                </Text>
                {difference !== 0 && (
                  <Tag
                    color={difference > 0 ? 'success' : 'warning'}
                    styles={{ fontSize: '12px', fontWeight: 'bold' }}
                  >
                    {difference > 0 ? `+${difference}` : difference}
                  </Tag>
                )}
              </Flex>
              <DownOutlined
                onClick={() => toggleProductExpanded(product.key)}
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
            <Flex justify="space-between" align="center">
              <Text strong style={{ fontSize: '16px' }}>
                {product.productName}
              </Text>
              <Flex align="center" gap="small">
                {product.weekly && (
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    (Еженедельно)
                  </Text>
                )}
                <UpOutlined
                  onClick={() => toggleProductExpanded(product.key)}
                  style={{ cursor: 'pointer', fontSize: '14px' }}
                />
              </Flex>
            </Flex>
          }
          style={{ marginBottom: '12px', borderRadius: '8px' }}
          hoverable
        >
          {/* Main Product Info */}
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
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
                      value={product.amountOrdered}
                      valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                      suffix={
                        difference !== 0 && (
                          <Tag
                            color={difference > 0 ? 'success' : 'warning'}
                            style={{ marginLeft: '4px', fontSize: '12px' }}
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

            {/* Clients Card - Click to open drawer */}
            <Card
              size="small"
              hoverable
              onClick={() => handleOpenDrawer(product)}
              style={{
                background: token.cardBgAccent,
                marginTop: '8px',
                cursor: 'pointer',
              }}
            >
              <Flex justify="space-between" align="center">
                <Text strong>Показать клиентов ({product.clients.length})</Text>
                <CaretRightOutlined />
              </Flex>
            </Card>

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
          </Space>
        </Card>
      </ConfigProvider>
    );
  };

  return (
    <div>
      <SearchInput
        value={searchTerm}
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

      {/* Clients Drawer */}
      <ClientsByProduct
        open={drawerOpen}
        onClose={handleCloseDrawer}
        product={selectedProduct}
        clients={selectedProduct?.clients || []}
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
      inBox: PropTypes.string,
      totalCount: PropTypes.number.isRequired,
      amountOrdered: PropTypes.number.isRequired,
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
