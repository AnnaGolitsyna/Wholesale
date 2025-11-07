import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Tag, Space, Badge, Flex, Typography } from 'antd';
import { EditOutlined, WarningOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';

const { Text } = Typography;

/**
 * SuppliersTable Component - Desktop Version
 *
 * Displays suppliers in a table with expandable nested table for items
 * Features:
 * - Expandable rows showing items with reserve calculations
 * - Search functionality
 * - Shortage warnings
 * - Edit button to open drawer
 */
const SuppliersTable = ({
  data,
  productSummary,
  searchTerm,
  onSearch,
  onOpenDrawer,
}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // Nested table columns for items with reserve
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
      title: 'Заказ',
      dataIndex: 'count',
      key: 'count',
      width: 100,
      align: 'center',
      render: (count) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: 'Клиенты',
      key: 'clientDemand',
      width: 100,
      align: 'center',
      render: (_, record, __, productSummary) => {
        const productDemand = productSummary.find(
          (p) => p.key === record.value
        );
        const clientTotal = productDemand?.totalCount || 0;
        return <Tag color="green">{clientTotal}</Tag>;
      },
    },
    {
      title: 'Резерв',
      key: 'reserve',
      width: 100,
      align: 'center',
      render: (_, record, __, productSummary) => {
        const productDemand = productSummary.find(
          (p) => p.key === record.value
        );
        const clientTotal = productDemand?.totalCount || 0;
        const reserve = record.count - clientTotal;

        const color = reserve < 0 ? 'red' : reserve === 0 ? 'orange' : 'green';
        const prefix = reserve > 0 ? '+' : '';

        return (
          <Text
            strong
            style={{
              color:
                color === 'red'
                  ? '#ff4d4f'
                  : color === 'orange'
                  ? '#faad14'
                  : '#52c41a',
            }}
          >
            {prefix}
            {reserve}
          </Text>
        );
      },
    },
    {
      title: 'Статус',
      key: 'status',
      width: 120,
      align: 'center',
      render: (_, record, __, productSummary) => {
        const productDemand = productSummary.find(
          (p) => p.key === record.value
        );
        const clientTotal = productDemand?.totalCount || 0;
        const reserve = record.count - clientTotal;

        if (reserve < 0) {
          return <Badge status="error" text="Нехватка" />;
        } else if (reserve === 0) {
          return <Badge status="warning" text="Точно" />;
        } else {
          return <Badge status="success" text="Избыток" />;
        }
      },
    },
  ];

  // Expandable row renderer with productSummary context
  const expandedRowRender = (record) => {
    const sortedItems = [...record.listOrderedItems].sort((a, b) =>
      a.label.localeCompare(b.label)
    );

    // Inject productSummary into render context
    const columnsWithContext = itemColumns.map((col) => ({
      ...col,
      render: col.render
        ? (text, itemRecord, index) =>
            col.render(text, itemRecord, index, productSummary)
        : undefined,
    }));

    return (
      <Table
        columns={columnsWithContext}
        dataSource={sortedItems}
        pagination={false}
        size="small"
        rowKey={(item) => `${record.id}-${item.value}`}
        showHeader={true}
        bordered
        rowClassName={(itemRecord) => {
          const productDemand = productSummary.find(
            (p) => p.key === itemRecord.value
          );
          const clientTotal = productDemand?.totalCount || 0;
          const reserve = itemRecord.count - clientTotal;
          return reserve < 0 ? 'shortage-row' : '';
        }}
      />
    );
  };

  // Calculate supplier statistics
  const getSupplierStats = (supplier) => {
    const totalOrder = supplier.listOrderedItems.reduce(
      (sum, item) => sum + item.count,
      0
    );

    const totalClientDemand = supplier.listOrderedItems.reduce((sum, item) => {
      const productDemand = productSummary.find((p) => p.key === item.value);
      return sum + (productDemand?.totalCount || 0);
    }, 0);

    const totalReserve = totalOrder - totalClientDemand;

    const shortageCount = supplier.listOrderedItems.filter((item) => {
      const productDemand = productSummary.find((p) => p.key === item.value);
      const clientTotal = productDemand?.totalCount || 0;
      return item.count < clientTotal;
    }).length;

    return { totalOrder, totalClientDemand, totalReserve, shortageCount };
  };

  // Main table columns
  const columns = [
    {
      title: 'Поставщик',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => {
        const { shortageCount } = getSupplierStats(record);
        return (
          <Space>
            {name}
            {shortageCount > 0 && (
              <Badge count={<WarningOutlined style={{ color: '#ff4d4f' }} />} />
            )}
          </Space>
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
      title: 'Заказ (шт.)',
      key: 'totalOrder',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const { totalOrder } = getSupplierStats(record);
        return <Tag color="blue">{totalOrder}</Tag>;
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
      title: 'Клиенты (шт.)',
      key: 'totalClientDemand',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const { totalClientDemand } = getSupplierStats(record);
        return <Tag color="green">{totalClientDemand}</Tag>;
      },
    },
    {
      title: 'Резерв',
      key: 'totalReserve',
      width: 120,
      align: 'center',
      render: (_, record) => {
        const { totalReserve } = getSupplierStats(record);
        const color =
          totalReserve < 0
            ? '#ff4d4f'
            : totalReserve === 0
            ? '#faad14'
            : '#52c41a';
        const prefix = totalReserve > 0 ? '+' : '';
        return (
          <Text strong style={{ color, fontSize: '14px' }}>
            {prefix}
            {totalReserve}
          </Text>
        );
      },
      sorter: (a, b) => {
        const reserveA = getSupplierStats(a).totalReserve;
        const reserveB = getSupplierStats(b).totalReserve;
        return reserveA - reserveB;
      },
    },
    {
      title: 'Статус',
      key: 'status',
      width: 150,
      align: 'center',
      render: (_, record) => {
        const { shortageCount } = getSupplierStats(record);
        if (shortageCount > 0) {
          return <Badge status="error" text={`Нехватка: ${shortageCount}`} />;
        }
        return <Badge status="success" text="Все в порядке" />;
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
          onClick={() => onOpenDrawer(record, 'supplier')}
          danger={getSupplierStats(record).shortageCount > 0}
        >
          Детали
        </Button>
      ),
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <SearchInput
          onChange={onSearch}
          placeholder="Поиск по поставщикам"
          style={{ width: 300 }}
        />
        <Space>
          <span>
            Всего поставщиков: <strong>{data.length}</strong>
          </span>
          {data.some((s) => getSupplierStats(s).shortageCount > 0) && (
            <Tag color="red" icon={<WarningOutlined />}>
              Есть нехватка товаров!
            </Tag>
          )}
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
        scroll={{ x: 1400 }}
        rowClassName={(record) => {
          const { shortageCount } = getSupplierStats(record);
          return shortageCount > 0 ? 'shortage-row' : '';
        }}
      />
    </>
  );
};

SuppliersTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dateOfLastOrderChange: PropTypes.string,
      listOrderedItems: PropTypes.array.isRequired,
    })
  ).isRequired,
  productSummary: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      totalCount: PropTypes.number,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onOpenDrawer: PropTypes.func.isRequired,
};

export default SuppliersTable;
