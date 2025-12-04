import React from 'react';
import PropTypes from 'prop-types';
import { List, Space, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * ProductsPopoverContent Component
 *
 * Displays a list of products with their details in a popover
 */
const ProductsPopoverContent = ({ products }) => (
  <div style={{ maxWidth: '350px', maxHeight: '400px', overflowY: 'auto' }}>
    <List
      size="small"
      dataSource={products}
      renderItem={(product) => (
        <List.Item style={{ padding: '8px 0' }}>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text strong style={{ fontSize: '13px', flex: 1 }}>
                {product.productName || product.label}
              </Text>
              <Tag color="blue" style={{ margin: 0 }}>
                {product.totalCount}
              </Tag>
            </div>
            {product.clients && product.clients.length > 0 && (
              <Text type="secondary" style={{ fontSize: '11px' }}>
                <UserOutlined style={{ marginRight: '4px' }} />
                {product.clients.map((c) => c.name || c.clientName).join(', ')}
              </Text>
            )}
          </Space>
        </List.Item>
      )}
    />
  </div>
);

ProductsPopoverContent.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsPopoverContent;
