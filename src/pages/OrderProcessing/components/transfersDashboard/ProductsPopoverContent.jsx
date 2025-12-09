import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Space, Tag, Typography, Flex, Collapse } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * ProductsPopoverContent Component
 *
 * Displays a list of products with their details in a popover
 * Features:
 * - Expandable product items to show client details
 * - Click to toggle between collapsed and expanded states
 */
const ProductsPopoverContent = ({ products }) => {
  const [expandedProducts, setExpandedProducts] = useState({});

  const toggleProduct = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div style={{ maxWidth: '350px', maxHeight: '400px', overflowY: 'auto' }}>
      <List
        size="small"
        dataSource={products}
        renderItem={(product, index) => {
          const productId = product.value || product.productId || index;
          const isExpanded = expandedProducts[productId];

          return (
            <List.Item style={{ padding: '8px 0', display: 'block' }}>
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                {/* Product Header - Always Visible */}
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleProduct(productId)}
                >
                  <Text strong style={{ fontSize: '13px', flex: 1 }}>
                    {product.productName || product.label}
                  </Text>
                  <Flex align="center" gap={8}>
                    <Tag color="blue" style={{ margin: 0 }}>
                      {product.totalCount}
                    </Tag>
                    {product.clients && product.clients.length > 0 && (
                      isExpanded ? <UpOutlined style={{ fontSize: '12px' }} /> : <DownOutlined style={{ fontSize: '12px' }} />
                    )}
                  </Flex>
                </Flex>

                {/* Clients List - Show when expanded */}
                {isExpanded && product.clients && product.clients.length > 0 && (
                  <div style={{ marginTop: '8px', paddingLeft: '8px' }}>
                    <List
                      size="small"
                      dataSource={product.clients}
                      renderItem={(client) => (
                        <List.Item
                          style={{
                            padding: '4px 0',
                            borderBottom: 'none',
                          }}
                        >
                          <Flex
                            justify="space-between"
                            align="center"
                            style={{ width: '100%' }}
                          >
                            <Text style={{ fontSize: '12px' }}>
                              {client.name || client.clientName}
                            </Text>
                            <Tag color="cyan" style={{ fontSize: '11px', margin: 0 }}>
                              {client.count} шт
                            </Tag>
                          </Flex>
                        </List.Item>
                      )}
                    />
                  </div>
                )}
              </Space>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

ProductsPopoverContent.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsPopoverContent;
