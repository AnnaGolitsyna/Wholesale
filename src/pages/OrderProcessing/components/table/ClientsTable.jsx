import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tag, Space, Flex } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import { categoryStock } from '../../../../constants/categoryContractor';

/**
 * ClientsTable Component - Desktop Version
 *
 * Displays clients in a table with expandable nested table for items
 * Features:
 * - Expandable rows showing item details
 * - Search functionality
 * - Edit button to open drawer
 * - Summary statistics
 */
const ClientsTable = ({ data, searchTerm, onSearch, onOpenDrawer }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // Nested table columns for items
  const itemColumns = [
    {
      title: '№',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Наименование товара',
      dataIndex: 'label',
      key: 'label',
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
    const sortedItems = [...record.listOrderedItems].sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    return (
      <Table
        columns={itemColumns}
        dataSource={sortedItems}
        pagination={false}
        size="small"
        rowKey={(item) => `${record.id}-${item.value}`}
        showHeader={true}
        bordered
      />
    );
  };

  // Main table columns
  const columns = [
    {
      title: 'Клиент',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Категория цен',
      dataIndex: 'categoryPrice',
      key: 'categoryPrice',
      width: 150,
      align: 'center',
      render: (categoryPrice) => (
        <Tag color={categoryPricesObj[categoryPrice]?.color}>
          {categoryPricesObj[categoryPrice]?.label || categoryPrice}
        </Tag>
      ),
    },
    {
      title: 'Склад',
      key: 'stock',
      width: 150,
      align: 'center',
      render: (_, record) => {
        if (!record.stockType) return '-';
        return (
          <Tag color="geekblue">
            {`${categoryStock[record.stockType]?.label}: ${record.stockNumber}`}
          </Tag>
        );
      },
    },
    {
      title: 'Позиций',
      key: 'itemsCount',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Tag color="cyan">{record.listOrderedItems.length}</Tag>
      ),
    },
    {
      title: 'Всего шт.',
      key: 'totalCount',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const total = record.listOrderedItems.reduce(
          (sum, item) => sum + item.count,
          0
        );
        return <Tag color="green">{total}</Tag>;
      },
      sorter: (a, b) => {
        const totalA = a.listOrderedItems.reduce(
          (sum, item) => sum + item.count,
          0
        );
        const totalB = b.listOrderedItems.reduce(
          (sum, item) => sum + item.count,
          0
        );
        return totalA - totalB;
      },
    },
    {
      title: 'Обновлено',
      dataIndex: 'dateOfLastOrderChange',
      key: 'dateOfLastOrderChange',
      width: 150,
      sorter: (a, b) =>
        a.dateOfLastOrderChange.localeCompare(b.dateOfLastOrderChange),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => onOpenDrawer(record, 'client')}
        >
          Изменить
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <SearchInput
          onChange={onSearch}
          placeholder="Поиск по клиентам"
          style={{ width: 300 }}
        />
        <Space>
          <span>
            Всего клиентов: <strong>{data.length}</strong>
          </span>
        </Space>
      </Flex>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.id] : []);
          },
          rowExpandable: (record) => record.listOrderedItems.length > 0,
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

ClientsTable.propTypes = {
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

export default ClientsTable;
