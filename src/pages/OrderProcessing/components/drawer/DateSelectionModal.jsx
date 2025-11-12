import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Space,
  Card,
  Form,
  DatePicker,
  Typography,
  Button,
  Divider,
} from 'antd';
import { CalendarOutlined, SaveOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * DateSelectionModal Component
 * Modal for selecting order and received dates
 */
const DateSelectionModal = ({
  visible,
  orderDate,
  receivedDate,
  onOrderDateChange,
  onReceivedDateChange,
  disabledReceivedDate,
  onSave,
  onCancel,
  client,
  itemsCount,
  totalUnits,
}) => {
  const deliveryDays =
    orderDate && receivedDate ? receivedDate.diff(orderDate, 'day') : 0;

  return (
    <Modal
      title={
        <Space>
          <CalendarOutlined />
          <Text strong>Даты заказа</Text>
        </Space>
      }
      open={visible}
      onCancel={onCancel}
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button onClick={onCancel}>Назад</Button>
          <Button
            type="primary"
            onClick={onSave}
            disabled={!orderDate || !receivedDate}
            icon={<SaveOutlined />}
          >
            Сохранить заказ
          </Button>
        </Space>
      }
      width={550}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* Order summary */}
        <Card size="small">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Text type="secondary">Сохраняется заказ:</Text>
            <Text strong style={{ fontSize: '16px' }}>
              {client?.name}
            </Text>
            <Text type="secondary">
              {itemsCount} позиций, {totalUnits} единиц
            </Text>
          </Space>
        </Card>

        {/* Date pickers */}
        <Form layout="vertical">
          <Form.Item
            label={<Text strong>Дата заказа</Text>}
            required
            tooltip="Дата, когда был сделан заказ поставщику"
          >
            <DatePicker
              value={orderDate}
              onChange={onOrderDateChange}
              style={{ width: '100%' }}
              format="DD.MM.YYYY"
              placeholder="Выберите дату заказа"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<Text strong>Дата получения</Text>}
            required
            tooltip="Планируемая дата получения товара от поставщика"
          >
            <DatePicker
              value={receivedDate}
              onChange={onReceivedDateChange}
              style={{ width: '100%' }}
              format="DD.MM.YYYY"
              placeholder="Выберите дату получения"
              disabledDate={disabledReceivedDate}
              size="large"
            />
          </Form.Item>
        </Form>

        {/* Delivery period calculation */}
        {orderDate && receivedDate && (
          <Card size="small">
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Space justify="space-between" style={{ width: '100%' }}>
                <Text type="secondary">Дата заказа:</Text>
                <Text strong>{orderDate.format('DD.MM.YYYY')}</Text>
              </Space>
              <Space justify="space-between" style={{ width: '100%' }}>
                <Text type="secondary">Дата получения:</Text>
                <Text strong>{receivedDate.format('DD.MM.YYYY')}</Text>
              </Space>
              <Divider style={{ margin: '8px 0' }} />
              <Space justify="space-between" style={{ width: '100%' }}>
                <Text type="secondary">Период доставки:</Text>
                <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                  {deliveryDays} дней
                </Text>
              </Space>
            </Space>
          </Card>
        )}
      </Space>
    </Modal>
  );
};

DateSelectionModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  orderDate: PropTypes.object,
  receivedDate: PropTypes.object,
  onOrderDateChange: PropTypes.func.isRequired,
  onReceivedDateChange: PropTypes.func.isRequired,
  disabledReceivedDate: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  client: PropTypes.object,
  itemsCount: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
};

export default DateSelectionModal;
