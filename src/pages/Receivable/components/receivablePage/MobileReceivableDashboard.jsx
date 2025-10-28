import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  List,
  Typography,
  Space,
  Spin,
  Empty,
  Flex,
  Tag,
  ConfigProvider,
  theme,
} from 'antd';
import { RightOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../../../components/searchInput/SearchInput';
import TagPrice from '../../../../components/tags/TagPrice';
import { categoryContractor } from '../../../../constants/categoryContractor';
import { formattedPriceToString } from '../../../../utils/priceUtils';

const { Text, Title } = Typography;

/**
 * Mobile-optimized Receivable Dashboard Component
 * Displays contractors in a simple two-column table grouped by category
 */
const MobileReceivableDashboard = ({ data, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const navigate = useNavigate();
  const { token } = theme.useToken();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const lowercasedValue = value.toLowerCase().trim();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  const handleContractorClick = (contractor) => {
    navigate(`/receivables/${contractor.id}/${contractor.name}`);
  };

  // Get category data
  const getCategoryData = (categoryValue) => {
    return filteredData.filter((item) => item.category === categoryValue);
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
          onChange={handleSearch}
          placeholder="Поиск по наименованию контрагента"
          style={{ flex: 1 }}
        />
      </Space>

      {/* Contractors List by Category */}
      {filteredData.length === 0 ? (
        <Empty
          description={searchTerm ? 'Контрагенты не найдены' : 'Нет данных'}
          style={{ marginTop: '40px' }}
        />
      ) : (
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {categoryContractor.map((category) => {
            const categoryItems = getCategoryData(category.value);

            // Skip empty categories when searching
            if (searchTerm && categoryItems.length === 0) return null;

            // Skip empty categories entirely
            if (categoryItems.length === 0) return null;

            return (
              <ConfigProvider
                key={category.value}
                theme={{
                  components: {
                    Card: {
                      headerBg: category.color || token.colorBgContainer,
                      colorBorderSecondary: token.colorBorder,
                    },
                  },
                }}
              >
                <Card
                  title={
                    <Text strong style={{ fontSize: '16px' }}>
                      {category.label}
                    </Text>
                  }
                  style={{
                    borderRadius: '8px',
                  }}
                >
                  {/* Two-column table */}
                  <List
                    dataSource={categoryItems}
                    renderItem={(contractor) => (
                      <List.Item
                        onClick={() => handleContractorClick(contractor)}
                        style={{
                          padding: '12px 0',
                          cursor: 'pointer',
                          borderBottom: `1px solid ${token.colorBorderSecondary}`,
                        }}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          style={{ width: '100%' }}
                        >
                          {/* Left column - Contractor name with icon */}
                          <Space size="small">
                            {/* <EyeOutlined
                              style={{ color: token.colorTextSecondary }}
                            /> */}
                            <Text strong>{contractor.name}</Text>
                          </Space>

                          {/* Right column - Debt amount */}
                          <Tag
                            color={
                              contractor.receivable > 0 ? 'success' : 'warning'
                            }
                          >
                            {formattedPriceToString(contractor.receivable || 0)}
                          </Tag>
                          {/* <TagPrice
                            typePrice={
                              contractor.receivable >= 0
                                ? 'receivable'
                                : 'payable'
                            }
                            number={Math.abs(contractor.receivable || 0)}
                          /> */}
                        </Flex>
                      </List.Item>
                    )}
                  />
                </Card>
              </ConfigProvider>
            );
          })}
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
