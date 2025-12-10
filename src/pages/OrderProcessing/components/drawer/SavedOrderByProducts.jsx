import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Space,
  Segmented,
  List,
  Card,
  Tag,
  Flex,
  Typography,
  theme,
  Collapse,

  Statistic,
} from 'antd';
import {
  SortAscendingOutlined,
  AppstoreOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import { scheduleType } from '../../../../constants/productsDetail';

const { Text, Title } = Typography;

/**
 * SavedOrderByProducts Drawer Component
 *
 * Displays clients grouped by products from a schedule
 * Features:
 * - Sortable product list (by name or total count)
 * - Shows all clients who ordered each product
 * - Expandable client lists per product
 * - Mobile-optimized layout
 */
const SavedOrderByProducts = ({ open, onClose, schedule }) => {
  const { token } = theme.useToken();
  const [sortBy, setSortBy] = useState('name');
  const [activeCollapseKeys, setActiveCollapseKeys] = useState([]);

  // Sort options for product list
  const productSortOptions = [
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
          <AppstoreOutlined />
          <span>Кол-во</span>
        </Space>
      ),
      value: 'count',
    },
  ];

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!schedule?.products) return [];

    const productsCopy = [...schedule.products];

    if (sortBy === 'name') {
      return productsCopy.sort((a, b) => {
        const nameA = a.productName || a.label;
        const nameB = b.productName || b.label;
        return nameA.localeCompare(nameB);
      });
    } else if (sortBy === 'count') {
      return productsCopy.sort(
        (a, b) => (b.totalCount || 0) - (a.totalCount || 0)
      );
    }

    return productsCopy;
  }, [schedule, sortBy]);

  return (
    <Drawer
      title={
        <Flex justify="space-between">
          <Text strong style={{ fontSize: '16px' }}>
            Товары ({sortedProducts.length})
          </Text>
          {schedule?.scheduleName && (
            <Tag color={scheduleType[schedule.scheduleName]?.color}>
              {scheduleType[schedule.scheduleName]?.label}
            </Tag>
          )}
        </Flex>
      }
      placement="bottom"
      onClose={onClose}
      open={open}
      height="80vh"
      styles={{
        body: {
          background: token.cardBgColor,
          padding: '16px',
        },
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* Sort Control */}
        <Segmented
          block
          size="small"
          value={sortBy}
          onChange={setSortBy}
          options={productSortOptions}
        />

        {/* Products List */}
        <List
          dataSource={sortedProducts}
          renderItem={(product, index) => (
            <Card
              key={`${product.productName || product.label}-${index}`}
              size="small"
              style={{
                marginBottom: '12px',
                background: token.colorBgContainer,
              }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                {/* Product Header */}
                <Flex justify='space-between'>
                  <Title level={5} style={{ margin: 0 }}>
                    {product.productName || product.label}
                  </Title>
                  <Statistic
                    prefix={<Text type="secondary">Заказ:</Text>}
                    value={product.amountOrdered}
                    valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
                    suffix={
                      product.amountOrdered - product.totalCount !== 0 && (
                        <Tag
                          color={
                            product.amountOrdered - product.totalCount > 0
                              ? 'success'
                              : 'warning'
                          }
                          style={{ marginLeft: '4px', fontSize: '12px' }}
                        >
                          {product.amountOrdered - product.totalCount > 0
                            ? `+${product.amountOrdered - product.totalCount}`
                            : product.amountOrdered - product.totalCount}
                        </Tag>
                      )
                    }
                  />
                </Flex>

                {/* Clients List */}
                <Collapse
                  ghost
                  bordered={false}
                  activeKey={activeCollapseKeys}
                  onChange={setActiveCollapseKeys}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  style={{
                    background: token.cardBgAccent,
                  }}
                  items={[
                    {
                      key: `product-${index}`,
                      label: (
                        <Flex
                          justify="space-between"
                          align="center"
                          style={{ width: '100%', paddingRight: '8px' }}
                        >
                          <Text strong>
                            Показать клиентов ({product.clients?.length || 0})
                          </Text>
                          <Tag color="blue">{product.totalCount} шт</Tag>
                        </Flex>
                      ),
                      children: (
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: '100%' }}
                        >
                          <Flex
                            vertical
                            gap="small"
                            style={{
                              border: `1px solid ${token.saleInvoiceAccent}`,
                              borderRadius: '8px',
                            }}
                          >
                            {(product.clients || []).map(
                              (client, clientIndex) => (
                                <Flex
                                  key={client.id || clientIndex}
                                  justify="space-between"
                                  align="center"
                                  style={{
                                    padding: '8px 16px',
                                    borderBottom:
                                      clientIndex <
                                      (product.clients?.length || 0) - 1
                                        ? `0.5px solid ${token.saleInvoiceAccent}`
                                        : 'none',
                                  }}
                                >
                                  <Text>
                                    {client.name || client.clientName}
                                  </Text>
                                  <Text strong>{client.count} шт</Text>
                                </Flex>
                              )
                            )}
                          </Flex>
                          {/* Close button at the end */}
                          <Flex justify="center" style={{ marginTop: '8px' }}>
                            <CaretUpOutlined
                              style={{
                                cursor: 'pointer',
                                fontSize: '16px',
                                color: token.colorTextSecondary,
                              }}
                              onClick={() =>
                                setActiveCollapseKeys((prev) =>
                                  prev.filter(
                                    (key) => key !== `product-${index}`
                                  )
                                )
                              }
                            />
                          </Flex>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Space>
            </Card>
          )}
        />
      </Space>
    </Drawer>
  );
};

SavedOrderByProducts.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  schedule: PropTypes.shape({
    scheduleName: PropTypes.string,
    date: PropTypes.string,
    docNumber: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productName: PropTypes.string,
        label: PropTypes.string,
        totalCount: PropTypes.number,
        clients: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            clientName: PropTypes.string,
            count: PropTypes.number,
          })
        ),
      })
    ),
  }),
  tableData: PropTypes.array,
};

export default SavedOrderByProducts;
