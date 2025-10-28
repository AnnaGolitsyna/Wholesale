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
  Tag,
  Flex,
  Row,
  Col,
  ConfigProvider,
  theme,
} from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import TagPrice from '../../../../components/tags/TagPrice';

const { Text } = Typography;

/**
 * Mobile-optimized Goods Page Component
 * Displays goods in a card-based list format optimized for touch interactions
 */
const MobileGoodsPage = ({ data, isLoading, onStatusChange, activeStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const { token } = theme.useToken(); // Get theme colors

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    const name = item.name?.label || item.name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => a.name.localeCompare(b.name));

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

  console.log('data', filteredData);

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
          onChange={handleSearch}
          placeholder={'наименование товара'}
        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          shape="circle"
          size="large"
        />
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
                  <Flex justify="space-between">
                    <Text>{item.supplier.label}</Text>
                    {item.dateStart && (
                      <Tag
                        color={token.purchaseInvoiceAccent}
                      >{`цена с ${item.dateStart}`}</Tag>
                    )}
                  </Flex>
                  <Card type="inner">
                    <Row gutter="2rem">
                      <Col span={6}>
                        {item.cost && (
                          <Text type="secondary">
                            Закупка:{' '}
                            <TagPrice typePrice="cost" number={item.cost} />
                          </Text>
                        )}
                      </Col>
                      <Col span={6}>
                        {item.superBulk && (
                          <Text type="secondary">
                            Кр.опт:{' '}
                            <TagPrice
                              typePrice="superBulk"
                              number={item.superBulk}
                            />
                          </Text>
                        )}
                      </Col>
                      <Col span={6}>
                        {item.bulk && (
                          <Text type="secondary">
                            Оптовая:{' '}
                            <TagPrice typePrice="bulk" number={item.bulk} />
                          </Text>
                        )}
                      </Col>
                      <Col span={6}>
                        {item.retail && (
                          <Text type="secondary">
                            Розница:{' '}
                            <TagPrice typePrice="retail" number={item.retail} />
                          </Text>
                        )}
                      </Col>
                    </Row>
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
