import React, { useState, useMemo } from 'react';
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
  DatePicker,
  Flex,
  message,
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
import { usePrintScheduleCard } from '../../hooks/usePrintScheduleCard';
import { buildScheduleTableData } from '../../utils/scheduleCardUtils';
import dayjs from 'dayjs';

const { Text } = Typography;

// Get next Wednesday from today
const getNextWednesday = () => {
  const today = dayjs();
  const currentDay = today.day(); // 0 = Sunday, 3 = Wednesday
  const daysUntilWednesday = (3 - currentDay + 7) % 7;

  // If today is Wednesday, get next Wednesday (7 days)
  // Otherwise, get the upcoming Wednesday
  const daysToAdd = daysUntilWednesday === 0 ? 7 : daysUntilWednesday;

  return today.add(daysToAdd, 'day');
};

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
  // Date state for orders (non-saved) mode
  // For 'week' schedule in orders mode, default to next Wednesday
  const getInitialDate = () => {
    if (dataSource === 'orders' && schedule.scheduleName === 'week') {
      return getNextWednesday();
    }
    return null;
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate());

  // Use print hook for all print-related functionality
  const {
    isModalOpen,
    setIsModalOpen,
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
            return count > 0 ? count : '';
          }
          return count || '';
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
          <div ref={printRef} style={{ display: 'none' }}>
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
