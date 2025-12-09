import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Space,
  Segmented,
  List,
  Card,
  Flex,
  Typography,
  theme,
  Statistic,
} from 'antd';
import { SortAscendingOutlined, ShopFilled } from '@ant-design/icons';
import { stockType } from '../../../../constants/productsDetail';

const { Text, Title } = Typography;

/**
 * ClientsByProduct Drawer Component
 *
 * Displays a list of clients who ordered a specific product
 * Features:
 * - Sortable client list (by name or stock)
 * - Client details including stock type and position
 * - Mobile-optimized layout
 */
const ClientsByProduct = ({ open, onClose, product, clients }) => {
  const { token } = theme.useToken();
  const [sortBy, setSortBy] = useState('name');

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
  const getSortedClients = (clientsList, sortMethod) => {
    const clientsCopy = [...clientsList];

    if (sortMethod === 'name') {
      // Sort by name alphabetically
      return clientsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMethod === 'stock') {
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

  const sortedClients = getSortedClients(clients, sortBy);

  return (
    <Drawer
      title={
        <Text strong style={{ fontSize: '16px' }}>
          {product?.productName || 'Клиенты'}
        </Text>
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
          options={clientSortOptions}
        />

        {/* Clients List */}
        <List
          dataSource={sortedClients}
          renderItem={(client, index) => (
            <Card
              key={`${client.name}-${index}`}
              size="small"
              style={{
                marginBottom: '8px',
                background: token.colorBgContainer,
              }}
            >
              <Flex justify="space-between">
                {/* Client Header */}
                <Flex vertical>
                  <Title level={5} style={{ margin: 0 }}>
                    {client.name}
                  </Title>
                  <Space>
                    <Text type="secondary">
                      {stockType[client.stockType]?.label || '-'}
                      {client.stockNumber || '-'}
                    </Text>
                  </Space>
                </Flex>

                <Statistic
                  value={client.count}
                  style={{ marginRight: '5px' }}
                />
              </Flex>
            </Card>
          )}
        />
      </Space>
    </Drawer>
  );
};

ClientsByProduct.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    productName: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      stockType: PropTypes.string,
      stockNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default ClientsByProduct;
