import React, { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Statistic,
  Space,
  Tag,
  Typography,
  Popover,
  Modal,
  Table,
  Button,
  Radio,
} from 'antd';
import {
  CalendarOutlined,
  ShoppingOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import {
  scheduleType,
  refundsType,
} from '../../../../constants/productsDetail';
import ProductsPopoverContent from './ProductsPopoverContent';

const { Text } = Typography;

/**
 * ScheduleCard Component
 *
 * Displays a card with schedule information, product statistics, and refunds types
 */
const ScheduleCard = ({
  schedule,
  activeTab,
  popoverKey,
  hoveredPopovers,
  onHoverChange,
  dataSource,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [printOrientation, setPrintOrientation] = useState('portrait');
  const printRef = useRef(null);

  // Open modal handler
  const handlePrintClick = () => {
    setIsModalOpen(true);
  };

  // Close modal handler
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Print handler
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=1200,height=800');

    const title = activeTab === 'saved-all'
      ? `Раскладка от ${schedule.date} - ${scheduleType[schedule.scheduleName]?.label}`
      : `Раскладка - ${scheduleType[schedule.scheduleName]?.label}`;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              padding: 20px;
              font-size: 12px;
            }
            h2 {
              margin-bottom: 20px;
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
              font-size: 20px;
            }
            th {
              background-color: #f0f0f0;
              font-weight: bold;
            }
            .group-header {
              background-color: #e0e0e0;
              font-weight: bold;
              text-align: center;
            }
            .group-header td {
              font-size: 14px;
            }
            .summary-row td {
              background-color: #f5f5f5;
              font-weight: bold;
              font-size: 12px;
            }
            .top-summary-row td {
              background-color: #fafafa;
              font-weight: bold;
              font-size: 12px;
            }
            .difference-row td {
              background-color: #e6f7ff;
              font-weight: bold;
              font-size: 12px;
            }
            .negative {
              color: #ff4d4f;
            }
            .client-col {
              text-align: left;
            }
            @media print {
              body {
                padding: 10px;
              }
              @page {
                size: ${printOrientation};
                margin: 10mm;
              }
            }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Build table data structure
  const tableData = useMemo(() => {
    // Get all unique clients across all products
    const clientsMap = new Map();

    schedule.products.forEach((product) => {
      if (product.clients && product.clients.length > 0) {
        product.clients.forEach((client) => {
          const clientKey =
            client.id || client.clientId || client.name || client.clientName;
          if (!clientsMap.has(clientKey)) {
            clientsMap.set(clientKey, {
              clientId: clientKey,
              clientName: client.name || client.clientName,
              stockType: client.stockType,
              stockNumber: client.stockNumber,
            });
          }
        });
      }
    });

    // Create rows for each client
    const rows = Array.from(clientsMap.values()).map((client) => {
      const row = {
        key: client.clientId,
        clientName: client.clientName,
        stockType: client.stockType,
        stockNumber: client.stockNumber,
      };

      // For each product, check if this client ordered it
      schedule.products.forEach((product) => {
        const productId = product.value || product.productId;
        const clientOrder = product.clients?.find(
          (c) =>
            (c.id || c.clientId || c.name || c.clientName) === client.clientId
        );

        // Add count for this product
        row[productId] = clientOrder ? clientOrder.count || 0 : 0;
      });

      return row;
    });

    // Group by stockType and sort by stockNumber
    const stockClients = rows
      .filter((r) => r.stockType === 'stock')
      .sort((a, b) => (a.stockNumber || 0) - (b.stockNumber || 0));

    const shopClients = rows
      .filter((r) => r.stockType === 'shop')
      .sort((a, b) => (a.stockNumber || 0) - (b.stockNumber || 0));

    // Calculate summary for each product by stockType
    const calculateSummary = (clientsGroup) => {
      const summary = {
        key: `summary-${clientsGroup[0]?.stockType || 'unknown'}`,
        clientName: 'Итого',
        stockType: clientsGroup[0]?.stockType,
        isGroupHeader: false,
        isSummary: true,
      };

      // Sum up each product column
      schedule.products.forEach((product) => {
        const productId = product.value || product.productId;
        summary[productId] = clientsGroup.reduce(
          (sum, row) => sum + (row[productId] || 0),
          0
        );
      });

      return summary;
    };

    // Build final table data with headers and summaries
    const finalData = [];

    // Add three summary rows at the top
    // Row 1: value (available quantity)
    // For 'orders' data source: use amountOdered
    // For 'saved' data source: use totalCount (which comes from transfer items count)
    const valueRow = {
      key: 'summary-value',
      clientName: 'Наличие',
      isTopSummary: true,
      summaryType: 'value',
    };
    schedule.products.forEach((product) => {
      const productId = product.value || product.productId;
      // Use amountOdered for orders, totalCount for saved transfers
      valueRow[productId] =
        dataSource === 'orders'
          ? product.amountOdered || 0
          : product.totalCount || 0;
    });
    finalData.push(valueRow);

    // Row 2: totalCount (ordered quantity)
    const totalCountRow = {
      key: 'summary-totalCount',
      clientName: 'Заказано',
      isTopSummary: true,
      summaryType: 'totalCount',
    };
    schedule.products.forEach((product) => {
      const productId = product.value || product.productId;
      totalCountRow[productId] = product.totalCount || 0;
    });
    finalData.push(totalCountRow);

    // Row 3: difference (value - totalCount)
    const differenceRow = {
      key: 'summary-difference',
      clientName: 'Остаток',
      isTopSummary: true,
      summaryType: 'difference',
    };
    schedule.products.forEach((product) => {
      const productId = product.value || product.productId;
      // For orders: amountOdered - totalCount
      // For saved: totalCount - totalCount (which will be 0, but keeping logic consistent)
      const availableValue =
        dataSource === 'orders'
          ? product.amountOdered || 0
          : product.totalCount || 0;
      const orderedCount = product.totalCount || 0;
      differenceRow[productId] = availableValue - orderedCount;
    });
    finalData.push(differenceRow);

    if (stockClients.length > 0) {
      // Add stock group header
      finalData.push({
        key: 'header-stock',
        clientName: 'СКЛАД',
        stockType: 'stock',
        isGroupHeader: true,
      });
      finalData.push(...stockClients);
      // Add stock summary
      finalData.push(calculateSummary(stockClients));
    }

    if (shopClients.length > 0) {
      // Add shop group header
      finalData.push({
        key: 'header-shop',
        clientName: 'МАГАЗИН',
        stockType: 'shop',
        isGroupHeader: true,
      });
      finalData.push(...shopClients);
      // Add shop summary
      finalData.push(calculateSummary(shopClients));
    }

    return finalData;
  }, [schedule.products]);

  // Build table columns
  const tableColumns = useMemo(() => {
    const columns = [
      {
        title: 'Клиент',
        dataIndex: 'clientName',
        key: 'clientName',
        fixed: 'left',
        width: 200,
        onCell: (record) => {
          if (record.isTopSummary) {
            return {
              style: {
                fontWeight: 'bold',
                // fontSize: '18px',
                //  backgroundColor: record.summaryType === 'difference' ? '#e6f7ff' : '#fafafa',
              },
            };
          }
          if (record.isGroupHeader) {
            return {
              colSpan: schedule.products.length + 1,
              style: {
                fontWeight: 'bold',
                // fontSize: '14px',
                // backgroundColor: '#f0f0f0',
                textAlign: 'center',
              },
            };
          }
          if (record.isSummary) {
            return {
              style: {
                fontWeight: 'bold',
                // backgroundColor: '#fafafa',
              },
            };
          }
          return {};
        },
      },
    ];

    // Add column for each product
    schedule.products.forEach((product) => {
      const productId = product.value || product.productId;
      columns.push({
        title: product.productName || product.label,
        dataIndex: productId,
        key: productId,
        width: 150,
        align: 'center',
        onCell: (record) => {
          if (record.isTopSummary) {
            const style = {
              fontWeight: 'bold',
              // fontSize: '16px',
              textAlign: 'center',
              // backgroundColor: record.summaryType === 'difference' ? '#e6f7ff' : '#fafafa',
            };
            // Add color for negative difference
            if (record.summaryType === 'difference' && record[productId] < 0) {
              style.color = '#ff4d4f';
            }
            return { style };
          }
          if (record.isGroupHeader) {
            return { colSpan: 0 }; // Hide this cell for header rows
          }
          if (record.isSummary) {
            return {
              style: {
                fontWeight: 'bold',
                // fontSize: '16px',
                // backgroundColor: '#fafafa',
              },
            };
          }
          return {};
        },
        render: (count, record) => {
          if (record.isTopSummary) {
            return count;
          }
          if (record.isGroupHeader) return null;
          if (record.isSummary) {
            return count > 0 ? count : '-';
          }
          return count || '-';
        },
      });
    });

    return columns;
  }, [schedule.products]);

  return (
    <Card
      hoverable
      style={{
        flex: '1 1 200px',
        maxWidth: '300px',
      }}
      title={
        activeTab === 'saved-all' ? (
          <Space direction="vertical" size={0}>
            <Space>
              <CalendarOutlined />
              <Text strong>{schedule.date}</Text>
            </Space>
            <Tag color={scheduleType[schedule.scheduleName]?.color}>
              {scheduleType[schedule.scheduleName]?.label}
            </Tag>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Документ №{schedule.docNumber}
            </Text>
          </Space>
        ) : (
          <Space>
            <CalendarOutlined
              style={{
                color: scheduleType[schedule.scheduleName]?.color,
              }}
            />
            <Tag color={scheduleType[schedule.scheduleName]?.color}>
              {scheduleType[schedule.scheduleName]?.label}
            </Tag>
          </Space>
        )
      }
      extra={
        <PrinterOutlined
          style={{ cursor: 'pointer' }}
          onClick={handlePrintClick}
        />
      }
      styles={{
        body: { padding: '16px' },
      }}
    >
      <Card style={{ border: 'none', marginBottom: '16px' }}>
        {/* First Card.Grid with Popover */}
        <Popover
          content={<ProductsPopoverContent products={schedule.products} />}
          title={
            <Space>
              <ShoppingOutlined />
              <span>Список товаров</span>
            </Space>
          }
          trigger="hover"
          placement="bottom"
          overlayStyle={{ maxWidth: '400px' }}
          open={hoveredPopovers[popoverKey]}
          onOpenChange={(open) => onHoverChange(popoverKey, open)}
        >
          <Card.Grid
            style={{
              width: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            hoverable
          >
            <Statistic
              title="Товаров"
              value={schedule.totalProducts}
              valueStyle={{ fontSize: '20px' }}
            />
          </Card.Grid>
        </Popover>

        {/* Second Card.Grid without Popover */}
        <Card.Grid hoverable={false} style={{ width: '50%' }}>
          <Statistic
            title="Клиентов"
            value={schedule.uniqueClients}
            valueStyle={{ fontSize: '20px' }}
          />
        </Card.Grid>
      </Card>

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
                  background: refundsType[type]?.color,
                  border: '1px solid #2c5f5d',
                  margin: 0,
                }}
              >
                {refundsType[type]?.label}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      {/* Modal with Table */}
      <Modal
        title={
          <Space>
            <PrinterOutlined />
            <span>
              {activeTab === 'saved-all'
                ? `Раскладка от ${schedule.date} - ${
                    scheduleType[schedule.scheduleName]?.label
                  }`
                : `Раскладка - ${scheduleType[schedule.scheduleName]?.label}`}
            </span>
          </Space>
        }
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={
          <Space>
            <Button onClick={handleModalClose}>Закрыть</Button>
            <Button type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
              Печать
            </Button>
          </Space>
        }
        width={1200}
        style={{ top: 20 }}
      >
        <div>
          {/* Print orientation selector */}
          <Space style={{ marginBottom: 16 }}>
            <Typography.Text strong>Ориентация печати:</Typography.Text>
            <Radio.Group
              value={printOrientation}
              onChange={(e) => setPrintOrientation(e.target.value)}
            >
              <Radio.Button value="portrait">Книжная</Radio.Button>
              <Radio.Button value="landscape">Альбомная</Radio.Button>
            </Radio.Group>
          </Space>

          {/* Visible table with scrolls */}
          <Table
            columns={tableColumns}
            dataSource={tableData}
            pagination={false}
            scroll={{ x: 'max-content', y: 500 }}
            size="small"
            bordered
          />

          {/* Hidden table for printing without scrolls */}
          <div ref={printRef} style={{ display: 'none' }}>
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
              size="small"
              bordered
              rowClassName={(record) => {
                if (record.isTopSummary && record.summaryType === 'difference') {
                  return 'difference-row';
                }
                if (record.isTopSummary) {
                  return 'top-summary-row';
                }
                if (record.isGroupHeader) {
                  return 'group-header';
                }
                if (record.isSummary) {
                  return 'summary-row';
                }
                return '';
              }}
            />
          </div>
        </div>
      </Modal>
    </Card>
  );
};

ScheduleCard.propTypes = {
  schedule: PropTypes.shape({
    scheduleName: PropTypes.string,
    date: PropTypes.string,
    docNumber: PropTypes.string,
    products: PropTypes.array.isRequired,
    totalProducts: PropTypes.number.isRequired,
    uniqueClients: PropTypes.number.isRequired,
    refundsTypes: PropTypes.array,
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  popoverKey: PropTypes.string.isRequired,
  hoveredPopovers: PropTypes.object.isRequired,
  onHoverChange: PropTypes.func.isRequired,
  dataSource: PropTypes.string.isRequired,
};

export default ScheduleCard;
