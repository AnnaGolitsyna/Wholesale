import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Radio, Divider } from 'antd';
import ItemFilterMultiSelect from '../../../../components/select/MultiSelect';

/**
 * OrderItemFilter Component
 * Handles item selection via MultiSelect and filter mode toggle
 */
const OrderItemFilter = ({
  allItems,
  selectedItemIds,
  onSelectionChange,
  onAddFromProductList,
  mockOrderProductList,
  filterMode,
  onFilterModeChange,
  readOnly,
}) => {
  return (
    <Flex vertical gap={12}>
      {/* MultiSelect */}
      <ItemFilterMultiSelect
        allItems={allItems}
        selectedItemIds={selectedItemIds}
        onSelectionChange={onSelectionChange}
        onAddFromProductList={onAddFromProductList}
        mockOrderProductList={mockOrderProductList}
        allowAddFromList={!readOnly}
        placeholder="Выберите товары для работы..."
      />

      {/* Filter mode toggle */}
      <Radio.Group
        value={filterMode}
        onChange={(e) => onFilterModeChange(e.target.value)}
        buttonStyle="solid"
        size="small"
      >
        <Radio.Button value="all">
          Все товары ({allItems.length})
        </Radio.Button>
        <Radio.Button
          value="selected"
          disabled={selectedItemIds.length === 0}
        >
          Выбранные ({selectedItemIds.length})
        </Radio.Button>
      </Radio.Group>

      <Divider style={{ margin: 0 }} />
    </Flex>
  );
};

OrderItemFilter.propTypes = {
  allItems: PropTypes.array.isRequired,
  selectedItemIds: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  onAddFromProductList: PropTypes.func.isRequired,
  mockOrderProductList: PropTypes.array.isRequired,
  filterMode: PropTypes.string.isRequired,
  onFilterModeChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default OrderItemFilter;
