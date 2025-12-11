import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Statistic,
  Space,
  Tag,
  Typography,
  Modal,
  Table,
  Button,
  Radio,
  DatePicker,
  Flex,
  message,
  theme,
} from 'antd';
import { CalendarOutlined, PrinterOutlined } from '@ant-design/icons';
import {
  scheduleType,
  refundsType,
} from '../../../../constants/productsDetail';
import { usePrintScheduleCard } from '../../hooks/usePrintScheduleCard';
import { buildScheduleTableData } from '../../utils/scheduleCardUtils';
import { getNextSunday } from '../../utils/dateUtils';
import SavedOrderByClients from '../drawer/SavedOrderByClients';
import SavedOrderByProducts from '../drawer/SavedOrderByProducts';

const { Text } = Typography;

/**
 * ScheduleCard Component
 *
 * Displays a card with schedule information, product statistics, and refunds types
 * Styled with brand theme colors
 */
const ScheduleCard = ({ schedule, activeTab, dataSource }) => {
  // Date state for orders (non-saved) mode
  // For 'week' schedule in orders mode, default to next Sunday
  const getInitialDate = () => {
    if (dataSource === 'orders' && schedule.scheduleName === 'week') {
      return getNextSunday();
    }
    return null;
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate());
  const { token } = theme.useToken();
  // Drawer states
  const [clientsDrawerOpen, setClientsDrawerOpen] = useState(false);
  const [productsDrawerOpen, setProductsDrawerOpen] = useState(false);

  // Active states for visual feedback
  const [productsActive, setProductsActive] = useState(false);
  const [clientsActive, setClientsActive] = useState(false);

  // Use print hook for all print-related functionality
  const {
    isModalOpen,
    printOrientation,
    setPrintOrientation,
    handlePrintClick,
    handleModalClose,
    handlePrint,
    printRef,
  } = usePrintScheduleCard(schedule, dataSource, selectedDate);

  // Build table data structure using utility function
  const tableData = useMemo(() => {
    return buildScheduleTableData(schedule, dataSource);
  }, [schedule, dataSource]);

  // Wrapper function to handle print with validation
  const handlePrintWithValidation = () => {
    const result = handlePrint();
    if (result?.error) {
      message.error(result.error);
      return;
    }
  };

  // Drawer handlers with active state management
  const handleOpenClientsDrawer = () => {
    setClientsDrawerOpen(true);
  };

  const handleCloseClientsDrawer = () => {
    setClientsDrawerOpen(false);
  };

  const handleOpenProductsDrawer = () => {
    setProductsDrawerOpen(true);
  };

  const handleCloseProductsDrawer = () => {
    setProductsDrawerOpen(false);
  };

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
              },
            };
          }
          if (record.isGroupHeader) {
            return {
              colSpan: schedule.products.length + 1,
              style: {
                fontWeight: 'bold',
                textAlign: 'center',
              },
            };
          }
          if (record.isSummary) {
            return {
              style: {
                fontWeight: 'bold',
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
              textAlign: 'center',
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
            return count > 0 ? count : '';
          }
          return count || '';
        },
      });
    });

    return columns;
  }, [schedule.products]);

  // Enhanced grid item styles with brand theme colors
  const getGridItemStyle = (isActive) => ({
    flex: '1 1 0',
    minWidth: 0,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isActive
      ? `0 8px 20px ${token.negativeColorChart}, 0 0 0 3px ${token.colorReceivable}`
      : `0 2px 8px ${token.saleOrderAccent}`,
    background: isActive
      ? `linear-gradient(135deg, ${token.saleInvoiceBg} 0%, ${token.saleInvoiceAccent} 100%)`
      : token.cardBgAccent,
    borderRadius: '8px',
    // Add subtle inner glow when active
    ...(isActive && {
      boxShadow: `0 8px 20px ${token.cardBorderColor}, 0 0 0 3px ${token.colorReceivable}, inset 0 0 20px rgba(209, 232, 226, 0.2)`,
    }),
  });

  return (
    <Card
      hoverable
      style={{
        flex: '1 1 200px',
        maxWidth: '300px',
      }}
      title={
        dataSource === 'saved' && schedule.date && schedule.docNumber ? (
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
      <Card
        style={{
          border: 'none',
          marginBottom: '16px',
        }}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '12px',
            padding: 0,
          }
        }}
      >
        {/* Products Card.Grid with enhanced interactivity and brand colors */}
        <Card.Grid
          style={getGridItemStyle(productsActive)}
          hoverable
          onClick={handleOpenProductsDrawer}
          onMouseEnter={() => setProductsActive(true)}
          onMouseLeave={() => setProductsActive(false)}
          onTouchStart={() => setProductsActive(true)}
          onTouchEnd={() => {
            setTimeout(() => setProductsActive(false), 200);
          }}
        >
          <Statistic
            title={
              <Text
                strong={productsActive}
                ellipsis
                style={{
                  color: productsActive ? token.colorTextBase : token.colorInfo,
                  transition: 'color 0.3s ease',
                  fontSize: productsActive ? '12px' : '16px',
                }}
              >
                Товаров
              </Text>
            }
            value={schedule.totalProducts}
            valueStyle={{
              fontSize: productsActive ? '28px' : '24px',
              color: productsActive ? token.colorTextBase : token.colorInfo,
              fontWeight: productsActive ? 'bold' : '600',
              transition: 'all 0.3s ease',
              textShadow: productsActive
                ? '0 2px 4px rgba(0, 0, 0, 0.2)'
                : 'none',
            }}
          />
        </Card.Grid>

        {/* Clients Card.Grid with enhanced interactivity and brand colors */}
        <Card.Grid
          style={getGridItemStyle(clientsActive)}
          hoverable
          onClick={handleOpenClientsDrawer}
          onMouseEnter={() => setClientsActive(true)}
          onMouseLeave={() => setClientsActive(false)}
          onTouchStart={() => setClientsActive(true)}
          onTouchEnd={() => {
            setTimeout(() => setClientsActive(false), 200);
          }}
        >
          <Statistic
            title={
              <Text
                strong={clientsActive}
                ellipsis
                style={{
                  color: clientsActive ? token.colorTextBase : token.colorInfo,
                  transition: 'color 0.3s ease',
                  fontSize: clientsActive ? '12px' : '16px',
                }}
              >
                Клиентов
              </Text>
            }
            value={schedule.uniqueClients}
            valueStyle={{
              fontSize: clientsActive ? '28px' : '24px',
              color: clientsActive ? token.colorTextBase : token.colorInfo,
              fontWeight: clientsActive ? 'bold' : '600',
              transition: 'all 0.3s ease',
              textShadow: clientsActive
                ? '0 2px 4px rgba(0, 0, 0, 0.2)'
                : 'none',
            }}
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
          dataSource === 'saved' && schedule.date ? (
            <Space>
              <PrinterOutlined />
              <span>
                {`Раскладка от ${schedule.date} - ${
                  scheduleType[schedule.scheduleName]?.label
                }`}
              </span>
            </Space>
          ) : (
            <Flex align="center" gap={16}>
              <Space>
                <PrinterOutlined />
                <span>
                  {`Раскладка - ${scheduleType[schedule.scheduleName]?.label}`}
                </span>
              </Space>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                format="DD.MM.YYYY"
                placeholder="Выберите дату"
              />
            </Flex>
          )
        }
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={
          <Space>
            <Button onClick={handleModalClose}>Закрыть</Button>
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={handlePrintWithValidation}
            >
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
          <div style={{ display: 'none' }}>
            <div ref={printRef}>
              <Table
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
                size="small"
                bordered
                rowClassName={(record) => {
                  if (
                    record.isTopSummary &&
                    record.summaryType === 'difference'
                  ) {
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
        </div>
      </Modal>

      {/* Clients Drawer */}
      <SavedOrderByClients
        open={clientsDrawerOpen}
        onClose={handleCloseClientsDrawer}
        schedule={schedule}
      />

      {/* Products Drawer */}
      <SavedOrderByProducts
        open={productsDrawerOpen}
        onClose={handleCloseProductsDrawer}
        schedule={schedule}
      />

      {/* Add CSS animation for pulse effect */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.3);
            }
          }
        `}
      </style>
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
  dataSource: PropTypes.string.isRequired,
};

export default ScheduleCard;
