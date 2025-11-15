import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Space, Badge, Flex, Typography } from 'antd';
import {
  CalendarOutlined,
  CheckOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { useFilteredProducts } from '../../hooks/useFilteredProducts';
import useResponsiveScroll from '../../../../hook/useResponsiveScroll';
import { useFirebaseProductsList } from '../../api/operations';
import { scheduleType, refundsType } from '../../constants/productsDetail';

const { Text } = Typography;
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
  const tableRef = useRef(null);
  const scrollY = useResponsiveScroll(tableRef);
  const { data: products } = useFirebaseProductsList();

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
      fixed: 'left',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: 'График',
      key: 'scedule',
      width: 180,
      align: 'center',
      render: (_, record) => {
        if (!record.scedule) return '-';
        return (
          <Tag
            icon={<CalendarOutlined />}
            color={scheduleType[record.scedule].color}
          >
            {scheduleType[record.scedule].label}
          </Tag>
        );
      },
    },

    {
      title: 'В пачке, шт',
      key: 'inBox',
      // width: 150,
      align: 'center',
      render: (_, record) => {
        return <Text>{record.inBox}</Text>;
      },
    },

    {
      title: 'Клиентов',
      key: 'clientsCount',

      align: 'center',
      render: (_, record) => <Text>{record.clients.length}</Text>,
    },
    {
      title: 'Заказано, шт',
      children: [
        {
          title: 'Клиентами',
          dataIndex: 'totalCount',
          key: 'totalCount',

          align: 'center',
          render: (totalCount) => <Text>{totalCount}</Text>,
        },
        {
          title: 'Поставщику',

          key: 'amountOdered',

          align: 'center',
          render: (_, record) => <Text>{record.amountOdered}</Text>,
        },
      ],
    },
    {
      title: 'Обновлено',
      key: 'createdAt',

      render: (_, record) => {
        return <Tag color="geekblue">{record.createdAt}</Tag>;
      },
    },
    {
      title: 'Еженедельно',
      key: 'weekly',
      // width: 150,
      align: 'center',
      render: (_, record) => {
        return record.weekly ? <CheckOutlined /> : <MinusOutlined />;
      },
    },
    {
      title: 'Возврат',
      key: 'refundsType',
      align: 'center',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Tag color={refundsType[record.refundsType]?.color}>
            {refundsType[record.refundsType]?.label}
          </Tag>
        );
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
        bordered
        size="middle"
        virtual
        scroll={{ scrollToFirstRowOnChange: true, y: scrollY, x: 1024 }}
        pagination={false}
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
