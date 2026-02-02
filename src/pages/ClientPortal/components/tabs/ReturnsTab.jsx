// src/components/client/ReturnsTab.jsx
import React, { useState, useMemo } from 'react';
import { Table, DatePicker, Select, Space, Typography, Card, List } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import useClientReturns from '../../hooks/useClientReturns';
import useDeviceType from '../../../../hook/useDeviceType';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const ReturnsTab = () => {
  const { returns, loading, categories } = useClientReturns();
  const { isMobile } = useDeviceType();

  const [dateRange, setDateRange] = useState([
    dayjs().startOf('week'),
    dayjs().add(1, 'week').endOf('week'),
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter data
  const filteredReturns = useMemo(() => {
    return returns.filter((group) => {
      // Date filter
      if (dateRange && dateRange[0] && dateRange[1]) {
        const groupDate = dayjs(group.date, 'DD.MM.YYYY');
        if (
          groupDate.isBefore(dateRange[0], 'day') ||
          groupDate.isAfter(dateRange[1], 'day')
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory) {
        const hasCategory = group.items.some(
          (item) => item.category === selectedCategory,
        );
        if (!hasCategory) return false;
      }

      return true;
    });
  }, [returns, dateRange, selectedCategory]);

  // Flatten groups into individual rows for desktop table
  const flattenedRows = useMemo(() => {
    return filteredReturns.flatMap((group) =>
      group.items
        .filter(
          (item) => !selectedCategory || item.category === selectedCategory,
        )
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item, index) => ({
          key: `${group.date}-${index}`,
          date: group.date,
          category: item.category,
          name: item.name,
          number: item.number,
        })),
    );
  }, [filteredReturns, selectedCategory]);

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date) => <Text strong>{date}</Text>,
      onCell: (_, index) => {
        const rows = flattenedRows;
        // First row of a date group — span all rows with same date
        if (index === 0 || rows[index].date !== rows[index - 1].date) {
          let span = 1;
          while (index + span < rows.length && rows[index + span].date === rows[index].date) {
            span++;
          }
          return { rowSpan: span };
        }
        // Subsequent rows in the group — hide the cell
        return { rowSpan: 0 };
      },
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
      width: 80,
    },
  ];

  if (isMobile) {
    return (
      <div className="returns-tab-mobile">
        {/* Filters */}
        <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
          <RangePicker
            style={{ width: '100%' }}
            format="DD.MM.YYYY"
            value={dateRange}
            onChange={setDateRange}
            placeholder={['С', 'По']}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Все категории"
            allowClear
            onChange={setSelectedCategory}
            options={categories.map((cat) => ({ label: cat, value: cat }))}
          />
        </Space>

        {/* Mobile Card List */}
        <List
          loading={loading}
          dataSource={filteredReturns}
          split={false}
          renderItem={(group) => (
            <List.Item style={{ padding: '6px 0', border: 'none' }}>
              <Card
                size="small"
                style={{
                  width: '100%',
                  borderRadius: 10,
                  borderLeft: '3px solid #5661EE',
                }}
                title={
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <CalendarOutlined style={{ color: '#5661EE' }} />
                    <Text strong>{group.date}</Text>
                    <Text
                      type="secondary"
                      style={{ fontSize: 12, marginLeft: 'auto' }}
                    >
                      {group.items[0]?.category}
                    </Text>
                  </div>
                }
                styles={{ body: { padding: '4px 12px 8px' } }}
              >
                {group.items
                  .filter(
                    (item) =>
                      !selectedCategory || item.category === selectedCategory,
                  )
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, index, arr) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom:
                          index < arr.length - 1 ? '1px solid #f0f0f0' : 'none',
                      }}
                    >
                      <Text style={{ flex: 1 }}>{item.name}</Text>
                      <Text
                        // type="secondary"
                        style={{
                          fontSize: 12,
                          background: '#5661EE',
                          padding: '2px 8px',
                          borderRadius: 4,
                          marginLeft: 8,
                        }}
                      >
                        №{item.number}
                      </Text>
                    </div>
                  ))}
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }

  // Desktop View
  return (
    <div className="returns-tab-desktop">
      {/* Filters */}
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          format="DD.MM.YYYY"
          value={dateRange}
          onChange={setDateRange}
          placeholder={['С', 'По']}
        />
        <Select
          style={{ width: 200 }}
          placeholder="Все категории"
          allowClear
          onChange={setSelectedCategory}
          options={categories.map((cat) => ({ label: cat, value: cat }))}
        />
      </Space>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={flattenedRows}
        loading={loading}
        rowKey="key"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default ReturnsTab;
