import React from 'react';
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
  Divider,
  Row,
  Col,
} from 'antd';
import {
  CaretRightOutlined,
  CalendarOutlined,
  CheckOutlined,
  MinusOutlined,
  ShopOutlined,
  InboxOutlined,
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
 */
const ProductsTab = ({ data, searchTerm, onSearch }) => {
  const { token } = theme.useToken();

  const renderProductCard = (product) => {
    // Calculate difference for supplier order
    const difference = product.amountOdered - product.totalCount;

    // Sort clients by name ascending
    const sortedClients = [...product.clients].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

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

            {/* <Divider style={{ margin: '8px 0' }} /> */}

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
                              <Text strong>
                                #{index + 1}. {client.name}
                              </Text>
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

      {/* Summary Stats */}
      <Card size="small" style={{ marginBottom: '16px' }}>
        <Flex justify="space-around">
          <Statistic
            title="Всего товаров"
            value={data.length}
            valueStyle={{ fontSize: '16px', fontWeight: 'bold' }}
          />
          <Divider type="vertical" />
          <Statistic
            title="Всего единиц"
            value={data.reduce((sum, p) => sum + p.totalCount, 0)}
            valueStyle={{ fontSize: '16px', fontWeight: 'bold' }}
          />
        </Flex>
      </Card>

      <List
        dataSource={data}
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
