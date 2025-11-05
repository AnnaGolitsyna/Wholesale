import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Select, Input, Button, Space, Divider, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

/**
 * ItemFilterMultiSelect
 *
 * Purpose: Select items from listOrderedItems to filter which ones to show/edit
 * - MultiSelect shows ALL listOrderedItems
 * - User selects which items they want to work with
 * - Selected items are shown for editing (count field)
 * - Can add new items via input in dropdown
 * - Can search if list is large
 */
const ItemFilterMultiSelect = ({
  allItems = [], // All available items (listOrderedItems)
  selectedItemIds = [], // Currently selected item IDs
  onSelectionChange, // Callback when selection changes
  onAddNewItem, // Callback when new item is added
  placeholder = 'Select items to work with...',
  allowAddNew = true, // Show + button to add new items
  style = {},
}) => {
  const [customInputValue, setCustomInputValue] = useState('');
  const inputRef = useRef(null);

  // Convert allItems to options format for Select
  const options = useMemo(() => {
    return allItems.map((item) => ({
      label: item.label || item.name,
      value: item.value || item.id,
    }));
  }, [allItems]);

  // Handle adding new item
  const handleAddNewItem = () => {
    const trimmedValue = customInputValue.trim();
    if (!trimmedValue) return;

    // Check if already exists
    const existingItem = allItems.find(
      (item) =>
        (item.label || item.name).toLowerCase() === trimmedValue.toLowerCase()
    );

    if (existingItem) {
      // Just select it if it exists
      const itemId = existingItem.value || existingItem.id;
      if (!selectedItemIds.includes(itemId)) {
        onSelectionChange([...selectedItemIds, itemId]);
      }
    } else {
      // Add new item
      if (onAddNewItem) {
        onAddNewItem(trimmedValue);
      }
    }

    setCustomInputValue('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Handle key press in input
  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewItem();
    }
  };

  // Custom dropdown render
  const popupRender = (menu) => (
    <>
      {menu}
      {allowAddNew && (
        <>
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px', width: '100%' }}>
            <Input
              placeholder="Enter new item name..."
              ref={inputRef}
              value={customInputValue}
              onChange={(e) => setCustomInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ flex: 1 }}
            />
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={handleAddNewItem}
              disabled={!customInputValue.trim()}
            >
              Add
            </Button>
          </Space>
        </>
      )}
    </>
  );

  return (
    <Select
      mode="multiple"
      value={selectedItemIds}
      onChange={onSelectionChange}
      placeholder={placeholder}
      style={{ width: '100%', ...style }}
      options={options}
      popupRender={popupRender}
      showSearch
      filterOption={(input, option) => {
        const label = option?.label || '';
        return label.toLowerCase().includes(input.toLowerCase());
      }}
      maxTagCount="responsive"
      notFoundContent={
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No items available"
        />
      }
    />
  );
};

ItemFilterMultiSelect.propTypes = {
  allItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      name: PropTypes.string,
      count: PropTypes.number,
    })
  ).isRequired,
  selectedItemIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onSelectionChange: PropTypes.func.isRequired,
  onAddNewItem: PropTypes.func,
  placeholder: PropTypes.string,
  allowAddNew: PropTypes.bool,
  style: PropTypes.object,
};

export default ItemFilterMultiSelect;
