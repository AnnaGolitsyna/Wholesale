import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  Statistic,
  Segmented,
  Empty,
  Space,
  Tag,
  Typography,
  Collapse,
  ConfigProvider,
  List,
  theme,
  Flex,
} from 'antd';
import {
  CalendarOutlined,
  DownOutlined,
  ShoppingOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { scheduleType, refundsType } from '../../../constants/productsDetail';

const { Title, Text } = Typography;
const { Panel } = Collapse;

// utils/scheduleGrouping.js

/**
 * Groups product summary data by schedule
 * @param {Array} productSummary - Array of products from useProductSummary
 * @returns {Array} - Grouped data by schedule with statistics
 */
export const groupBySchedule = (productSummary) => {
  if (!productSummary || productSummary.length === 0) {
    return [];
  }

  const grouped = productSummary.reduce((acc, product) => {
    // ⚠️ Note: The field is "scedule" (typo in data), not "schedule"
    const schedule = product.scedule || 'unassigned';

    if (!acc[schedule]) {
      acc[schedule] = {
        scheduleName: schedule,
        products: [],
        totalProducts: 0,
        totalQuantity: 0,
        totalClients: 0,
        refundsTypes: new Set(),
        createdDates: [],
        isBarter: false,
        weeklyCount: 0,
      };
    }

    acc[schedule].products.push(product);
    acc[schedule].totalProducts += 1;
    acc[schedule].totalQuantity += product.totalCount || 0;

    // Count unique clients
    if (product.clients && Array.isArray(product.clients)) {
      acc[schedule].totalClients += product.clients.length;
    }

    if (product.refundsType) {
      acc[schedule].refundsTypes.add(product.refundsType);
    }

    if (product.createdAt) {
      acc[schedule].createdDates.push(product.createdAt);
    }

    if (product.isBarter) {
      acc[schedule].isBarter = true;
    }

    if (product.weekly) {
      acc[schedule].weeklyCount += 1;
    }

    return acc;
  }, {});

  // Convert to array and add additional statistics
  return Object.values(grouped)
    .map((schedule) => {
      // Get unique client names
      const allClientNames = schedule.products
        .flatMap((p) =>
          (p.clients || []).map((c) => c.name || c.clientName || '')
        )
        .filter(Boolean);

      const uniqueClients = new Set(allClientNames).size;

      // Find most recent update
      const lastUpdated =
        schedule.createdDates.length > 0
          ? new Date(Math.max(...schedule.createdDates.map((d) => new Date(d))))
          : null;

      return {
        ...schedule,
        refundsTypes: Array.from(schedule.refundsTypes),
        uniqueClients,
        lastUpdated,
      };
    })
    .sort((a, b) => {
      // Sort by schedule priority
      if (a.scheduleName === 'unassigned') return 1;
      if (b.scheduleName === 'unassigned') return -1;

      const priorityA = scheduleType[a.scheduleName]?.priority || 999;
      const priorityB = scheduleType[b.scheduleName]?.priority || 999;

      return priorityA - priorityB;
    });
};

/**
 * Get schedule statistics summary
 * @param {Array} scheduleGroups - Grouped schedule data
 * @returns {Object} - Overall statistics
 */
export const getScheduleStatistics = (scheduleGroups) => {
  if (!scheduleGroups || scheduleGroups.length === 0) {
    return {
      totalSchedules: 0,
      totalProducts: 0,
      totalQuantity: 0,
      totalClients: 0,
      schedulesByType: {},
    };
  }

  return {
    totalSchedules: scheduleGroups.length,
    totalProducts: scheduleGroups.reduce((sum, s) => sum + s.totalProducts, 0),
    totalQuantity: scheduleGroups.reduce((sum, s) => sum + s.totalQuantity, 0),
    totalClients: scheduleGroups.reduce((sum, s) => sum + s.uniqueClients, 0),
    schedulesByType: scheduleGroups.reduce((acc, s) => {
      acc[s.scheduleName] = s.totalProducts;
      return acc;
    }, {}),
    weeklyProducts: scheduleGroups.reduce((sum, s) => sum + s.weeklyCount, 0),
    barterSchedules: scheduleGroups.filter((s) => s.isBarter).length,
  };
};

const TransfersDashboard = ({ data }) => {
  const [filter, setFilter] = useState('all');
  const { token } = theme.useToken();

  // Group data by schedule
  const scheduleGroups = useMemo(() => {
    return groupBySchedule(data);
  }, [data]);

  // Calculate overall statistics
  const statistics = useMemo(() => {
    return getScheduleStatistics(scheduleGroups);
  }, [scheduleGroups]);

  // Filter schedules
  const filteredSchedules = useMemo(() => {
    if (filter === 'all') return scheduleGroups;

    // Add your filtering logic here based on schedule properties
    return scheduleGroups.filter((schedule) => {
      // Example filters:
      if (filter === 'active') return schedule.totalProducts > 0;
      if (filter === 'empty') return schedule.totalProducts === 0;
      return true;
    });
  }, [scheduleGroups, filter]);

  if (!data || data.length === 0) {
    return (
      <Empty
        description="Нет данных о раскладках"
        style={{ marginTop: '50px' }}
      />
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            colorBorderSecondary: token.saleOrderAccent,
            colorBgContainer: token.colorBgBaseDark,
          },
        },
      }}
    >
      <div>
        {/* Header with Overall Statistics */}
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Раскладки по графикам
            </Title>

            {/* Filter Controls */}
            <Segmented
              value={filter}
              onChange={setFilter}
              options={[
                { label: 'Все', value: 'all' },
                { label: 'Следующая неделя', value: 'nextWeek' },
                { label: 'По требованию', value: 'request' },
                { label: 'Все раскладки', value: 'transfers' },
              ]}
            />
          </div>

          {/* Schedule Cards Grid */}
          <Row gutter={[16, 16]}>
            {filteredSchedules.map((schedule, index) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={index}>
                <Card
                  hoverable
                  title={
                    <Space>
                      <CalendarOutlined
                        style={{
                          color: scheduleType[schedule.scheduleName].color,
                        }}
                      />
                      <Tag color={scheduleType[schedule.scheduleName].color}>
                        {scheduleType[schedule.scheduleName].label}
                      </Tag>
                    </Space>
                  }
                  extra={<PrinterOutlined />}
                  styles={{
                    body: { padding: '16px' },
                  }}
                >
                  <Card style={{ border: 'none' }}>
                    <Card.Grid style={{ width: '50%' }}>
                      <Statistic
                        title="Товаров"
                        value={schedule.totalProducts}
                        valueStyle={{ fontSize: '20px' }}
                      />
                    </Card.Grid>
                    <Card.Grid style={{ width: '50%' }}>
                      <Statistic
                        title="Клиентов"
                        value={schedule.uniqueClients}
                        valueStyle={{ fontSize: '20px' }}
                      />
                    </Card.Grid>
                  </Card>

                  {/* Products List Collapse */}
                  <Collapse
                    ghost
                    expandIcon={({ isActive }) => (
                      <DownOutlined rotate={isActive ? 180 : 0} />
                    )}
                    style={{ background: 'transparent' }}
                  >
                    <Panel
                      header={
                        <Space>
                          <ShoppingOutlined style={{ color: '#2c5f5d' }} />
                          <Text strong>Список товаров</Text>
                        </Space>
                      }
                      key="1"
                    >
                      <List
                        size="small"
                        dataSource={schedule.products}
                        style={{
                          maxHeight: '200px',
                          overflowY: 'auto',
                        }}
                        renderItem={(product) => (
                          <List.Item
                            style={{
                              padding: '8px 0',
                              borderBottom: '1px solid #f0f0f0',
                            }}
                          >
                            <Space
                              direction="vertical"
                              size={2}
                              style={{ width: '100%' }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Text
                                  strong
                                  style={{
                                    fontSize: '13px',
                                    flex: 1,
                                  }}
                                >
                                  {product.productName || product.label}
                                </Text>
                                <Tag
                                  color="blue"
                                  style={{ margin: 0, fontSize: '12px' }}
                                >
                                  {product.totalCount}
                                </Tag>
                              </div>
                              {product.clients &&
                                product.clients.length > 0 && (
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: '11px' }}
                                  >
                                    Клиенты:{' '}
                                    {product.clients
                                      .map((c) => c.name || c.clientName)
                                      .join(', ')}
                                  </Text>
                                )}
                            </Space>
                          </List.Item>
                        )}
                      />
                    </Panel>
                  </Collapse>
                  {/* Refunds Types */}
                  {schedule.refundsTypes.length > 0 && (
                    <div>
                      <Text
                        type="secondary"
                        style={{
                          fontSize: '12px',
                          display: 'block',
                          marginBottom: '8px',
                        }}
                      >
                        Типы возврата:
                      </Text>
                      <Space wrap size={[4, 4]}>
                        {schedule.refundsTypes.map((type, idx) => (
                          <Tag
                            key={idx}
                            style={{
                              background: refundsType[type].color,
                              border: '1px solid #2c5f5d',
                              // color: '#2c5f5d',
                              margin: 0,
                            }}
                          >
                            {refundsType[type].label}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </div>
    </ConfigProvider>
  );
};

TransfersDashboard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TransfersDashboard;
