import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Badge, Flex } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import { mockOrderProductList } from '../orderProcessingPage/mockData';

/**
 * ProductsTable Component - Desktop Version
 *
 * Displays products in a table with expandable nested table for clients
 * Features:
 * - Expandable rows showing which clients ordered each product
 * - Search functionality
 * - Schedule and date information
 * - Summary statistics
 */
const ProductsTable = ({ data, searchTerm, onSearch }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const filteredProducts = useFilteredProducts(data, searchTerm);

  // Nested table columns for clients
  const clientColumns = [
    {
      title: '№',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Клиент',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Количество',
      dataIndex: 'count',
      key: 'count',
      width: 120,
      align: 'center',
      render: (count) => <Tag color="blue">{count}</Tag>,
    },
  ];

  // Expandable row renderer
  const expandedRowRender = (record) => {
    const sortedClients = [...record.clients].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <Table
        columns={clientColumns}
        dataSource={sortedClients}
        pagination={false}
        size="small"
        rowKey={(client) => `${record.key}-${client.name}`}
        showHeader={true}
        bordered
      />
    );
  };

  // Main table columns
  const columns = [
    {
      title: 'Наименование товара',
      dataIndex: 'productName',
      key: 'productName',
      width: 300,
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: 'График',
      key: 'schedule',
      width: 180,
      align: 'center',
      render: (_, record) => {
        if (!record.schedule) return '-';
        return (
          <Tag icon={<CalendarOutlined />} color="purple">
            {record.schedule.label}
            {record.weekly && ' (Еженедельно)'}
          </Tag>
        );
      },
    },
    {
      title: 'Статус',
      key: 'status',
      width: 150,
      align: 'center',
      render: (_, record) => {
        if (record.weekly) {
          return <Badge status="processing" text="Еженедельно" />;
        }
        return <Badge status="default" text="Периодически" />;
      },
    },
    {
      title: 'Клиентов',
      key: 'clientsCount',
      width: 120,
      align: 'center',
      render: (_, record) => <Tag color="cyan">{record.clients.length}</Tag>,
      sorter: (a, b) => a.clients.length - b.clients.length,
    },
    {
      title: 'Всего шт.',
      dataIndex: 'totalCount',
      key: 'totalCount',
      width: 120,
      align: 'center',
      render: (totalCount) => <Tag color="green">{totalCount}</Tag>,
      sorter: (a, b) => a.totalCount - b.totalCount,
    },
    {
      title: 'Последняя дата',
      key: 'lastDate',
      width: 150,
      render: (_, record) => {
        const productInfo = mockOrderProductList.find(
          (p) => p.value === record.key
        );
        const dates = productInfo?.datesList || [];
        if (dates.length === 0) return '-';

        const latestDate = [...dates].sort(
          (a, b) => new Date(b) - new Date(a)
        )[0];

        return <Tag color="geekblue">{latestDate}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <SearchInput
          onChange={onSearch}
          placeholder="Поиск по товарам"
          style={{ width: 300 }}
        />
        <Space>
          <span>
            Всего товаров: <strong>{filteredProducts.length}</strong>
          </span>
          <span>
            Всего единиц:
            <strong style={{ marginLeft: 8 }}>
              {filteredProducts.reduce((sum, p) => sum + p.totalCount, 0)}
            </strong>
          </span>
        </Space>
      </Flex>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="key"
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.key] : []);
          },
          rowExpandable: (record) => record.clients.length > 0,
        }}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Всего ${total} записей`,
        }}
        bordered
        size="middle"
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

ProductsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      productName: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired,
      clients: PropTypes.array.isRequired,
      schedule: PropTypes.object,
      weekly: PropTypes.bool,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ProductsTable;
