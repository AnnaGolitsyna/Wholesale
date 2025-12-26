import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Space, Spin, Empty, Flex, Tag, theme } from 'antd';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryContractor } from '../../../../constants/categoryContractor';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const { Text } = Typography;

/**
 * Mobile-optimized Receivable Dashboard Component
 * Displays contractors in a simple two-column table grouped by category
 */
const MobileReceivableDashboard = ({ data, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = theme.useToken();

  const filteredData = useMemo(() => {
    const filtered = data.filter((item) => (item.count || 0) > 0);

    const searchFiltered = !searchTerm
      ? filtered
      : filtered.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );

    return searchFiltered.sort((a, b) => a.name.localeCompare(b.name));
  }, [data, searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Get category color for a contractor
  const getCategoryColor = (categoryValue) => {
    const category = categoryContractor.find(
      (cat) => cat.value === categoryValue
    );
    return category?.color || token.colorBorder;
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
      {/* Search Header */}
      <Space
        style={{
          width: '100%',
          marginBottom: '16px',
        }}
      >
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Поиск по наименованию контрагента"
          style={{ flex: 1 }}
        />
      </Space>

      {/* Contractors List */}
      {filteredData.length === 0 ? (
        <Empty
          description={searchTerm ? 'Контрагенты не найдены' : 'Нет данных'}
          style={{ marginTop: '40px' }}
        />
      ) : (
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          {filteredData.map((contractor) => (
            <div
              key={contractor.id}
              style={{
                padding: '12px 16px',
                borderLeft: `8px solid ${getCategoryColor(
                  contractor.category
                )}`,
                borderRadius: '4px',
                backgroundColor: token.colorBgContainer,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 1px 2px rgba(0, 0, 0, 0.05)';
              }}
            >
              <Flex
                justify="space-between"
                align="center"
                style={{ width: '100%' }}
              >
                <Space size="small">
                  <Text strong>{contractor.name}</Text>
                </Space>

                <Tag color={contractor.receivable > 0 ? 'success' : 'warning'}>
                  {formattedPriceToString(contractor.receivable || 0)}
                </Tag>
              </Flex>
            </div>
          ))}
        </Space>
      )}
    </div>
  );
};

MobileReceivableDashboard.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default MobileReceivableDashboard;
