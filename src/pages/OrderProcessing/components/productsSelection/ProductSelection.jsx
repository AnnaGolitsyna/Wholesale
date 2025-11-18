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

  console.group('🎬 ProductSelection Debug');
  console.log('Props:', {
    hasValue: !!value,
    valueLength: value?.length,
    hasOnChange: !!onChange,
    existingItemsCount: existingItems?.length,
  });
  console.log('Data state:', {
    hasData: !!data,
    totalProducts: data?.length,
    isLoading,
    isError,
  });
  console.log('Existing items:', existingItems);

  const handleFilterTypeChange = (newFilterType) => {
    console.log('🔄 Filter type changed to:', newFilterType);
    setFilterType(newFilterType);
  };

  // Handle selection changes from ProductSelectionTable
  const handleSelectionChange = (selectedProducts) => {
    console.log(
      '✅ ProductSelection received selection:',
      selectedProducts.length
    );
    // Notify Form.Item that the value has changed
    if (onChange) {
      onChange(selectedProducts);
    }
  };

  // Filter out products that are already in the order
  const availableProducts = React.useMemo(() => {
    if (!data || !Array.isArray(data)) {
      console.warn('⚠️ No data or invalid data format');
      console.groupEnd();
      return [];
    }

    console.log('🔧 Filtering products...');
    console.log('  Total products from Firebase:', data.length);
    console.log('  Existing items in order:', existingItems?.length || 0);

    // Log first few existing items to understand structure
    if (existingItems && existingItems.length > 0) {
      console.log('  First existing item structure:', existingItems[0]);
    }

    const filtered = data.filter((product) => {
      // Check multiple possible ID fields in product
      const productId = product.id || product.value || product.key;

      // Check if this product is already in the order
      const isInOrder = existingItems?.some((item) => {
        const itemProductId = item.productId || item.value || item.id;
        const matches = itemProductId === productId;

        if (matches) {
          console.log(
            `  🚫 Filtering out: ${
              product.label || product.name
            } (already in order)`
          );
        }

        return matches;
      });

      return !isInOrder;
    });

    console.log('  ✅ Available products after filter:', filtered.length);
    console.log('  📊 Summary:', {
      total: data.length,
      existing: existingItems?.length || 0,
      available: filtered.length,
      filtered_out: data.length - filtered.length,
    });
    console.groupEnd();

    return filtered;
  }, [data, existingItems]);

  if (isError) {
    console.error('❌ Error loading products:', error);
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
    console.log('⏳ Loading products...');
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Spin size="large" tip="Загрузка товаров..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    console.warn('⚠️ No products available');
    return (
      <Result
        status="warning"
        title="Нет доступных товаров"
        subTitle="Список товаров пуст. Добавьте товары в систему."
      />
    );
  }

  if (availableProducts.length === 0) {
    console.log('ℹ️ All products already in order');
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

  console.log(
    '✅ Rendering ProductSelectionTable with:',
    availableProducts.length,
    'products'
  );

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
