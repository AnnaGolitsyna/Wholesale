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
 * SavedOrderByClients Drawer Component
 *
 * Displays products grouped by clients from a schedule
 * Features:
 * - Sortable client list (by name or product count)
 * - Shows all products ordered by each client
 * - Expandable product lists per client
 * - Mobile-optimized layout
 */
const SavedOrderByClients = ({ open, onClose, schedule }) => {
  const { token } = theme.useToken();
  const [sortBy, setSortBy] = useState('name');
  const [activeCollapseKeys, setActiveCollapseKeys] = useState([]);

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
          <AppstoreOutlined />
          <span>Кол-во позиций</span>
        </Space>
      ),
      value: 'count',
    },
  ];

  // Group products by clients
  const clientsWithProducts = useMemo(() => {
    if (!schedule?.products) return [];

    // Create a map to store clients and their products
    const clientMap = new Map();

    // Iterate through each product
    schedule.products.forEach((product) => {
      if (!product.clients || product.clients.length === 0) return;

      // For each client in the product
      product.clients.forEach((client) => {
        const clientKey = client.name || client.clientName;

        if (!clientMap.has(clientKey)) {
          clientMap.set(clientKey, {
            name: clientKey,
            products: [],
            totalCount: 0,
            totalPositions: 0,
          });
        }

        const clientData = clientMap.get(clientKey);
        clientData.products.push({
          name: product.productName || product.label,
          count: client.count,
        });
        clientData.totalCount += client.count;
        clientData.totalPositions += 1;
      });
    });

    return Array.from(clientMap.values());
  }, [schedule]);

  // Sort clients
  const getSortedClients = (clients, sortMethod) => {
    const clientsCopy = [...clients];

    if (sortMethod === 'name') {
      return clientsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMethod === 'count') {
      return clientsCopy.sort((a, b) => b.totalPositions - a.totalPositions);
    }

    return clientsCopy;
  };

  const sortedClients = getSortedClients(clientsWithProducts, sortBy);

  return (
    <Drawer
      title={
        <Flex justify="space-between">
          <Text strong style={{ fontSize: '16px' }}>
            Клиенты ({sortedClients.length})
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
                marginBottom: '12px',
                background: token.colorBgContainer,
              }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                {/* Client Header */}

                <Title level={5} style={{ margin: 0 }}>
                  {client.name}
                </Title>

                {/* Products List */}
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
                      key: `client-${index}`,
                      label: (
                        <Text strong>
                          Показать товары ({client.products.length})
                        </Text>
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
                            {client.products.map((product, productIndex) => (
                              <Flex
                                key={product.id || productIndex}
                                justify="space-between"
                                align="center"
                                style={{
                                  padding: '8px 16px',
                                  borderBottom:
                                    productIndex < client.products.length - 1
                                      ? `0.5px solid ${token.saleInvoiceAccent}`
                                      : 'none',
                                }}
                              >
                                <Text>{product.name}</Text>
                                <Text strong>{product.count} шт</Text>
                              </Flex>
                            ))}
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
                                    (key) => key !== `client-${index}`
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

SavedOrderByClients.propTypes = {
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

export default SavedOrderByClients;
