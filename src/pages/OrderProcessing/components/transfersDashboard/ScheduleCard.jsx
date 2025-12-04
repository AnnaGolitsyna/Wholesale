import React from 'react';
import PropTypes from 'prop-types';
import { Card, Statistic, Space, Tag, Typography, Popover } from 'antd';
import {
  CalendarOutlined,
  ShoppingOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { scheduleType, refundsType } from '../../../../constants/productsDetail';
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
}) => {
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
      extra={<PrinterOutlined />}
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
};

export default ScheduleCard;
