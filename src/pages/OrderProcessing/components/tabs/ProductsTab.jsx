import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Space,
  Tag,
  List,
  Collapse,
  Statistic,
  Badge,
  Flex,
  ConfigProvider,
  theme,
  Divider,
} from 'antd';
import { CaretRightOutlined, CalendarOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import { mockOrderProductList } from '../orderProcessingPage/mockData';

const { Text } = Typography;

/**
 * ProductsTab Component
 *
 * Displays aggregated product summary across all clients
 * Features:
 * - Search functionality
 * - Product demand visualization
 * - Schedule and date information
 * - Expandable client lists
 */
const ProductsTab = ({ data, searchTerm, onSearch }) => {
  const { token } = theme.useToken();
  const filteredProducts = useFilteredProducts(data, searchTerm);

  const renderProductCard = useMemo(() => {
    return (product) => {
      // Get all dates for this product, sort descending, then take first 6
      const productInfo = mockOrderProductList.find(
        (p) => p.value === product.key
      );
      const allDates = (productInfo?.datesList || [])
        .sort((a, b) => new Date(b) - new Date(a))
        .slice(0, 6);

      // Sort clients by name ascending
      const sortedClients = [...product.clients].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      return (
        <ConfigProvider
          theme={{
            components: {
              Card: {
                headerBg: token.saleOrderAccent,
                colorBorderSecondary: token.colorSecondaryBtn,
                boxShadowCard: '0 2px 8px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        >
          <Card
            title={product.productName}
            style={{ marginBottom: '12px', borderRadius: '8px' }}
            hoverable
            extra={
              product.weekly && (
                <Badge
                  status="processing"
                  text={<Text type="secondary">Еженедельно</Text>}
                />
              )
            }
          >
            <Flex justify="space-around">
              <Space>
                {product.schedule && (
                  <Tag
                    icon={<CalendarOutlined />}
                    color={token.clolrNotificationBg}
                  >
                    {product.schedule.label}
                  </Tag>
                )}
              </Space>
              <Statistic
                title="Клиентов"
                value={product.clients.length}
                valueStyle={{ fontSize: '18px' }}
              />
              <Divider type="vertical" />
              <Statistic
                title="Штук"
                value={product.totalCount}
                valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
              />
            </Flex>

            {/* Dates Collapse */}
            {allDates.length > 0 && (
              <Collapse
                ghost
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{
                  background: token.saleOrderAccent,
                  marginTop: '8px',
                }}
                items={[
                  {
                    key: 'dates',
                    label: (
                      <Space>
                        <CalendarOutlined />
                        <Text type="secondary">
                          Все даты ({allDates.length})
                        </Text>
                      </Space>
                    ),
                    children: (
                      <Space size={[8, 8]} wrap style={{ padding: '8px 0' }}>
                        {(() => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          let closestDate = allDates[0];
                          let minDiff = Math.abs(new Date(allDates[0]) - today);

                          allDates.forEach((date) => {
                            const diff = Math.abs(new Date(date) - today);
                            if (diff < minDiff) {
                              minDiff = diff;
                              closestDate = date;
                            }
                          });

                          return allDates.map((date, idx) => (
                            <Tag
                              key={idx}
                              color={date === closestDate ? 'green' : 'default'}
                            >
                              {date}
                            </Tag>
                          ));
                        })()}
                      </Space>
                    ),
                  },
                ]}
              />
            )}

            {/* Clients Collapse */}
            <Collapse
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{
                background: token.saleOrderAccent,
                marginTop: '12px',
                borderBlockColor: token.saleOrderAccent,
              }}
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
                      dataSource={sortedClients}
                      renderItem={(client) => (
                        <List.Item
                          style={{
                            padding: '8px 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>{client.name}</Text>
                          <Tag color={token.saleOrderAccent}>
                            {client.count}
                          </Tag>
                        </List.Item>
                      )}
                    />
                  ),
                },
              ]}
            />
          </Card>
        </ConfigProvider>
      );
    };
  }, [token]);

  return (
    <div>
      <SearchInput
        onChange={onSearch}
        placeholder="Поиск по товарам"
        style={{ marginBottom: '16px' }}
      />

      <List dataSource={filteredProducts} renderItem={renderProductCard} />
    </div>
  );
};

ProductsTab.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      productName: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired,
      clients: PropTypes.array.isRequired,
      schedule: PropTypes.object,
      weekly: PropTypes.bool,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ProductsTab;
