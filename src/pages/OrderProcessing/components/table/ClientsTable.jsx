import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tag, Space, Flex, ConfigProvider, Typography } from 'antd';
import SearchInput from '../../../../components/searchInput/SearchInput';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import SimpleStockManagementModal from '../modal/SimpleStockManagementModal';
import useResponsiveScroll from '../../../../hook/useResponsiveScroll';
import {
  stockType,
  refundsType,
  scheduleType,
} from '../../../../constants/productsDetail';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';
import { ModalModifyItems } from '../../../../features/modifyingItems';

const { Text } = Typography;
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
const ClientsTable = ({ data, searchTerm, onSearch }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const tableRef = useRef(null);
  const scrollY = useResponsiveScroll(tableRef);

  // Nested table columns for items
  const itemColumns = [
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
      render: (count) => <Tag bordered={false}>{count} шт</Tag>,
    },
    {
      title: 'График',
      dataIndex: 'scedule',
      key: 'scedule',
      width: 120,
      align: 'center',
      render: (scedule) => (
        <Tag color={scheduleType[scedule]?.color} bordered={false}>
          {scheduleType[scedule]?.label}
        </Tag>
      ),
    },
    {
      title: 'Возврат',
      dataIndex: 'refundsType',
      key: 'refundsType',
      width: 120,
      align: 'center',
      render: (type) => (
        <Tag color={refundsType[type]?.color} bordered={false}>
          {refundsType[type]?.label}
        </Tag>
      ),
    },
  ];

  // Expandable row renderer
  const expandedRowRender = (record) => {
    const sortedItems = [...record.listOrderedItems].sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    return (
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#0f3d5c',
              colorBgContainer: '#1a4d6d',
            },
          },
        }}
      >
        <Table
          columns={itemColumns}
          dataSource={sortedItems}
          pagination={false}
          size="small"
          rowKey={(item) => `${record.id}-${item.value}`}
          showHeader={true}
          bordered
          style={{ width: '90%' }}
        />
      </ConfigProvider>
    );
  };

  // Main table columns
  const columns = [
    {
      title: 'Клиент',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      fixed: 'left',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Категория цен',
      dataIndex: 'categoryPrice',
      key: 'categoryPrice',
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

      align: 'center',
      render: (_, record) => {
        if (!record.stockType) return '-';
        return (
          <Tag color={stockType[record.stockType]?.color}>
            {`${stockType[record.stockType]?.label}: ${record.stockNumber}`}
          </Tag>
        );
      },
      sorter: (a, b) => {
        const typeA = a.stockType || '';
        const typeB = b.stockType || '';

        const typeSort = typeB.localeCompare(typeA);
        if (typeSort !== 0) return typeSort;

        return (a.stockNumber ?? 0) - (b.stockNumber ?? 0);
      },
    },
    {
      title: 'ВСЕГО',
      children: [
        {
          title: 'Позиций',
          key: 'itemsCount',
          align: 'center',
          render: (_, record) => (
            <Tag bordered={false}>{record.listOrderedItems.length}</Tag>
          ),
        },
        {
          title: 'Штук',
          key: 'totalCount',

          align: 'center',
          render: (_, record) => {
            const total = record.listOrderedItems.reduce(
              (sum, item) => sum + item.count,
              0
            );
            return <Tag bordered={false}>{total}</Tag>;
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
      ],
    },

    {
      title: 'Обновлено',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => {
         return <Text code>{record.createdAt}</Text>;
      },
    },
    {
      title: 'Заказ',
      key: 'actions',
      width: 80,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <ModalModifyItems
          data={{
            id: record.id, // ✅ Required
            key: record.id,
            name: record.name, // ✅ Required by your update function
            listOrderedItems: record.listOrderedItems || [],
          }}
          typeData={FORM_TYPES.CONTRACTOR_ORDER}
          actionType={FORM_ACTIONS.EDIT}
          modalWidth="80%"
        />
      ),
    },
  ];

  return (
    <div>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <SearchInput
          value={searchTerm}
          onChange={onSearch}
          placeholder="Поиск по клиентам"
          style={{ width: 300 }}
        />
        <>
          <Button onClick={() => setVisible(true)}>Управление складами</Button>

          <SimpleStockManagementModal
            visible={visible}
            onClose={() => setVisible(false)}
            contractors={data}
            onSave={(updated) => {
              console.log('Updated:', updated);
              // Save to Firestore here
            }}
          />
        </>
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
          columnWidth: 35,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.id] : []);
          },
          rowExpandable: (record) => record.listOrderedItems.length > 0,
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
  
};

export default ClientsTable;
