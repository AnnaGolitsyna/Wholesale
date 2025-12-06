import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spin, Result, Alert } from 'antd';
import { useFirebaseProductsList } from '../../api/operations';
import ProductSelectionTable from '../table/ProductSelectionTable';
import RadioGroupForProductTable from '../radioGroup/RadioGroupForProductTable';

/**
 * Component for selecting products to add to contractor orders
 * Filters out products already in the order list
 * This component is used as a Form.Item component in AddOnModal
 */
const ProductSelection = ({ value, onChange, existingItems = [] }) => {
  const { data, isLoading, isError, error } = useFirebaseProductsList();
  const [filterType, setFilterType] = useState('all');

  const handleFilterTypeChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  // Handle selection changes from ProductSelectionTable
  const handleSelectionChange = (selectedProducts) => {
    // Notify Form.Item that the value has changed
    if (onChange) {
      onChange(selectedProducts);
    }
  };

  // Filter out products that are already in the order
  const availableProducts = React.useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    const filtered = data.filter((product) => {
      // Check multiple possible ID fields in product
      const productId = product.id || product.value || product.key;

      // Check if this product is already in the order
      const isInOrder = existingItems?.some((item) => {
        const itemProductId = item.productId || item.value || item.id;
        return itemProductId === productId;
      });

      return !isInOrder;
    });

    return filtered;
  }, [data, existingItems]);

  if (isError) {
    return (
      <Result
        status="error"
        title="Ошибка загрузки данных"
        subTitle={
          error?.message || error?.data || 'Не удалось загрузить список товаров'
        }
      />
    );
  }

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Spin size="large" tip="Загрузка товаров...">
          <div style={{ minHeight: '100px' }} />
        </Spin>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Result
        status="warning"
        title="Нет доступных товаров"
        subTitle="Список товаров пуст. Добавьте товары в систему."
      />
    );
  }

  if (availableProducts.length === 0) {
    return (
      <Result
        status="info"
        title="Все товары уже добавлены"
        subTitle={`В заказе уже есть все ${
          existingItems?.length || 0
        } доступных товаров.`}
      />
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <Alert
        message={
          <span>
            <strong>Всего товаров:</strong> {data.length} |
            <strong> В заказе:</strong> {existingItems?.length || 0} |
            <strong> Доступно для добавления:</strong>{' '}
            {availableProducts.length}
          </span>
        }
        type="info"
        style={{ marginBottom: 16 }}
        showIcon
      />
      <ProductSelectionTable
        data={availableProducts}
        filterType={filterType}
        onChange={handleSelectionChange}
      />
      <div style={{ marginTop: 16 }}>
        <RadioGroupForProductTable onFilterChange={handleFilterTypeChange} />
      </div>
    </div>
  );
};

ProductSelection.propTypes = {
  value: PropTypes.array, // Current value from Form.Item
  onChange: PropTypes.func, // Callback from Form.Item
  existingItems: PropTypes.array, // Items already in the order
};

ProductSelection.defaultProps = {
  value: [],
  onChange: null,
  existingItems: [],
};

export default ProductSelection;
