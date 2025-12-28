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
import { SortAscendingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { ModalModifyItems } from '../../../../features/modifyingItems';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';

const { Text, Title } = Typography;

/**
 * ProductsByClient Drawer Component
 *
 * Displays a list of products ordered by a specific client
 * Features:
 * - Sortable product list (by name or count)
 * - Product details with quantity
 * - Mobile-optimized layout
 */
const ProductsByClient = ({ open, onClose, client, products }) => {
  const { token } = theme.useToken();
  const [sortBy, setSortBy] = useState('name');

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

  // Helper function to sort products
  const getSortedProducts = (productsList, sortMethod) => {
    const productsCopy = [...productsList];

    if (sortMethod === 'name') {
      // Sort by label alphabetically
      return productsCopy.sort((a, b) => a.label.localeCompare(b.label));
    } else if (sortMethod === 'count') {
      // Sort by count descending
      return productsCopy.sort((a, b) => b.count - a.count);
    }

    return productsCopy;
  };

  const sortedProducts = getSortedProducts(products, sortBy);

  return (
    <Drawer
      title={
        <Flex justify="space-between" align="center">
          <Text strong style={{ fontSize: '16px' }}>
            {client?.name || 'Товары'}
          </Text>
          {client?.id && (
            <ModalModifyItems
              data={{
                id: client.id,
                key: client.id,
                name: client.name,
                listOrderedItems: client.listOrderedItems || [],
              }}
              typeData={FORM_TYPES.CONTRACTOR_ORDER}
              actionType={FORM_ACTIONS.EDIT}
            />
          )}
        </Flex>
      }
      placement="bottom"
      onClose={onClose}
      open={open}
      height="80vh"
      styles={{
        body: {
          background: token.saleInvoiceBg,
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
              key={`${product.label}-${index}`}
              size="small"
              style={{
                marginBottom: '8px',
                background: token.colorBgContainer,
              }}
            >
              <Flex justify="space-between" align="center">
                <Title level={5} style={{ margin: 0 }}>
                  {product.label}
                </Title>
                {/* <Tag
                  color={token.saleInvoiceAccent}
                  style={{ fontSize: '14px', padding: '4px 12px' }}
                >
                  {product.count} шт
                </Tag> */}
                <Statistic
                  value={product.count}
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

ProductsByClient.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  client: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductsByClient;
