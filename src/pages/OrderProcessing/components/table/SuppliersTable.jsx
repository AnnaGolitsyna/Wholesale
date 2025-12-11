import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Tag,
  Space,
  Badge,
  Flex,
  Typography,
  ConfigProvider,
  theme,
} from 'antd';
import { WarningOutlined, MinusOutlined } from '@ant-design/icons';
import SearchInput from '../../../../components/searchInput/SearchInput';
import useResponsiveScroll from '../../../../hook/useResponsiveScroll';
import { FORM_TYPES, FORM_ACTIONS } from '../../../../constants/formTypes';
import { ModalModifyItems } from '../../../../features/modifyingItems';
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

}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const { token } = theme.useToken();
  const tableRef = useRef(null);
  const scrollY = useResponsiveScroll(tableRef);
  // Nested table columns for items with reserve
  const itemColumns = [
    {
      title: '№',
      key: 'index',
      width: 35,
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
      width: 120,
      key: 'count',
      align: 'center',
      render: (count) => <Tag color={token.purchaseInvoiceBg}>{count}</Tag>,
    },
    {
      title: 'Клиенты',
      key: 'clientDemand',
      width: 120,
      align: 'center',
      render: (_, record, __, productSummary) => {
        const productDemand = productSummary.find(
          (p) => p.key === record.value
        );
        const clientTotal = productDemand?.totalCount || 0;
        return <Tag color={token.saleInvoiceBg}>{clientTotal}</Tag>;
      },
    },
    {
      title: 'Резерв',
      key: 'reserve',
      width: 120,
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
      </ConfigProvider>
    );
  };

  // Calculate supplier statistics using useOrderStatistics hook logic
  const getSupplierStats = (supplier) => {
    // Map items with reserve data
    const itemsWithReserve = supplier.listOrderedItems.map((item) => {
      const productDemand = productSummary.find((p) => p.key === item.value);
      const clientsTotal = productDemand?.totalCount || 0;
      const reserve = item.count - clientsTotal;
      return { ...item, clientsTotal, reserve };
    });

    const totalOrder = itemsWithReserve.reduce(
      (sum, item) => sum + item.count,
      0
    );
    const totalClientDemand = itemsWithReserve.reduce(
      (sum, item) => sum + item.clientsTotal,
      0
    );
    const totalReserve = totalOrder - totalClientDemand;
    const shortageCount = itemsWithReserve.filter((item) => item.reserve < 0).length;

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

      align: 'center',
      render: (_, record) => {
        return record.listOrderedItems.length ? (
          <Text>{record.listOrderedItems.length}</Text>
        ) : (
          <MinusOutlined />
        );
      },
    },
    {
      title: 'Всего заказано (шт)',
      children: [
        {
          title: 'Поставшику',
          key: 'totalOrder',

          align: 'center',
          render: (_, record) => {
            const { totalOrder } = getSupplierStats(record);
            return <Tag color={token.purchaseInvoiceBg}>{totalOrder}</Tag>;
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
          title: 'Клиентами',
          key: 'totalClientDemand',

          align: 'center',
          render: (_, record) => {
            const { totalClientDemand } = getSupplierStats(record);
            return <Tag color={token.saleInvoiceBg}>{totalClientDemand}</Tag>;
          },
        },
        {
          title: 'Резерв',
          key: 'totalReserve',

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
      ],
    },

    {
      title: 'Статус (по позициям)',
      key: 'status',
      width: 150,
      align: 'center',
      render: (_, record) => {
        const { shortageCount } = getSupplierStats(record);
        if (shortageCount > 0) {
          return (
            <Badge status="error" text={`Нехватка (${shortageCount}п.)`} />
          );
        }
        return <Badge status="success" text="Все в порядке" />;
      },
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
            category: record.category || '',
            _isBarterMode: true, // Flag to indicate supplier/barter mode
          }}
          typeData={FORM_TYPES.CONTRACTOR_ORDER}
          actionType={FORM_ACTIONS.EDIT}
        />
      ),
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <SearchInput
          value={searchTerm}
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
          columnWidth: 35,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.id] : []);
          },
          rowExpandable: (record) => record.listOrderedItems.length > 0,
        }}
        bordered
        size="middle"
        rowClassName={(record) => {
          const { shortageCount } = getSupplierStats(record);
          return shortageCount > 0 ? 'shortage-row' : '';
        }}
        virtual
        scroll={{ scrollToFirstRowOnChange: true, y: scrollY, x: 1024 }}
        pagination={false}
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
  
};

export default SuppliersTable;
