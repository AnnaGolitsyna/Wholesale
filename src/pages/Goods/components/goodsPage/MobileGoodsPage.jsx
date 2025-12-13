import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Card,
  Typography,
  Space,
  Button,
  Drawer,
  Spin,
  Empty,
  Radio,
  Flex,
  ConfigProvider,
  theme,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import TagPrice from '../../../../components/tags/TagPrice';
import TagForNewDate from '../../../../components/tags/TagForNewDate';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import { findIsDateInRange } from '../../../../utils/findIsDateInRange';

const { Text } = Typography;
const PRICE_DISPLAY_ORDER = ['cost', 'superBulk', 'bulk', 'retail'];

/**
 * Mobile-optimized Goods Page Component
 * Displays goods in a card-based list format optimized for touch interactions
 */
const MobileGoodsPage = ({ data, isLoading, onStatusChange, activeStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [filterByNewDate, setFilterByNewDate] = useState(false);
  const { token } = theme.useToken(); // Get theme colors

  // Filter data based on search term and date filter
  const filteredData = data
    .filter((item) => {
      const name = item.name?.label || item.name || '';
      const matchesSearch = name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // If new date filter is active, also check if dateStart is within range
      if (filterByNewDate && item.dateStart) {
        const isInRange = findIsDateInRange(item.dateStart, 17);
        return matchesSearch && isInRange;
      }

      return matchesSearch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusChange = (e) => {
    onStatusChange(e);
    setFilterDrawerVisible(false);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '20px' }}>
      {/* Mobile Header with Search and Filters */}

      <Space
        style={{
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder={'наименование товара'}
        />

        <Button
          type={filterByNewDate ? 'primary' : 'default'}
          size="large"
          onClick={() => setFilterByNewDate(!filterByNewDate)}
        >
          НЦ
        </Button>
      </Space>

      {/* Goods List */}
      {filteredData.length === 0 ? (
        <Empty
          description={searchTerm ? 'No goods found' : 'No goods available'}
          style={{ marginTop: '40px' }}
        />
      ) : (
        <List
          dataSource={filteredData}
          renderItem={(item) => (
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
                title={item.name}
                extra={<EditOutlined />}
                style={{
                  marginBottom: '12px',
                  borderRadius: '8px',
                }}
                hoverable
              >
                <Space
                  direction="vertical"
                  style={{ width: '100%' }}
                  size="small"
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    gap={4}
                    wrap="nowrap"
                  >
                    <Text
                      ellipsis={{ tooltip: true }}
                      style={{
                        flex: '1 1 0',
                        minWidth: 0,
                      }}
                    >
                      {item.supplier.label}
                    </Text>
                    {item.dateStart && (
                      <TagForNewDate date={item.dateStart} color={token.dateAccentColor} />
                    )}
                  </Flex>

                  <Card type="inner">
                    <Flex wrap="wrap" gap={4} justify="space-between">
                      {PRICE_DISPLAY_ORDER.filter(
                        (priceKey) => item[priceKey]
                      ).map((priceKey) => {
                        const priceConfig = categoryPricesObj[priceKey];
                        return (
                          <Flex
                            key={priceKey}
                            vertical
                            align="flex-start"
                            style={{
                              flex: '1 1 calc(50% - 2px)', // Reduced from 4px
                              minWidth: '80px', // Reduced from 90px
                              maxWidth: '120px', // Reduced from 150px
                            }}
                          >
                            <Text
                              type="secondary"
                              style={{
                                fontSize: '11px',
                                opacity: 0.65,
                                marginBottom: '2px',
                                color: priceConfig.color,
                              }}
                            >
                              {priceConfig.label}
                            </Text>
                            <TagPrice
                              typePrice={priceConfig.value}
                              number={item[priceKey]}
                            />
                          </Flex>
                        );
                      })}
                    </Flex>
                  </Card>
                </Space>
              </Card>
            </ConfigProvider>
          )}
        />
      )}

      {/* Filter Drawer */}
      <Drawer
        title="Filter Options"
        placement="bottom"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        height="auto"
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <Text strong style={{ display: 'block', marginBottom: '12px' }}>
              Status
            </Text>
            <Radio.Group
              onChange={handleStatusChange}
              value={activeStatus}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Radio value={true} style={{ width: '100%', padding: '8px' }}>
                  Active
                </Radio>
                <Radio value={false} style={{ width: '100%', padding: '8px' }}>
                  Inactive
                </Radio>
              </Space>
            </Radio.Group>
          </div>

          <Button
            type="primary"
            block
            size="large"
            onClick={() => setFilterDrawerVisible(false)}
          >
            Apply Filters
          </Button>
        </Space>
      </Drawer>
    </div>
  );
};

MobileGoodsPage.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  activeStatus: PropTypes.bool,
};

export default MobileGoodsPage;
