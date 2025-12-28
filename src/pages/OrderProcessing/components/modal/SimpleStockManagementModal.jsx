import React, { useState, useEffect, useCallback } from 'react';
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
import { useUpdateContractorMutation } from '../../../Contractors';

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
  const [hasChanges, setHasChanges] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [allChangedContractors, setAllChangedContractors] = useState([]);

  const [updateContractor, { isLoading: isSaving }] = useUpdateContractorMutation();

  // Helper function to sort and assign stockNumbers to contractors
  const processContractors = (contractorsList) => {
    return contractorsList
      .sort((a, b) => {
        const aNum = a.stockNumber ?? Infinity;
        const bNum = b.stockNumber ?? Infinity;
        return aNum - bNum;
      })
      .map((c, i) => ({
        ...c,
        stockNumber: c.stockNumber ?? i + 1,
      }));
  };

  // Initialize or reset data
  const initializeData = useCallback(() => {
    if (!contractors) return;

    const sklads = processContractors(
      contractors.filter((c) => c.stockType === 'stock')
    );
    const magazins = processContractors(
      contractors.filter((c) => c.stockType === 'shop')
    );

    setSkladData([...sklads]);
    setMagazinData([...magazins]);
    setHasChanges(false);
    setAllChangedContractors([]);
  }, [contractors]);

  // Initialize data when modal opens
  useEffect(() => {
    if (visible && contractors) {
      initializeData();
    }
  }, [visible, contractors, initializeData]);

  // Update accumulated changes with new changed contractors
  const updateChangedContractors = (changedList) => {
    setAllChangedContractors((prev) => {
      const updated = [...prev];
      changedList.forEach((changed) => {
        const existingIndex = updated.findIndex((c) => c.id === changed.id);
        if (existingIndex >= 0) {
          // Update existing entry with new stockNumber
          updated[existingIndex] = {
            ...updated[existingIndex],
            newStockNumber: changed.newStockNumber,
          };
        } else {
          // Add new entry
          updated.push(changed);
        }
      });
      return updated;
    });
  };

  // Reorder contractors and track changes
  const reorderContractors = (data, swapFn) => {
    const newData = [...data];
    swapFn(newData);

    // Update stockNumbers to match new positions and track changes
    const changedContractors = [];
    newData.forEach((item, i) => {
      const oldNumber = item.stockNumber;
      item.stockNumber = i + 1;
      if (oldNumber !== i + 1) {
        changedContractors.push({
          id: item.id,
          name: item.name,
          oldStockNumber: oldNumber,
          newStockNumber: i + 1,
        });
      }
    });

    updateChangedContractors(changedContractors);
    return newData;
  };

  // Move contractor up in the list
  const moveUp = (index, type) => {
    if (index === 0) return;

    const setter = type === 'stock' ? setSkladData : setMagazinData;

    setter((prev) => {
      return reorderContractors(prev, (arr) => {
        [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      });
    });

    setHasChanges(true);
  };

  // Move contractor down in the list
  const moveDown = (index, type) => {
    const data = type === 'stock' ? skladData : magazinData;
    if (index === data.length - 1) return;

    const setter = type === 'stock' ? setSkladData : setMagazinData;

    setter((prev) => {
      return reorderContractors(prev, (arr) => {
        [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      });
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
      return reorderContractors(prev, (arr) => {
        const [removed] = arr.splice(dragIndex, 1);
        arr.splice(dropIndex, 0, removed);
      });
    });

    setHasChanges(true);
  };

  // Save changes
  const handleSave = async () => {
    const allContractors = [...skladData, ...magazinData];

    try {
      // Update each contractor's stockNumber in Firebase
      const updatePromises = allChangedContractors.map((contractor) =>
        updateContractor({
          id: contractor.id,
          stockNumber: contractor.newStockNumber,
        })
      );

      await Promise.all(updatePromises);

      if (onSave) {
        onSave(allContractors);
      }

      messageApi.success('Порядок сохранен!');
      setHasChanges(false);
      setAllChangedContractors([]);
      onClose();
    } catch (error) {
      messageApi.error('Ошибка при сохранении порядка');
    }
  };

  // Reset to original
  const handleReset = () => {
    if (visible && contractors) {
      initializeData();
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
          <Card size="small" hoverable style={{ cursor: 'move' }}>
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
      children: renderList(magazinData, 'shop'),
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
              disabled={!hasChanges || isSaving}
            >
              Сбросить
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              disabled={!hasChanges}
              loading={isSaving}
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
