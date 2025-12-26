import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Card,
  Typography,
  Space,
  Button,
  Spin,
  Empty,
  Flex,
  ConfigProvider,
  theme,
  Segmented,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import TagPrice from '../../../../components/tags/TagPrice';
import TagForNewDate from '../../../../components/tags/TagForNewDate';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import { findIsDateInRange } from '../../../../utils/findIsDateInRange';
import { getFormattedDataForFilter } from '../../../../utils/getFormattedDataForFilter';

const { Text } = Typography;
const PRICE_DISPLAY_ORDER = ['cost', 'superBulk', 'bulk', 'retail'];
const SEGMENTED_FILTERS = ['4', '12', '21', '5', '8'];

/**
 * Mobile-optimized Goods Page Component
 * Displays goods in a card-based list format optimized for touch interactions
 */
const MobileGoodsPage = ({ data, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByNewDate, setFilterByNewDate] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const { token } = theme.useToken(); // Get theme colors

  // Build segmented options from data suppliers - split into two rows
  const { firstRowOptions, secondRowOptions } = useMemo(() => {
    const allOption = { label: 'Все', value: 'all' };
    const suppliers = getFormattedDataForFilter(data);

    // Filter suppliers to only include those in SEGMENTED_FILTERS
    const filteredSuppliers = suppliers
      ?.filter((supplier) => SEGMENTED_FILTERS.includes(supplier.value))
      .map((supplier) => ({
        label: supplier.text,
        value: supplier.value,
      })) || [];

    const allOptions = [allOption, ...filteredSuppliers];

    // Split into two rows: 3 items in first row, remaining in second row
    return {
      firstRowOptions: allOptions.slice(0, 3),
      secondRowOptions: allOptions.slice(3),
    };
  }, [data]);

  // Filter data based on search term, date filter, and supplier filter
  const filteredData = data
    .filter((item) => {
      const name = item.name?.label || item.name || '';
      const matchesSearch = name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by supplier
      const matchesSupplier =
        selectedSupplier === 'all' || item.supplier?.value === selectedSupplier;

      // If new date filter is active, also check if dateStart is within range
      if (filterByNewDate && item.dateStart) {
        const isInRange = findIsDateInRange(item.dateStart, 17);
        return matchesSearch && matchesSupplier && isInRange;
      }

      return matchesSearch && matchesSupplier;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const toggleItemExpanded = (itemKey) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
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

      {/* Supplier Filter - Two Rows */}
      <Space
        direction="vertical"
        size="small"
        style={{ width: '100%', marginBottom: '12px' }}
      >
        {/* First Row */}
        <Segmented
          block
          value={selectedSupplier}
          onChange={setSelectedSupplier}
          options={firstRowOptions}
        />
        {/* Second Row */}
        {secondRowOptions.length > 0 && (
          <Segmented
            block
            value={selectedSupplier}
            onChange={setSelectedSupplier}
            options={secondRowOptions}
          />
        )}
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
          renderItem={(item) => {
            const isExpanded = expandedItems[item.key || item.id];
            const bulkPrice = item.bulk;

            // Render short card
            if (!isExpanded) {
              return (
                <div
                  key={item.key || item.id}
                  style={{
                    background: token.purchaseInvoiceBg,
                    border: `1px solid ${token.colorSecondaryBtn}`,
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Flex vertical>
                    <Flex justify="space-between" align="center" gap={4} wrap="nowrap">
                      <Text strong style={{ fontSize: '16px', flex: '1 1 0', minWidth: 0 }} ellipsis={{ tooltip: true }}>
                        {item.name}
                      </Text>
                      {item.dateStart && (
                        <TagForNewDate
                          date={item.dateStart}
                          color={token.dateAccentColor}
                        />
                      )}
                    </Flex>
                    <Flex justify="space-between" align="center">
                      <Flex align="center" gap="small">
                        {bulkPrice && (
                          <>
                            <Text type="secondary" style={{ fontSize: '14px' }}>
                              {categoryPricesObj.bulk.label}:
                            </Text>
                            <TagPrice
                              typePrice={categoryPricesObj.bulk.value}
                              number={bulkPrice}
                            />
                          </>
                        )}
                      </Flex>
                      <DownOutlined
                        onClick={() => toggleItemExpanded(item.key || item.id)}
                        style={{ cursor: 'pointer', fontSize: '14px' }}
                      />
                    </Flex>
                  </Flex>
                </div>
              );
            }

            // Render full expanded card
            return (
              <ConfigProvider
                key={item.key || item.id}
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
                  title={
                    <Flex justify="space-between" align="center">
                      <Text strong style={{ fontSize: '16px' }}>
                        {item.name}
                      </Text>
                      <UpOutlined
                        onClick={() => toggleItemExpanded(item.key || item.id)}
                        style={{ cursor: 'pointer', fontSize: '14px' }}
                      />
                    </Flex>
                  }
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
                        <TagForNewDate
                          date={item.dateStart}
                          color={token.dateAccentColor}
                        />
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
                                flex: '1 1 calc(50% - 2px)',
                                minWidth: '80px',
                                maxWidth: '120px',
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
            );
          }}
        />
      )}
    </div>
  );
};

MobileGoodsPage.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MobileGoodsPage;
