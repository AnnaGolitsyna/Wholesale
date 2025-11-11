import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Card,
  List,
  Typography,
  Button,
  Space,
  message,
  Tabs,
  Flex,
  Tag,
  Collapse,
} from 'antd';
import {
  SaveOutlined,
  UndoOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  HolderOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

/**
 * StockOrderManagementModal
 *
 * Manages contractor ORDER (sequence) within stockType groups
 * stockNumber represents position: 1, 2, 3, 4...
 * Moving one contractor automatically reorders others
 */
const StockOrderManagementModal = ({
  visible,
  onClose,
  contractors,
  onSave,
}) => {
  const [skladData, setSkladData] = useState([]);
  const [magazinData, setMagazinData] = useState([]);
  const [originalData, setOriginalData] = useState({ sklad: [], magazin: [] });
  const [hasChanges, setHasChanges] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  console.log('contractor', contractors);

  // Initialize data when modal opens
  useEffect(() => {
    if (visible && contractors) {
      const buyers = contractors.filter((c) => c.category !== 'supplier');

      // Separate by stockType and sort by stockNumber
      const sklads = buyers
        .filter((c) => c.stockType === 'stock')
        .sort((a, b) => a.stockNumber - b.stockNumber);

      const magazins = buyers
        .filter((c) => c.stockType === 'shop')
        .sort((a, b) => a.stockNumber - b.stockNumber);

      setSkladData([...sklads]);
      setMagazinData([...magazins]);
      setOriginalData({
        sklad: sklads.map((c) => c.id),
        magazin: magazins.map((c) => c.id),
      });
      setHasChanges(false);

      console.log('📦 Initial order:');
      console.log(
        '  Склад:',
        sklads.map((c, i) => `${i + 1}. ${c.name}`)
      );
      console.log(
        '  Магазин:',
        magazins.map((c, i) => `${i + 1}. ${c.name}`)
      );
    }
  }, [visible, contractors]);

  // Move contractor up in the list
  const moveUp = (index, type) => {
    if (index === 0) return;

    const setter = type === 'stock' ? setSkladData : setMagazinData;

    setter((prev) => {
      const newData = [...prev];
      [newData[index - 1], newData[index]] = [
        newData[index],
        newData[index - 1],
      ];

      // Update stockNumbers to match new positions
      newData.forEach((item, i) => {
        item.stockNumber = i + 1;
      });

      console.log(`⬆️ Moved "${newData[index - 1].name}" up in ${type}`);
      return newData;
    });

    setHasChanges(true);
  };

  // Move contractor down in the list
  const moveDown = (index, type) => {
    const data = type === 'stock' ? skladData : magazinData;
    if (index === data.length - 1) return;

    const setter = type === 'stock' ? setSkladData : setMagazinData;

    setter((prev) => {
      const newData = [...prev];
      [newData[index], newData[index + 1]] = [
        newData[index + 1],
        newData[index],
      ];

      // Update stockNumbers to match new positions
      newData.forEach((item, i) => {
        item.stockNumber = i + 1;
      });

      console.log(`⬇️ Moved "${newData[index + 1].name}" down in ${type}`);
      return newData;
    });

    setHasChanges(true);
  };

  // Native HTML5 drag and drop handlers
  const handleDragStart = (e, index, type) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ index, type }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex, dropType) => {
    e.preventDefault();

    const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const { index: dragIndex, type: dragType } = dragData;

    // Can only reorder within same stockType
    if (dragType !== dropType) return;
    if (dragIndex === dropIndex) return;

    const setter = dropType === 'stock' ? setSkladData : setMagazinData;

    setter((prev) => {
      const newData = [...prev];
      const [removed] = newData.splice(dragIndex, 1);
      newData.splice(dropIndex, 0, removed);

      // Update all stockNumbers to match new positions
      newData.forEach((item, i) => {
        item.stockNumber = i + 1;
      });

      console.log(
        `🔄 Reordered: "${removed.name}" from position ${dragIndex + 1} to ${
          dropIndex + 1
        }`
      );
      return newData;
    });

    setHasChanges(true);
  };

  // Save changes
  const handleSave = () => {
    const allContractors = [...skladData, ...magazinData];

    console.log('\n💾 Saving new order...');
    console.log(
      'Склад order:',
      skladData.map(
        (c, i) => `${i + 1}. ${c.name} (stockNumber: ${c.stockNumber})`
      )
    );
    console.log(
      'Магазин order:',
      magazinData.map(
        (c, i) => `${i + 1}. ${c.name} (stockNumber: ${c.stockNumber})`
      )
    );

    if (onSave) {
      onSave(allContractors);
    }

    messageApi.success('Порядок сохранен!');
    setHasChanges(false);
    onClose();
  };

  // Reset to original
  const handleReset = () => {
    if (visible && contractors) {
      const buyers = contractors.filter((c) => c.category !== 'supplier');

      const sklads = buyers
        .filter((c) => c.stockType === 'stock')
        .sort((a, b) => a.stockNumber - b.stockNumber);

      const magazins = buyers
        .filter((c) => c.stockType === 'магазин')
        .sort((a, b) => a.stockNumber - b.stockNumber);

      setSkladData([...sklads]);
      setMagazinData([...magazins]);
      setHasChanges(false);
      messageApi.info('Порядок восстановлен');
    }
  };

  // Render list for a stockType
  const renderList = (data, type) => (
    <List
      size="small"
      dataSource={data}
      renderItem={(item, index) => (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, index, type)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index, type)}
          style={{ marginBottom: '4px' }}
        >
          <Card
            size="small"
            hoverable
            style={{
              cursor: 'move',
              // backgroundColor: '#fafafa',
            }}
          >
            <Flex justify="space-between" align="center">
              <Space>
                <HolderOutlined style={{ cursor: 'grab', color: '#999' }} />
                <Tag color="blue">{item.stockNumber}</Tag>
                <Text strong>{item.name}</Text>
              </Space>

              <Space>
                <Button
                  size="small"
                  icon={<ArrowUpOutlined />}
                  onClick={() => moveUp(index, type)}
                  disabled={index === 0}
                />
                <Button
                  size="small"
                  icon={<ArrowDownOutlined />}
                  onClick={() => moveDown(index, type)}
                  disabled={index === data.length - 1}
                />
              </Space>
            </Flex>
          </Card>
        </div>
      )}
    />
  );

  const tabItems = [
    {
      key: 'sklad',
      label: `Склад (${skladData.length})`,
      children: renderList(skladData, 'stock'),
    },
    {
      key: 'magazin',
      label: `Магазин (${magazinData.length})`,
      children: renderList(magazinData, 'магазин'),
    },
  ];

  return (
    <>
      {contextHolder}
      <Modal
        title="Управление порядком контрагентов"
        open={visible}
        onCancel={onClose}
        width={700}
        footer={
          <Space>
            <Text type="secondary">
              Используйте стрелки или перетаскивайте для изменения порядка
            </Text>
            <Button
              icon={<UndoOutlined />}
              onClick={handleReset}
              disabled={!hasChanges}
            >
              Сбросить
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Сохранить порядок
            </Button>
          </Space>
        }
      >
        <Tabs items={tabItems} />
        <Collapse
          bordered={false}
          items={[
            {
              key: '1',
              label: 'Как это работает:',
              children: (
                <Text>
                  Номер (stockNumber) = позиция в списке. При перемещении
                  контрагента, все номера автоматически обновляются.
                </Text>
              ),
            },
          ]}
        />
      </Modal>
    </>
  );
};

StockOrderManagementModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contractors: PropTypes.array.isRequired,
  onSave: PropTypes.func,
};

export default StockOrderManagementModal;
