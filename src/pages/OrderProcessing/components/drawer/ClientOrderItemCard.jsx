import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Flex,
  Space,
  Button,
  InputNumber,
  Popconfirm,
  Typography,
} from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * ClientOrderItemCard Component
 * Card display for client orders (simpler view)
 */
const ClientOrderItemCard = ({
  item,
  isSelected,
  readOnly,
  onUpdateCount,
  onDelete,
  token,
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
      }}
      title={
        <Text strong ellipsis>
          {item.label || item.name}
        </Text>
      }
    >
      <Flex justify="space-between" align="center">
        <Text type="secondary">Кол-во:</Text>
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
            />
            <InputNumber
              min={0}
              max={9999}
              value={item.count}
              onChange={(value) => onUpdateCount(itemId, value)}
              style={{ width: 80, textAlign: 'center' }}
              precision={0}
            />
            <Button
              icon={<PlusOutlined />}
              onClick={() => onUpdateCount(itemId, item.count + 1)}
            />
          </Space.Compact>
        )}
        {!readOnly && (
          <Popconfirm
            title="Удалить товар?"
            description="Вы уверены?"
            onConfirm={() => onDelete(itemId)}
            okText="Да"
            cancelText="Нет"
            okType="danger"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        )}
      </Flex>
    </Card>
  );
};

ClientOrderItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onUpdateCount: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
};

export default ClientOrderItemCard;
