import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Space,
  Tag,
  List,
  Statistic,
  Button,
  Badge,
  Flex,
  ConfigProvider,
  theme,
} from 'antd';
import { EditOutlined, WarningOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';

const { Text } = Typography;

/**
 * SuppliersTab Component
 *
 * Displays list of suppliers with order analysis
 * Features:
 * - Search functionality
 * - Order vs demand comparison
 * - Reserve calculations
 * - Shortage warnings
 * - Edit button to open detailed drawer
 */
const SuppliersTab = ({
  data,
  productSummary,
  searchTerm,
  onSearch,
  onOpenDrawer,
}) => {
  const { token } = theme.useToken();

  const renderSupplierCard = useMemo(() => {
    return (supplier) => {
      // Calculate total order
      const totalOrder = supplier.listOrderedItems.reduce(
        (sum, item) => sum + item.count,
        0
      );

      // Calculate total client demand
      const totalClientDemand = supplier.listOrderedItems.reduce(
        (sum, item) => {
          const productDemand = productSummary.find(
            (p) => p.key === item.value
          );
          return sum + (productDemand?.totalCount || 0);
        },
        0
      );

      // Calculate total reserve
      const totalReserve = totalOrder - totalClientDemand;

      // Count shortage items (where order < client demand)
      const shortageCount = supplier.listOrderedItems.filter((item) => {
        const productDemand = productSummary.find((p) => p.key === item.value);
        const clientTotal = productDemand?.totalCount || 0;
        return item.count < clientTotal;
      }).length;

      return (
        <ConfigProvider
          theme={{
            components: {
              Card: {
                headerBg: token.purchaseInvoiceBg,
                colorBorderSecondary: token.colorSecondaryBtn,
                boxShadowCard: '0 2px 8px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        >
          <Card
            style={{
              marginBottom: '12px',
              borderRadius: '8px',
              backgroundColor:
                shortageCount > 0 ? `${token.colorErrorBg}` : undefined,
            }}
            hoverable
            title={
              <Flex justify="space-between" align="center">
                <Text strong>{supplier.name}</Text>
                {shortageCount > 0 && (
                  <Badge
                    count={
                      <WarningOutlined style={{ color: token.colorError }} />
                    }
                  />
                )}
              </Flex>
            }
            extra={
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => onOpenDrawer(supplier, 'supplier')}
              >
                Детали
              </Button>
            }
          >
            <Flex vertical gap={12}>
              {/* Summary statistics */}
              <Flex justify="space-around">
                <Statistic
                  title="Позиций"
                  value={supplier.listOrderedItems.length}
                  valueStyle={{ fontSize: '16px' }}
                />
                <Statistic
                  title="Заказ"
                  value={totalOrder}
                  valueStyle={{ fontSize: '16px' }}
                  suffix={
                    <Tag
                      color={token.purchaseInvoiceAccent}
                      style={{ marginLeft: 4 }}
                    >
                      шт
                    </Tag>
                  }
                />
                <Statistic
                  title="Клиенты"
                  value={totalClientDemand}
                  valueStyle={{ fontSize: '16px' }}
                  suffix={
                    <Tag color={token.colorSuccess} style={{ marginLeft: 4 }}>
                      шт
                    </Tag>
                  }
                />
                <Statistic
                  title="Резерв"
                  value={totalReserve}
                  valueStyle={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color:
                      totalReserve < 0
                        ? token.colorError
                        : totalReserve === 0
                        ? token.colorWarning
                        : token.colorSuccess,
                  }}
                  prefix={totalReserve > 0 ? '+' : ''}
                  suffix={<Text type="secondary">шт</Text>}
                />
              </Flex>

              {/* Warning message if shortage exists */}
              {shortageCount > 0 && (
                <Flex
                  justify="center"
                  style={{
                    backgroundColor: token.colorErrorBg,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: `1px solid ${token.colorErrorBorder}`,
                  }}
                >
                  <Space size="small">
                    <WarningOutlined style={{ color: token.colorError }} />
                    <Text type="danger">
                      Нехватка по {shortageCount} позициям
                    </Text>
                  </Space>
                </Flex>
              )}

              {/* Last update date */}
              <Flex justify="space-between">
                <Text type="secondary">Обновлено:</Text>
                <Text>{supplier.dateOfLastOrderChange}</Text>
              </Flex>
            </Flex>
          </Card>
        </ConfigProvider>
      );
    };
  }, [token, productSummary, onOpenDrawer]);

  return (
    <div>
      <SearchInput
        onChange={onSearch}
        placeholder="Поиск по поставщикам"
        style={{ marginBottom: '16px' }}
      />

      <List dataSource={data} renderItem={renderSupplierCard} />
    </div>
  );
};

SuppliersTab.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dateOfLastOrderChange: PropTypes.string,
      listOrderedItems: PropTypes.array.isRequired,
    })
  ).isRequired,
  productSummary: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      totalCount: PropTypes.number,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onOpenDrawer: PropTypes.func.isRequired,
};

export default SuppliersTab;
