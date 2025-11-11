import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  Input,
  Button,
  Space,
  Divider,
  Empty,
  Modal,
  List,
  Checkbox,
  Typography,
} from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';

const { Text } = Typography;

/**
 * ItemFilterMultiSelect
 *
 * Purpose: Select items from listOrderedItems to filter which ones to show/edit
 * - MultiSelect shows ALL listOrderedItems (sorted alphabetically)
 * - User selects which items they want to work with
 * - Selected items are shown for editing (count field)
 * - Can add items from mockOrderProductList via modal
 * - Can search if list is large
 */
const ItemFilterMultiSelect = ({
  allItems = [], // All available items (listOrderedItems)
  selectedItemIds = [], // Currently selected item IDs
  onSelectionChange, // Callback when selection changes
  onAddFromProductList, // Callback when adding items from product list
  mockOrderProductList = [], // Full product list to choose from
  placeholder = 'Select items to work with...',
  allowAddFromList = true, // Show button to add from product list
  style = {},
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelectedProducts, setTempSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Convert allItems to options format for Select and sort alphabetically
  const options = useMemo(() => {
    return allItems
      .map((item) => ({
        label: item.label || item.name,
        value: item.value || item.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allItems]);

  // Get products from mockOrderProductList that are NOT in allItems
  // Sort alphabetically
  const availableProducts = useMemo(() => {
    const existingIds = allItems.map((item) => item.value || item.id);
    return mockOrderProductList
      .filter((product) => !existingIds.includes(product.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allItems, mockOrderProductList]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return availableProducts;
    }
    const lowerSearch = searchTerm.toLowerCase();
    return availableProducts.filter((product) =>
      product.label.toLowerCase().includes(lowerSearch)
    );
  }, [availableProducts, searchTerm]);

  // Handle opening modal
  const handleOpenModal = () => {
    setTempSelectedProducts([]);
    setSearchTerm('');
    setModalVisible(true);
  };

  // Handle product selection in modal
  const handleProductToggle = (productValue) => {
    setTempSelectedProducts((prev) => {
      if (prev.includes(productValue)) {
        return prev.filter((v) => v !== productValue);
      } else {
        return [...prev, productValue];
      }
    });
  };

  // Handle adding selected products from modal
  const handleAddProducts = () => {
    if (tempSelectedProducts.length === 0) {
      setModalVisible(false);
      return;
    }

    const selectedProducts = mockOrderProductList.filter((product) =>
      tempSelectedProducts.includes(product.value)
    );

    if (onAddFromProductList) {
      onAddFromProductList(selectedProducts);
    }

    setModalVisible(false);
    setTempSelectedProducts([]);
    setSearchTerm('');
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setModalVisible(false);
    setTempSelectedProducts([]);
    setSearchTerm('');
  };

  // Custom dropdown render
  const dropdownRender = (menu) => (
    <>
      {menu}
      {allowAddFromList && availableProducts.length > 0 && (
        <>
          <Divider style={{ margin: '8px 0' }} />
          <Space
            direction="vertical"
            style={{ padding: '0 8px 4px', width: '100%' }}
          >
            {/* Add from product list button */}
            <Button
              type="dashed"
              icon={<AppstoreAddOutlined />}
              onClick={handleOpenModal}
              block
            >
              Выбери новый товар ({availableProducts.length})
            </Button>
          </Space>
        </>
      )}
    </>
  );

  return (
    <>
      <Select
        mode="multiple"
        value={selectedItemIds}
        onChange={onSelectionChange}
        placeholder={placeholder}
        style={{ width: '100%', ...style }}
        options={options}
        dropdownRender={dropdownRender}
        showSearch
        filterOption={(input, option) => {
          const label = option?.label || '';
          return label.toLowerCase().includes(input.toLowerCase());
        }}
        maxTagCount="responsive"
        notFoundContent={
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Нет доступных товаров"
          />
        }
      />

      {/* Modal for selecting from product list */}
      <Modal
        title="Добавьте товар из общего списка"
        open={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleAddProducts}
        okText={`Добавлено (${tempSelectedProducts.length})`}
        okButtonProps={{ disabled: tempSelectedProducts.length === 0 }}
        width={600}
      >
        <Input.Search
          placeholder="Введите товар..."
          style={{ marginBottom: 16 }}
          allowClear
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <List
          dataSource={filteredProducts}
          style={{ maxHeight: '400px', overflow: 'auto' }}
          renderItem={(product) => (
            <List.Item
              style={{ cursor: 'pointer', padding: '12px 8px' }}
              onClick={() => handleProductToggle(product.value)}
            >
              <Checkbox
                checked={tempSelectedProducts.includes(product.value)}
                style={{ marginRight: 12 }}
              />
              <Space size={0} style={{ flex: 1 }}>
                <Text strong>{product.label}</Text>

                <Divider type="vertical" />

                {product.scedule && (
                  <Text italic type="secondary" style={{ fontSize: '12px' }}>
                    {product.scedule.label}
                    {product.weekly && ' • Weekly'}
                  </Text>
                )}
              </Space>
            </List.Item>
          )}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  searchTerm ? 'Товары не найдены' : 'Все товары уже добавлены'
                }
              />
            ),
          }}
        />
      </Modal>
    </>
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
  onAddFromProductList: PropTypes.func,
  mockOrderProductList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      scedule: PropTypes.object,
      weekly: PropTypes.bool,
      datesList: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  placeholder: PropTypes.string,
  allowAddFromList: PropTypes.bool,
  style: PropTypes.object,
};

export default ItemFilterMultiSelect;
