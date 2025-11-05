import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Table, Card, Typography, Space, Tag, message } from 'antd';
import {
  ShoppingCartOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { categoryPricesObj } from '../../../../constants/categoryPricesObj';
import EditableOrderItemsTable from '../table/EditableOrderItemsTable';

const { Title } = Typography;

const mockData = [
  {
    name: 'Дибенко',
    fullName: 'ФОП Дибенко',
    category: 'buyer',
    categoryPrice: 'bulk',
    taxNumber: null,
    contractNumber: null,
    date: null,
    email: null,
    phone: null,
    adress: null,
    active: true,
    relatedCompanies: [],
    listOrderedItems: [
      { value: 1, label: 'Большие цифры', count: 8 },
      { value: 2, label: 'Большие буквы', count: 12 },
      { value: 3, label: 'Веселый дачник', count: 15 },
      { value: 4, label: 'Гигант сканворд', count: 20 },
      { value: 5, label: 'Дарья', count: 25 },
      { value: 6, label: 'Дарья Сканворд', count: 18 },
      { value: 7, label: 'Дача и дачники', count: 10 },
      { value: 8, label: 'Дачные советы', count: 14 },
      { value: 9, label: 'Дачный сканворд', count: 22 },
      { value: 10, label: 'Ежик', count: 30 },
      { value: 11, label: 'Загадки истории', count: 16 },
      { value: 12, label: 'Ключворд', count: 19 },
      { value: 13, label: 'Крупный шрифт', count: 11 },
      { value: 14, label: 'Мир судоку', count: 24 },
      { value: 15, label: 'Страна сканвордов', count: 17 },
      { value: 16, label: 'Тайны и загадки', count: 13 },
      { value: 17, label: 'Тайны ХХ века', count: 21 },
      { value: 18, label: 'Тещин компот', count: 9 },
      { value: 19, label: 'Тещин компот.Судоку', count: 26 },
      { value: 20, label: 'Титан-кроссворд', count: 15 },
      { value: 21, label: 'Филворд Дарья', count: 12 },
      { value: 22, label: '1000 Секретов', count: 10 },
      { value: 23, label: 'ЗОЖ', count: 5 },
      { value: 24, label: 'Бабушкин пирог', count: 15 },
      { value: 25, label: 'Кулинарный альбом', count: 20 },
    ],
    id: '10',
  },
  {
    name: 'Автовокзал',
    fullName: 'ТТ Автовокзал',
    category: 'buyer',
    categoryPrice: 'retail',
    taxNumber: null,
    contractNumber: null,
    date: null,
    email: null,
    phone: null,
    adress: null,
    active: true,
    relatedCompanies: [],
    listOrderedItems: [
      { value: 1, label: 'Большие цифры', count: 5 },
      { value: 2, label: 'Большие буквы', count: 10 },
      { value: 3, label: 'Веселый дачник', count: 6 },
      { value: 4, label: 'Гигант сканворд', count: 2 },
      { value: 5, label: 'Дарья', count: 7 },
      { value: 6, label: 'Дарья Сканворд', count: 8 },
      { value: 7, label: 'Дача и дачники', count: 1 },
      { value: 8, label: 'Дачные советы', count: 4 },
      { value: 9, label: 'Дачный сканворд', count: 2 },
      { value: 10, label: 'Ежик', count: 30 },
      { value: 11, label: 'Загадки истории', count: 6 },
      { value: 12, label: 'Ключворд', count: 9 },
      { value: 13, label: 'Крупный шрифт', count: 11 },
      { value: 14, label: 'Мир судоку', count: 4 },
      { value: 15, label: 'Страна сканвордов', count: 1 },
      { value: 16, label: 'Тайны и загадки', count: 3 },
      { value: 17, label: 'Тайны ХХ века', count: 21 },
      { value: 18, label: 'Тещин компот', count: 9 },
      { value: 19, label: 'Тещин компот.Судоку', count: 6 },
      { value: 20, label: 'Титан-кроссворд', count: 5 },
      { value: 21, label: 'Филворд Дарья', count: 2 },
      { value: 22, label: '1000 Секретов', count: 10 },
      { value: 23, label: 'ЗОЖ', count: 5 },
      { value: 24, label: 'Бабушкин пирог', count: 5 },
    ],
    id: '11',
  },
];

const OrderProcessingPage = (props) => {
  // State to manage order data
  const [orderData, setOrderData] = useState(mockData);

  // Handle save of edited items
  const handleSaveItems = (clientId, updatedItems) => {
    const newOrderData = orderData.map((client) => {
      if (client.id === clientId) {
        return { ...client, listOrderedItems: updatedItems };
      }
      return client;
    });
    setOrderData(newOrderData);
    // Here you would typically call an API to save the data
  };

  // Calculate summary by products
  const productSummary = useMemo(() => {
    const summary = {};

    orderData.forEach((client) => {
      client.listOrderedItems.forEach((item) => {
        if (!summary[item.value]) {
          summary[item.value] = {
            key: item.value,
            productName: item.label,
            totalCount: 0,
            clients: [],
          };
        }
        summary[item.value].totalCount += item.count;
        summary[item.value].clients.push({
          name: client.name,
          count: item.count,
        });
      });
    });

    return Object.values(summary).sort((a, b) => b.totalCount - a.totalCount);
  }, [orderData]);

  // Columns for Orders by Clients tab
  const clientColumns = [
    {
      title: 'Клиент',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 150,
      render: (text, record) => (
        <Space direction="vertical" size="small">
          <Typography.Text strong>{text}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            {record.fullName}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Категория цен',
      dataIndex: 'categoryPrice',
      key: 'categoryPrice',
      width: 120,
      render: (price) => (
        <Tag color={categoryPricesObj[price]?.color}>
          {categoryPricesObj[price]?.label || price}
        </Tag>
      ),
    },
    {
      title: 'Всего позиций',
      key: 'totalItems',
      width: 120,
      render: (_, record) => record.listOrderedItems.length,
    },
    {
      title: 'Общее количество',
      key: 'totalCount',
      width: 150,
      render: (_, record) => {
        const total = record.listOrderedItems.reduce(
          (sum, item) => sum + item.count,
          0
        );
        return <Typography.Text strong>{total}</Typography.Text>;
      },
    },
  ];

  // Columns for Summary by Products tab
  const productColumns = [
    {
      title: '№',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Название товара',
      dataIndex: 'productName',
      key: 'productName',
      width: 250,
    },
    {
      title: 'Общее количество',
      dataIndex: 'totalCount',
      key: 'totalCount',
      width: 150,
      sorter: (a, b) => a.totalCount - b.totalCount,
      render: (count) => <Typography.Text strong>{count}</Typography.Text>,
    },
    {
      title: 'Количество клиентов',
      key: 'clientCount',
      width: 150,
      render: (_, record) => record.clients.length,
    },
  ];

  // Expandable row for products table
  const expandedRowRender = (record) => {
    const columns = [
      { title: 'Клиент', dataIndex: 'name', key: 'name' },
      { title: 'Количество', dataIndex: 'count', key: 'count' },
    ];

    return (
      <Table
        columns={columns}
        dataSource={record.clients}
        pagination={false}
        size="small"
      />
    );
  };

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <ShoppingCartOutlined />
          Заказы по клиентам
        </span>
      ),
      children: (
        <Card>
          <Table
            columns={clientColumns}
            dataSource={orderData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            expandable={{
              expandedRowRender: (record) => (
                <EditableOrderItemsTable
                  items={record.listOrderedItems}
                  onSave={handleSaveItems}
                  clientId={record.id}
                />
              ),
              rowExpandable: (record) => record.listOrderedItems.length > 0,
            }}
            scroll={{ x: 800 }}
          />
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <AppstoreOutlined />
          Сводка по товарам
        </span>
      ),
      children: (
        <Card>
          <Table
            columns={productColumns}
            dataSource={productSummary}
            rowKey="key"
            pagination={{ pageSize: 10 }}
            expandable={{
              expandedRowRender,
              rowExpandable: (record) => record.clients.length > 0,
            }}
            scroll={{ x: 800 }}
          />
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <FileTextOutlined />
          Отчеты
        </span>
      ),
      children: (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Typography.Text type="secondary">
              Эта вкладка пока не реализована
            </Typography.Text>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Обработка заказов</Title>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};

OrderProcessingPage.propTypes = {};

export default OrderProcessingPage;
