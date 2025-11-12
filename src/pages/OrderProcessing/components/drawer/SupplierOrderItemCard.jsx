import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Flex,
  Space,
  Button,
  InputNumber,
  Popconfirm,
  Tag,
  Badge,
  Typography
} from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  WarningOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

/**
 * SupplierOrderItemCard Component
 * Card display for supplier orders (shows reserve calculations)
 */
const SupplierOrderItemCard = ({
  item,
  isSelected,
  readOnly,
  onUpdateCount,
  onDelete,
  token,
  getReserveColor,
}) => {
  const itemId = item.value || item.id;

  return (
    <Card
      size="small"
      style={{
        marginBottom: 12,
        height: '100%',
        border: isSelected ? `2px solid ${token.colorPrimary}` : undefined,
        boxShadow: isSelected
          ? `0 4px 12px ${token.colorPrimary}20`
          : undefined,
        backgroundColor:
          item.reserve < 0 ? `${token.colorErrorBg}` : undefined,
      }}
    >
      <Flex vertical gap={8}>
        <Flex justify="space-between" align="center">
          <Text strong ellipsis style={{ flex: 1 }}>
            {item.label || item.name}
          </Text>
          {item.reserve < 0 && (
            <Badge
              count={
                <WarningOutlined style={{ color: token.colorError }} />
              }
            />
          )}
        </Flex>

        <Flex justify="space-between" align="center">
          <Text type="secondary">Заказ:</Text>
          {readOnly ? (
            <Text strong style={{ fontSize: 16 }}>
              {item.count}
            </Text>
          ) : (
            <Space.Compact>
              <Button
                icon={<MinusOutlined />}
                onClick={() => onUpdateCount(itemId, item.count - 1)}
                disabled={item.count === 0}
                size="small"
              />
              <InputNumber
                min={0}
                max={9999}
                value={item.count}
                onChange={(value) => onUpdateCount(itemId, value)}
                style={{ width: 70, textAlign: 'center' }}
                precision={0}
                size="small"
              />
              <Button
                icon={<PlusOutlined />}
                onClick={() => onUpdateCount(itemId, item.count + 1)}
                size="small"
              />
            </Space.Compact>
          )}
        </Flex>

        <Flex justify="space-between" align="center">
          <Space>
            <Text type="secondary">Клиенты:</Text>
            <Tag color={token.colorSuccess}>{item.clientsTotal || 0}</Tag>
          </Space>
          <Space>
            <Text type="secondary">Резерв:</Text>
            <Text
              strong
              style={{
                color: getReserveColor(item.reserve),
                fontSize: '16px',
              }}
            >
              {item.reserve > 0 ? `+${item.reserve}` : item.reserve}
            </Text>
          </Space>
        </Flex>

        {!readOnly && (
          <Flex justify="flex-end">
            <Popconfirm
              title="Удалить товар?"
              description="Вы уверены?"
              onConfirm={() => onDelete(itemId)}
              okText="Да"
              cancelText="Нет"
              okType="danger"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
              >
                Удалить
              </Button>
            </Popconfirm>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

SupplierOrderItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onUpdateCount: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
  getReserveColor: PropTypes.func.isRequired,
};

export default SupplierOrderItemCard;
