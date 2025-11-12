import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Space, Tag, Button, Typography } from 'antd';
import { SaveOutlined, WarningOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * OrderDrawerFooter Component
 * Displays statistics and action buttons
 */
const OrderDrawerFooter = ({
  displayedItemsCount,
  totalItemsCount,
  statistics,
  isSupplierMode,

  onSave,
  onCancel,
  token,
  getReserveColor,
}) => {
  return (
    <Flex vertical gap={8}>
      {/* Statistics */}
      <Flex justify="space-between" style={{ padding: '0 4px' }}>
        <Text type="secondary">
          Показано: {displayedItemsCount} из {totalItemsCount}
        </Text>
        {isSupplierMode ? (
          <Flex gap={16}>
            <Space size="small">
              <Text type="secondary">Заказ:</Text>
              <Tag color={token.purchaseInvoiceAccent}>
                {statistics.totalOrder}
              </Tag>
            </Space>
            <Space size="small">
              <Text type="secondary">Клиенты:</Text>
              <Tag color={token.colorSuccess}>{statistics.totalClients}</Tag>
            </Space>
            <Space size="small">
              <Text type="secondary">Резерв:</Text>
              <Text
                strong
                style={{
                  color: getReserveColor(statistics.totalReserve),
                }}
              >
                {statistics.totalReserve > 0
                  ? `+${statistics.totalReserve}`
                  : statistics.totalReserve}
              </Text>
            </Space>
          </Flex>
        ) : (
          <Text type="secondary">Всего единиц: {statistics.totalOrder}</Text>
        )}
      </Flex>

      {/* Shortage warning */}
      {isSupplierMode && statistics.shortageCount > 0 && (
        <Flex
          justify="center"
          style={{
            backgroundColor: token.colorErrorBg,
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          <Space size="small">
            <WarningOutlined style={{ color: token.colorError }} />
            <Text type="danger">
              Нехватка по {statistics.shortageCount} позициям
            </Text>
          </Space>
        </Flex>
      )}

      {/* Action buttons */}
      <Space style={{ width: '100%' }}>
        <Button onClick={onCancel} block>
          Отмена
        </Button>
        <Button type="primary" icon={<SaveOutlined />} onClick={onSave} block>
          Сохранить
        </Button>
      </Space>
    </Flex>
  );
};

OrderDrawerFooter.propTypes = {
  displayedItemsCount: PropTypes.number.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  statistics: PropTypes.object.isRequired,
  isSupplierMode: PropTypes.bool.isRequired,

  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  getReserveColor: PropTypes.func,
};

export default OrderDrawerFooter;
