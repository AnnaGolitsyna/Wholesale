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
  Button,
  Flex,
  ConfigProvider,
  theme,
} from 'antd';
import { EditOutlined, CaretRightOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import { stockType } from '../../constants/productsDetail';

const { Text } = Typography;

/**
 * ClientsTab Component
 *
 * Displays list of clients with their orders
 * Features:
 * - Search functionality
 * - Client order summary cards
 * - Expandable item lists
 * - Edit button to open drawer
 */
const ClientsTab = ({ data, searchTerm, onSearch, onOpenDrawer }) => {
  const { token } = theme.useToken();

  // Memoize sorted items to avoid recalculation
  const renderClientCard = useMemo(() => {
    return (client) => {
      const totalCount = client.listOrderedItems.reduce(
        (sum, item) => sum + item.count,
        0
      );

      // Sort items by label ascending
      const sortedItems = [...client.listOrderedItems].sort((a, b) =>
        a.label.localeCompare(b.label)
      );

      return (
        <ConfigProvider
          theme={{
            components: {
              Card: {
                headerBg: token.saleInvoiceBg,
                colorBorderSecondary: token.colorSecondaryBtn,
                boxShadowCard: '0 2px 8px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        >
          <Card
            style={{ marginBottom: '12px', borderRadius: '8px' }}
            hoverable
            title={client.name}
            extra={
              <Button
                type="primary"
                size="small"
                icon={<EditOutlined />}
                onClick={() => onOpenDrawer(client, 'client')}
              >
                Изменить
              </Button>
            }
          >
            <Flex justify="space-between">
              <Space>
                <Tag color={categoryPricesObj[client.categoryPrice]?.color}>
                  {categoryPricesObj[client.categoryPrice]?.label ||
                    client.categoryPrice}
                </Tag>
              </Space>
              <Statistic
                title="Позиций"
                value={client.listOrderedItems.length}
                valueStyle={{ fontSize: '18px' }}
              />
              <Statistic
                title="Всего шт."
                value={totalCount}
                valueStyle={{ fontSize: '18px', fontWeight: 'bold' }}
              />
            </Flex>
            <Flex justify="space-between">
              {client.stockType && (
                <Tag color={token.saleInvoiceAccent}>{`${
                  stockType[client.stockType]?.label
                }: ${client.stockNumber}`}</Tag>
              )}
              <Text type="secondary">Обновлено: </Text>
              <Text>{client.dateOfLastOrderChange}</Text>
            </Flex>

            <Collapse
              ghost
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{
                background: token.saleInvoiceBg,
                marginTop: '4px',
              }}
              items={[
                {
                  key: '1',
                  label: (
                    <Text type="secondary">
                      Показать товары ({client.listOrderedItems.length})
                    </Text>
                  ),
                  children: (
                    <List
                      dataSource={sortedItems}
                      renderItem={(item) => (
                        <List.Item
                          style={{
                            padding: '8px 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Text>{item.label}</Text>
                          <Tag color={token.saleInvoiceAccent}>
                            {item.count}
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
  }, [token, onOpenDrawer]);

  return (
    <div>
      <SearchInput
        onChange={onSearch}
        placeholder="Поиск по клиентам"
        style={{ marginBottom: '16px' }}
      />

      <List dataSource={data} renderItem={renderClientCard} />
    </div>
  );
};

ClientsTab.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      categoryPrice: PropTypes.string,
      stockType: PropTypes.string,
      stockNumber: PropTypes.number,
      dateOfLastOrderChange: PropTypes.string,
      listOrderedItems: PropTypes.array.isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onOpenDrawer: PropTypes.func.isRequired,
};

export default ClientsTab;
