import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Space,
  Card,
  Radio,
  Flex,
  Button,
  Typography,
} from 'antd';
import { CalendarOutlined, SaveOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * SaveModeSelectionModal Component
 * Modal for selecting save mode (simple or detailed with dates)
 */
const SaveModeSelectionModal = ({
  visible,
  saveMode,
  onSaveModeChange,
  onProceed,
  onCancel,
  client,
  itemsCount,
  totalUnits,
}) => {
  return (
    <Modal
      title="Выберите режим сохранения"
      open={visible}
      onCancel={onCancel}
      footer={
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button onClick={onCancel}>Отмена</Button>
          <Button
            type="primary"
            onClick={onProceed}
            icon={
              saveMode === 'detailed' ? (
                <CalendarOutlined />
              ) : (
                <SaveOutlined />
              )
            }
          >
            {saveMode === 'simple' ? 'Сохранить' : 'Продолжить'}
          </Button>
        </Space>
      }
      width={500}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card size="small">
          <Space
            direction="vertical"
            style={{ width: '100%' }}
            size="middle"
          >
            <Text strong>Как вы хотите сохранить заказ?</Text>
            <Radio.Group
              value={saveMode}
              onChange={(e) => onSaveModeChange(e.target.value)}
              style={{ width: '100%' }}
            >
              <Space
                direction="vertical"
                style={{ width: '100%' }}
                size="middle"
              >
                <Radio value="simple">
                  <Space direction="vertical" size={0}>
                    <Text strong>Быстрое сохранение</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Просто обновить список товаров (mockOrderProductList)
                    </Text>
                  </Space>
                </Radio>
                <Radio value="detailed">
                  <Space direction="vertical" size={0}>
                    <Text strong>Детальное сохранение с датами</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Добавить даты заказа и получения, сохранить в список
                      отслеживания
                    </Text>
                  </Space>
                </Radio>
              </Space>
            </Radio.Group>
          </Space>
        </Card>

        {/* Summary */}
        <Card size="small">
          <Space
            direction="vertical"
            size="small"
            style={{ width: '100%' }}
          >
            <Flex justify="space-between">
              <Text type="secondary">Поставщик:</Text>
              <Text strong>{client?.name}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text type="secondary">Товаров:</Text>
              <Text strong>{itemsCount} позиций</Text>
            </Flex>
            <Flex justify="space-between">
              <Text type="secondary">Всего единиц:</Text>
              <Text strong>{totalUnits} шт</Text>
            </Flex>
          </Space>
        </Card>
      </Space>
    </Modal>
  );
};

SaveModeSelectionModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  saveMode: PropTypes.string.isRequired,
  onSaveModeChange: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  client: PropTypes.object,
  itemsCount: PropTypes.number.isRequired,
  totalUnits: PropTypes.number.isRequired,
};

export default SaveModeSelectionModal;
